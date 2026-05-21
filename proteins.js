/* Protein lists from GitHub project folders + optional ID mapping (gene / protein / UniProt). */
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

  const UNIPROT_RE=/^[OPQ][0-9][A-Z0-9]{3}[0-9]$|^[A-NR-Z][0-9]([A-Z][A-Z0-9]{2}[0-9]){1,2}$/i;

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
    if(/ensembl/i.test(fastaDb||'')) return 'ensembl';
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
    if(!r) return null;
    const mapped=lookupMap(r);
    const uniprot=mapped?.uniprot||(UNIPROT_RE.test(r)?r:'');
    const gene=mapped?.gene_symbol||(/^[A-Z][A-Z0-9]{1,10}$/.test(r)?r:'');
    const protein=mapped?.protein_name||'';
    const idType=mapped?.id_type||guessIdType(r,fastaDb);
    const display=protein||gene||uniprot||r;
    const key=(uniprot||gene||r).toUpperCase();
    return {raw,display,gene,protein,uniprot,idType,key};
  }

  function detectColumns(headers){
    const idx={gene:-1,protein:-1,uniprot:-1,id:-1,desc:-1};
    headers.forEach((col,i)=>{
      const c=String(col||'').toLowerCase();
      if(/uniprot|uniprotkb/.test(c)) idx.uniprot=i;
      else if(/^gene|^symbol|gene.?names?|gene.?name/.test(c)) idx.gene=i;
      else if(/protein.?names?|^description$|protein.?description/.test(c)) idx.protein=i;
      else if(/^id$|accession|identifier|protein.?id/.test(c)) idx.id=i;
      else if(/^name$/.test(c)&&idx.protein<0) idx.protein=i;
    });
    if(idx.gene<0&&idx.id>=0) idx.gene=idx.id;
    return idx;
  }

  function splitIds(raw){
    return String(raw||'').split(/[;,|]/).map(s=>s.trim()).filter(s=>s&&s.length<80);
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
    const pushRaw=raw=>{
      splitIds(raw).forEach(part=>{
        const e=resolveEntry(part,fastaDb);
        if(!e||seen.has(e.key)) return;
        seen.add(e.key);
        out.push(e);
      });
    };
    parsed.data.forEach(row=>{
      const cells=headers.map(h=>row[h]);
      const pick=i=>(i>=0&&cells[i]!=null)?String(cells[i]).trim():'';
      let raw=pick(idx.uniprot)||pick(idx.gene)||pick(idx.protein)||pick(idx.id);
      if(!raw){
        const first=cells.find(c=>c&&String(c).trim().length>1&&String(c).length<80);
        raw=first?String(first).trim():'';
      }
      if(!raw||raw.length>120) return;
      pushRaw(raw);
    });
    return out;
  }

  function candidateFilenames(r,remote){
    const names=new Set();
    (remote||[]).forEach(f=>names.add(f));
    (r.resultFiles||[]).forEach(f=>{
      names.add(f);
      if(/\.(txt|tsv|csv)$/i.test(f)) names.add(f);
    });
    if(r.resultFile) names.add(r.resultFile);
    ['proteinGroups.txt','proteins_table.txt','protein_groups.txt',
      'protein_table.csv','proteins.csv','proteins.tsv'].forEach(f=>names.add(f));
    [...names].forEach(f=>{
      if(!/\./.test(f)){names.add(f+'.txt');names.add(f+'.csv');names.add(f+'.tsv');}
      if(/proteingroups/i.test(f)&&!/\.txt$/i.test(f)) names.add(f+'.txt');
    });
    return [...names].filter(f=>f&&!/\.(xlsx|pdf|xml|fasta|zip)$/i.test(f));
  }

  async function listGithubProjectFiles(pid){
    const url=`https://api.github.com/repos/${GH_API_REPO}/contents/${GH_API_PATH}/${encodeURIComponent(pid)}`;
    try{
      const res=await fetch(url,{cache:'no-store'});
      if(!res.ok) return [];
      const items=await res.json();
      if(!Array.isArray(items)) return [];
      const files=[];
      const walk=async (path,depth)=>{
        if(depth>2) return;
        const r=await fetch(`https://api.github.com/repos/${GH_API_REPO}/contents/${path}`,{cache:'no-store'});
        if(!r.ok) return;
        const list=await r.json();
        if(!Array.isArray(list)) return;
        for(const it of list){
          if(it.type==='file'&&/\.(txt|tsv|csv)$/i.test(it.name)&&
            /protein|proteingroup|gene|symbol|table/i.test(it.name)){
            files.push(it.name);
          }else if(it.type==='dir'&&depth<1){
            await walk(it.path,depth+1);
          }
        }
      };
      for(const it of items){
        if(it.type==='file'&&/\.(txt|tsv|csv)$/i.test(it.name)) files.push(it.name);
        else if(it.type==='dir') await walk(it.path,1);
      }
      return [...new Set(files)];
    }catch(e){return [];}
  }

  async function fetchText(url){
    const res=await fetch(url,{cache:'no-store'});
    if(!res.ok) throw new Error('HTTP '+res.status);
    const t=await res.text();
    if(t.length<20) throw new Error('empty');
    return t;
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
          const text=await fetchText(url);
          if(!/[,;\t]/.test(text.slice(0,500))) continue;
          const proteins=parseProteinTable(text,r.fastaDb);
          if(proteins.length){
            const hit={status:'ok',proteins,file,error:'',source:url};
            proteinCache.set(cacheKey,hit);
            return hit;
          }
        }catch(e){/* try next */ }
      }
    }
    const miss={status:'missing',proteins:[],file:files[0]||'',error:'no file',tree:ghTreeUrl(r.pid)};
    proteinCache.set(cacheKey,miss);
    return miss;
  }

  function initIdMap(){
    if(idMapReady) return Promise.resolve();
    return fetch('data/id-map.csv',{cache:'no-store'})
      .then(res=>res.ok?res.text():'')
      .then(text=>{
        if(text&&typeof Papa!=='undefined'){
          const r=Papa.parse(text,{header:true,skipEmptyLines:true});
          (r.data||[]).forEach(row=>{
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
        idMapReady=true;
      })
      .catch(()=>{idMapReady=true;});
  }

  function proteinRowHtml(p){
    const uni=p.uniprot;
    const link=uni?uniprotLink(uni):uniprotSearchLink(p.gene||p.display);
    const tag=p.idType?`<span class="pid-tag">${escHtml(p.idType)}</span>`:'';
    const sub=[p.gene&&p.gene!==p.display?p.gene:'',p.protein&&p.protein!==p.display?p.protein:'',uni||''].filter(Boolean).join(' · ');
    return `<div class="prow">
      <a class="pname" href="${escHtml(link)}" target="_blank" rel="noopener">${escHtml(p.display)}</a>
      ${tag}
      ${sub?`<div class="psub">${escHtml(sub)}</div>`:''}
    </div>`;
  }

  function escHtml(s){
    return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
  }

  function organSheetProteinStats(rows){
    const byPid=new Map();
    rows.forEach(r=>{
      if(!byPid.has(r.pid)) byPid.set(r.pid,{pid:r.pid,count:parseProteinCount(r.proteins),label:r.proteins});
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
      const n=hit.proteins.length;
      const sheet=parseProteinCount(r.proteins);
      html+=`<div class="prot-proj-block">
        <div class="prot-proj-head">
          <strong>${escHtml(r.pid)}</strong>
          <span>${sheet?sheet.toLocaleString()+' '+((global.t||(()=>''))('fromSheet')):''} · ${n} ${(global.t||(()=>''))('fromFile')}</span>
          <a href="${escHtml(global.ghResultsUrl(r.pid))}" target="_blank" rel="noopener">GitHub</a>
          ${r.resultFile?`<a href="${escHtml(ghRawUrl(r.pid,r.resultFile))}" target="_blank" rel="noopener">${escHtml(r.resultFile.length>36?r.resultFile.slice(0,36)+'…':r.resultFile)}</a>`:''}
        </div>
        ${n?`<div class="prot-list">${hit.proteins.slice(0,40).map(proteinRowHtml).join('')}</div>`:'<p class="prot-hint">'+(global.t||(()=>''))('noProtFile')+'</p>'}
      </div>`;
    }
    el.innerHTML=html||`<p class="prot-hint">${(global.t||(()=>''))('noProtFile')}</p>`;
  }

  function projectProteinBlock(r){
    const sheet=parseProteinCount(r.proteins);
    const rf=r.resultFile||'';
    const t=global.t||((k)=>k);
    const rawLink=rf?ghRawUrl(r.pid,rf):'';
    const gh=global.ghResultsUrl(r.pid);
    return `<div class="prot-card-foot">
      <div class="prot-meta">
        ${sheet?`<span class="meta-pill">${sheet.toLocaleString()} ${t('proteins')}</span>`:''}
        ${rf?`<a class="meta-pill prot-file" href="${escHtml(rawLink)}" target="_blank" rel="noopener" title="${escHtml(rf)}">${escHtml(rf.length>32?rf.slice(0,32)+'…':rf)}</a>`:''}
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
      el.innerHTML=`<div class="prot-list">${hit.proteins.slice(0,MAX_LIST).map(proteinRowHtml).join('')}</div>
        <p class="prot-hint">${hit.proteins.length} ${(global.t||(()=>''))('loaded')} · ${escHtml(hit.file)} · <a href="${escHtml(global.ghResultsUrl(pid))}" target="_blank" rel="noopener">GitHub</a></p>`;
    }else{
      const hint=(global.t||(()=>''))('noProtFile');
      el.innerHTML=`<p class="prot-hint">${hint}</p>
        <p class="prot-hint"><code>Projects/${escHtml(pid)}/</code> — ${(global.t||(()=>''))('protFileHint')}</p>
        <a class="tbtn" href="${escHtml(hit.tree||global.ghResultsUrl(pid))}" target="_blank" rel="noopener">GitHub → ${escHtml(pid)}</a>`;
    }
  }

  async function collectOrganProteinKeys(organ){
    const rows=global.uniqProjects(global.getOrganRows(organ)).slice(0,MAX_COMPARE_PROJECTS);
    const keys=new Map();
    for(const r of rows){
      const hit=await loadProjectProteins(r);
      hit.proteins.forEach(p=>{
        if(!keys.has(p.key)) keys.set(p.key,p);
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
      <span class="meta-pill">${t('shared')}: <strong>${shared.length}</strong></span>
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
    ghRawUrl,resolveEntry
  };
  global.loadOrganProteins=loadOrganProteins;
  global.toggleProjectProteins=toggleProjectProteins;
  global.runProteinCompare=runProteinCompare;

})(window);
