const SHEET='1M6hc3vmk1bNchMvEwXsIyyO5iq3mAzP877HTXzhzg38';
const GID='1072380314';
const SHEET_CSV=`https://docs.google.com/spreadsheets/d/${SHEET}/export?format=csv&gid=${GID}`;
const SHEET_VIEW=`https://docs.google.com/spreadsheets/d/${SHEET}/edit?gid=${GID}`;

/* Result files live in tmt-projects → Projects/<PID>/ */
const GH_REPO='https://github.com/arinaatom-cyber/tmt-projects';
const GH_RESULTS_PATH='Projects';
const ghResultsUrl=pid=>`${GH_REPO}/tree/main/${GH_RESULTS_PATH}/${encodeURIComponent(pid)}`;
const ghSearchUrl =pid=>`${GH_REPO}/search?q=${encodeURIComponent(pid)}&type=code`;
const pubmedUrl   =pmid=>`https://pubmed.ncbi.nlm.nih.gov/${encodeURIComponent(pmid)}/`;
const prideUrl    =pid =>`https://www.ebi.ac.uk/pride/archive/projects/${encodeURIComponent(pid)}`;
const MAP_BUILD='20260620-pro4';

/* Muted pastel palette — distinct hues, not bright on dark UI */
const PASTEL=[
  '#9cb8d9','#c4a8d4','#9dc9b0','#e0b8a8','#d4c48a','#a8c4e0',
  '#d4a8b8','#b8c8a8','#c8b0d8','#a8d0d0','#d8c0a8','#b0b8d0'
];
const ACCENT=PASTEL[0];
const CHART_COLORS=PASTEL;
function chartColor(i){return PASTEL[Math.abs(i)%PASTEL.length];}
const PASTEL_CANCER='#d4a8a8';
const PASTEL_NORMAL='#9dc9b0';
const PASTEL_PAN='#d4c48a';
const PASTEL_MIXED='#c4a8d4';
const SYSTEMIC=new Set(['Bone_Marrow','Lymph_Node','Nerve',
  'Adipose_Tissue','Soft_Tissue','Multiple_Organs','Other','Muscle']);

const I18N={
  ru:{
    loading:'Загрузка данных…',subtitle:'Интерактивная карта экспрессии тканей',
    searchPh:'Орган, PXD, PMID…',allTmt:'Все TMT',allSamples:'Все образцы',
    cancerOnly:'Только cancer',normalOnly:'Только normal',exportAll:'Экспорт CSV (все)',
    about:'О проекте',close:'Закрыть',bodyCap:'Вид спереди · полная анатомия · подписи — органы с проектами · таз unisex (♂+♀)',
    noMapProjects:'Нет проектов при текущем фильтре',
    pickOrgan:'Клик по органу на карте или в списке',footer:'Human Proteome Atlas · TMT протеомика',
    aboutTitle:'О атласе',aboutP1:'Интерактивная карта TMT-протеомных проектов по органам. Данные из Google Sheets (PRIDE, CPTAC, PDC).',
    aboutP2:'Группировка органов согласована со справочником MSD Manual (Merck Manual): основные системы органов человека.',
    sysRefTitle:'Основные системы органов (MSD Manual)',
    methods:'Методы',m1:'Один Project ID = один проект (при двойной записи — PXD).',
    m2:'Мульти-органные строки учитываются по каждому органу; ≥3 органа → Multiple Organs.',
    m3:'Пан-органные атласы (≥8 органов) — бейдж PAN-ORGAN.',m4:'Диагнозы группируются (NSCLC → Lung cancer).',
    cite:'Цитирование',exportOrgan:'Экспорт органа',extras:'Дополнительно',
    compare:'Сравнение двух органов',compareHint:'Выберите два органа и нажмите «Сравнить»',runCompare:'Сравнить',
    panBadge:'PAN-ORGAN',projects:'проектов',proteins:'белков',rows:'строк',organs:'органов',databases:'баз',
    tmtFormats:'форматов TMT',sampleTypes:'типов образцов',validOk:'Данные загружены',
    validWarn:'Проверьте таблицу',searchOrgan:'Поиск органа…',
    allDb:'Все базы',refresh:'Обновить',share:'Ссылка',legend:'Легенда · точки',
    legNormal:'Normal (только)',legCancer:'Cancer (только)',legPan:'Pan-organ',legMixed:'Mixed C+N',
    legHint:'Цвет точки у подписи = C/N/Pan. Размер ∝ √N. Все органы на карте; яркие — с проектами, бледные — без данных.',
    legSize:'размер ∝ √N',
    matChartTitle:'Материал образца по органам',
    matChartHint:'Уникальные Project ID на орган. «Ткань normal» — здоровые образцы, в т.ч. GTEx (PXD016999, 32 ткани).',
    matClC:'Кл. линии · cancer',matClN:'Кл. линии · normal',
    matTisC:'Ткань · cancer',matTisN:'Ткань · normal',
    matOrganTitle:'Материал образца',
    pelvisTip:'Unisex-схема: ♂ и ♀ органы в одной области таза',
    sortBy:'Сортировка',sortPid:'Project ID',sortPmid:'PMID',sortTmt:'TMT',sortDis:'Диагноз',
    projSearch:'Поиск в проектах…',updated:'Обновлено',dataFromSheet:'Google Sheet',dataFromBundle:'копия на сайте',
    linkCopied:'Ссылка скопирована',openSheet:'Таблица',
    protSummary:'Белки в органе',protIndexHint:'Индекс в data/organ-proteome.json: белки из Result Files (tmt-projects), гены CPTAC/Ensembl сопоставлены с UniProt (GeneCards→Swiss-Prot, человек). Счётчики на карточках — Google Sheets.',
    sheetCountHint:'Proteins Quantified — только из таблицы Google.',
    resultFile:'Result Files',geneIds:'гены',compareBy:'UniProt или ген',
    fromIndex:'в индексе',inIndex:'в индексе',showOrganProt:'Показать белки органа',
    geneOnly:'только ген',built:'сборка',rebuildHint:'Нет в индексе — запустите scripts/build-organ-proteome.py',
    noIndexOrgan:'Для органа нет данных в индексе',indexLoading:'Загрузка индекса…',
    withCount:'с количеством',sheetTotal:'Σ из таблицы',loadOrganProt:'Загрузить белки проектов',
    loadingProt:'Загрузка белков…',fromSheet:'из таблицы',fromFile:'из файла',showProt:'Показать белки',
    noProtFile:'Файл не найден — откройте папку в tmt-projects/Projects/PXD…',loaded:'загружено',
    compareProt:'Сравнить белки',shared:'Общие',
    vennTitle:'Сравнение белков (диаграмма Венна)',vennOnlyA:'только A',vennOnlyB:'только B',vennBoth:'оба органа',
    multiProjectHint:'Несколько проектов в одном органе: белки объединяются (объединение). Один и тот же UniProt или ген считается один раз на орган, даже если он есть в PXD001 и PXD002.',
    multiProjectDetail:'Белок встречается в 2+ проектах этого органа',
    multiProjectShort:'В 2+ проектах',
    compareUseExtras:'Сравнение с другим органом — раздел «Дополнительно» → диаграмма Венна.',
    verifyOk:'белки ✓',verifyOkHint:'Список в индексе совпадает с Result File этого PXD/PDC',
    verifyNoIndex:'нет в индексе',verifyNoIndexHint:'Нет protein table или другой Result File — см. GitHub',
    verifyNoFile:'нет файла',verifyNoFolder:'нет папки',verifyMismatch:'расхождение',
    protLoadedHint:'Белки этого проекта учтены в индексе (свой Result File).',protMissingHint:'В индексе нет — откройте',
    excelSheets:'листы Excel',multiSheetHint:'В xlsx несколько листов — парсер берёт все листы с колонками Gene/UniProt (не summary).',
    protCompareHint:'Венн: уникальные наборы белков органов (UniProt или ген). Списки белков не показываются.',
    protTableTitle:'Белки по проектам',protTableHint:'Таблица: Sheet (Google), File (Result File), Index (индекс), UniProt (после маппинга), гены без UniProt.',
    organUnique:'уник. в органе',sumIndexProjects:'Σ индекс по проектам',countDiff:'расхождение',countDiffHint:'Число в таблице и в файле отличается более чем на 5% — проверьте Result File или пересоберите индекс (REBUILD.md).',
    sysNervous:'Нервная',sysCardio:'Сердечно-сосудистая',sysResp:'Дыхательная',sysDigest:'Пищеварительная',
    sysEndocrine:'Эндокринная',sysUrinary:'Мочевыводящая',sysFemale:'Женская репродуктивная',
    sysMale:'Мужская репродуктивная',sysImmune:'Кровь и иммунная',sysMSK:'Опора и покровы',sysOther:'Прочее'
  },
  en:{
    loading:'Loading proteome data…',subtitle:'Interactive Tissue Expression Map',
    searchPh:'Organ, PXD, PMID…',allTmt:'All TMT',allSamples:'All samples',
    cancerOnly:'Cancer only',normalOnly:'Normal only',exportAll:'Export all CSV',
    about:'About',close:'Close',bodyCap:'Anterior view · full anatomy · labels = organs with projects · unisex pelvis (M+F)',
    noMapProjects:'No projects with current filters',
    pickOrgan:'Click an organ on the map or list',footer:'Human Proteome Atlas · TMT proteomics',
    aboutTitle:'About the Atlas',aboutP1:'Interactive map of TMT proteomics projects by organ. Data from Google Sheets.',
    aboutP2:'Organ grouping follows the MSD Manual (Merck Manual) classification of major human organ systems.',
    sysRefTitle:'Major organ systems (MSD Manual)',
    methods:'Methods',m1:'One Project ID = one project (PXD when dual-listed).',
    m2:'Multi-organ rows count per organ; ≥3 organs → Multiple Organs.',
    m3:'Pan-organ atlases (≥8 organs) show PAN-ORGAN badge.',m4:'Disease labels are grouped (e.g. NSCLC → Lung cancer).',
    cite:'Citation',exportOrgan:'Export organ',extras:'More',
    compare:'Compare two organs',compareHint:'Pick two organs and click Compare',runCompare:'Compare',
    panBadge:'PAN-ORGAN',projects:'projects',proteins:'proteins',rows:'rows',organs:'organs',databases:'databases',
    tmtFormats:'TMT formats',sampleTypes:'sample types',validOk:'Data loaded',
    validWarn:'Check spreadsheet sync',searchOrgan:'Search organ…',
    allDb:'All databases',refresh:'Refresh',share:'Copy link',legend:'Legend · dots',
    legNormal:'Normal only',legCancer:'Cancer only',legPan:'Pan-organ',legMixed:'Mixed C+N',
    legHint:'Dot color at label = C/N/Pan mix. Size ∝ √N. All organs shown; bright = has projects, faded = none.',
    legSize:'size ∝ √N',
    matChartTitle:'Sample material by organ',
    matChartHint:'Unique project IDs per organ. “Tissue normal” includes healthy samples, e.g. GTEx (PXD016999, 32 tissues).',
    matClC:'Cell lines · cancer',matClN:'Cell lines · normal',
    matTisC:'Tissue · cancer',matTisN:'Tissue · normal',
    matOrganTitle:'Sample material',
    pelvisTip:'Unisex map: male & female organs share the pelvic region',
    sortBy:'Sort',sortPid:'Project ID',sortPmid:'PMID',sortTmt:'TMT',sortDis:'Disease',
    projSearch:'Search projects…',updated:'Updated',dataFromSheet:'Google Sheet',dataFromBundle:'site bundle',
    linkCopied:'Link copied',openSheet:'Spreadsheet',
    protSummary:'Proteins in organ',protIndexHint:'Index in data/organ-proteome.json: proteins from tmt-projects Result Files; CPTAC/Ensembl genes mapped to UniProt (GeneCards→Swiss-Prot, human). Card counts from Google Sheets.',
    sheetCountHint:'Proteins Quantified — from Google Sheet only.',
    resultFile:'Result Files',geneIds:'genes',compareBy:'UniProt or gene',
    fromIndex:'in index',inIndex:'in index',showOrganProt:'Show organ proteins',
    geneOnly:'gene only',built:'built',rebuildHint:'Not in index — run scripts/build-organ-proteome.py',
    noIndexOrgan:'No index data for this organ',indexLoading:'Loading index…',
    withCount:'with count',sheetTotal:'Σ from sheet',loadOrganProt:'Load project proteins',
    loadingProt:'Loading proteins…',fromSheet:'from sheet',fromFile:'from file',showProt:'Show proteins',
    noProtFile:'File not found — open folder in tmt-projects/Projects/PXD…',loaded:'loaded',
    compareProt:'Compare proteins',shared:'Shared',
    vennTitle:'Protein comparison (Venn diagram)',vennOnlyA:'A only',vennOnlyB:'B only',vennBoth:'both organs',
    multiProjectHint:'Multiple projects per organ: proteins are merged (union). The same UniProt or gene counts once per organ even if seen in PXD001 and PXD002.',
    multiProjectDetail:'Protein appears in 2+ projects of this organ',
    multiProjectShort:'In 2+ projects',
    compareUseExtras:'Compare with another organ: section “More” → Venn diagram.',
    verifyOk:'proteins OK',verifyOkHint:'Index matches this project Result File',
    verifyNoIndex:'not in index',verifyNoIndexHint:'No protein table or wrong Result File — see GitHub',
    verifyNoFile:'no file',verifyNoFolder:'no folder',verifyMismatch:'mismatch',
    protLoadedHint:'This project proteins are in the index (its own Result File).',protMissingHint:'Not in index — open',
    excelSheets:'Excel sheets',multiSheetHint:'Multi-sheet xlsx: all sheets with Gene/UniProt columns are merged (not summary).',
    protCompareHint:'Venn shows unique protein sets per organ (UniProt or gene). Protein lists are hidden.',
    protTableTitle:'Proteins per project',protTableHint:'Sheet (Google), File (parsed), Index, UniProt (mapped), genes without UniProt.',
    organUnique:'unique in organ',sumIndexProjects:'Σ index per projects',countDiff:'mismatch',countDiffHint:'Sheet count differs from file/index by >5% — check Result File or rebuild index (REBUILD.md).',
    sysNervous:'Nervous',sysCardio:'Cardiovascular',sysResp:'Respiratory',sysDigest:'Digestive',
    sysEndocrine:'Endocrine',sysUrinary:'Urinary',sysFemale:'Female reproductive',
    sysMale:'Male reproductive',sysImmune:'Blood & immune',sysMSK:'Support & integument',sysOther:'Other'
  }
};
let lang=localStorage.getItem('hpa-lang')||'ru';
function t(k){return (I18N[lang]||I18N.ru)[k]||k;}
const ORGAN_LABELS={
  ru:{
    Liver:'Печень',Lung:'Лёгкие',Heart:'Сердце',Brain:'Мозг',Kidney:'Почки',
    Stomach:'Желудок',Pancreas:'Поджелудочная',Spleen:'Селезёнка',Colon:'Толстая кишка',
    Gallbladder:'Желчный пузырь',Appendix:'Аппендикс',Thymus:'Тимус',
    Breast:'Молочная железа',Prostate:'Предстательная',Ovary:'Яичники',Uterus:'Матка',
    Testis:'Яички',Small_Intestine:'Тонкая кишка',
    Salivary_Gland:'Слюнные железы',Pituitary:'Гипофиз',Thyroid:'Щитовидная',
    Bladder:'Мочевой пузырь',Skin:'Кожа',Muscle:'Мышцы',Bone:'Кость',
    Blood:'Кровь',Bone_Marrow:'Костный мозг',Lymph_Node:'Лимфоузлы',
    Esophagus:'Пищевод',Adrenal_Gland:'Надпочечники',Eye:'Глаза',Nerve:'Нервы',
    Multiple_Organs:'Несколько органов',Other:'Другое'
  },
  en:{
    Testis:'Testicles',Colon:'Large intestine',Small_Intestine:'Small intestine',
    Gallbladder:'Gallbladder',Appendix:'Appendix',Thymus:'Thymus',
    Salivary_Gland:'Salivary glands',Pituitary:'Pituitary'
  }
};
const DIS_LABELS={
  ru:{
    'Lung cancer':'Рак лёгких','Liver cancer':'Рак печени','Colorectal cancer':'Колоректальный рак',
    'Pancreatic cancer':'Рак поджелудочной','Breast cancer':'Рак молочной железы',
    'Gastric cancer':'Рак желудка','Brain cancer':'Рак мозга','Kidney cancer':'Рак почек',
    'Normal / control':'Норма / контроль','Not specified':'Не указано'
  },
  en:{}
};
function diseaseDisplayName(d){return (DIS_LABELS[lang]||{})[d]||d;}
function organDisplayName(o){
  const m=ORGAN_LABELS[lang]||ORGAN_LABELS.en;
  return m[o]||o.replace(/_/g,' ');
}
function organSearchText(o){
  const base=o.replace(/_/g,' ').toLowerCase();
  const disp=organDisplayName(o).toLowerCase();
  return base+' '+disp;
}
function i18nApply(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.getAttribute('data-i18n');if(I18N[lang][k]) el.textContent=I18N[lang][k];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el=>{
    const k=el.getAttribute('data-i18n-ph');if(I18N[lang][k]) el.placeholder=I18N[lang][k];
  });
  const lb=document.getElementById('langBtn');if(lb) lb.textContent=lang==='ru'?'EN':'RU';
  document.documentElement.lang=lang;
}
function toggleLang(){lang=lang==='ru'?'en':'ru';localStorage.setItem('hpa-lang',lang);i18nApply();refreshAll();if(document.getElementById('aboutModal')?.classList.contains('open'))renderSysRef();}

