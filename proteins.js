/* Prebuilt organ proteome (data/organ-proteome.json) — fast UniProt lookup, no Excel in browser */
(function(global){
  const PROTEOME_URL='data/organ-proteome.json';
  const MAX_COMPARE_PROJECTS=10;
  const MAX_LIST=100;

  let PROTEOME=null;
  let ID_MAP={};
  let ready=false;

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

  function uniprotLink(id){
    return `https://www.uniprot.org/uniprotkb/${encodeURIComponent(id)}`;
  }

  function uniprotSearchLink(q){
    return `https://www.uniprot.org/uniprotkb?query=${encodeURIComponent(q)}&fil=organism_id:9606`;
  }

  function compareKey(item){
    return (item.u||item.g||'').toUpperCase();
  }

  function toEntry(item){
    const u=item.u||'';
    const g=item.g||'';
    const display=g||u||'?';
    const idType=u?'uniprot':(g?'gene':'other');
    const needsMap=!u&&!!g;
    return {raw:g||u,display,gene:g,protein:'',uniprot:u,idType,key:compareKey(item),needsMap};
  }

  function escHtml(s){
    return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
  }

  function proteinRowHtml(p){
    const link=p.uniprot?uniprotLink(p.uniprot):uniprotSearchLink(p.gene||p.display);
    const tag=`<span class="pid-tag">${escHtml(p.idType)}</span>`;
    const mapNote=p.needsMap?`<span class="pid-tag" title="data/id-map.csv">→ UniProt?</span>`:'';
    const sub=[p.gene&&p.gene!==p.display?p.gene:'',p.uniprot||''].filter(Boolean).join(' · ');
    return `<div class="prow">
      <a class="pname" href="${escHtml(link)}" target="_blank" rel="noopener">${escHtml(p.display)}</a>${tag}${mapNote}
      ${sub?`<div class="psub">${escHtml(sub)}</div>`:''}
    </div>`;
  }

  function anatomyIndexCompatible(){
    return !!global.ProjectAnatomySHA && PROTEOME?.anatomy_sha256===global.ProjectAnatomySHA && PROTEOME?.scope==='complete_project_matrices';
  }
  function organData(organ){
    if(!anatomyIndexCompatible()) return null;
    return PROTEOME?.organs?.[organ]||null;
  }

  function projectMeta(pid){
    return PROTEOME?.projects?.[pid]||null;
  }

  function proteinsForProject(pid){
    const exact=projectMeta(pid)?.proteins;
    if(Array.isArray(exact)) return exact.map(toEntry);
    if(!PROTEOME) return [];
    const seen=new Map();
    Object.values(PROTEOME.organs||{}).forEach(od=>{
      (od.proteins||[]).forEach(item=>{
        if(!item.p||!item.p.includes(pid)) return;
        const k=compareKey(item);
        if(!seen.has(k)) seen.set(k,toEntry(item));
      });
    });
    return [...seen.values()];
  }

  async function loadProjectProteins(r){
    await initProteome();
    const cacheKey=r.pid;
    if(!PROTEOME){
      return Promise.resolve({status:'loading',proteins:[],file:'',sheetCount:parseProteinCount(r.proteins)});
    }
    const meta=projectMeta(r.pid);
    const proteins=proteinsForProject(r.pid);
    const hit={
      status:proteins.length?'ok':'missing',
      proteins,
      file:meta?.src||'',
      sheetCount:parseProteinCount(r.proteins),
      fasta:meta?.fasta||r.fastaDb||'',
      sheetResult:meta?.result||r.resultFile||'',
      fileCount:meta?.file_n||proteins.length
    };
    return Promise.resolve(hit);
  }

  function loadSummaryHtml(r,hit){
    const t=global.t||((k)=>k);
    const meta=projectMeta(r.pid);
    const sheet=hit.sheetCount??parseProteinCount(r.proteins);
    const n=hit.proteins?.length||hit.fileCount||0;
    const uni=hit.proteins?.filter(p=>p.uniprot).length||0;
    const gene=hit.proteins?.filter(p=>!p.uniprot&&p.gene).length||0;
    return `<div class="prot-load-meta">
      <span class="meta-pill">${t('fromSheet')}: <strong>${sheet!=null?sheet.toLocaleString():'—'}</strong></span>
      <span class="meta-pill">${t('fromIndex')}: <strong>${n.toLocaleString()}</strong></span>
      <span class="meta-pill">UniProt: ${uni} · ${t('geneIds')}: ${gene}</span>
      <span class="meta-pill">FASTA: ${escHtml(meta?.fasta||r.fastaDb||'—')}</span>
      ${meta?.src?`<span class="meta-pill">${escHtml(meta.src)}</span>`:''}
      ${meta?.result?`<span class="meta-pill" title="${escHtml(meta.result)}">${t('resultFile')}</span>`:''}
      ${!n?`<span class="meta-pill warn">${t('rebuildHint')}</span>`:''}
    </div>`;
  }

  function organSheetProteinStats(rows,organ){
    const byPid=new Map();
    rows.forEach(r=>{
      if(!byPid.has(r.pid)) byPid.set(r.pid,{pid:r.pid,count:parseProteinCount(r.proteins)});
    });
    let total=0,known=0;
    byPid.forEach(x=>{if(x.count){total+=x.count;known++;}});
    const od=organData(organ);
    return {projects:byPid.size,withCount:known,totalSheet:total,indexUnique:od?.unique||0};
  }

  function organProteinsSummaryHtml(organ,rows){
    if(!PROTEOME) return '<div class="ccard protein-summary"><p class="prot-hint">'+(global.t||((k)=>k))('wholeOrganIndex')+'</p><button type="button" class="tbtn" onclick="loadCategoryProteinIndex(\''+escHtml(organ)+'\')">'+(global.L?global.L('Загрузить белковое покрытие','Load protein coverage'):'Load protein coverage')+'</button><div id="proteinIndexStatus"></div></div>';
    if(!anatomyIndexCompatible()) return '<p class="prot-hint">'+(global.L?global.L('Белковый индекс обновлённых категорий пока недоступен. Данные отдельных проектов сохранены.','The protein index for the revised categories is not yet available. Individual project data remain available.'):'Category protein index unavailable.')+'</p>';
    const od=organData(organ);
    const st=organSheetProteinStats(rows,organ);
    const t=global.t||((k)=>k);
    return `<div class="ccard protein-summary">
      <h4 class="sec-h">${t('protSummary')}</h4>
      <p class="prot-hint">${t('protIndexHint')} ${t('wholeOrganIndex')}</p>
      <div class="mstats prot-mini">
        <div class="ms"><div class="v">${st.projects}</div><div class="l">${t('projects')}</div></div>
        <div class="ms"><div class="v">${od?.with_uniprot||0}</div><div class="l">UniProt</div></div>
        <div class="ms"><div class="v">${od?.unique||0}</div><div class="l">${t('inIndex')}</div></div>
        <div class="ms"><div class="v">${st.totalSheet?st.totalSheet.toLocaleString():'—'}</div><div class="l">${t('sheetTotal')}</div></div>
      </div>
      <button type="button" class="tbtn primary" onclick="showOrganProteins('${escHtml(organ)}')">${t('showOrganProt')}</button>
      <div id="organProtList"></div>
    </div>`;
  }

  function showOrganProteins(organ){
    const el=document.getElementById('organProtList');
    const od=organData(organ);
    const t=global.t||((k)=>k);
    if(!el) return;
    if(!od||!od.proteins?.length){
      el.innerHTML=`<p class="prot-hint">${t('noIndexOrgan')}</p>`;
      return;
    }
    const list=od.proteins.map(toEntry);
    el.innerHTML=`<p class="prot-hint">${t('inIndex')}: ${od.unique} (${od.with_uniprot} UniProt, ${od.gene_only} ${t('geneOnly')}) · ${t('built')} ${PROTEOME?.built||''}</p>
      <div class="prot-list">${list.slice(0,200).map(proteinRowHtml).join('')}</div>
      ${list.length>200?`<p class="prot-hint">+${list.length-200} …</p>`:''}`;
  }

  function proteinBadgesHtml(r){
    const t=global.t||((k)=>k);
    const sheet=r.proteinCount??parseProteinCount(r.proteins);
    const meta=projectMeta(r.pid);
    const parts=[];
    if(sheet) parts.push(`<span class="meta-pill">${sheet.toLocaleString()} ${t('proteins')}</span>`);
    if(meta?.file_n) parts.push(`<span class="meta-pill">${meta.file_n.toLocaleString()} ${t('inIndex')}</span>`);
    return parts.join('');
  }

  function projectProteinBlock(r){
    const sheet=parseProteinCount(r.proteins);
    const meta=projectMeta(r.pid);
    const t=global.t||((k)=>k);
    return `<div class="prot-card-foot">
      <div class="prot-meta">
        ${sheet?`<span class="meta-pill">${sheet.toLocaleString()} ${t('proteins')} (${t('fromSheet')})</span>`:''}
        ${meta?.file_n?`<span class="meta-pill">${meta.file_n.toLocaleString()} ${t('inIndex')}</span>`:''}
        ${r.resultFile?`<span class="meta-pill" title="${escHtml(r.resultFile)}">${t('resultFile')}</span>`:''}
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
    const r=global.getAtlasProject?global.getAtlasProject(pid):(global.D||[]).find(x=>x.pid===pid);
    if(!r){el.innerHTML='<p class="prot-hint">—</p>';return;}
    el.innerHTML=`<p class="prot-hint">${(global.t||(()=>''))('loadingProt')}</p>`;
    let hit;
    try {hit=await loadProjectProteins(r);} catch(e) {el.textContent=global.L?global.L('Не удалось загрузить белковый индекс. Повторите попытку.','Could not load the protein index. Please retry.'):'Protein index unavailable.';return;}
    if(hit.proteins.length){
      el.innerHTML=`${loadSummaryHtml(r,hit)}
        <div class="prot-list">${hit.proteins.slice(0,MAX_LIST).map(proteinRowHtml).join('')}</div>
        <p class="prot-hint"><a href="${escHtml(global.ghResultsUrl(pid))}" target="_blank" rel="noopener">GitHub</a></p>`;
    }else{
      el.innerHTML=`${loadSummaryHtml(r,hit)}
        <p class="prot-hint">${(global.t||(()=>''))('rebuildHint')}</p>
        <a class="tbtn" href="${escHtml(global.ghResultsUrl(pid))}" target="_blank" rel="noopener">GitHub</a>`;
    }
  }

  function organProteinKeys(organ){
    const od=organData(organ);
    const keys=new Map();
    (od?.proteins||[]).forEach(item=>{
      const k=compareKey(item);
      if(k) keys.set(k,toEntry(item));
    });
    return keys;
  }

  async function runProteinCompare(){
    try {await initProteome();} catch(e){const out=document.getElementById('cmpProtOut');if(out) out.textContent='Protein index unavailable. Please retry.';return;}
    const a=document.getElementById('cmpA')?.value;
    const b=document.getElementById('cmpB')?.value;
    const out=document.getElementById('cmpProtOut');
    if(!a||!b||!out||a===b) return;
    const t=global.t||((k)=>k);
    if(!anatomyIndexCompatible()){out.textContent=global.L?global.L('Индекс не соответствует текущим категориям. Сравнение недоступно.','The index does not match the current categories. Comparison is unavailable.'):'Category index unavailable.';return;}
    if(!PROTEOME){out.innerHTML=`<p class="prot-hint">${t('indexLoading')}</p>`;return;}
    const ka=organProteinKeys(a),kb=organProteinKeys(b);
    const shared=[],onlyA=[],onlyB=[];
    ka.forEach((p,k)=>{if(kb.has(k)) shared.push(p);else onlyA.push(p);});
    kb.forEach((p,k)=>{if(!ka.has(k)) onlyB.push(p);});
    shared.sort((x,y)=>x.display.localeCompare(y.display));
    onlyA.sort((x,y)=>x.display.localeCompare(y.display));
    onlyB.sort((x,y)=>x.display.localeCompare(y.display));
    const list=(title,arr)=>`<div class="compare-col"><h5>${escHtml(title)} (${arr.length})</h5>
      <div class="prot-list compact">${arr.slice(0,60).map(proteinRowHtml).join('')||'—'}</div></div>`;
    out.innerHTML=`<div class="prot-compare-stats">
      <span class="meta-pill">${t('shared')}: <strong>${shared.length}</strong> (${t('compareBy')})</span>
      <span class="meta-pill">${a.replace(/_/g,' ')}: <strong>${ka.size}</strong></span>
      <span class="meta-pill">${b.replace(/_/g,' ')}: <strong>${kb.size}</strong></span>
    </div>
    <div class="compare-grid">${list(t('shared'),shared)}${list(a.replace(/_/g,' '),onlyA)}${list(b.replace(/_/g,' '),onlyB)}</div>`;
  }

  function renderVennCompare(a,b){
    if(!anatomyIndexCompatible()) return '<p class="prot-hint">'+(global.L?global.L('Индекс не соответствует текущим категориям. Сравнение недоступно.','The index does not match the current categories. Comparison is unavailable.'):'Category index unavailable.')+'</p>';
    const aa=organProteinKeys(a),bb=organProteinKeys(b);
    const shared=[...aa.keys()].filter(k=>bb.has(k)).length;
    const label=global.organDisplayName||((k)=>k.replace(/_/g,' '));
    const t=global.t||((k)=>k);
    return '<div class="prot-hint">'+escHtml(t('wholeOrganIndex'))+'</div><div class="mstats">'+
      '<div class="ms"><div class="v">'+(aa.size-shared)+'</div><div class="l">'+escHtml(label(a))+' only</div></div>'+
      '<div class="ms"><div class="v">'+shared+'</div><div class="l">'+escHtml(t('shared'))+'</div></div>'+
      '<div class="ms"><div class="v">'+(bb.size-shared)+'</div><div class="l">'+escHtml(label(b))+' only</div></div></div>';
  }
  function proteinCompareBar(){
    const t=global.t||((k)=>k);
    return `<div class="compare-bar prot-compare-bar">
      <button type="button" class="tbtn primary" onclick="runProteinCompare()">${t('compareProt')}</button>
    </div><div id="cmpProtOut"></div>`;
  }

  let indexPromise=null;
  async function fetchProteomeIndex(){
    if(typeof DecompressionStream!=='undefined'){
      try {
        const packed=await fetch(PROTEOME_URL+'.gz',{cache:'no-store'});
        if(packed.ok&&packed.body){
          if((packed.headers.get('content-encoding')||'').includes('gzip')) return await packed.json();
          return await new Response(packed.body.pipeThrough(new DecompressionStream('gzip'))).json();
        }
      } catch(e) {console.warn('Compressed protein index unavailable; trying JSON.',e);}
    }
    const response=await fetch(PROTEOME_URL,{cache:'no-store'});
    if(!response.ok) throw new Error('Protein index unavailable');
    return response.json();
  }
  function initProteome(){
    if(ready) return Promise.resolve();
    if(!indexPromise) indexPromise=fetchProteomeIndex().then(data=>{
      if(!data||!data.organs||!data.projects) throw new Error('Invalid protein index');
      PROTEOME=data;ready=true;
    }).catch(error=>{indexPromise=null;throw error;});
    return indexPromise;
  }
  async function loadCategoryProteinIndex(category){
    const status=document.getElementById('proteinIndexStatus');
    if(status) status.textContent=(global.t||((k)=>k))('loadingProt');
    try {await initProteome();if(global.sel) global.sel(category);}
    catch(e){if(status) status.textContent=global.L?global.L('Не удалось загрузить белковый индекс. Повторите попытку.','Could not load the protein index. Please retry.'):'Protein index unavailable.';}
  }
  global.loadCategoryProteinIndex=loadCategoryProteinIndex;

  global.ProteinAtlas={
    parseProteinCount,parseResultFiles,initIdMap:()=>Promise.resolve(),ensureIndex:initProteome,loadProjectProteins,
    proteinBadgesHtml,organProteinsSummaryHtml,projectProteinBlock,proteinCompareBar,renderVennCompare
  };
  global.loadOrganProteins=showOrganProteins;
  global.showOrganProteins=showOrganProteins;
  global.toggleProjectProteins=toggleProjectProteins;
  global.runProteinCompare=runProteinCompare;

})(window);
