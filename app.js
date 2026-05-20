const SHEET='1M6hc3vmk1bNchMvEwXsIyyO5iq3mAzP877HTXzhzg38';
const GID='1072380314';
const URL=`https://docs.google.com/spreadsheets/d/${SHEET}/export?format=csv&gid=${GID}`;
const SHEET_VIEW=`https://docs.google.com/spreadsheets/d/${SHEET}/edit?gid=${GID}`;

const ACCENT='#5b9fd4';
const BODY_BLUE='#2e7fc8';
const CHART_COLORS=['#5b9fd4','#7a8fa8','#6b8f9a','#8a9eb8','#5a8a9a','#9a8aa8','#6a7a9a','#4a8ab0'];
const SYSTEMIC=new Set(['Blood','Bone_Marrow','Lymph_Node','Nerve','Skin','Muscle','Bone',
  'Adipose_Tissue','Soft_Tissue','Multiple_Organs','Other','Pituitary']);

const ANATOMY_COL={
  Brain:'#e89aa0',Eye:'#7a4a4a',Salivary_Gland:'#d4a890',Thyroid:'#d49a8a',
  Esophagus:'#d4a890',Lung:'#ec9e8b',Heart:'#c8454a',Breast:'#e8b0b0',
  Liver:'#8a2a2a',Stomach:'#eba98b',Spleen:'#7a2828',Pancreas:'#d4a868',
  Adrenal_Gland:'#d4b060',Kidney:'#6e2e2e',Small_Intestine:'#e6a48a',Colon:'#d89a80',
  Bladder:'#e58fa8',Uterus:'#e89aa8',Ovary:'#e8a8c0',Cervix:'#c88898',
  Prostate:'#b8809a',Testis:'#e8a8a8'
};