const F={q:'',tmt:'',health:'',db:''};
let META={rawRows:0,uniqPids:0,loadedAt:null,dataSource:''},selOrgan=null;
let organUI={sort:'pid',projQ:''};
const DIS_RULES=[
  [/nsclc|non[- ]?small[- ]?cell lung|luad|lusc|lung adenocarcinoma|lung carcinoma|sclc|hcc827|nci-h322/i,'Lung cancer'],
  [/colorectal|crc\b|colon adenocarcinoma|rectal adenocarcinoma/i,'Colorectal cancer'],
  [/\bhcc\b|hepatocellular|liver cancer|hepatoma/i,'Liver cancer'],
  [/pdac|pancreatic adenocarcinoma|pancreatic cancer/i,'Pancreatic cancer'],
  [/hgsoc|ovarian cancer|ovarian carcinoma|ovarian serous/i,'Ovarian cancer'],
  [/glioblastoma|gbm|glioma|brain tumor|brain tumour/i,'Brain cancer'],
  [/breast cancer|breast carcinoma|mammary carcinoma|tnbc|her2/i,'Breast cancer'],
  [/gastric cancer|stomach cancer|gastric adenocarcinoma/i,'Gastric cancer'],
  [/renal cell|rcc|kidney cancer/i,'Kidney cancer'],
  [/prostate cancer|prostate adenocarcinoma|pca\b/i,'Prostate cancer'],
  [/melanoma/i,'Melanoma'],
  [/aml\b|acute myeloid/i,'AML'],
  [/cll\b|chronic lymphocytic/i,'CLL'],
  [/multiple myeloma|myeloma/i,'Multiple myeloma'],
  [/lymphoma|hodgkin|non-hodgkin/i,'Lymphoma'],
  [/leukemia|leukaemia/i,'Leukemia'],
  [/sarcoma|osteosarcoma|liposarcoma/i,'Sarcoma'],
  [/bladder cancer|urothelial/i,'Bladder cancer'],
  [/thyroid cancer|papillary thyroid/i,'Thyroid cancer'],
  [/endometri|uterine cancer/i,'Endometrial cancer'],
  [/cervical cancer/i,'Cervical cancer'],
  [/esophageal|escc/i,'Esophageal cancer'],
  [/head and neck|hnscc|oropharyngeal/i,'Head & neck cancer'],
  [/normal|healthy|control/i,'Normal / control']
];
function canonDisease(dis){
  const s=(dis||'').trim();
  if(!s) return 'Not specified';
  for(const [re,label] of DIS_RULES){if(re.test(s)) return label;}
  return s.length>42?s.slice(0,42)+'…':s;
}
function filteredRows(){return D.filter(r=>{
  if(F.tmt&&r.tmt!==F.tmt) return false;
  if(F.db&&r.db!==F.db) return false;
  if(F.health==='cancer'&&r.healthy) return false;
  if(F.health==='normal'&&!r.healthy) return false;
  if(F.q){
    const q=F.q.toLowerCase();
    if(r.pid.toLowerCase().includes(q)) return true;
    if((r.pmid||'').toLowerCase().includes(q)) return true;
    if((r.dis||'').toLowerCase().includes(q)) return true;
    if((r.disCanon||'').toLowerCase().includes(q)) return true;
    if(r.organs.some(o=>organSearchText(o).includes(q))) return true;
    return false;
  }
  return true;
});}
function rebuildCounts(){
  C={};
  const by={};
  filteredRows().forEach(x=>x.organs.forEach(o=>{
    if(!by[o]) by[o]=new Set();
    by[o].add(x.pid);
  }));
  Object.keys(by).forEach(o=>{C[o]=by[o].size;});
}
function rowMatchesSidebar(o){
  if(!F.q) return true;
  const q=F.q.toLowerCase();
  const name=organSearchText(o);
  if(name.includes(q)) return true;
  return filteredRows().some(r=>r.organs.includes(o));
}
function setFilter(key,val){
  F[key]=val||'';
  const selMap={tmt:'fTmt',db:'fDb',health:'fHealth'};
  const el=document.getElementById(selMap[key]);
  if(el) el.value=F[key];
  rebuildCounts();
  refreshAll();
}
function filterByDb(db){setFilter('db',db||'');}
function filterByHealth(h){setFilter('health',h||'');}
function onGlobalSearch(v){F.q=(v||'').trim();rebuildCounts();refreshAll();if(selOrgan) sel(selOrgan);}
function updateUrl(organ){
  const u=new URL(location.href);
  if(organ) u.searchParams.set('organ',organ);else u.searchParams.delete('organ');
  history.replaceState({},'',u);
}
function parseUrlOrgan(){
  const o=new URLSearchParams(location.search).get('organ');
  if(o&&C[o]) sel(o);
}
function openAbout(){
  document.getElementById('aboutModal').classList.add('open');
  renderSysRef();
}
function renderSysRef(){
  const el=document.getElementById('sysRefTable');
  if(!el) return;
  el.innerHTML=`<table class="sys-ref"><thead><tr><th>${lang==='ru'?'Система':'System'}</th><th>${lang==='ru'?'Органы на карте':'Organs on map'}</th></tr></thead><tbody>`+
    GRP.map(g=>`<tr><td>${esc(grpTitle(g))}</td><td>${g.o.map(organDisplayName).join(' · ')}</td></tr>`).join('')+
    `</tbody></table>`;
}
function closeAbout(){document.getElementById('aboutModal').classList.remove('open');}
function csvEscape(s){const x=String(s??'');return /[",\n]/.test(x)?'"'+x.replace(/"/g,'""')+'"':x;}
function downloadCSV(filename,rows){
  const cols=['Project ID','PMID','Organs','Disease','Disease group','TMT','Sample Type','Database','Status','URL'];
  const lines=[cols.join(',')];
  rows.forEach(r=>lines.push([
    r.pid,r.pmid,r.organs.join('; '),r.dis,r.disCanon,r.tmt,r.st,r.db,
    r.healthy?'Normal':'Cancer',r.link||prideUrl(r.pid)
  ].map(csvEscape).join(',')));
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob(['\ufeff'+lines.join('\n')],{type:'text/csv;charset=utf-8'}));
  a.download=filename;a.click();URL.revokeObjectURL(a.href);
}
function exportAllCSV(){
  const seen=new Set(),u=[];
  filteredRows().forEach(r=>{if(!seen.has(r.pid)){seen.add(r.pid);u.push(r);}});
  downloadCSV('human-proteome-atlas-all.csv',u);
}
function exportOrganCSV(o){
  const seen=new Set(),u=[];
  filteredRows().filter(r=>r.organs.includes(o)).forEach(r=>{
    if(!seen.has(r.pid)){seen.add(r.pid);u.push(r);}
  });
  downloadCSV(`atlas-${o.replace(/_/g,'-').toLowerCase()}.csv`,u);
}
function uniqProjects(rows){
  const seen=new Set(),u=[];
  rows.forEach(r=>{if(!seen.has(r.pid)){seen.add(r.pid);u.push(r);}});
  return u;
}
function getOrganRows(o){return filteredRows().filter(r=>r.organs.includes(o));}
function refreshAll(){
  buildHeader();buildSidebar();renderBody();fillFilterSelects();renderLegend();
  renderAtlasMaterialChart();
  const cap=document.getElementById('bodyCaption');
  if(cap) cap.textContent=`${t('bodyCap')} · map ${MAP_BUILD}`;
  if(selOrgan&&C[selOrgan]) sel(selOrgan);
}
function fillFilterSelects(){
  const tmtEl=document.getElementById('fTmt');
  if(tmtEl){
    const tmts=[...new Set(D.map(x=>x.tmt).filter(Boolean))].sort();
    tmtEl.innerHTML=`<option value="">${esc(t('allTmt'))}</option>`+
      tmts.map(x=>`<option value="${esc(x)}"${x===F.tmt?' selected':''}>${esc(x)}</option>`).join('');
  }
  const dbEl=document.getElementById('fDb');
  if(dbEl){
    const dbs=[...new Set(D.map(x=>x.db).filter(Boolean))].sort();
    dbEl.innerHTML=`<option value="">${esc(t('allDb'))}</option>`+
      dbs.map(x=>`<option value="${esc(x)}"${x===F.db?' selected':''}>${esc(x)}</option>`).join('');
  }
}
function formatUpdated(){
  if(!META.loadedAt) return '';
  const d=META.loadedAt;
  const loc=lang==='ru'?'ru-RU':'en-GB';
  return d.toLocaleString(loc,{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
}
function legendBlock(){
  return `<div class="map-legend">
    <span class="leg-title">${t('legend')}</span>
    <span class="leg-item"><i style="background:${PASTEL_CANCER}"></i>${t('legCancer')}</span>
    <span class="leg-item"><i style="background:${PASTEL_NORMAL}"></i>${t('legNormal')}</span>
    <span class="leg-item"><i style="background:${PASTEL_MIXED}"></i>${t('legMixed')}</span>
    <span class="leg-item"><i style="background:${PASTEL_PAN}"></i>${t('legPan')}</span>
    <span class="leg-item leg-size-demo"><i style="width:10px;height:10px;background:var(--t3);border-radius:50%"></i>${t('legSize')}</span>
    <span class="leg-hint">${t('legHint')}</span>
  </div>`;
}
function renderLegend(){
  const el=document.getElementById('mapLegend');
  if(el) el.innerHTML=legendBlock();
}
function sortProjects(rows,sort){
  const u=[...rows];
  if(sort==='pmid') return u.sort((a,b)=>(b.pmid||'').localeCompare(a.pmid||''));
  if(sort==='tmt') return u.sort((a,b)=>(a.tmt||'').localeCompare(b.tmt||''));
  if(sort==='disease') return u.sort((a,b)=>(a.disCanon||a.dis||'').localeCompare(b.disCanon||b.dis||''));
  return u.sort((a,b)=>a.pid.localeCompare(b.pid));
}
function filterOrganProjects(rows,q){
  if(!q) return rows;
  const s=q.toLowerCase();
  return rows.filter(r=>
    r.pid.toLowerCase().includes(s)||
    (r.pmid||'').toLowerCase().includes(s)||
    (r.dis||'').toLowerCase().includes(s)||
    (r.disCanon||'').toLowerCase().includes(s)||
    (r.db||'').toLowerCase().includes(s)||
    (r.tmt||'').toLowerCase().includes(s)
  );
}
function setOrganSort(v){organUI.sort=v||'pid';if(selOrgan) sel(selOrgan);}
function setOrganProjQ(v){organUI.projQ=(v||'').trim();if(selOrgan) sel(selOrgan);}
function shareOrganLink(o){
  const u=new URL(location.href);
  u.searchParams.set('organ',o);
  const link=u.toString();
  if(navigator.clipboard?.writeText){
    navigator.clipboard.writeText(link).then(()=>alert(t('linkCopied')+'\n'+link)).catch(()=>prompt(t('share'),link));
  }else prompt(t('share'),link);
}
async function reloadData(){
  document.getElementById('loader').classList.remove('hidden');
  await loadSheetData();
}
function buildHeader(){
  const rows=filteredRows();
  const tis=Object.keys(C).filter(k=>C[k]>0).length;
  const dbs=new Set(rows.map(x=>x.db).filter(Boolean)).size;
  const types=new Set(rows.map(x=>x.st)).size;
  const tmt=new Set(rows.map(x=>x.tmt).filter(Boolean)).size;
  const uniqPid=new Set(rows.map(x=>x.pid)).size;
  document.getElementById('hs').innerHTML=
    `<div class="hstat"><div class="v">${uniqPid}</div><div class="l">${t('projects')}</div></div>`+
    `<div class="hstat"><div class="v">${rows.length}</div><div class="l">${t('rows')}</div></div>`+
    `<div class="hstat"><div class="v">${tis}</div><div class="l">${t('organs')}</div></div>`+
    `<div class="hstat"><div class="v">${dbs}</div><div class="l">${t('databases')}</div></div>`+
    `<div class="hstat"><div class="v">${tmt}</div><div class="l">${t('tmtFormats')}</div></div>`+
    `<div class="hstat"><div class="v">${types}</div><div class="l">${t('sampleTypes')}</div></div>`;
  const vb=document.getElementById('validBanner');
  if(vb){
    const ok=META.uniqPids===uniqPid&&!F.q&&!F.tmt&&!F.health&&!F.db;
    const src=META.dataSource==='sheet'?t('dataFromSheet'):t('dataFromBundle');
    const when=formatUpdated();
    vb.className='valid-banner '+(ok?'ok':'warn');
    vb.innerHTML=ok
      ? `✓ ${t('validOk')}: ${META.rawRows} ${t('rows')}, ${META.uniqPids} ID · ${uniqPid} ${t('projects')} · ${t('updated')} ${when} (${src}) · <a href="${SHEET_VIEW}" target="_blank" rel="noopener">${t('openSheet')}</a>`
      : `⚠ ${t('validWarn')}: ${uniqPid}/${META.uniqPids} · ${t('updated')} ${when}`;
  }
}
function buildSidebar(){
  let h=`<div class="search"><span class="si">🔍</span><input placeholder="${esc(t('searchOrgan'))}" oninput="filtSidebar(this.value)"></div>`;
  GRP.forEach(g=>{
    const items=g.o.filter(o=>(C[o]||0)>0&&rowMatchesSidebar(o));
    if(!items.length) return;
    h+=`<div class="card"><div class="card-head"><span>${g.i}</span><h3>${grpTitle(g)}</h3></div><div class="olist">`;
    items.forEach(o=>{
      const n=C[o],c=organBadgeColor(o),sz=organDotSize(n);
      h+=`<div class="oitem${selOrgan===o?' on':''}" data-o="${o}" onclick="sel('${o}')"><div class="odot" style="background:${c};width:${sz}px;height:${sz}px"></div><span class="nm">${organDisplayName(o)}</span><span class="ct">${n}</span></div>`;
    });
    h+=`</div></div>`;
  });
  document.getElementById('lp').innerHTML=h;
}
function filtSidebar(q){
  const s=(q||'').toLowerCase();
  document.querySelectorAll('.oitem').forEach(e=>{
    e.style.display=organSearchText(e.dataset.o).includes(s)?'':'none';
  });
}
function compareBlock(currentOrgan){
  const organs=Object.keys(C).filter(o=>C[o]>0).sort((a,b)=>C[b]-C[a]);
  if(organs.length<2) return '';
  const optA=organs.map(o=>{
    const sel=o===currentOrgan?' selected':'';
    return `<option value="${o}"${sel}>${organDisplayName(o)} (${C[o]})</option>`;
  }).join('');
  const other=organs.find(o=>o!==currentOrgan)||organs[1];
  const optB=organs.map(o=>{
    const sel=o===other?' selected':'';
    return `<option value="${o}"${sel}>${organDisplayName(o)} (${C[o]})</option>`;
  }).join('');
  return `<details class="extras-block">
    <summary>${t('extras')}</summary>
    <p class="extras-hint">${t('compareHint')} ${t('protCompareHint')}</p>
    <div class="compare-bar">
      <select id="cmpA">${optA}</select>
      <select id="cmpB">${optB}</select>
      <button type="button" class="tbtn primary" onclick="runCompare()">${t('runCompare')}</button>
    </div>
    <div id="cmpOut"></div>
  </details>`;
}
function runCompare(){
  const a=document.getElementById('cmpA')?.value;
  const b=document.getElementById('cmpB')?.value;
  if(!a||!b||a===b) return;
  const sa=organStats(a),sb=organStats(b);
  const out=document.getElementById('cmpOut');
  if(!out) return;
  const venn=window.ProteinAtlas?.renderVennCompare
    ?window.ProteinAtlas.renderVennCompare(a,b)
    :`<p class="prot-hint">${t('indexLoading')}</p>`;
  out.innerHTML=`<div class="compare-grid">
    <div class="compare-col"><h5>${organDisplayName(a)}</h5>
      ${cmpRows(sa)}</div>
    <div class="compare-col"><h5>${organDisplayName(b)}</h5>
      ${cmpRows(sb)}</div>
  </div>${venn}`;
}
function cmpRows(s){
  return [['Projects',s.n],['Cancer',s.nC],['Normal',s.nN],['Top disease',s.topDis||'—'],['Top TMT',s.topTmt||'—']].map(
    ([k,v])=>`<div class="compare-row"><span>${k}</span><strong>${esc(String(v))}</strong></div>`
  ).join('');
}

/* Realistic organ hues (muted for dark UI — pink lungs, red heart, brown liver, etc.) */
const ANATOMY_COL={
  Brain:'#b898a8',           Pituitary:'#9a88a0',
  Eye:'#d8d0c0',             Salivary_Gland:'#d4a098',
  Thyroid:'#b88870',         Esophagus:'#c4a088',
  Lung:'#c08080',            Heart:'#a84848',
  Breast:'#d4a0a0',          Liver:'#8b5c48',
  Stomach:'#c8a878',         Spleen:'#8b5868',
  Gallbladder:'#7a9868',     Appendix:'#b89878',
  Pancreas:'#c4a860',        Adrenal_Gland:'#a89058',
  Thymus:'#c4b878',
  Kidney:'#9a6860',          Small_Intestine:'#d4b888',
  Colon:'#a07868',           Bladder:'#c8b070',
  Uterus:'#c08890',          Ovary:'#d4a090',
  Cervix:'#b87888',          Prostate:'#a89080',
  Testis:'#c4a888',          Bone:'#d8d0c4',
  Blood:'#a84040',           Bone_Marrow:'#8b4848',
  Lymph_Node:'#88a088',      Skin:'#e0c0a8',
  Muscle:'#9a7068',          Adipose_Tissue:'#d8c898',
  Soft_Tissue:'#b8a090',     Nerve:'#d4c878',
  Multiple_Organs:'#a0a0a8', Other:'#9498a0'
};
function organColor(o){return ANATOMY_COL[o]||'#b8a090';}

const PELVIC_ORGANS=new Set(['Bladder','Uterus','Cervix','Ovary','Prostate','Testis']);

function organDotSize(n){
  return Math.round(Math.max(10, Math.min(20, 8+Math.sqrt(n||1)*2.2)));
}

function organProjectBreakdown(o){
  const uniq=uniqProjects(getOrganRows(o));
  const pan=uniq.filter(r=>r.isPan);
  const core=uniq.filter(r=>!r.isPan);
  /* Color/count from non-pan projects; pan-only organs use pan rows */
  const base=core.length?core:(pan.length?pan:uniq);
  let nC=0,nN=0;
  base.forEach(r=>{if(r.healthy)nN++; else nC++;});
  return {uniq, pan, core, base, n:uniq.length, nPan:pan.length, nCore:core.length, nC, nN};
}

function organBadgeColor(o){
  const b=organProjectBreakdown(o);
  if(!b.uniq.length) return '#9498a0';
  if(b.nPan===b.n) return PASTEL_PAN;
  if(b.nC>0&&b.nN===0) return PASTEL_CANCER;
  if(b.nN>0&&b.nC===0) return PASTEL_NORMAL;
  return PASTEL_MIXED;
}

const MAT_COL={clC:'#e0a898',clN:'#a8c4e0',tisC:'#d4a8a8',tisN:'#9dc9b0'};
const GTEX_PID='PXD016999';
const MAT_CHART_SKIP=new Set(['Multiple_Organs','Other']);

function projectMaterialBucket(r){
  const isCL=r.st==='Cell Lines';
  if(isCL&&r.healthy) return 'clN';
  if(isCL&&!r.healthy) return 'clC';
  if(!isCL&&r.healthy) return 'tisN';
  return 'tisC';
}

function organMaterialMatrix(){
  const m={}, seen={};
  filteredRows().forEach(r=>{
    const b=projectMaterialBucket(r);
    r.organs.forEach(o=>{
      if(!m[o]) m[o]={clC:0,clN:0,tisC:0,tisN:0,total:0,gtex:false};
      if(!seen[o]) seen[o]=new Set();
      if(seen[o].has(r.pid)) return;
      seen[o].add(r.pid);
      m[o][b]++;
      m[o].total++;
      if(r.pid===GTEX_PID) m[o].gtex=true;
    });
  });
  return m;
}

function materialChartDatasets(organs,matrix){
  const mk=key=>organs.map(o=>(matrix[o]||{})[key]||0);
  return [
    {key:'clC',label:t('matClC'),bg:MAT_COL.clC},
    {key:'tisC',label:t('matTisC'),bg:MAT_COL.tisC},
    {key:'tisN',label:t('matTisN'),bg:MAT_COL.tisN},
    {key:'clN',label:t('matClN'),bg:MAT_COL.clN},
  ].map(d=>({
    label:d.label,data:mk(d.key),backgroundColor:d.bg,stack:'mat',borderRadius:2,borderSkipped:false
  }));
}

function chartAxisColors(){
  return {grid:'rgba(148,163,184,.12)',tick:'#94a3b8',font:{family:'Inter',size:9}};
}

let atlasCharts=[];

function renderAtlasMaterialChart(){
  atlasCharts.forEach(c=>c.destroy());
  atlasCharts=[];
  const wrap=document.getElementById('materialChartWrap');
  const canvas=document.getElementById('atlasMaterialChart');
  if(!wrap||!canvas||typeof Chart==='undefined') return;
  const matrix=organMaterialMatrix();
  const organs=Object.keys(matrix)
    .filter(o=>matrix[o].total>0&&!MAT_CHART_SKIP.has(o))
    .sort((a,b)=>matrix[b].total-matrix[a].total||organDisplayName(a).localeCompare(organDisplayName(b)));
  if(!organs.length){wrap.style.display='none';return;}
  wrap.style.display='';
  const gtexN=organs.filter(o=>matrix[o].gtex).length;
  const hint=document.getElementById('matChartHint');
  if(hint){
    hint.textContent=gtexN
      ? `${t('matChartHint')} GTEx → ${gtexN} ${t('organs').toLowerCase()}.`
      : t('matChartHint');
  }
  canvas.height=Math.min(560,Math.max(120,organs.length*24));
  const ax=chartAxisColors();
  atlasCharts.push(new Chart(canvas,{
    type:'bar',
    data:{labels:organs.map(organDisplayName),datasets:materialChartDatasets(organs,matrix)},
    options:{
      indexAxis:'y',responsive:true,maintainAspectRatio:false,
      plugins:{
        legend:{position:'bottom',labels:{color:ax.tick,font:{family:'Inter',size:10},boxWidth:12,padding:8}},
        tooltip:{callbacks:{
          afterBody:items=>{
            const i=items[0]?.dataIndex;
            if(i==null) return '';
            const o=organs[i], row=matrix[o];
            const lines=[];
            if(row.gtex) lines.push('GTEx PXD016999');
            if(!row.clC&&!row.clN&&row.tisN&&!row.tisC) lines.push(lang==='ru'?'Только normal ткань':'Normal tissue only');
            return lines;
          }
        }}
      },
      scales:{
        x:{stacked:true,grid:{color:ax.grid},ticks:{color:ax.tick,stepSize:1,precision:0}},
        y:{stacked:true,grid:{display:false},ticks:{color:ax.tick,font:ax.font}}
      },
      onClick:(_,els)=>{
        if(!els.length) return;
        const o=organs[els[0].index];
        if(o&&C[o]) sel(o);
      }
    }
  }));
}

function organMaterialCounts(rows){
  const m={clC:0,clN:0,tisC:0,tisN:0};
  uniqProjects(rows).forEach(r=>{m[projectMaterialBucket(r)]++;});
  return m;
}

const GRP=[
  {tKey:'sysNervous', i:'🧠', o:['Brain','Pituitary','Eye','Nerve']},
  {tKey:'sysCardio', i:'❤️', o:['Heart','Blood']},
  {tKey:'sysResp', i:'🫁', o:['Lung','Thymus','Esophagus']},
  {tKey:'sysDigest', i:'🍽', o:['Salivary_Gland','Stomach','Liver','Gallbladder','Pancreas','Spleen','Small_Intestine','Colon','Appendix']},
  {tKey:'sysEndocrine', i:'⚗️', o:['Thyroid','Adrenal_Gland']},
  {tKey:'sysUrinary', i:'💧', o:['Kidney','Bladder']},
  {tKey:'sysFemale', i:'♀', o:['Ovary','Uterus','Cervix']},
  {tKey:'sysMale', i:'♂', o:['Prostate','Testis']},
  {tKey:'sysImmune', i:'🩸', o:['Bone_Marrow','Lymph_Node']},
  {tKey:'sysMSK', i:'🦴', o:['Bone','Muscle','Skin','Breast','Adipose_Tissue','Soft_Tissue']},
  {tKey:'sysOther', i:'📦', o:['Multiple_Organs','Other']}
];
function grpTitle(g){return t(g.tKey)||g.tKey;}
const COL={};
GRP.forEach(g=>g.o.forEach(o=>{COL[o]=organColor(o);}));

const MAP={
  'substantia nigra':'Brain','ventral mesencephalon':'Brain','pontine glioma':'Brain','rhabdoid tumor':'Brain',
  brain:'Brain',cerebr:'Brain',neural:'Brain',glioma:'Brain',glioblastoma:'Brain',
  cns:'Brain',hippocamp:'Brain',cortex:'Brain',cerebellum:'Brain',
  medulloblastoma:'Brain',astrocytoma:'Brain',ependymoma:'Brain',
  meningioma:'Brain',neuroblastoma:'Brain',dipg:'Brain',atrt:'Brain',
  craniopharyngioma:'Brain',ganglioglioma:'Brain',
  pituitary:'Pituitary',
  orbit:'Eye',orbital:'Eye',ocular:'Eye',uveal:'Eye',adnexa:'Eye',adnexal:'Eye',eye:'Eye',
  salivary:'Salivary_Gland',
  thyroid:'Thyroid',
  esophag:'Esophagus',barrett:'Esophagus',
  lung:'Lung',respiratory:'Lung',pleura:'Lung',pleural:'Lung',bronch:'Lung',
  'left ventricle':'Heart',
  heart:'Heart',cardiac:'Heart',coronary:'Heart',aorta:'Heart',atrial:'Heart',ventricle:'Heart',
  breast:'Breast',mammary:'Breast',
  liver:'Liver',hepat:'Liver',
  gallbladder:'Gallbladder','biliary':'Gallbladder',
  stomach:'Stomach',gastric:'Stomach',gastroesophageal:'Stomach',
  appendix:'Appendix',appendiceal:'Appendix',
  pancrea:'Pancreas',
  spleen:'Spleen',splenic:'Spleen',
  adrenal:'Adrenal_Gland',
  kidney:'Kidney',renal:'Kidney',nephr:'Kidney',
  'small intestine':'Small_Intestine','small intestinal':'Small_Intestine',
  intestin:'Small_Intestine',ileum:'Small_Intestine',duoden:'Small_Intestine',
  colon:'Colon',colorectal:'Colon',sigmoid:'Colon',rectum:'Colon',rectal:'Colon',
  bladder:'Bladder',urinary:'Bladder',urothelial:'Bladder',
  'fallopian tube':'Ovary',fallopian:'Ovary',hgsoc:'Ovary',ccoc:'Ovary',lgsoc:'Ovary',
  ovary:'Ovary',ovarian:'Ovary',
  uterus:'Uterus',uterine:'Uterus',endometri:'Uterus',vagina:'Uterus',placenta:'Uterus',myometrium:'Uterus',
  cervix:'Cervix',cervical:'Cervix',
  prostate:'Prostate',
  testis:'Testis',testic:'Testis',
  'bone marrow':'Bone_Marrow',marrow:'Bone_Marrow',myeloma:'Bone_Marrow',
  'plasma cell':'Bone_Marrow',plasmacells:'Bone_Marrow',
  'lymph node':'Lymph_Node','lymph nodes':'Lymph_Node',tonsil:'Lymph_Node',
  thymus:'Thymus',thymic:'Thymus',
  'peripheral blood':'Blood',
  't cell':'Blood','t-cell':'Blood','t cells':'Blood',
  'b cell':'Blood','b-cell':'Blood','b cells':'Blood',
  blood:'Blood',leukemia:'Blood',leukaemia:'Blood',lymphoma:'Blood',
  'hematopoietic system':'Blood',hematopoietic:'Blood',haematopoietic:'Blood',lymphoid:'Blood',pbmc:'Blood',
  'peripheral blood':'Blood','bone marrow and peripheral blood':'Blood',
  monocyte:'Blood',cd34:'Blood',cd138:'Blood',cd4:'Blood',cd14:'Blood',
  aml:'Blood',cll:'Blood',mds:'Blood',cml:'Blood',
  'jaw bone':'Bone','fibrous dysplasia':'Bone','cemento-ossifying':'Bone',
  jaw:'Bone',bone:'Bone',osteo:'Bone',musculoskeletal:'Bone',skeletal:'Bone',
  muscle:'Muscle',tendon:'Muscle',
  melanoma:'Skin',skin:'Skin',dermal:'Skin',fibroblast:'Skin',epidermoid:'Skin',
  adipose:'Adipose_Tissue',
  'soft tissue':'Soft_Tissue',
  leiomyosarcoma:'Soft_Tissue',liposarcoma:'Soft_Tissue',
  synovial:'Soft_Tissue',fibrosarcoma:'Soft_Tissue',sarcoma:'Soft_Tissue',
  'tibial nerve':'Nerve',nerve:'Nerve',
  'multi-organ':'Multiple_Organs',multiple:'Multiple_Organs',
  peritoneum:'Multiple_Organs',omentum:'Multiple_Organs',diaphragm:'Multiple_Organs',
  'cul-de-sac':'Multiple_Organs','cul de sac':'Multiple_Organs',
  organoid:'Other',stem:'Other',embryonic:'Other',ipsc:'Other',
  'head and neck':'Salivary_Gland','oral cavity':'Salivary_Gland','oropharyngeal':'Salivary_Gland',
  'endometri':'Uterus','endometrium':'Uterus','myometrium':'Uterus',
  'colorectal':'Colon','rectal':'Colon','sigmoid':'Colon',
  'ovarian':'Ovary','fallopian':'Ovary',
  'hepatocellular':'Liver','hepat':'Liver',
  'glioblastoma':'Brain','medulloblastoma':'Brain','astrocytoma':'Brain',
  'neuroblastoma':'Bone_Marrow','aml':'Blood','leukemia':'Blood',
  'lymphoma':'Lymph_Node','myeloma':'Bone_Marrow',
  'prostate':'Prostate','pancreatic':'Pancreas','gastric':'Stomach',
  'melanoma':'Skin','sarcoma':'Soft_Tissue',
  'peritoneal':'Multiple_Organs','omentum':'Multiple_Organs',
  gastrointestinal:'Colon','colon/rectum':'Colon','rectum':'Colon',
  'hematopoietic system':'Blood','hematopoietic':'Blood','hematologic':'Blood','haematologic':'Blood',
  colorectum:'Colon',
  'brain/cns':'Brain','brain tumour':'Brain','brain tumor':'Brain',
  'oral cavity':'Salivary_Gland','head and neck':'Salivary_Gland',
  'jaw bone':'Bone','orbit':'Eye','ocular adnexal':'Eye',
  'embryonic stem':'Other','biliary tract':'Liver','pleura':'Lung',
  endometrium:'Uterus',myometrium:'Uterus',thymus:'Lymph_Node',
  omentum:'Multiple_Organs',peritoneum:'Multiple_Organs',diaphragm:'Multiple_Organs',
  'fallopian tube':'Ovary','oesophagus':'Esophagus','esophagus mucosa':'Esophagus',
  'urinary tract':'Bladder','leukemia cell line':'Blood',
  'cancer cell line panel':'Multiple_Organs','cancer cell lines':'Multiple_Organs',
  'soft tissue sarcoma':'Soft_Tissue','neural progenitor':'Brain',
  'primary b cells':'Blood','primary t cells':'Blood','pbmc':'Blood',
  'bone marrow and peripheral blood':'Bone_Marrow',
  'mammary gland':'Breast','mammary tissue':'Breast','cerebellum':'Brain',
  'cerebral cortex':'Brain','ventral mesencephalon':'Brain','substantia nigra':'Brain',
  'lymph nodes':'Lymph_Node','lymph node':'Lymph_Node',
  'adnexa':'Eye','uveal':'Eye','hgsoc':'Ovary','pdac':'Pancreas',
  'escc':'Esophagus','luad':'Lung','lusc':'Lung',
  'kidney tumor':'Kidney','colon epithelium':'Colon'
};

const ORGAN_EXACT={
  kidney:'Kidney',cervix:'Cervix',pancreas:'Pancreas',liver:'Liver',lung:'Lung',
  brain:'Brain',breast:'Breast',colon:'Colon',stomach:'Stomach',spleen:'Spleen',
  'bone marrow':'Bone_Marrow',blood:'Blood','lymph node':'Lymph_Node',
  ovary:'Ovary',uterus:'Uterus',prostate:'Prostate',testis:'Testis',
  thyroid:'Thyroid',bladder:'Bladder',muscle:'Muscle',bone:'Bone',skin:'Skin',
  esophagus:'Esophagus',heart:'Heart',nerve:'Nerve',pituitary:'Pituitary',
  'small intestine':'Small_Intestine','adrenal gland':'Adrenal_Gland',
  'salivary gland':'Salivary_Gland','minor salivary gland':'Salivary_Gland',
  'adipose tissue':'Adipose_Tissue','soft tissue':'Soft_Tissue',
  'multiple organs':'Multiple_Organs','multiple organs (22 types)':'Multiple_Organs',
  'hematopoietic system':'Blood','hematopoietic and reticuloendothelial system':'Blood',
  'hematopoietic / immune system':'Blood','hematologic':'Blood','haematologic':'Blood',
  'blood and lymphoid':'Blood','gastrointestinal':'Colon','neural':'Brain',
  'jaw bone':'Bone','soft tissue sarcoma':'Soft_Tissue','orbit':'Eye',
  'head and neck':'Salivary_Gland','oral cavity':'Salivary_Gland',
  'esophageal squamous cell carcinoma':'Esophagus','pleura':'Lung','thymus':'Lymph_Node',
  'tonsil':'Lymph_Node',
  'not specified':'Other',
  'adrenal gland':'Adrenal_Gland','artery aorta':'Heart','artery coronary':'Heart',
  'artery tibial':'Nerve','brain cerebellum':'Brain','brain cortex':'Brain',
  'breast mammary tissue':'Breast','colon sigmoid':'Colon','colon transverse':'Colon',
  'esophagus gastroesophageal junction':'Esophagus','esophagus mucosa':'Esophagus',
  'esophagus muscularis':'Esophagus','heart atrial appendage':'Heart',
  'heart left ventricle':'Heart','muscle skeletal':'Muscle',
  'nerve tibial':'Nerve','skin not sun exposed suprapubic':'Skin',
  'skin sun exposed lower leg':'Skin','small intestine terminal ileum':'Small_Intestine',
  'ovary':'Ovary','uterus':'Uterus','vagina':'Uterus','prostate':'Prostate',
  'testis':'Testis','pituitary':'Pituitary','placenta':'Uterus',
  'liver metastases':'Liver','matched primary tumor':'Pancreas',
  'tumor-adjacent liver':'Liver','liver; pancreas':'Liver',
  'ovary; fallopian tube':'Ovary','ovary; omentum':'Ovary',
  'colon/rectum':'Colon','brain/cns':'Brain','bone marrow; peripheral blood':'Bone_Marrow',
  'breast; blood; embryonic stem cells':'Breast',
  'multiple (lung, colon, breast, blood)':'Multiple_Organs'
};

const VAGUE_ORGAN=/^(not specified|unknown|n\/a|na|—|-)$/i;

function splitOrganParts(raw){
  return raw.split(/[;\n,]+/)
    .map(x=>x.trim().replace(/^multiple\s+organs?\s*/i,'').replace(/^\(\d+[^)]*\)\s*/,'').trim())
    .filter(p=>p&&!VAGUE_ORGAN.test(p));
}

function hintOrgansFromText(text){
  if(!text) return [];
  const l=text.toLowerCase();
  const found=new Set();
  const hints=[
    [/epidermoid|a431\b/i,'Skin'],[/mcf[- ]?7|breast cancer|mammary/i,'Breast'],
    [/glioblastoma|glioma|u251|dao[y]?/i,'Brain'],[/lung cancer|hcc827|nci-h322|luad|nsclc/i,'Lung'],
    [/hepatocellular|liver|\bhcc\b/i,'Liver'],[/colon|colorectal|crc|rectal/i,'Colon'],
    [/pancrea|pdac/i,'Pancreas'],[/ovarian|ovary|hgsoc/i,'Ovary'],
    [/prostate|pca\b/i,'Prostate'],[/kidney|renal|rcc/i,'Kidney'],
    [/stomach|gastric/i,'Stomach'],[/melanoma/i,'Skin'],
    [/leukemia|aml|cll|myeloma|jurkat|k562|thp-1/i,'Blood'],
    [/fibroblast|skin/i,'Skin'],[/endometri/i,'Uterus'],
    [/esophag|barrett/i,'Esophagus'],[/thyroid/i,'Thyroid'],
    [/bladder|urothel/i,'Bladder'],[/sarcoma|osteosarcoma|fibrosarcoma/i,'Soft_Tissue'],
    [/b cell|t cell|pbmc|monocyte|cd14|cd4\+/i,'Blood']
  ];
  hints.forEach(([re,o])=>{if(re.test(l)) found.add(o);});
  return [...found];
}

let D=[],C={},charts=[];

function esc(s){
  return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function pickOrganRaw(row){
  const organMain=(row['Organ']||'').trim();
  const parts=[];
  const addParts=raw=>{
    splitOrganParts(raw).forEach(p=>{
      if(p&&!VAGUE_ORGAN.test(p)) parts.push(p);
    });
  };
  /* Curator Organ column is authoritative for map counts (TMT ATLAS sheet). */
  if(organMain&&!VAGUE_ORGAN.test(organMain)){
    if(classifyAllOrgans(organMain).length===1&&classifyAllOrgans(organMain)[0]==='Multiple_Organs')
      return organMain;
    addParts(organMain);
    return parts.length?parts.join('; '):organMain;
  }
  ['Cell Line Organ','Tissue for cell lines','Tissue'].forEach(k=>addParts(row[k]||''));
  const detail=(row['Tissue Cell Type Detailed']||'').trim();
  if(!parts.length&&detail) addParts(detail);
  if(parts.length<=1&&/cancer cell lines/i.test(detail)){
    hintOrgansFromText(detail).forEach(o=>parts.push(o.replace(/_/g,' ')));
  }
  return parts.length?parts.join('; '):'Unknown';
}

function classifyOrgan(n){
  const l=(n||'').toLowerCase().trim();
  if(!l) return 'Other';
  if(ORGAN_EXACT[l]) return ORGAN_EXACT[l];
  const ks=Object.keys(MAP).sort((a,b)=>b.length-a.length);
  for(const k of ks) if(l.includes(k)) return MAP[k];
  return 'Other';
}
function classifyAllOrgans(raw){
  if(!raw) return ['Other'];
  const cleaned=raw.toLowerCase().trim();
  if(/multiple organs\s*\(\s*22\s*types?\s*\)/i.test(raw)||/22 lineages/i.test(cleaned))
    return ['Multiple_Organs'];
  if(cleaned==='multiple organs'||cleaned==='multi-organ') return ['Multiple_Organs'];
  const parts=splitOrganParts(raw);
  if(!parts.length) return ['Other'];
  const organs=new Set();
  parts.forEach(p=>{
    const o=classifyOrgan(p);
    if(o!=='Other'||p.toLowerCase()==='other') organs.add(o);
    else hintOrgansFromText(p).forEach(h=>organs.add(h));
  });
  if(organs.size===0){
    hintOrgansFromText(raw).forEach(h=>organs.add(h));
  }
  if(organs.size===0) organs.add('Other');
  const list=[...organs];
  if(list.length>=3&&!list.includes('Multiple_Organs')) list.push('Multiple_Organs');
  return list;
}
/* Metastasis sites in multi-organ strings — keep primary organ only (e.g. LUAD autopsy → not Liver). */
function trimMetastasisOrgans(organs,tumorType){
  if(organs.length<2) return organs;
  const dc=canonDisease(tumorType);
  if(dc==='Lung cancer'&&organs.includes('Lung'))
    return organs.filter(o=>o!=='Liver');
  if(dc==='Liver cancer'&&organs.includes('Liver'))
    return organs.filter(o=>o!=='Lung');
  return organs;
}
function isHealthy(tumorType,sampleType,title,disease){
  const t=(tumorType||'').toLowerCase().trim();
  const d=(disease||'').toLowerCase().trim();
  const ti=(title||'').toLowerCase();
  const cancerKw=['carcinoma','cancer','tumor','tumour','sarcoma','leukemia','leukaemia',
    'lymphoma','myeloma','melanoma','glioma','glioblastoma','adenocarcinoma',
    'neuroblastoma','medulloblastoma','astrocytoma','ependymoma','metastasis',
    'metastatic','malignant','neoplasm','blastoma'];
  for(const k of cancerKw){if(t.includes(k)||d.includes(k)||ti.includes(k))return false}
  if(t===''||t==='normal'||t==='healthy'||t==='not specified'||t==='not_specified') return true;
  if(t.includes('normal')||t.includes('healthy')||d.includes('healthy')) return true;
  return false;
}

/* Normalise TMT labels so "TMT 10-plex" and "TMT-10-plex" collapse to one bucket. */
function normalizeTMT(raw){
  let s=(raw||'').trim();
  if(!s) return '';
  s=s.replace(/\s*-\s*/g,' ').replace(/\s+/g,' ');                /* TMT-10-plex → TMT 10 plex */
  s=s.replace(/(\d+)\s*plex/i,'$1-plex').replace(/\s+/g,' ');     /* TMT 10 plex → TMT 10-plex */
  return s;
}

/* Normalise Sample Type so "Cell Lines", "Cell line", "Cell lines" collapse. */
function normalizeSampleType(raw){
  let s=(raw||'').trim();
  if(!s) return '';
  const lower=s.toLowerCase();
  if(/^cell\s*lines?$/i.test(s)) return 'Cell Lines';
  if(/^cell\s*line\s*panel$/i.test(s)) return 'Cell Line Panel';
  if(/^tissue/i.test(lower)&&!/lcm|ffpe/i.test(lower)) return 'Tissue';
  if(/^ffpe/i.test(lower)) return 'FFPE Tissue';
  if(/lcm|laser capture/i.test(lower)) return 'LCM Tissue';
  if(/^pbmc|peripheral blood mononuclear/i.test(lower)) return 'PBMC';
  if(/^plasma$/i.test(lower)) return 'Plasma';
  if(/^serum$/i.test(lower)) return 'Serum';
  if(/^urine$/i.test(lower)) return 'Urine';
  if(/organoid/i.test(lower)) return 'Organoid';
  if(/^xenograft|^pdx/i.test(lower)) return 'PDX';
  if(/^biopsy/i.test(lower)) return 'Biopsy';
  /* Title-case the first letter of each word for unmapped values */
  return s.split(/\s+/).map(w=>w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()).join(' ');
}

/* Pan-organ atlas projects (GTEx-style) are flagged so each project card can
   show a "Pan-organ atlas" badge, but they still count toward every individual
   organ bucket so users can find them by browsing any organ. */
const PAN_ORGAN_THRESHOLD=8;

function normalizeRow(x){
  const organRaw=pickOrganRaw(x);
  const tumorType=x['Tumor Type']||x['Disease Subtype']||x['Disease']||'Not specified';
  const sampleType=normalizeSampleType(x['Sample Type'])||'Unknown';
  const title=x['Title']||'';
  const organList=trimMetastasisOrgans(classifyAllOrgans(organRaw),tumorType);
  const isPan=organList.length>=PAN_ORGAN_THRESHOLD;
  let pid=(x['Project ID']||'').trim();
  const m=pid.match(/^(IPX\d+)\s*\((PXD\d+)\)/i);
  if(m) pid=m[2];
  const resultFiles=window.ProteinAtlas?ProteinAtlas.parseResultFiles(x['Result Files']):[];
  const resultFile=resultFiles[0]||'';
  const proteinCount=window.ProteinAtlas?ProteinAtlas.parseProteinCount(x['Proteins Quantified']):null;
  return {
    ...x,
    organs:organList,om:organList[0],isMulti:organList.length>1,isPan,
    dis:tumorType,
    healthy:isHealthy(tumorType,sampleType,title,x['Disease']),
    st:sampleType,
    cl:title||'Not specified',
    pid,
    db:(x['Database']||'').trim(),
    pmid:(x['PMID']||'').trim(),
    platform:(x['Platform MS (Unified)']||'').trim(),
    tmt:normalizeTMT(x['TMT Label (Unified)']),
    proteins:(x['Proteins Quantified']||'').trim(),
    proteinCount,
    resultFile,
    resultFiles,
    fastaDb:(x['FASTA (Unified)']||'').trim(),
    link:(x['URL']||'').trim(),
    tissue:(x['Tissue']||'').trim(),
    organRaw,
    disCanon:canonDisease(tumorType)
  };
}

function onDataLoaded(rows,sourceName){
  D=rows
    .filter(x=>(x['Project ID']||'').trim())
    .map(normalizeRow);
  C={};
  const byOrgan={};
  D.forEach(x=>{
    x.organs.forEach(o=>{
      if(!byOrgan[o]) byOrgan[o]=new Set();
      byOrgan[o].add(x.pid);
    });
  });
  Object.keys(byOrgan).forEach(o=>{C[o]=byOrgan[o].size});
  META={
    rawRows:rows.filter(x=>(x['Project ID']||'').trim()).length,
    uniqPids:new Set(D.map(x=>x.pid)).size,
    loadedAt:new Date(),
    dataSource:sourceName||'local'
  };
  i18nApply();
  refreshAll();
  parseUrlOrgan();
  document.getElementById('loader').classList.add('hidden');
}

const LOCAL_CSV='data/projects.csv';
const RAW_CSV='https://raw.githubusercontent.com/arinaatom-cyber/TMT/main/data/projects.csv';

function parseCsvText(text,msg,sourceName){
  if(typeof Papa==='undefined') throw new Error('PapaParse not loaded');
  if(!text||text.length<100) throw new Error('Empty CSV');
  Papa.parse(text,{
    header:true,
    skipEmptyLines:true,
    complete(r){
      try{onDataLoaded(r.data,sourceName);}
      catch(e){
        console.error(e);
        msg.textContent=(lang==='ru'?'Ошибка обработки: ':'Parse error: ')+e.message;
      }
    },
    error(err){
      msg.textContent=(lang==='ru'?'Ошибка CSV: ':'CSV error: ')+(err.message||err);
    }
  });
}

async function loadSheetData(){
  const msg=document.querySelector('#loader p');
  msg.textContent=t('loading');
  const sources=[
    {name:'local',url:LOCAL_CSV},
    {name:'raw',url:RAW_CSV},
    {name:'sheet',url:SHEET_CSV}
  ];
  for(const src of sources){
    try{
      const res=await fetch(src.url,{cache:'no-store'});
      if(!res.ok) continue;
      const text=await res.text();
      if(!text.includes('Project ID')) continue;
      parseCsvText(text,msg,src.name);
      return;
    }catch(e){
      console.warn('CSV source failed:',src.name,e);
    }
  }
  msg.textContent=lang==='ru'
    ?'Не удалось загрузить данные. Обновите страницу (Ctrl+Shift+R).'
    :'Failed to load data. Hard-refresh the page (Ctrl+Shift+R).';
}

window.addEventListener('DOMContentLoaded',()=>{
  const boot=window.ProteinAtlas?ProteinAtlas.initIdMap():Promise.resolve();
  boot.then(loadSheetData);
});

/* Anatomical organs.
   pos = anchor point for label leader; side = label column;
   icon = iconify name (https://icon-sets.iconify.design/);
   size = pixel size of icon in SVG;
   d = fallback SVG path (used if no icon defined) */
/* Anatomically-correct organ atlas matched to the 8-head canon body silhouette.
   Body viewBox 0 0 480 720, midline x=240.  Vertebral / canonical landmarks:
     y= 20  vertex
     y= 62  eye line
     y= 95  chin (C2)
     y=120  thyroid cartilage (C5)
     y=130  shoulder line (T1)
     y=160  sternal angle (T4)
     y=190  nipple line / mid-heart (T6)
     y=210  heart apex (T8)
     y=220  xiphoid / diaphragm (T10)
     y=245  L1 (renal hilum)
     y=275  L3 (navel)
     y=325  L5 (iliac crest)
     y=355  pubic symphysis (S2)  — body ends at y=370 */
const ANATOMY={
  /* HEAD */
  Brain:           {pos:{x:240, y: 42}, side:'R', size:42, emoji:'1f9e0', z:1},
  Pituitary:       {pos:{x:240, y: 56}, side:'R', size:0,  z:3, d:
    'M 236 54 A 4 3 0 1 0 244 54 A 4 3 0 1 0 236 54 Z'},
  Eye:             {pos:{x:248, y: 62}, side:'R', size:0,  z:2, d:
    'M 224 62 A 6 3 0 1 0 236 62 A 6 3 0 1 0 224 62 Z '+
    'M 244 62 A 6 3 0 1 0 256 62 A 6 3 0 1 0 244 62 Z '+
    'M 230 62 A 1.6 1.6 0 1 0 230.01 62 Z '+
    'M 250 62 A 1.6 1.6 0 1 0 250.01 62 Z'},
  Salivary_Gland:  {pos:{x:240, y: 84}, side:'R', size:0,  z:3, d:
    'M 222 80 Q 216 76 220 72 Q 228 70 232 76 Q 230 84 224 85 Z '+
    'M 258 80 Q 264 76 260 72 Q 252 70 248 76 Q 250 84 256 85 Z'},

  Thyroid:         {pos:{x:240, y:118}, side:'L', size:0,  z:2, d:
    'M 228 114 Q 222 118 226 126 Q 234 128 240 126 Q 246 128 254 126 Q 258 118 252 114 Q 244 112 240 118 Q 236 112 228 114 Z'},

  /* THORAX — lungs meet at mediastinum; heart in cardiac notch */
  Esophagus:       {pos:{x:240, y:178}, side:'L', size:0,  z:1, d:
    'M 238 132 L 242 132 L 243 218 Q 244 228 248 234 L 250 240'},
  Lung:            {pos:{x:240, y:178}, side:'L', size:0,  z:2, d:
    'M 222 136 Q 198 142 192 160 Q 184 194 190 214 Q 202 222 226 218 L 232 198 Q 234 168 230 144 Q 228 136 222 136 Z '+
    'M 258 136 Q 282 142 288 160 Q 296 194 290 214 Q 278 222 254 218 L 248 198 Q 246 168 250 144 Q 252 136 258 136 Z'},
  Thymus:          {pos:{x:240, y:158}, anchor:{x:208, y:156}, side:'L', size:0,  z:2, d:
    'M 226 150 Q 240 146 254 150 Q 256 160 250 166 Q 240 168 230 164 Q 224 158 226 150 Z'},
  Heart:           {pos:{x:246, y:192}, side:'R', size:0,  z:3, d:
    'M 248 176 Q 238 174 236 188 Q 236 200 244 210 L 252 218 Q 262 204 262 190 Q 260 178 248 176 Z'},
  Breast:          {pos:{x:240, y:208}, side:'L', size:0,  z:4, d:
    'M 208 206 A 3.2 3.2 0 1 0 214.4 206 A 3.2 3.2 0 1 0 208 206 Z '+
    'M 265.6 206 A 3.2 3.2 0 1 0 272 206 A 3.2 3.2 0 1 0 265.6 206 Z'},

  /* ABDOMEN — textbook proportions (liver largest; stomach J-shaped; intestines fill lower cavity) */
  Liver:           {pos:{x:212, y:254}, anchor:{x:196, y:252}, side:'L', size:0,  z:2, d:
    'M 216 218 Q 242 214 262 224 Q 274 236 272 254 Q 268 276 248 286 Q 208 290 190 272 Q 182 252 186 234 Q 194 218 212 216 Q 216 216 216 218 Z'},
  Gallbladder:     {pos:{x:248, y:272}, anchor:{x:258, y:270}, side:'R', size:0,  z:3, d:
    'M 242 260 Q 252 256 258 266 Q 260 276 254 284 Q 246 286 240 278 Q 238 268 242 260 Z'},
  Stomach:         {pos:{x:270, y:252}, anchor:{x:284, y:250}, side:'R', size:0,  z:3, d:
    'M 258 214 Q 280 212 290 224 Q 294 242 288 260 Q 278 278 262 280 Q 248 276 244 258 L 242 240 Q 246 224 254 216 Q 256 212 258 214 Z'},
  Spleen:          {pos:{x:278, y:242}, anchor:{x:284, y:240}, side:'R', size:0,  z:2, d:
    'M 272 226 Q 286 230 288 246 Q 284 260 276 258 Q 270 244 272 226 Z'},
  Pancreas:        {pos:{x:252, y:262}, anchor:{x:252, y:262}, side:'R', size:0,  z:3, d:
    'M 232 256 L 272 258 Q 282 262 276 268 L 234 266 Q 226 262 232 256 Z'},
  Adrenal_Gland:   {pos:{x:240, y:252}, anchor:{x:228, y:250}, side:'R', size:0,  z:1, d:
    'M 208 254 Q 212 248 216 254 Q 214 258 210 258 Q 208 256 208 254 Z '+
    'M 262 254 Q 266 248 270 254 Q 268 258 264 258 Q 262 256 262 254 Z'},
  Kidney:          {pos:{x:240, y:272}, anchor:{x:208, y:270}, side:'L', size:0,  z:2, d:
    'M 206 258 Q 196 266 198 278 Q 206 286 214 282 Q 216 270 210 262 Q 208 258 206 258 Z '+
    'M 274 258 Q 284 266 282 278 Q 274 286 266 282 Q 264 270 270 262 Q 272 258 274 258 Z'},

  /* INTESTINES — colon frames lower abdomen; small bowel coils fill the center */
  Small_Intestine: {pos:{x:240, y:318}, anchor:{x:240, y:318}, side:'L', size:0,  z:3, d:
    'M 214 298 Q 232 288 252 294 Q 268 302 270 316 Q 272 330 258 338 Q 240 342 224 334 Q 210 322 208 308 Q 208 298 214 298 Z '+
    'M 222 304 Q 238 298 254 306 Q 264 316 260 328 Q 248 336 232 330 Q 218 322 216 310 Q 218 304 222 304 Z '+
    'M 230 312 Q 244 306 258 314 Q 268 324 262 334 Q 250 340 236 334 Q 224 326 224 316 Q 226 312 230 312 Z '+
    'M 218 318 Q 230 322 238 332 Q 238 342 226 346 Q 214 344 208 334 Q 206 324 212 318 Q 214 316 218 318 Z '+
    'M 242 318 Q 254 322 260 332 Q 258 342 246 346 Q 234 342 232 332 Q 236 322 242 318 Z '+
    'M 226 328 Q 238 332 246 340 Q 244 348 234 348 Q 222 344 220 336 Q 222 328 226 328 Z'},
  Colon:           {pos:{x:240, y:328}, anchor:{x:284, y:326}, side:'R', size:0,  z:2, d:
    'M 204 282 Q 190 298 192 320 Q 198 342 220 350 Q 240 354 260 350 Q 282 342 288 320 Q 290 298 276 282 Q 260 272 240 272 Q 220 272 204 282 Z '+
    'M 214 290 Q 202 304 204 318 Q 210 334 228 338 Q 240 340 252 338 Q 270 332 274 318 Q 276 304 264 290 Q 252 282 240 282 Q 228 282 214 290 Z'},
  Appendix:        {pos:{x:276, y:344}, anchor:{x:292, y:342}, side:'R', size:0,  z:4, d:
    'M 266 328 Q 276 326 280 336 Q 284 350 276 360 Q 268 356 266 344 Q 264 334 266 328 Z'},

  /* PELVIS — uterus/bladder/ovary left; prostate/testis right (unisex overlay) */
  Bladder:         {pos:{x:240, y:342}, side:'R', size:0,  z:4, d:
    'M 232 340 Q 240 337 248 340 Q 249 344 240 345 Q 231 344 232 340 Z'},
  Uterus:          {pos:{x:218, y:334}, side:'L', size:0,  z:3, d:
    'M 206 328 Q 218 322 230 328 L 232 346 Q 218 352 204 346 Z'},
  Ovary:           {pos:{x:206, y:322}, side:'L', size:0,  z:3, d:
    'M 198 320 Q 194 321 195 325 Q 199 326 201 323 Z '+
    'M 214 318 Q 218 319 217 323 Q 213 324 211 321 Z '+
    'M 201 322 L 208 320'},
  Cervix:          {pos:{x:218, y:352}, side:'L', size:0,  z:3, d:
    'M 213 350 L 223 350 L 221 356 L 215 356 Z'},
  Prostate:        {pos:{x:262, y:346}, side:'R', size:0,  z:3, d:
    'M 254 342 Q 262 338 270 342 Q 272 348 262 350 Q 252 348 254 342 Z'},
  Testis:          {pos:{x:240, y:378}, side:'R', size:0,  z:3, d:
    'M 228 374 Q 224 382 228 390 Q 234 392 238 386 Q 236 378 228 374 Z '+
    'M 252 374 Q 256 382 252 390 Q 246 392 242 386 Q 244 378 252 374 Z'},

  Bone:            {pos:{x:240, y:280}, side:'R', size:0,  z:0, skeleton:true, d:
    'M 237 132 L 243 132 L 242 228 L 238 228 Z '+
    'M 238 128 L 242 128 L 241 368 L 239 368 Z '+
    'M 214 358 L 266 358'},

  /* Systemic markers — chest, inside torso (not drawn on map; sidebar only) */
  Blood:           {pos:{x:228, y:218}, anchor:{x:228, y:218}, side:'L', size:0,  z:2, systemic:true, d:
    'M 222 212 A 6 7 0 1 0 222.01 212 Z'},
  Skin:            {pos:{x:252, y:218}, anchor:{x:252, y:218}, side:'R', size:0,  z:2, systemic:true, d:
    'M 246 212 A 6 7 0 1 0 246.01 212 Z'},
  Muscle:          {pos:{x:240, y:318}, side:'L', size:0,  z:2, systemic:true, d:
    'M 228 308 Q 240 302 252 308 Q 254 322 240 326 Q 226 322 228 308 Z'}
};

function organCount(o){ return C[o]||0; }

function iconUrl(icon, color){
  return `https://api.iconify.design/${icon}.svg?color=${encodeURIComponent(color)}`;
}
function twemojiUrl(code){
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${code}.svg`;
}

function mapAnatomyOrgans(){
  return Object.keys(ANATOMY).filter(mapOrganVisible);
}

function organGroup(o){
  if(!mapOrganVisible(o)) return '';
  const a=ANATOMY[o];
  const n=organCount(o);
  const ghost=n===0;
  const fill=ghost?'#9a9088':organColor(o);
  const eh=ghost?'':`onclick="sel('${o}')" onmouseenter="st(event,'${o}')" onmouseleave="ht()"`;

  if(a.emoji){
    const sz=a.size||28;
    const url=twemojiUrl(a.emoji);
    const cx=a.pos.x-sz/2, cy=a.pos.y-sz/2;
    const ghostCls=ghost?' organ-ghost':'';
    return `<g class="organ-g organ-img${ghostCls}" data-o="${o}" ${eh}${ghost?' style="pointer-events:none"':''}>
      <image href="${url}" pointer-events="none" opacity="${ghost?'0.32':'0.95'}" x="${cx}" y="${cy}" width="${sz}" height="${sz}" preserveAspectRatio="xMidYMid meet"/>
      <rect class="organ-hit" fill="transparent" pointer-events="${ghost?'none':'all'}" x="${cx}" y="${cy}" width="${sz}" height="${sz}"/>
    </g>`;
  }
  if(a.icon){
    const sz=a.size||32;
    const url=iconUrl(a.icon,fill);
    const cx=a.pos.x-sz/2, cy=a.pos.y-sz/2;
    const ghostCls=ghost?' organ-ghost':'';
    return `<g class="organ-g organ-img${ghostCls}" data-o="${o}" ${eh}${ghost?' style="pointer-events:none"':''}>
      <image href="${url}" pointer-events="none" opacity="${ghost?'0.32':'0.95'}" x="${cx}" y="${cy}" width="${sz}" height="${sz}" preserveAspectRatio="xMidYMid meet"/>
      <rect class="organ-hit" fill="transparent" pointer-events="${ghost?'none':'all'}" x="${cx}" y="${cy}" width="${sz}" height="${sz}"/>
    </g>`;
  }
  if(a.d){
    const pcls=a.skeleton?'skeleton-part':a.systemic?'systemic-part':'anatomy-part';
    const psty=a.skeleton
      ?`fill:none;stroke:rgba(255,255,255,.55);stroke-width:1;stroke-linejoin:round`
      :a.systemic
        ?`fill:${fill};fill-opacity:.4;stroke:${fill};stroke-width:1.2`
        :ghost
          ?`fill:${fill};fill-opacity:.28;stroke:rgba(70,60,55,.42);stroke-width:.65;stroke-linejoin:round;fill-rule:evenodd`
          :`fill:${fill};fill-opacity:.94;stroke:rgba(12,8,6,.38);stroke-width:.55;stroke-linejoin:round;fill-rule:evenodd`;
    const clsExtra=(a.skeleton?' organ-skeleton':a.systemic?' organ-systemic':'')+(ghost?' organ-ghost':'');
    const pe=(a.skeleton||ghost)?' pointer-events="none"':'';
    return `<g class="organ-g${clsExtra}" data-o="${o}" ${eh}${(a.skeleton||ghost)?' style="pointer-events:none"':''}>
      <path class="${pcls}" d="${a.d}" style="${psty}"${pe}/>
    </g>`;
  }
  return '';
}

/* Build a project card with three reference links:
   1. Source database (URL field from sheet, or PRIDE-derived for PXD IDs)
   2. Article on PubMed (from PMID)
   3. Result files on GitHub (folder named after project ID) */
function projectCard(r){
  const isPxd=/^PXD\d+/i.test(r.pid);
  const projHref=r.link||(isPxd?prideUrl(r.pid):'');
  const pmHref=r.pmid?pubmedUrl(r.pmid):'';
  const ghHref=ghResultsUrl(r.pid);
  const ghAlt =ghSearchUrl(r.pid);
  const tag=r.healthy
    ?`<span class="status normal">NORMAL</span>`
    :`<span class="status cancer">CANCER</span>`;
  const pan=r.isPan?`<span class="status pan">${t('panBadge')}</span>`:'';
  const organs=r.organs.map(x=>organDisplayName(x)).join(', ');
  const tmt=r.tmt?`<span class="meta-pill">${esc(r.tmt)}</span>`:'';
  const proteins=window.ProteinAtlas?.proteinBadgesHtml?.(r)||'';
  const platform=r.platform?`<span class="meta-pill">${esc(r.platform.slice(0,28))}</span>`:'';
  const linkProj=projHref
    ? `<a class="plink plink-db" href="${esc(projHref)}" target="_blank" rel="noopener" title="Open in ${esc(r.db||'database')}">
         <span class="li">DB</span><span class="lt">${esc(r.db||'Database')}</span></a>`
    : `<span class="plink disabled" title="No URL"><span class="li">DB</span><span class="lt">—</span></span>`;
  const linkArt=pmHref
    ? `<a class="plink plink-art" href="${esc(pmHref)}" target="_blank" rel="noopener" title="Open article on PubMed">
         <span class="li">PMID</span><span class="lt">${esc(r.pmid)}</span></a>`
    : `<span class="plink disabled" title="No PMID"><span class="li">PMID</span><span class="lt">—</span></span>`;
  const linkGh=`<a class="plink plink-gh" href="${esc(ghHref)}" target="_blank" rel="noopener" title="Result files in repo (or 404 if not uploaded yet)"
        onmouseup="if(event.button===1){window.open('${esc(ghAlt)}','_blank')}">
         <span class="li">GH</span><span class="lt">Results</span></a>`;
  return `<div class="proj-card">
    <div class="proj-head">
      <div class="proj-id-block">
        ${projHref?`<a class="proj-id" href="${esc(projHref)}" target="_blank" rel="noopener">${esc(r.pid)}</a>`:`<span class="proj-id">${esc(r.pid)}</span>`}
        ${tag}${pan}
      </div>
      <div class="proj-organs">${esc(organs)}</div>
    </div>
    <div class="proj-disease" title="${esc(r.dis)}">${esc(diseaseDisplayName(r.disCanon)||'—')}<span style="color:var(--t3);font-size:10px"> · ${esc((r.dis||'').slice(0,40))}</span></div>
    <div class="proj-meta">
      <span class="meta-pill subtle">${esc(r.st||'—')}</span>
      ${tmt}${platform}${proteins}
    </div>
    <div class="proj-links">
      ${linkProj}${linkArt}${linkGh}
    </div>
    ${window.ProteinAtlas?ProteinAtlas.projectProteinBlock(r):''}
  </div>`;
}

function organStats(o){
  const b=organProjectBreakdown(o);
  const dis={},dbs={},tmts={};
  b.uniq.forEach(r=>{
    const dk=r.disCanon||r.dis;
    if(dk) dis[dk]=(dis[dk]||0)+1;
    if(r.db) dbs[r.db]=(dbs[r.db]||0)+1;
    if(r.tmt) tmts[r.tmt]=(tmts[r.tmt]||0)+1;
  });
  const topDis=Object.entries(dis).sort((a,b)=>b[1]-a[1])[0];
  const topTmt=Object.entries(tmts).sort((a,b)=>b[1]-a[1])[0];
  const topDb=Object.entries(dbs).sort((a,b)=>b[1]-a[1]).map(x=>x[0]).slice(0,3).join(', ');
  return {n:b.n,nC:b.nC,nN:b.nN,nPan:b.nPan,topDis:topDis?topDis[0]:'',topTmt:topTmt?topTmt[0]:'',topDb};
}

/* assign label Y positions with no overlap, separately for each side */
function organAnchor(a){return a.anchor||a.pos;}

function assignLabelPositions(active){
  const MIN_GAP=40, TOP=40, BOTTOM=620;
  const L=[],R=[];
  active.forEach(o=>{
    const a=ANATOMY[o];
    const p=organAnchor(a);
    const targetY=p.y;
    (a.side==='L'?L:R).push({o,y:targetY});
  });
  function layout(arr){
    arr.sort((a,b)=>a.y-b.y);
    let prev=TOP-MIN_GAP;
    arr.forEach(it=>{
      it.y=Math.max(it.y,prev+MIN_GAP);
      prev=it.y;
    });
    /* push down past bottom if needed */
    const excess=arr.length?arr[arr.length-1].y-BOTTOM:0;
    if(excess>0) arr.forEach(it=>it.y-=excess);
    return Object.fromEntries(arr.map(it=>[it.o,it.y]));
  }
  return {L:layout(L),R:layout(R)};
}

function mapOrganVisible(o){
  const a=ANATOMY[o];
  return a&&!SYSTEMIC.has(o)&&!a.systemic&&!a.skeleton;
}

function organLabel(o, labelY){
  if(!organCount(o)||!mapOrganVisible(o)) return '';
  const a=ANATOMY[o];
  const isL=a.side==='L';
  const labelX=isL?22:458;
  const anchor=isL?'start':'end';
  const name=organDisplayName(o).toUpperCase();
  const s=organStats(o);
  const ap=organAnchor(a);
  const ox=ap.x, oy=ap.y;
  const turnX=isL?162:318;
  const lineEnd=isL?labelX+4:labelX-4;
  const badge=organBadgeColor(o);
  const dotR=Math.max(3, Math.min(8, 2.2+Math.sqrt(s.n)*0.6));
  const panTag=s.nPan?` · ${s.nPan} pan`:'';
  const eh=`onclick="sel('${o}')" onmouseenter="st(event,'${o}')" onmouseleave="ht()"`;
  /* elbow at organ Y first — avoids diagonal lines into wrong organs when labelY is stacked */
  const lead=`M ${ox} ${oy} L ${turnX} ${oy} L ${turnX} ${labelY} L ${lineEnd} ${labelY}`;
  return `<g class="lbl-g" data-cb="${o}" ${eh}>
    <path class="lbl-lead" d="${lead}"/>
    <circle class="lbl-dot-label" cx="${labelX+(isL?0:0)}" cy="${labelY}" r="${dotR}" fill="${badge}" stroke="rgba(255,255,255,.45)" stroke-width=".5" transform="translate(${isL?6:-6},0)"/>
    <text class="lbl-name" x="${labelX+(isL?14:-14)}" y="${labelY-3}" text-anchor="${anchor}">${name}</text>
    <text class="lbl-count" x="${labelX+(isL?14:-14)}" y="${labelY+8}" text-anchor="${anchor}">${s.n} projects · ${s.nC}C · ${s.nN}N${panTag}</text>
  </g>`;
}

function bodyCavities(){
  /* Subtle cavity fills — organs sit in continuous regions, not floating */
  const t='rgba(120,70,70,.07)', a='rgba(100,65,55,.06)', p='rgba(110,60,70,.05)';
  return `<g class="body-cavities" pointer-events="none">
    <path d="M 222 132 Q 198 136 186 146 L 182 188 Q 184 218 192 228 L 288 228 Q 296 218 298 188 L 294 146 Q 282 136 258 132 Q 240 130 222 132 Z" fill="${t}"/>
    <path d="M 192 228 Q 188 268 194 308 L 194 352 Q 200 364 212 368 L 268 368 Q 280 364 286 352 L 286 308 Q 292 268 288 228 L 192 228 Z" fill="${a}"/>
    <path d="M 206 352 Q 200 362 208 370 L 272 370 Q 280 362 274 352 L 266 342 L 214 342 Z" fill="${p}"/>
  </g>`;
}

function bodySilhouette(){
  /* 8-head canon human body, viewBox 0 0 480 720, midline x=240.
     Head height = 85 px. Vertical landmarks:
       y= 20  vertex (top of skull)
       y= 62  eye line
       y= 95  chin
       y=125  mid-neck
       y=135  acromion (shoulder)
       y=190  nipple line (T4)
       y=220  xiphoid / diaphragm (T10)
       y=275  navel (L3)
       y=325  iliac crest (L5)
       y=360  pubic symphysis (S2)
       y=445  mid-thigh
       y=530  knee
       y=700  feet */
  const head=`M 240 20 Q 272 20 274 50 Q 274 80 258 94 L 222 94 Q 206 80 206 50 Q 208 20 240 20 Z`;
  const neck=`M 224 94 L 256 94 L 260 130 L 220 130 Z`;
  /* Torso: shoulders y=130, narrowing to waist y=290, then widening at hips y=355, ends at y=370 */
  const torso=`M 220 130 Q 196 134 184 144 L 178 188 Q 180 230 184 270
               Q 186 300 192 332 Q 198 350 206 362 L 212 370
               L 268 370 L 274 362 Q 282 350 288 332 Q 294 300 296 270
               Q 300 230 302 188 L 296 144 Q 284 134 260 130 Z`;
  const armL=`M 184 144 Q 162 154 152 188 L 144 260 Q 140 310 148 350
              L 158 384 Q 164 396 174 392 L 184 388 Q 184 366 178 348
              L 170 280 Q 170 240 178 200 Q 184 168 196 152 Z`;
  const armR=`M 296 144 Q 318 154 328 188 L 336 260 Q 340 310 332 350
              L 322 384 Q 316 396 306 392 L 296 388 Q 296 366 302 348
              L 310 280 Q 310 240 302 200 Q 296 168 284 152 Z`;
  /* Legs: same closed topology as arms; attach at hip corners 212/268; ~30px wide */
  const legL=`M 212 370
              Q 200 376 196 396 L 192 468 Q 190 528 194 578
              L 200 624 Q 206 640 214 638 L 222 630
              Q 224 556 227 482 L 230 412 Q 232 382 236 372
              L 238 370 L 212 370 Z`;
  const legR=`M 268 370
              Q 280 376 284 396 L 288 468 Q 290 528 286 578
              L 280 624 Q 274 640 266 638 L 258 630
              Q 256 556 253 482 L 250 412 Q 248 382 244 372
              L 242 370 L 268 370 Z`;
  const stroke='#c88888', fill='rgba(200,136,136,.09)';
  return `
    <g class="body-silhouette" pointer-events="none">
      <path d="${head}" fill="${fill}" stroke="${stroke}" stroke-width="1.15" stroke-linejoin="round"/>
      <path d="${neck}" fill="${fill}" stroke="${stroke}" stroke-width="1.15"/>
      <path d="${torso}" fill="${fill}" stroke="${stroke}" stroke-width="1.15" stroke-linejoin="round"/>
      <path d="${armL}" fill="${fill}" stroke="${stroke}" stroke-width="1.15" stroke-linejoin="round"/>
      <path d="${armR}" fill="${fill}" stroke="${stroke}" stroke-width="1.15" stroke-linejoin="round"/>
      <path d="${legL}" fill="${fill}" stroke="${stroke}" stroke-width="1.15" stroke-linejoin="round"/>
      <path d="${legR}" fill="${fill}" stroke="${stroke}" stroke-width="1.15" stroke-linejoin="round"/>
      <text x="240" y="10" text-anchor="middle" fill="#94a3b8" font-family="Inter,sans-serif" font-size="8" letter-spacing="4" font-weight="600">ANATOMICAL ATLAS · ANTERIOR VIEW</text>
    </g>`;
}

function renderBody(){
  const allMap=mapAnatomyOrgans();
  const active=allMap.filter(o=>organCount(o)>0);
  /* Render all anatomy; ghost fill when no projects match filters */
  const drawOrder=[...allMap].sort((a,b)=>(ANATOMY[a].z||1)-(ANATOMY[b].z||1));
  const labelY=assignLabelPositions(active);
  const orderedY=o=>{
    const a=ANATOMY[o]; const ymap=a.side==='L'?labelY.L:labelY.R; return ymap[o]||a.pos.y;
  };
  document.getElementById('bw').innerHTML=`
  <svg viewBox="-16 0 512 720" xmlns="http://www.w3.org/2000/svg" class="anatomy-svg" preserveAspectRatio="xMidYMid meet">
    ${bodySilhouette()}
    ${bodyCavities()}
    <g class="organs-layer">${drawOrder.map(organGroup).join('')}</g>
    <g class="labels-layer">${active.map(o=>organLabel(o,orderedY(o))).join('')}</g>
  </svg>`;
  bindMapClicks();
}

function bindMapClicks(){
  const bw=document.getElementById('bw');
  if(!bw||bw._mapBound) return;
  bw._mapBound=true;
  bw.addEventListener('click',e=>{
    const g=e.target.closest('.organ-g[data-o],.lbl-g[data-cb]');
    if(!g) return;
    const o=g.dataset.o||g.dataset.cb;
    if(o) sel(o);
  });
}

function hlLabels(o){
  document.querySelectorAll('.lbl-g').forEach(g=>{
    g.classList.toggle('hi',!!o&&g.dataset.cb===o);
  });
}

function st(ev,o){
  hlLabels(o);
  const tip=document.getElementById('tip');
  const s=organStats(o);
  const pelvis=PELVIC_ORGANS.has(o)?`<div class="td">${t('pelvisTip')}</div>`:'';
  tip.innerHTML=`<div class="tn">${organDisplayName(o)}</div>
    <div class="tc">${s.n} ${t('projects')} · ${s.nC}C · ${s.nN}N</div>
    ${s.topDis?`<div class="td">${esc(diseaseDisplayName(s.topDis))}</div>`:''}${pelvis}`;
  tip.style.display='block';
  const r=document.getElementById('bw').getBoundingClientRect();
  tip.style.left=(ev.clientX-r.left+12)+'px';
  tip.style.top=(ev.clientY-r.top-8)+'px';
}
function ht(){
  document.getElementById('tip').style.display='none';
  hlLabels(selOrgan||null);
}

function sel(o){
  if(!C[o]) return;
  try{
  selOrgan=o;
  updateUrl(o);
  const rows=getOrganRows(o);
  document.querySelectorAll('.oitem').forEach(x=>x.classList.toggle('on',x.dataset.o===o));
  document.querySelectorAll('.organ-g').forEach(x=>x.classList.toggle('hi',x.dataset.o===o));
  document.querySelectorAll('.lbl-g').forEach(x=>x.classList.toggle('hi',x.dataset.cb===o));
  hlLabels(o);

  const col=organColor(o);
  let uniqRows=sortProjects(uniqProjects(rows),organUI.sort);
  uniqRows=filterOrganProjects(uniqRows,organUI.projQ);
  const nProj=uniqProjects(getOrganRows(o)).length;
  const nShown=uniqRows.length;
  charts.forEach(x=>x.destroy()); charts=[];

  const dis={}, sam={}, dbs={};
  let nHealthy=0,nCancer=0;
  uniqRows.forEach(r=>{
    const dk=r.disCanon||r.dis;
    dis[dk]=(dis[dk]||0)+1;
    sam[r.st]=(sam[r.st]||0)+1;
    if(r.db) dbs[r.db]=(dbs[r.db]||0)+1;
    if(r.healthy) nHealthy++; else nCancer++;
  });
  const ds=Object.entries(dis).sort((a,b)=>b[1]-a[1]);
  const ss=Object.entries(sam).sort((a,b)=>b[1]-a[1]);
  const dbList=Object.entries(dbs).sort((a,b)=>b[1]-a[1]);

  let h=`<div class="detail-actions">
    <button type="button" class="tbtn primary" onclick="exportOrganCSV('${o}')">${t('exportOrgan')}</button>
    <button type="button" class="tbtn" onclick="shareOrganLink('${o}')">${t('share')}</button>
  </div>
  <div class="organ-toolbar">
    <input type="search" placeholder="${esc(t('projSearch'))}" value="${esc(organUI.projQ)}"
      oninput="setOrganProjQ(this.value)">
    <select onchange="setOrganSort(this.value)">
      <option value="pid"${organUI.sort==='pid'?' selected':''}>${t('sortPid')}</option>
      <option value="pmid"${organUI.sort==='pmid'?' selected':''}>${t('sortPmid')}</option>
      <option value="tmt"${organUI.sort==='tmt'?' selected':''}>${t('sortTmt')}</option>
      <option value="disease"${organUI.sort==='disease'?' selected':''}>${t('sortDis')}</option>
    </select>
  </div>
  <div class="hero" style="border-left-color:${col}">
    <div class="ic" style="background:${col}22;border:1px solid ${col}"></div>
    <div><h2 class="hero-title">${organDisplayName(o)}</h2>
    <div class="sub">${nShown} shown / ${nProj} ${t('projects')} · ${nCancer} cancer · ${nHealthy} normal · ${ds.length} disease groups</div></div>
  </div>
  <div class="mstats">
    <div class="ms"><div class="v accent" style="color:${col}">${nProj}</div><div class="l">${t('projects')}</div></div>
    <div class="ms"><div class="v" style="color:${PASTEL_CANCER}">${nCancer}</div><div class="l">Cancer</div></div>
    <div class="ms"><div class="v" style="color:${PASTEL_NORMAL}">${nHealthy}</div><div class="l">Normal</div></div>
    <div class="ms"><div class="v">${ss.length}</div><div class="l">${t('sampleTypes')}</div></div>
  </div>
  ${compareBlock(o)}
  ${window.ProteinAtlas?ProteinAtlas.organProteinsSummaryHtml(o,uniqRows):''}
  <div class="ccard"><h4 class="sec-h">Disease groups</h4><div class="dtags">`;

  ds.slice(0,15).forEach(([d,n],i)=>{
    const rowsD=uniqRows.filter(r=>(r.disCanon||r.dis)===d);
    const healthyTag=rowsD.length&&rowsD.every(r=>r.healthy);
    const dc=healthyTag?PASTEL_NORMAL:chartColor(i+2);
    h+=`<div class="dtag dtag-click" onclick="filterByHealth('${healthyTag?'normal':'cancer'}')" title="Filter"><span class="dd" style="background:${dc}"></span>${esc(diseaseDisplayName(d))}<span class="dc" style="color:${dc}">${n}</span></div>`;
  });
  h+=`</div></div>`;

  if(dbList.length){
    h+=`<div class="ccard"><h4 class="sec-h">Data Sources</h4><div class="dtags">`;
    dbList.slice(0,8).forEach(([d,n],i)=>{
      const c=chartColor(i+6);
      h+=`<div class="dtag dtag-click" data-db="${esc(d)}" onclick="filterByDb(this.dataset.db)" title="Filter"><span class="dd" style="background:${c}"></span>${esc(d.length>28?d.slice(0,28)+'…':d)}<span class="dc" style="color:${c}">${n}</span></div>`;
    });
    h+=`</div></div>`;
  }

  h+=`<div class="charts-row">
    <div class="ccard"><h4 class="sec-h">${t('matOrganTitle')}</h4><canvas id="chMat"></canvas></div>
    <div class="ccard"><h4 class="sec-h">Disease groups</h4><canvas id="ch2"></canvas></div>
  </div>
  <div class="projects-section">
    <h4 class="sec-h">Projects <span class="sec-count">${nShown}</span></h4>
    <div class="proj-grid">`;

  uniqRows.slice(0,200).forEach(r=>{h+=projectCard(r);});
  h+=`</div></div>`;

  const dc=document.getElementById('dc');
  dc.innerHTML=h;
  dc.scrollTo({top:0,behavior:'smooth'});
  dc.scrollIntoView({behavior:'smooth',block:'nearest'});

  requestAnimationFrame(()=>{
    try{
      if(typeof Chart==='undefined') return;
      const ax=chartAxisColors();
      const mat=organMaterialCounts(uniqRows);
      const matLabels=[t('matClC'),t('matTisC'),t('matTisN'),t('matClN')];
      const matData=[mat.clC,mat.tisC,mat.tisN,mat.clN];
      const matColors=[MAT_COL.clC,MAT_COL.tisC,MAT_COL.tisN,MAT_COL.clN];
      const cMat=document.getElementById('chMat');
      if(cMat&&matData.some(v=>v>0)){
        charts.push(new Chart(cMat,{
          type:'bar',
          data:{
            labels:[organDisplayName(o)],
            datasets:matLabels.map((lbl,i)=>({
              label:lbl,data:[matData[i]],backgroundColor:matColors[i],stack:'o',borderRadius:3,borderSkipped:false
            }))
          },
          options:{
            indexAxis:'y',responsive:true,
            plugins:{legend:{position:'bottom',labels:{color:ax.tick,font:{family:'Inter',size:9},boxWidth:10}}},
            scales:{
              x:{stacked:true,grid:{color:ax.grid},ticks:{color:ax.tick,stepSize:1,precision:0}},
              y:{stacked:true,grid:{display:false},ticks:{color:ax.tick}}
            }
          }
        }));
      }
      const c2=document.getElementById('ch2');
      if(c2&&ds.length){
        const top8=ds.slice(0,8);
        charts.push(new Chart(c2,{
          type:'bar',
          data:{labels:top8.map(d=>d[0].length>18?d[0].slice(0,18)+'…':d[0]),datasets:[{
            data:top8.map(d=>d[1]),
            backgroundColor:top8.map((_,i)=>chartColor(i)),
            borderRadius:6,borderSkipped:false
          }]},
          options:{indexAxis:'y',responsive:true,plugins:{legend:{display:false}},
            scales:{x:{grid:{color:'rgba(148,163,184,.12)'},ticks:{color:'#94a3b8',font:{family:'Inter',size:9}}},
                    y:{grid:{display:false},ticks:{color:'#94a3b8',font:{family:'Inter',size:9}}}}}
        }));
      }
    }catch(err){console.warn('Charts:',err);}
  });
  }catch(err){
    console.error('sel()',err);
    document.getElementById('dc').innerHTML=`<div class="placeholder"><p>Error loading organ: ${esc(String(err.message))}</p></div>`;
  }
}
window.sel=sel;
window.setFilter=setFilter;
window.onGlobalSearch=onGlobalSearch;
window.exportAllCSV=exportAllCSV;
window.exportOrganCSV=exportOrganCSV;
window.runCompare=runCompare;
window.organColor=organColor;
window.filtSidebar=filtSidebar;
window.openAbout=openAbout;
window.closeAbout=closeAbout;
window.toggleLang=toggleLang;
window.reloadData=reloadData;
window.setOrganSort=setOrganSort;
window.setOrganProjQ=setOrganProjQ;
window.shareOrganLink=shareOrganLink;
window.filterByDb=filterByDb;
window.filterByHealth=filterByHealth;
window.ghResultsUrl=ghResultsUrl;
window.getOrganRows=getOrganRows;
window.uniqProjects=uniqProjects;
