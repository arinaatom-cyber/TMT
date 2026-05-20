const SHEET='1M6hc3vmk1bNchMvEwXsIyyO5iq3mAzP877HTXzhzg38';
const GID='1072380314';
const URL=`https://docs.google.com/spreadsheets/d/${SHEET}/export?format=csv&gid=${GID}`;
const SHEET_VIEW=`https://docs.google.com/spreadsheets/d/${SHEET}/edit?gid=${GID}`;

/* GitHub repo where result tables / per-project files live.
   Each project ID becomes a folder under GH_RESULTS_PATH, e.g.
   https://github.com/arinaatom-cyber/TMT/tree/main/projects/PXD012345 */
const GH_REPO='https://github.com/arinaatom-cyber/TMT';
const GH_RESULTS_PATH='projects';
const ghResultsUrl=pid=>`${GH_REPO}/tree/main/${GH_RESULTS_PATH}/${encodeURIComponent(pid)}`;
const ghSearchUrl =pid=>`${GH_REPO}/search?q=${encodeURIComponent(pid)}&type=code`;
const pubmedUrl   =pmid=>`https://pubmed.ncbi.nlm.nih.gov/${encodeURIComponent(pmid)}/`;
const prideUrl    =pid =>`https://www.ebi.ac.uk/pride/archive/projects/${encodeURIComponent(pid)}`;

const ACCENT='#5b9fd4';
const BODY_BLUE='#2e7fc8';
const CHART_COLORS=['#5b9fd4','#7a8fa8','#6b8f9a','#8a9eb8','#5a8a9a','#9a8aa8','#6a7a9a','#4a8ab0'];
const SYSTEMIC=new Set(['Blood','Bone_Marrow','Lymph_Node','Nerve','Skin','Muscle','Bone',
  'Adipose_Tissue','Soft_Tissue','Multiple_Organs','Other','Pituitary']);

/* Brightened anatomical palette — readable on the dark blue body background.
   Bigger organs (used as Iconify icons) keep darker realistic tones;
   small custom-path organs use brighter hues so they stay visible. */