const GRP=[
  {t:'Head & Neck',i:'🧠',o:['Brain','Pituitary','Eye','Thyroid','Salivary_Gland','Esophagus']},
  {t:'Thorax',i:'❤️',o:['Lung','Heart','Breast']},
  {t:'Abdomen',i:'🫁',o:['Liver','Stomach','Pancreas','Spleen','Adrenal_Gland','Kidney','Small_Intestine','Colon']},
  {t:'Pelvic & Urinary',i:'🩺',o:['Bladder','Ovary','Uterus','Cervix','Prostate','Testis']},
  {t:'Blood & Immune',i:'🩸',o:['Blood','Bone_Marrow','Lymph_Node']},
  {t:'Structural & Other',i:'🦴',o:['Bone','Muscle','Skin','Adipose_Tissue','Soft_Tissue','Nerve','Multiple_Organs','Other']}
];
const COL={};
GRP.forEach(g=>g.o.forEach(o=>{COL[o]=ACCENT;}));

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
  stomach:'Stomach',gastric:'Stomach',gastroesophageal:'Stomach',
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
  'lymph node':'Lymph_Node','lymph nodes':'Lymph_Node',tonsil:'Lymph_Node',thymus:'Lymph_Node',
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
  'hematopoietic system':'Blood','hematopoietic':'Blood',
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
    [/hepat|liver|hcc/i,'Liver'],[/colon|colorectal|crc|rectal/i,'Colon'],
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
  const parts=[];
  const addParts=raw=>{
    splitOrganParts(raw).forEach(p=>{
      if(p&&!VAGUE_ORGAN.test(p)) parts.push(p);
    });
  };
  ['Organ','Tissue','Cell Line Organ','Tissue for cell lines'].forEach(k=>addParts(row[k]||''));
  const detail=(row['Tissue Cell Type Detailed']||'').trim();
  const organMain=(row['Organ']||'').trim();
  if((!parts.length||VAGUE_ORGAN.test(organMain))&&detail) addParts(detail);
  if(parts.length<=1&&(organMain.toLowerCase().includes('multiple')||/cancer cell lines/i.test(detail))){
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
  if(cleaned.includes('multiple organs')||cleaned.includes('multi-organ')||cleaned.includes('22 types')||cleaned.includes('22 lineages'))
    return ['Multiple_Organs'];
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

function normalizeRow(x){
  const organRaw=pickOrganRaw(x);
  const tumorType=x['Tumor Type']||x['Disease Subtype']||x['Disease']||'Not specified';
  const sampleType=x['Sample Type']||x['Tissue Cell Type Detailed']||'Unknown';
  const title=x['Title']||'';
  const organList=classifyAllOrgans(organRaw);
  let pid=(x['Project ID']||'').trim();
  const m=pid.match(/^(IPX\d+)\s*\((PXD\d+)\)/i);
  if(m) pid=m[2];
  return {
    ...x,
    organs:organList,om:organList[0],isMulti:organList.length>1,
    dis:tumorType,
    healthy:isHealthy(tumorType,sampleType,title,x['Disease']),
    st:sampleType,
    cl:title||'Not specified',
    pid,
    db:(x['Database']||'').trim(),
    pmid:(x['PMID']||'').trim(),
    platform:(x['Platform MS (Unified)']||'').trim(),
    tmt:(x['TMT Label (Unified)']||'').trim(),
    proteins:(x['Proteins Quantified']||'').trim(),
    link:(x['URL']||'').trim(),
    tissue:(x['Tissue']||'').trim(),
    organRaw
  };
}

window.addEventListener('DOMContentLoaded',()=>{
  Papa.parse(URL,{
    download:true,header:true,skipEmptyLines:true,
    complete(r){
      D=r.data
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
      go();
      document.getElementById('loader').classList.add('hidden');
    },
    error(){document.querySelector('#loader p').textContent='Error loading data :('}
  });
});

function go(){
  const tis=Object.keys(C).filter(k=>C[k]>0).length;
  const dbs=new Set(D.map(x=>x.db).filter(Boolean)).size;
  const types=new Set(D.map(x=>x.st)).size;
  const tmt=new Set(D.map(x=>x.tmt).filter(Boolean)).size;
  const uniqPid=new Set(D.map(x=>x.pid)).size;
  document.getElementById('hs').innerHTML=
    `<div class="hstat"><div class="v">${uniqPid}</div><div class="l">Projects</div></div>`+
    `<div class="hstat"><div class="v">${D.length}</div><div class="l">Rows</div></div>`+
    `<div class="hstat"><div class="v">${tis}</div><div class="l">Organs</div></div>`+
    `<div class="hstat"><div class="v">${dbs}</div><div class="l">Databases</div></div>`+
    `<div class="hstat"><div class="v">${tmt}</div><div class="l">TMT Formats</div></div>`+
    `<div class="hstat"><div class="v">${types}</div><div class="l">Sample Types</div></div>`;
  let h=`<div class="search"><span class="si">🔍</span><input placeholder="Search organ…" oninput="filt(this.value)"></div>`;
  GRP.forEach(g=>{
    const items=g.o.filter(o=>(C[o]||0)>0);
    if(!items.length) return;
    h+=`<div class="card"><div class="card-head"><span>${g.i}</span><h3>${g.t}</h3></div><div class="olist">`;
    items.forEach(o=>{
      const n=C[o],c=COL[o]||'#888';
      h+=`<div class="oitem" data-o="${o}" onclick="sel('${o}')"><div class="odot" style="background:${c}"></div><span class="nm">${o.replace(/_/g,' ')}</span><span class="ct" data-count="${n}">${n}</span></div>`;
    });
    h+=`</div></div>`;
  });
  document.getElementById('lp').innerHTML=h;
  renderBody();
}

function filt(q){
  const s=(q||'').toLowerCase();
  document.querySelectorAll('.oitem').forEach(e=>{
    e.style.display=e.dataset.o.toLowerCase().replace(/_/g,' ').includes(s)?'':'none';
  });
}

/* Anatomical organs.
   pos = anchor point for label leader; side = label column;
   icon = iconify name (https://icon-sets.iconify.design/);
   size = pixel size of icon in SVG;
   d = fallback SVG path (used if no icon defined) */
/* Professional medical atlas mapping.
   Z-order: deeper organs first, surface organs last.
   Each entry: pos (label anchor), side (label column), size, plus one of:
     emoji = Twemoji codepoint (🧠 🫀 🫁 👁 etc.)
     icon  = Iconify identifier (e.g. game-icons:liver)
     d     = inline SVG path for organs without dedicated icons */
const ANATOMY={
  Brain:           {pos:{x:240,y:60},  side:'R', size:30, emoji:'1f9e0',        z:1},
  Eye:             {pos:{x:240,y:92},  side:'L', size:14, emoji:'1f441',        z:1},
  Salivary_Gland:  {pos:{x:240,y:108}, side:'R', size:0,  z:1, d:
    'M 226 106 Q 222 102 226 100 Q 232 100 234 104 Z '+
    'M 254 106 Q 258 102 254 100 Q 248 100 246 104 Z'},
  Thyroid:         {pos:{x:240,y:124}, side:'L', size:0,  z:1, d:
    'M 230 120 Q 224 124 228 132 Q 234 134 240 132 Q 246 134 252 132 Q 256 124 250 120 Q 244 118 240 124 Q 236 118 230 120 Z'},
  Esophagus:       {pos:{x:240,y:148}, side:'R', size:0,  z:1, d:
    'M 237 134 L 243 134 L 243 168 L 237 168 Z'},
  Lung:            {pos:{x:240,y:194}, side:'L', size:42, emoji:'1fac1',        z:2},
  Heart:           {pos:{x:240,y:200}, side:'R', size:22, emoji:'1fac0',        z:3},
  Breast:          {pos:{x:240,y:178}, side:'L', size:0,  z:4, d:
    'M 218 178 A 2 2 0 1 0 222 178 A 2 2 0 1 0 218 178 Z '+
    'M 258 178 A 2 2 0 1 0 262 178 A 2 2 0 1 0 258 178 Z'},
  Liver:           {pos:{x:224,y:248}, side:'L', size:36, icon:'game-icons:liver',  z:2},
  Spleen:          {pos:{x:272,y:248}, side:'R', size:0,  z:2, d:
    'M 268 240 Q 282 244 282 256 Q 278 270 268 270 Q 262 258 266 246 Z'},
  Stomach:         {pos:{x:262,y:252}, side:'R', size:28, icon:'game-icons:stomach',z:3},
  Pancreas:        {pos:{x:240,y:282}, side:'L', size:0,  z:2, d:
    'M 214 280 Q 230 276 248 280 Q 258 282 264 286 L 264 290 Q 256 288 246 286 Q 228 284 214 286 Z'},
  Adrenal_Gland:   {pos:{x:240,y:292}, side:'R', size:0,  z:2, d:
    'M 224 288 Q 228 284 234 288 Q 232 294 226 294 Q 222 292 224 288 Z '+
    'M 246 288 Q 252 284 256 288 Q 258 292 254 294 Q 248 294 246 288 Z'},
  Kidney:          {pos:{x:240,y:312}, side:'L', size:34, icon:'game-icons:kidneys',z:2},
  Small_Intestine: {pos:{x:240,y:344}, side:'R', size:0,  z:3, d:
    'M 222 332 Q 232 328 244 332 Q 256 334 258 340 Q 252 346 240 344 Q 228 346 222 340 '+
    'Q 220 350 232 352 Q 246 352 256 350 Q 258 356 250 360 Q 238 362 228 358 '+
    'Q 222 364 232 368 Q 246 368 256 366 Q 258 372 250 374 Q 238 374 226 370'},
  Colon:           {pos:{x:240,y:354}, side:'L', size:44, icon:'game-icons:bowels', z:2},
  Bladder:         {pos:{x:240,y:392}, side:'R', size:0,  z:3, d:
    'M 228 386 Q 240 380 252 386 Q 256 396 240 400 Q 224 396 228 386 Z'},
  Uterus:          {pos:{x:240,y:394}, side:'L', size:0,  z:3, d:
    'M 230 388 Q 240 380 250 388 L 248 402 L 232 402 Z'},
  Ovary:           {pos:{x:240,y:404}, side:'R', size:0,  z:3, d:
    'M 222 402 Q 218 404 220 410 Q 226 412 228 408 Z '+
    'M 258 402 Q 262 404 260 410 Q 254 412 252 408 Z'},
  Cervix:          {pos:{x:240,y:412}, side:'L', size:0,  z:3, d:
    'M 236 406 L 244 406 L 242 414 L 238 414 Z'},
  Prostate:        {pos:{x:240,y:410}, side:'R', size:0,  z:3, d:
    'M 232 406 Q 240 402 248 406 Q 248 412 240 414 Q 232 412 232 406 Z'},
  Testis:          {pos:{x:240,y:442}, side:'L', size:0,  z:3, d:
    'M 230 436 Q 224 446 232 452 Q 240 454 242 446 Q 244 454 250 452 Q 258 446 250 436 Q 242 434 240 442 Q 238 434 230 436 Z'}
};

function organCount(o){ return C[o]||0; }

function iconUrl(icon, color){
  return `https://api.iconify.design/${icon}.svg?color=${encodeURIComponent(color)}`;
}
function twemojiUrl(code){
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${code}.svg`;
}

function organGroup(o){
  if(!organCount(o)||SYSTEMIC.has(o)||!ANATOMY[o]) return '';
  const a=ANATOMY[o];
  const fill=ANATOMY_COL[o]||'#ec9e8b';
  const eh=`onclick="sel('${o}')" onmouseenter="st(event,'${o}')" onmouseleave="ht()"`;

  if(a.emoji){
    const sz=a.size||28;
    const url=twemojiUrl(a.emoji);
    const cx=a.pos.x-sz/2, cy=a.pos.y-sz/2;
    return `<g class="organ-g organ-img" data-o="${o}" ${eh}>
      <image href="${url}" x="${cx}" y="${cy}" width="${sz}" height="${sz}" preserveAspectRatio="xMidYMid meet"/>
      <rect class="organ-hit" x="${cx}" y="${cy}" width="${sz}" height="${sz}"/>
    </g>`;
  }
  if(a.icon){
    const sz=a.size||32;
    const url=iconUrl(a.icon,fill);
    const cx=a.pos.x-sz/2, cy=a.pos.y-sz/2;
    return `<g class="organ-g organ-img" data-o="${o}" ${eh}>
      <image href="${url}" x="${cx}" y="${cy}" width="${sz}" height="${sz}" preserveAspectRatio="xMidYMid meet"/>
      <rect class="organ-hit" x="${cx}" y="${cy}" width="${sz}" height="${sz}"/>
    </g>`;
  }
  if(a.d){
    return `<g class="organ-g" data-o="${o}" ${eh}>
      <path class="anatomy-part" d="${a.d}" style="fill:${fill};fill-rule:evenodd"/>
    </g>`;
  }
  return '';
}

function organStats(o){
  const rows=D.filter(r=>r.organs.includes(o));
  const seen=new Set(),uniq=[];
  rows.forEach(r=>{if(!seen.has(r.pid)){seen.add(r.pid);uniq.push(r);}});
  let nC=0,nN=0;
  const dis={},dbs={};
  uniq.forEach(r=>{
    if(r.healthy) nN++; else nC++;
    if(r.dis) dis[r.dis]=(dis[r.dis]||0)+1;
    if(r.db) dbs[r.db]=(dbs[r.db]||0)+1;
  });
  const topDis=Object.entries(dis).sort((a,b)=>b[1]-a[1])[0];
  const topDb=Object.entries(dbs).sort((a,b)=>b[1]-a[1]).map(x=>x[0]).slice(0,3).join(', ');
  return {n:uniq.length,nC,nN,topDis:topDis?topDis[0]:'',topDb};
}

/* assign label Y positions with no overlap, separately for each side */
function assignLabelPositions(active){
  const MIN_GAP=42, TOP=60, BOTTOM=640;
  const L=[],R=[];
  active.forEach(o=>{
    const a=ANATOMY[o];
    const targetY=a.pos.y;
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

function organLabel(o, labelY){
  if(!organCount(o)||SYSTEMIC.has(o)||!ANATOMY[o]) return '';
  const a=ANATOMY[o];
  const isL=a.side==='L';
  const labelX=isL?10:470;
  const anchor=isL?'start':'end';
  const name=o.replace(/_/g,' ').toUpperCase();
  const s=organStats(o);
  const ox=a.pos.x, oy=a.pos.y;
  const turnX=isL?156:324;
  const lineEnd=isL?labelX+2:labelX-2;
  const col=ANATOMY_COL[o]||'#ec9e8b';
  const eh=`onclick="sel('${o}')" onmouseenter="st(event,'${o}')" onmouseleave="ht()"`;
  return `<g class="lbl-g" data-cb="${o}" ${eh}>
    <path class="lbl-lead" d="M ${ox} ${oy} L ${turnX} ${labelY} L ${lineEnd} ${labelY}"/>
    <circle class="lbl-dot-organ" cx="${ox}" cy="${oy}" r="1.5" fill="${col}"/>
    <circle class="lbl-dot-label" cx="${labelX+(isL?0:0)}" cy="${labelY}" r="2" fill="${col}" transform="translate(${isL?6:-6},0)"/>
    <text class="lbl-name" x="${labelX+(isL?14:-14)}" y="${labelY-3}" text-anchor="${anchor}">${name}</text>
    <text class="lbl-count" x="${labelX+(isL?14:-14)}" y="${labelY+8}" text-anchor="${anchor}">${s.n} projects · ${s.nC}C · ${s.nN}N</text>
  </g>`;
}

function bodySilhouette(){
  /* Cleaner anatomical silhouette, viewBox 0 0 480 720 (body center x=240) */
  const head=`M 240 36 Q 264 36 266 60 Q 266 80 252 94 L 228 94 Q 214 80 214 60 Q 216 36 240 36 Z`;
  const neck=`M 224 94 L 256 94 L 258 112 L 222 112 Z`;
  const torso=`M 200 112 Q 188 116 184 124
               L 188 158 Q 192 196 192 232 L 196 296 Q 200 332 206 354
               L 212 366 L 268 366 L 274 354
               Q 280 332 284 296 L 288 232 Q 288 196 292 158
               L 296 124 Q 292 116 280 112 Z`;
  const armL=`M 188 124 Q 168 134 156 162 L 146 224 Q 142 264 148 300
              L 158 326 Q 164 336 172 332 L 180 326
              Q 178 308 174 286 L 168 224 Q 168 196 176 168 Q 182 152 196 138 Z`;
  const armR=`M 292 124 Q 312 134 324 162 L 334 224 Q 338 264 332 300
              L 322 326 Q 316 336 308 332 L 300 326
              Q 302 308 306 286 L 312 224 Q 312 196 304 168 Q 298 152 284 138 Z`;
  const legL=`M 212 366 L 204 400 Q 198 480 196 560 Q 194 624 192 664
              L 174 664 Q 170 624 174 560 Q 180 480 196 400 L 212 366 Z`;
  const legR=`M 268 366 L 276 400 Q 282 480 284 560 Q 286 624 288 664
              L 306 664 Q 310 624 306 560 Q 300 480 284 400 L 268 366 Z`;
  const stroke='#d89a9a', fill='rgba(216,154,154,.03)';
  return `
    <g class="body-silhouette" pointer-events="none">
      <path d="${head}" fill="${fill}" stroke="${stroke}" stroke-width="1.1" stroke-linejoin="round"/>
      <path d="${neck}" fill="${fill}" stroke="${stroke}" stroke-width="1.1"/>
      <path d="${torso}" fill="${fill}" stroke="${stroke}" stroke-width="1.1" stroke-linejoin="round"/>
      <path d="${armL}" fill="${fill}" stroke="${stroke}" stroke-width="1.1"/>
      <path d="${armR}" fill="${fill}" stroke="${stroke}" stroke-width="1.1"/>
      <path d="${legL}" fill="${fill}" stroke="${stroke}" stroke-width="1.1"/>
      <path d="${legR}" fill="${fill}" stroke="${stroke}" stroke-width="1.1"/>
      <text x="240" y="18" text-anchor="middle" fill="#94a3b8" font-family="Inter,sans-serif" font-size="9" letter-spacing="4" font-weight="600">ANATOMICAL ATLAS · ANTERIOR VIEW</text>
      <line x1="180" y1="26" x2="220" y2="26" stroke="#94a3b8" stroke-width=".4" opacity=".5"/>
      <line x1="260" y1="26" x2="300" y2="26" stroke="#94a3b8" stroke-width=".4" opacity=".5"/>
    </g>`;
}

function renderBody(){
  const active=Object.keys(ANATOMY).filter(o=>organCount(o)>0&&!SYSTEMIC.has(o));
  /* Render organs in z-order (lower z = drawn first, on bottom) */
  const drawOrder=[...active].sort((a,b)=>(ANATOMY[a].z||1)-(ANATOMY[b].z||1));
  const labelY=assignLabelPositions(active);
  const orderedY=o=>{
    const a=ANATOMY[o]; const ymap=a.side==='L'?labelY.L:labelY.R; return ymap[o]||a.pos.y;
  };
  document.getElementById('bw').innerHTML=`
  <svg viewBox="0 0 480 720" xmlns="http://www.w3.org/2000/svg" class="anatomy-svg" preserveAspectRatio="xMidYMid meet">
    ${bodySilhouette()}
    <g class="organs-layer">${drawOrder.map(organGroup).join('')}</g>
    <g class="labels-layer">${active.map(o=>organLabel(o,orderedY(o))).join('')}</g>
  </svg>`;
}

function st(ev,o){
  const t=document.getElementById('tip');
  t.innerHTML=`<div class="tn">${o.replace(/_/g,' ')}</div><div class="tc">${C[o]||0} projects</div>`;
  t.style.display='block';
  const r=document.getElementById('bw').getBoundingClientRect();
  t.style.left=(ev.clientX-r.left+12)+'px';
  t.style.top=(ev.clientY-r.top-8)+'px';
}
function ht(){document.getElementById('tip').style.display='none'}

function sel(o){
  if(!C[o]) return;
  const rows=D.filter(x=>x.organs.includes(o));
  document.querySelectorAll('.oitem').forEach(x=>x.classList.toggle('on',x.dataset.o===o));
  document.querySelectorAll('.organ-g').forEach(x=>x.classList.toggle('hi',x.dataset.o===o));
  document.querySelectorAll('.lbl-g').forEach(x=>x.classList.toggle('hi',x.dataset.cb===o));

  const col=ACCENT;
  const seen=new Set();
  const uniqRows=rows.filter(r=>{
    if(seen.has(r.pid)) return false;
    seen.add(r.pid);
    return true;
  });
  const nProj=C[o]||uniqRows.length;
  charts.forEach(x=>x.destroy()); charts=[];

  const dis={}, sam={}, dbs={};
  let nHealthy=0,nCancer=0;
  uniqRows.forEach(r=>{
    dis[r.dis]=(dis[r.dis]||0)+1;
    sam[r.st]=(sam[r.st]||0)+1;
    if(r.db) dbs[r.db]=(dbs[r.db]||0)+1;
    if(r.healthy) nHealthy++; else nCancer++;
  });
  const ds=Object.entries(dis).sort((a,b)=>b[1]-a[1]);
  const ss=Object.entries(sam).sort((a,b)=>b[1]-a[1]);
  const dbList=Object.entries(dbs).sort((a,b)=>b[1]-a[1]);

  let h=`
  <div class="hero" style="border-left-color:${col}">
    <div class="ic" style="background:${col}22;border:1px solid ${col}"></div>
    <div><h2 class="hero-title">${o.replace(/_/g,' ')}</h2>
    <div class="sub">${nProj} projects · ${rows.length} rows in sheet · ${nCancer} cancer · ${nHealthy} normal · ${ds.length} disease types</div></div>
  </div>
  <div class="mstats">
    <div class="ms"><div class="v accent" style="color:${col}">${nProj}</div><div class="l">Projects</div></div>
    <div class="ms"><div class="v">${nCancer}</div><div class="l">Cancer</div></div>
    <div class="ms"><div class="v">${nHealthy}</div><div class="l">Normal</div></div>
    <div class="ms"><div class="v">${ss.length}</div><div class="l">Sample Types</div></div>
  </div>
  <div class="ccard"><h4 class="sec-h">Tumor / Disease Types</h4><div class="dtags">`;

  ds.slice(0,15).forEach(([d,n])=>{
    const rowsD=uniqRows.filter(r=>r.dis===d);
    const healthyTag=rowsD.length&&rowsD.every(r=>r.healthy);
    const dc=healthyTag?'var(--green)':'var(--red)';
    h+=`<div class="dtag"><span class="dd" style="background:${dc}"></span>${esc(d.length>35?d.slice(0,35)+'…':d)}<span class="dc">${n}</span></div>`;
  });
  h+=`</div></div>`;

  if(dbList.length){
    h+=`<div class="ccard"><h4 class="sec-h">Data Sources</h4><div class="dtags">`;
    dbList.slice(0,8).forEach(([d,n])=>{
      h+=`<div class="dtag"><span class="dd" style="background:var(--accent)"></span>${esc(d.length>28?d.slice(0,28)+'…':d)}<span class="dc">${n}</span></div>`;
    });
    h+=`</div></div>`;
  }

  h+=`<div class="charts-row">
    <div class="ccard"><h4 class="sec-h">Sample Types</h4><canvas id="ch1"></canvas></div>
    <div class="ccard"><h4 class="sec-h">Top Tumor Types</h4><canvas id="ch2"></canvas></div>
  </div>
  <div class="tcard"><h4 class="sec-h">Projects <span class="sec-count">${nProj}</span></h4><div class="tscroll"><table class="ptable">
    <thead><tr><th>DB</th><th>Project</th><th>Tumor / Disease</th><th>Sample</th><th>TMT</th><th>Organ(s)</th></tr></thead><tbody>`;

  uniqRows.slice(0,100).forEach(r=>{
    const organsLabel=r.isMulti
      ?`<span style="color:var(--t2)">${esc(r.organs.map(x=>x.replace(/_/g,' ')).join(', '))}</span>`
      :esc(r.organs[0].replace(/_/g,' '));
    const pidCell=r.link
      ?`<a href="${esc(r.link)}" target="_blank" rel="noopener" style="color:var(--accent)">${esc(r.pid)}</a>`
      :`<span class="pid">${esc(r.pid)}</span>`;
    h+=`<tr>
      <td>${esc(r.db||'—')}</td>
      <td class="pid">${pidCell}</td>
      <td title="${esc(r.dis)}">${esc((r.dis||'').slice(0,36))}</td>
      <td>${esc((r.st||'').slice(0,22))}</td>
      <td>${esc((r.tmt||'—').slice(0,14))}</td>
      <td>${organsLabel}</td>
    </tr>`;
  });

  h+=`</tbody></table></div></div>`;

  const dc=document.getElementById('dc');
  dc.innerHTML=h;
  dc.scrollTo({top:0,behavior:'smooth'});

  requestAnimationFrame(()=>{
    const colors=CHART_COLORS;
    const c1=document.getElementById('ch1');
    if(c1){
      charts.push(new Chart(c1,{
        type:'doughnut',
        data:{labels:ss.map(s=>s[0]),datasets:[{data:ss.map(s=>s[1]),backgroundColor:colors,borderWidth:0}]},
        options:{responsive:true,plugins:{legend:{position:'bottom',labels:{color:'#94a3b8',font:{family:'Inter',size:10},padding:10}}}}
      }));
    }
    const c2=document.getElementById('ch2');
    if(c2){
      const top8=ds.slice(0,8);
      charts.push(new Chart(c2,{
        type:'bar',
        data:{labels:top8.map(d=>d[0].length>18?d[0].slice(0,18)+'…':d[0]),datasets:[{data:top8.map(d=>d[1]),backgroundColor:ACCENT+'bb',borderRadius:6,borderSkipped:false}]},
        options:{indexAxis:'y',responsive:true,plugins:{legend:{display:false}},
          scales:{x:{grid:{color:'#2d3a52'},ticks:{color:'#94a3b8',font:{family:'Inter',size:9}}},
                  y:{grid:{display:false},ticks:{color:'#94a3b8',font:{family:'Inter',size:9}}}}}
      }));
    }
  });
}
