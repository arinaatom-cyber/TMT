/* Protein lists: Google Sheet Result Files → tmt-projects/Projects → parse by FASTA type */
(function(global){
  const GH_SOURCES=[
    {raw:'https://raw.githubusercontent.com/arinaatom-cyber/tmt-projects/main',path:'Projects'},
    {raw:'https://raw.githubusercontent.com/arinaatom-cyber/TMT/main',path:'projects'}
  ];
  const GH_API_REPO='arinaatom-cyber/tmt-projects';
  const GH_API_PATH='Projects';
  const MAX_COMPARE_PROJECTS=10;
  const MAX_LIST=80;

  const proteinCache=new Map();
  let ID_MAP={};
  let idMapReady=false;
  let PROJECT_MANIFEST=null;

  const UNIPROT_RE=/\b([OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9](?:[A-Z][A-Z0-9]{2}[0-9]){1,2})\b/i;

  function parseProteinCount(s){
    if(!s) return null;
    const m=String(s).replace(/,/g,'').match(/(\d{2,6})/);
    return m?parseInt(m[1],10):null;
  }

  function parseResultFiles(s){
    if(!s) return [];
    return String(s).split(/[\n\r]+/)
      .map(x=>x.replace(/^[\s•\-]+/,'').trim())
      .filter(x=>x&&x.length<220&&!/^count\s/i.test(x)&&!x.includes('→'));
  }

  function fastaKind(fastaDb){
    const f=(fastaDb||'').toLowerCase();
    if(/ensembl/.test(f)) return 'ensembl';
    if(/refseq/.test(f)) return 'refseq';
    if(/uniprot/.test(f)) return 'uniprot';
    return 'mixed';
  }

  function extractUniProtAccession(s){
    if(!s) return '';
    const m=String(s).match(UNIPROT_RE);
    return m?m[1].toUpperCase():'';
  }

  function fileVariants(name){
    const v=new Set();
    if(!name) return [];
    v.add(name);
    const base=name.replace(/\.(xlsx|xls|txt|csv|tsv|rar|zip|pdf)$/i,'').trim();
    if(base){v.add(base);v.add(base+'.txt');v.add(base+'.xlsx');v.add(base+'.csv');}
    if(/proteingroups?/i.test(name)&&!/\.txt$/i.test(name)) v.add('proteinGroups.txt');
    if(/protein_table|symbolcentric|proteincentric/i.test(name)){
      v.add('proteins_table.txt');v.add('protein_table.csv');
    }
    return [...v];
  }

  function ghRawUrl(pid,file,srcIdx=0){
    const s=GH_SOURCES[srcIdx]||GH_SOURCES[0];
    const f=encodeURIComponent(file).replace(/%2F/g,'/');
    return `${s.raw}/${s.path}/${encodeURIComponent(pid)}/${f}`;
  }

  function ghTreeUrl(pid){
    return `https://github.com/${GH_API_REPO}/tree/main/${GH_API_PATH}/${encodeURIComponent(pid)}`;
  }

  function uniprotLink(id){
    if(!id||!UNIPROT_RE.test(id)) return '';
    return `https://www.uniprot.org/uniprotkb/${encodeURIComponent(id)}`;
  }

  function uniprotSearchLink(q){
    return `https://www.uniprot.org/uniprotkb?query=${encodeURIComponent(q)}&fil=organism_id:9606`;
  }

  function guessIdType(raw,fastaDb){
    if(UNIPROT_RE.test(raw)) return 'uniprot';
    if(/^ENS[GTP]\d/i.test(raw)) return 'ensembl';
    if(/ensembl/i.test(fastaDb||'')) return 'gene';
    if(/refseq/i.test(fastaDb||'')) return 'refseq';
    if(/^[A-Z][A-Z0-9]{1,10}$/.test(raw)) return 'gene';
    return 'other';
  }

  function lookupMap(raw){
    if(!raw) return null;
    const k=String(raw).trim();
    return ID_MAP[k]||ID_MAP[k.toUpperCase()]||ID_MAP[k.toLowerCase()]||null;
  }

  function resolveEntry(raw,fastaDb){
    const r=String(raw||'').trim();
    if(!r||r.length>120) return null;
    const mapped=lookupMap(r);
    const uniFromRaw=extractUniProtAccession(r);
    const uniprot=mapped?.uniprot||uniFromRaw||'';
    let gene=mapped?.gene_symbol||'';
    if(!gene&&/^[A-Z][A-Z0-9]{1,10}$/.test(r)&&!uniFromRaw) gene=r;
    if(!gene&&mapped?.gene_symbol) gene=mapped.gene_symbol;
    const protein=mapped?.protein_name||'';
    const idType=mapped?.id_type||guessIdType(r,fastaDb);
    const display=protein||gene||uniprot||r;
    const key=(uniprot||gene||r).toUpperCase();
    const needsMap=!uniprot&&(idType==='gene'||idType==='ensembl'||fastaKind(fastaDb)!=='uniprot');
    return {raw,display,gene,protein,uniprot,idType,key,needsMap};
  }

  function compareKey(p){
    return (p.uniprot||p.gene||p.key).toUpperCase();
  }

  function detectColumns(headers){
    const idx={gene:-1,protein:-1,uniprot:-1,id:-1};
    headers.forEach((col,i)=>{
      const c=String(col||'').toLowerCase();
      if(/uniprot|uniprotkb/.test(c)) idx.uniprot=i;
      else if(/gene.?name|gene.?names|^gene$|associated gene/.test(c)) idx.gene=i;
      else if(/^gene id/.test(c)) idx.gene=idx.gene<0?i:idx.gene;
      else if(/protein.?name|protein names|^description$/.test(c)) idx.protein=i;
      else if(/protein.?ids|majority protein|^protein id$|protein accession/.test(c)) idx.id=i;
    });
    return idx;
  }

  function splitIds(raw){
    return String(raw||'').split(/[;,|]/).map(s=>s.trim()).filter(s=>s&&s.length<80);
  }

  function rowToParts(idx,cells,fastaDb){
    const pick=i=>(i>=0&&cells[i]!=null)?String(cells[i]).trim():'';
    const kind=fastaKind(fastaDb);
    const gene=pick(idx.gene);
    const protein=pick(idx.protein);
    const protIds=pick(idx.id);
    const uniExplicit=pick(idx.uniprot);
    const uniFromIds=extractUniProtAccession(protIds)||extractUniProtAccession(uniExplicit);
    const parts=[];
    if(kind==='ensembl'||kind==='refseq'){
      if(gene) parts.push(gene);
      if(protein&&protein!==gene) parts.push(protein);
      if(kind==='refseq'&&protIds&&!/^ENS/i.test(protIds)) parts.push(protIds);
      return parts.length?parts:[protIds].filter(Boolean);
    }
    if(uniFromIds) parts.push(uniFromIds);
    if(gene) parts.push(gene);
    if(!parts.length&&protIds) parts.push(protIds);
    if(!parts.length&&protein) parts.push(protein);
    return parts;
  }

  function parseProteinTable(text,fastaDb){
    if(typeof Papa==='undefined') throw new Error('PapaParse missing');
    const head=text.slice(0,4000);
    const delim=head.includes('\t')&&head.split('\n')[0].split('\t').length>head.split('\n')[0].split(',').length?'\t':',';
    const parsed=Papa.parse(text,{header:true,skipEmptyLines:'greedy',delimiter:delim});
    if(!parsed.data?.length) return [];
    const headers=parsed.meta?.fields||Object.keys(parsed.data[0]||{});
    const idx=detectColumns(headers);
    const out=[];
    const seen=new Set();
    parsed.data.forEach(row=>{
      const cells=headers.map(h=>row[h]);
      rowToParts(idx,cells,fastaDb).forEach(part=>{
        splitIds(part).forEach(bit=>{
          const e=resolveEntry(bit,fastaDb);
          if(!e||seen.has(e.key)) return;
          seen.add(e.key);
          out.push(e);
        });
      });
    });
    return out;
  }

  async function parseBlob(file,fastaDb,url){
    if(/\.xlsx?$/i.test(file)){
      if(typeof XLSX==='undefined') return [];
      const res=await fetch(url,{cache:'no-store'});
      if(!res.ok) throw new Error('HTTP '+res.status);
      const buf=await res.arrayBuffer();
      const wb=XLSX.read(buf,{type:'array'});
      const name=wb.SheetNames.find(n=>/protein|gene|result|table|group/i.test(n))||wb.SheetNames[0];
      const csv=XLSX.utils.sheet_to_csv(wb.Sheets[name]);
      return parseProteinTable(csv,fastaDb);
    }
    const res=await fetch(url,{cache:'no-store'});
    if(!res.ok) throw new Error('HTTP '+res.status);
    const text=await res.text();
    if(text.length<20) return [];
    return parseProteinTable(text,fastaDb);
  }

  function candidateFilenames(r,remote){
    const names=new Set();
    const man=PROJECT_MANIFEST?.[r.pid];
    if(man?.parse_file&&!String(man.parse_file).includes('xlsx only')) names.add(man.parse_file);
    (remote||[]).forEach(f=>names.add(f));
    (r.resultFiles||[]).forEach(f=>fileVariants(f).forEach(v=>names.add(v)));
    if(r.resultFile) fileVariants(r.resultFile).forEach(v=>names.add(v));
    ['proteinGroups.txt','proteins_table.txt','protein_groups.txt','protein_table.csv'].forEach(f=>names.add(f));
    if(man?.files) man.files.forEach(f=>{
      if(/\.(txt|csv|tsv|xlsx|xls)$/i.test(f)) names.add(f);
    });
    return [...names].filter(f=>f&&!/\.(pdf|xml|fasta|zip|rar)$/i.test(f));
  }

  async function listGithubProjectFiles(pid){
    const url=`https://api.github.com/repos/${GH_API_REPO}/contents/${GH_API_PATH}/${encodeURIComponent(pid)}`;
    try{
      const res=await fetch(url,{cache:'no-store'});
      if(!res.ok) return [];
      const items=await res.json();
      if(!Array.isArray(items)) return [];
      const files=[];
      for(const it of items){
        if(it.type==='file'&&/\.(txt|tsv|csv|xlsx|xls)$/i.test(it.name)) files.push(it.name);
      }
      return files;
    }catch(e){return [];}
  }

  async function loadProjectProteins(r){
    const cacheKey=r.pid;
    if(proteinCache.has(cacheKey)) return proteinCache.get(cacheKey);
    const pending={status:'loading',proteins:[],file:'',error:''};
    proteinCache.set(cacheKey,pending);
    const remote=await listGithubProjectFiles(r.pid);
    const files=candidateFilenames(r,remote);
    for(const file of files){
      for(let si=0;si<GH_SOURCES.length;si++){
        const url=ghRawUrl(r.pid,file,si);
        try{
          const proteins=await parseBlob(file,r.fastaDb,url);
          if(proteins.length){
            const hit={
              status:'ok',proteins,file,error:'',source:url,
              sheetCount:parseProteinCount(r.proteins),
              fasta:r.fastaDb||'',
              sheetResult:r.resultFile||''
            };
            proteinCache.set(cacheKey,hit);
            return hit;
          }
        }catch(e){/* next */ }
      }
    }
    const miss={
      status:'missing',proteins:[],file:files[0]||r.resultFile||'',error:'no file',
      tree:ghTreeUrl(r.pid),sheetCount:parseProteinCount(r.proteins),
      fasta:r.fastaDb||'',sheetResult:r.resultFile||''
    };
    proteinCache.set(cacheKey,miss);
    return miss;
  }

  function proteinStats(proteins){
    let uni=0,gene=0,mapped=0;
    proteins.forEach(p=>{
      if(p.uniprot) uni++;
      else if(p.gene) gene++;
      if(p.uniprot&&lookupMap(p.gene||p.raw)) mapped++;
    });
    return {uni,gene,mapped};
  }

  function loadSummaryHtml(r,hit){
    const t=global.t||((k)=>k);
    const sheet=hit.sheetCount??parseProteinCount(r.proteins);
    const n=hit.proteins?.length||0;
    const st=proteinStats(hit.proteins||[]);
    const fk=fastaKind(r.fastaDb);
    return `<div class="prot-load-meta">
      <span class="meta-pill" title="${t('sheetCountHint')}">${t('fromSheet')}: <strong>${sheet!=null?sheet.toLocaleString():'—'}</strong></span>
      <span class="meta-pill">${t('fromFile')}: <strong>${n.toLocaleString()}</strong></span>
      <span class="meta-pill">FASTA: ${escHtml(r.fastaDb||'—')} (${escHtml(fk)})</span>
      ${hit.file?`<span class="meta-pill">${escHtml(hit.file)}</span>`:''}
      ${n?`<span class="meta-pill">UniProt: ${st.uni} · ${t('geneIds')}: ${st.gene}</span>`:''}
      ${r.resultFile?`<span class="meta-pill" title="${escHtml(r.resultFile)}">${t('resultFile')}: ${escHtml(r.resultFile.length>40?r.resultFile.slice(0,40)+'…':r.resultFile)}</span>`:''}
    </div>`;
  }

  function initIdMap(){
    if(idMapReady) return Promise.resolve();
    const man=fetch('data/project-files.json',{cache:'no-store'})
      .then(res=>res.ok?res.json():{})
      .then(j=>{PROJECT_MANIFEST=j;})
      .catch(()=>{});
    const map=fetch('data/id-map.csv',{cache:'no-store'})
      .then(res=>res.ok?res.text():'')
      .then(text=>{
        if(text&&typeof Papa!=='undefined'){
          const parsed=Papa.parse(text,{header:true,skipEmptyLines:true});
          (parsed.data||[]).forEach(row=>{
            const id=(row.input_id||'').trim();
            if(!id) return;
            const entry={
              gene_symbol:(row.gene_symbol||'').trim(),
              protein_name:(row.protein_name||'').trim(),
              uniprot:(row.uniprot||'').trim(),
              id_type:(row.id_type||'').trim()
            };
            ID_MAP[id]=entry;
            if(entry.gene_symbol) ID_MAP[entry.gene_symbol]=entry;
          });
        }
      });
    return Promise.all([man,map]).then(()=>{idMapReady=true;}).catch(()=>{idMapReady=true;});
  }

  function proteinRowHtml(p){
    const uni=p.uniprot;
    const link=uni?uniprotLink(uni):uniprotSearchLink(p.gene||p.display);
    const tag=p.idType?`<span class="pid-tag">${escHtml(p.idType)}</span>`:'';
    const mapNote=p.needsMap&&!uni?`<span class="pid-tag" title="Add to data/id-map.csv">→ UniProt?</span>`:'';
    const sub=[p.gene&&p.gene!==p.display?p.gene:'',p.protein&&p.protein!==p.display?p.protein:'',uni||''].filter(Boolean).join(' · ');
    return `<div class="prow">
      <a class="pname" href="${escHtml(link)}" target="_blank" rel="noopener">${escHtml(p.display)}</a>
      ${tag}${mapNote}
      ${sub?`<div class="psub">${escHtml(sub)}</div>`:''}
    </div>`;
  }

  function escHtml(s){
    return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
  }

  function organSheetProteinStats(rows){
    const byPid=new Map();
    rows.forEach(r=>{
      if(!byPid.has(r.pid)) byPid.set(r.pid,{pid:r.pid,count:parseProteinCount(r.proteins),label:r.proteins,result:r.resultFile,fasta:r.fastaDb});
    });
    let total=0,known=0;
    byPid.forEach(x=>{if(x.count){total+=x.count;known++;}});
    return {projects:byPid.size,withCount:known,totalSheet:total,byPid:[...byPid.values()]};
  }

  function organProteinsSummaryHtml(organ,rows){
    const st=organSheetProteinStats(rows);
    const t=global.t||((k)=>k);
    return `<div class="ccard protein-summary">
      <h4 class="sec-h">${t('protSummary')}</h4>
      <p class="prot-hint">${t('protSummaryHint')}</p>
      <p class="prot-hint">${t('sheetCountHint')}</p>
      <div class="mstats prot-mini">
        <div class="ms"><div class="v">${st.projects}</div><div class="l">${t('projects')}</div></div>
        <div class="ms"><div class="v">${st.withCount}</div><div class="l">${t('withCount')}</div></div>
        <div class="ms"><div class="v">${st.totalSheet?st.totalSheet.toLocaleString():'—'}</div><div class="l">${t('sheetTotal')}</div></div>
      </div>
      <button type="button" class="tbtn primary" onclick="loadOrganProteins('${escHtml(organ)}')">${t('loadOrganProt')}</button>
      <div id="organProtList"></div>
    </div>`;
  }

  async function loadOrganProteins(organ){
    const el=document.getElementById('organProtList');
    if(!el||!global.getOrganRows) return;
    el.innerHTML=`<p class="prot-hint">${(global.t||(()=>'Loading…'))('loadingProt')}</p>`;
    const rows=global.uniqProjects(global.getOrganRows(organ)).slice(0,MAX_COMPARE_PROJECTS);
    let html='';
    for(const r of rows){
      const hit=await loadProjectProteins(r);
      html+=`<div class="prot-proj-block">
        <div class="prot-proj-head">
          <strong>${escHtml(r.pid)}</strong>
          <a href="${escHtml(global.ghResultsUrl(r.pid))}" target="_blank" rel="noopener">GitHub</a>
        </div>
        ${loadSummaryHtml(r,hit)}
        ${hit.proteins.length?`<div class="prot-list">${hit.proteins.slice(0,40).map(proteinRowHtml).join('')}</div>`:
          `<p class="prot-hint">${(global.t||(()=>''))('noProtFile')}</p>`}
      </div>`;
    }
    el.innerHTML=html||`<p class="prot-hint">${(global.t||(()=>''))('noProtFile')}</p>`;
  }

  function projectProteinBlock(r){
    const sheet=parseProteinCount(r.proteins);
    const rf=r.resultFile||'';
    const t=global.t||((k)=>k);
    const rawLink=rf?ghRawUrl(r.pid,fileVariants(rf).find(f=>/\.xlsx?$/i.test(f))||rf):'';
    return `<div class="prot-card-foot">
      <div class="prot-meta">
        ${sheet?`<span class="meta-pill" title="${t('sheetCountHint')}">${sheet.toLocaleString()} ${t('proteins')} (${t('fromSheet')})</span>`:''}
        ${rf?`<a class="meta-pill prot-file" href="${escHtml(rawLink)}" target="_blank" rel="noopener" title="${escHtml(rf)}">${escHtml(rf.length>28?rf.slice(0,28)+'…':rf)}</a>`:''}
        ${r.fastaDb?`<span class="meta-pill">FASTA: ${escHtml(r.fastaDb)}</span>`:''}
      </div>
      <button type="button" class="tbtn prot-btn" onclick="toggleProjectProteins('${escHtml(r.pid)}')">${t('showProt')}</button>
      <div id="prot-${escHtml(r.pid)}" class="prot-panel" hidden></div>
    </div>`;
  }

  async function toggleProjectProteins(pid){
    const el=document.getElementById('prot-'+pid);
    if(!el) return;
    if(!el.hidden&&el.innerHTML){el.hidden=true;return;}
    el.hidden=false;
    const r=(global.D||[]).find(x=>x.pid===pid);
    if(!r){el.innerHTML='<p class="prot-hint">—</p>';return;}
    el.innerHTML=`<p class="prot-hint">${(global.t||(()=>''))('loadingProt')}</p>`;
    const hit=await loadProjectProteins(r);
    if(hit.proteins.length){
      el.innerHTML=`${loadSummaryHtml(r,hit)}
        <div class="prot-list">${hit.proteins.slice(0,MAX_LIST).map(proteinRowHtml).join('')}</div>
        <p class="prot-hint"><a href="${escHtml(hit.tree||global.ghResultsUrl(pid))}" target="_blank" rel="noopener">GitHub → ${escHtml(pid)}</a></p>`;
    }else{
      el.innerHTML=`${loadSummaryHtml(r,hit)}
        <p class="prot-hint">${(global.t||(()=>''))('noProtFile')}</p>
        <a class="tbtn" href="${escHtml(hit.tree||global.ghResultsUrl(pid))}" target="_blank" rel="noopener">GitHub → ${escHtml(pid)}</a>`;
    }
  }

  async function collectOrganProteinKeys(organ){
    const rows=global.uniqProjects(global.getOrganRows(organ)).slice(0,MAX_COMPARE_PROJECTS);
    const keys=new Map();
    for(const r of rows){
      const hit=await loadProjectProteins(r);
      hit.proteins.forEach(p=>{
        const k=compareKey(p);
        if(!keys.has(k)) keys.set(k,p);
      });
    }
    return keys;
  }

  async function runProteinCompare(){
    const a=document.getElementById('cmpA')?.value;
    const b=document.getElementById('cmpB')?.value;
    const out=document.getElementById('cmpProtOut');
    if(!a||!b||!out||a===b) return;
    const t=global.t||((k)=>k);
    out.innerHTML=`<p class="prot-hint">${t('loadingProt')}</p>`;
    const [ka,kb]=await Promise.all([collectOrganProteinKeys(a),collectOrganProteinKeys(b)]);
    const shared=[],onlyA=[],onlyB=[];
    ka.forEach((p,k)=>{if(kb.has(k)) shared.push(p);else onlyA.push(p);});
    kb.forEach((p,k)=>{if(!ka.has(k)) onlyB.push(p);});
    shared.sort((x,y)=>x.display.localeCompare(y.display));
    onlyA.sort((x,y)=>x.display.localeCompare(y.display));
    onlyB.sort((x,y)=>x.display.localeCompare(y.display));
    const list=(title,arr)=>`<div class="compare-col"><h5>${escHtml(title)} (${arr.length})</h5>
      <div class="prot-list compact">${arr.slice(0,50).map(proteinRowHtml).join('')||'<p class="prot-hint">—</p>'}</div></div>`;
    out.innerHTML=`<div class="prot-compare-stats">
      <span class="meta-pill">${t('shared')}: <strong>${shared.length}</strong> (${t('compareBy')})</span>
      <span class="meta-pill">${a.replace(/_/g,' ')} only: <strong>${onlyA.length}</strong></span>
      <span class="meta-pill">${b.replace(/_/g,' ')} only: <strong>${onlyB.length}</strong></span>
    </div>
    <div class="compare-grid">${list(t('shared'),shared)}${list(a.replace(/_/g,' '),onlyA)}${list(b.replace(/_/g,' '),onlyB)}</div>
    <p class="prot-hint">${t('protCompareHint')}</p>`;
  }

  function proteinCompareBar(){
    const t=global.t||((k)=>k);
    return `<div class="compare-bar prot-compare-bar">
      <button type="button" class="tbtn primary" onclick="runProteinCompare()">${t('compareProt')}</button>
    </div>
    <div id="cmpProtOut"></div>`;
  }

  global.ProteinAtlas={
    parseProteinCount,parseResultFiles,initIdMap,loadProjectProteins,
    organProteinsSummaryHtml,projectProteinBlock,proteinCompareBar,
    ghRawUrl,resolveEntry,compareKey,fastaKind
  };
  global.loadOrganProteins=loadOrganProteins;
  global.toggleProjectProteins=toggleProjectProteins;
  global.runProteinCompare=runProteinCompare;

})(window);