const ANATOMY_COL={
  Brain:'#f0a4aa',           Eye:'#a0656a',
  Salivary_Gland:'#f0c8a8',  Thyroid:'#f4a890',
  Esophagus:'#e8a890',       Lung:'#ec9e8b',
  Heart:'#e85060',           Breast:'#f4b8b8',
  Liver:'#8a2a2a',           Stomach:'#eba98b',
  Spleen:'#c44848',          Pancreas:'#f0c878',
  Adrenal_Gland:'#f4c870',   Kidney:'#6e2e2e',
  Small_Intestine:'#f4b890', Colon:'#d89a80',
  Bladder:'#f49ab8',         Uterus:'#f4a8b8',
  Ovary:'#f4b8d0',           Cervix:'#d898a8',
  Prostate:'#c898b8',        Testis:'#f0b8b8'
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

/* Normalise TMT labels so "TMT 10-plex" and "TMT-10-plex" collapse to one bucket. */
function normalizeTMT(raw){
  let s=(raw||'').trim();
  if(!s) return '';
  s=s.replace(/\s*-\s*/g,' ').replace(/\s+/g,' ');                /* TMT-10-plex → TMT 10 plex */
  s=s.replace(/(\d+)\s*plex/i,'$1-plex').replace(/\s+/g,' ');     /* TMT 10 plex → TMT 10-plex */
  return s;
}

/* Pan-organ atlas projects (GTEx-style) cover so many tissues that they
   dominate every per-organ count.  We keep them in Multiple_Organs and the
   project list, but exclude them from individual organ counts/highlights. */
const PAN_ORGAN_THRESHOLD=8;

function normalizeRow(x){
  const organRaw=pickOrganRaw(x);
  const tumorType=x['Tumor Type']||x['Disease Subtype']||x['Disease']||'Not specified';
  const sampleType=(x['Sample Type']||'').trim()||'Unknown';   /* don't fall through to detailed text */
  const title=x['Title']||'';
  const allOrgans=classifyAllOrgans(organRaw);
  const isPan=allOrgans.length>=PAN_ORGAN_THRESHOLD;
  /* Pan-organ atlases are tagged Multiple_Organs only, not in every single bucket. */
  const organList=isPan?['Multiple_Organs']:allOrgans;
  let pid=(x['Project ID']||'').trim();
  const m=pid.match(/^(IPX\d+)\s*\((PXD\d+)\)/i);
  if(m) pid=m[2];
  return {
    ...x,
    organs:organList,allOrgans,om:organList[0],isMulti:organList.length>1,isPan,
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
  /* HEAD (y=20–95) */
  Brain:           {pos:{x:240, y: 50}, side:'R', size:42, emoji:'1f9e0',                 z:1},
  Eye:             {pos:{x:240, y: 68}, side:'L', size:12, emoji:'1f441',                 z:2},
  Salivary_Gland:  {pos:{x:240, y: 88}, side:'R', size:0,  z:2, d:
    'M 226 86 Q 220 82 222 78 Q 230 78 232 84 Z '+
    'M 254 86 Q 260 82 258 78 Q 250 78 248 84 Z'},

  /* NECK (y=95–130) */
  Thyroid:         {pos:{x:240, y:118}, side:'L', size:0,  z:2, d:
    'M 230 114 Q 224 118 228 126 Q 234 128 240 126 Q 246 128 252 126 Q 256 118 250 114 Q 244 112 240 118 Q 236 112 230 114 Z'},

  /* THORAX (y=130–220).  Lungs apex at clavicle y=135, base at diaphragm y=220.
     Twemoji emoji icons have visible content slightly below their center, so
     we offset them downward to make them visually align with body landmarks. */
  Esophagus:       {pos:{x:240, y:170}, side:'R', size:0,  z:1, d:
    'M 237 130 L 243 130 L 243 220 L 237 220 Z'},
  Lung:            {pos:{x:240, y:175}, side:'L', size:62, emoji:'1fac1',                 z:2},
  Heart:           {pos:{x:232, y:188}, side:'R', size:32, emoji:'1fac0',                 z:3},
  Breast:          {pos:{x:240, y:200}, side:'L', size:0,  z:4, d:
    'M 210 198 A 3.2 3.2 0 1 0 216.4 198 A 3.2 3.2 0 1 0 210 198 Z '+
    'M 263.6 198 A 3.2 3.2 0 1 0 270 198 A 3.2 3.2 0 1 0 263.6 198 Z'},

  /* UPPER ABDOMEN (y=220–275).  Below diaphragm. */
  Liver:           {pos:{x:218, y:248}, side:'L', size:44, icon:'game-icons:liver',       z:2},
  Stomach:         {pos:{x:264, y:248}, side:'R', size:32, icon:'game-icons:stomach',     z:3},
  Spleen:          {pos:{x:282, y:242}, side:'R', size:0,  z:2, d:
    'M 280 234 Q 292 238 292 252 Q 288 266 280 266 Q 274 254 278 240 Z'},
  Pancreas:        {pos:{x:240, y:272}, side:'L', size:0,  z:2, d:
    'M 208 270 Q 228 264 250 270 Q 262 272 270 278 L 270 282 Q 260 278 248 276 Q 226 274 208 276 Z'},

  /* MID ABDOMEN (y=240–310).  Renal hilum L1=245, kidneys T12–L3. */
  Adrenal_Gland:   {pos:{x:240, y:250}, side:'R', size:0,  z:1, d:
    'M 220 246 Q 224 242 230 246 Q 228 252 222 252 Q 218 250 220 246 Z '+
    'M 250 246 Q 256 242 260 246 Q 262 250 258 252 Q 252 252 250 246 Z'},
  Kidney:          {pos:{x:240, y:270}, side:'L', size:42, icon:'game-icons:kidneys',     z:2},

  /* LOWER ABDOMEN (y=290–345).  Small intestine central, colon frames it. */
  Colon:           {pos:{x:240, y:312}, side:'L', size:54, icon:'game-icons:bowels',      z:2},
  Small_Intestine: {pos:{x:240, y:312}, side:'R', size:0,  z:3, d:
    'M 222 298 Q 234 294 248 298 Q 260 302 256 310 Q 240 312 226 308 '+
    'Q 218 318 232 322 Q 248 322 258 318 Q 260 326 250 330 Q 234 332 224 326 '+
    'Q 218 336 232 340 Q 248 340 258 336'},

  /* PELVIS (y=340–370).  Bladder posterior to pubic symphysis (y=355). */
  Bladder:         {pos:{x:240, y:348}, side:'R', size:0,  z:4, d:
    'M 224 342 Q 240 334 256 342 Q 260 354 240 360 Q 220 354 224 342 Z'},
  Uterus:          {pos:{x:232, y:352}, side:'L', size:0,  z:3, d:
    'M 222 346 Q 232 338 240 346 L 238 360 L 224 360 Z'},
  Prostate:        {pos:{x:248, y:360}, side:'R', size:0,  z:3, d:
    'M 240 356 Q 250 350 258 356 Q 258 364 248 366 Q 240 364 240 356 Z'},
  Ovary:           {pos:{x:240, y:354}, side:'R', size:0,  z:3, d:
    'M 214 352 Q 210 354 212 358 Q 218 360 220 356 Z '+
    'M 260 352 Q 266 354 264 358 Q 258 360 256 356 Z'},
  Cervix:          {pos:{x:232, y:362}, side:'L', size:0,  z:3, d:
    'M 228 360 L 236 360 L 234 366 L 230 366 Z'},

  /* SCROTUM (in gap between legs, y≥375) */
  Testis:          {pos:{x:240, y:385}, side:'L', size:0,  z:3, d:
    'M 232 380 Q 224 392 234 398 Q 240 398 242 392 Q 244 398 248 398 Q 256 392 248 380 Q 244 378 240 386 Q 236 378 232 380 Z'}
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
  const organs=r.organs.map(x=>x.replace(/_/g,' ')).join(', ');
  const tmt=r.tmt?`<span class="meta-pill">${esc(r.tmt)}</span>`:'';
  const proteins=r.proteins?`<span class="meta-pill">${esc(r.proteins)} proteins</span>`:'';
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
        ${tag}
      </div>
      <div class="proj-organs">${esc(organs)}</div>
    </div>
    <div class="proj-disease" title="${esc(r.dis)}">${esc(r.dis||'—')}</div>
    <div class="proj-meta">
      <span class="meta-pill subtle">${esc(r.st||'—')}</span>
      ${tmt}${platform}${proteins}
    </div>
    <div class="proj-links">
      ${linkProj}${linkArt}${linkGh}
    </div>
  </div>`;
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
  const MIN_GAP=40, TOP=40, BOTTOM=620;
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
  const legL=`M 212 370 L 206 410 Q 200 500 198 580 Q 196 650 194 700
              L 172 700 Q 168 650 172 580 Q 178 500 196 410 L 212 370 Z`;
  const legR=`M 268 370 L 274 410 Q 280 500 282 580 Q 284 650 286 700
              L 308 700 Q 312 650 308 580 Q 302 500 284 410 L 268 370 Z`;
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
      <text x="240" y="10" text-anchor="middle" fill="#94a3b8" font-family="Inter,sans-serif" font-size="8" letter-spacing="4" font-weight="600">ANATOMICAL ATLAS · ANTERIOR VIEW</text>
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
  <div class="projects-section">
    <h4 class="sec-h">Projects <span class="sec-count">${nProj}</span></h4>
    <div class="proj-grid">`;

  uniqRows.slice(0,200).forEach(r=>{
    h+=projectCard(r);
  });

  h+=`</div></div>`;

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
