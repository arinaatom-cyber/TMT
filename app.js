const SHEET='1M6hc3vmk1bNchMvEwXsIyyO5iq3mAzP877HTXzhzg38';
const GID='1072380314';
const URL=`https://docs.google.com/spreadsheets/d/${SHEET}/export?format=csv&gid=${GID}`;
const SHEET_VIEW=`https://docs.google.com/spreadsheets/d/${SHEET}/edit?gid=${GID}`;

const ACCENT='#5b9fd4';
const CHART_COLORS=['#5b9fd4','#7a8fa8','#6b8f9a','#8a9eb8','#5a8a9a','#9a8aa8','#6a7a9a','#4a8ab0'];
const SYSTEMIC=new Set(['Blood','Bone_Marrow','Lymph_Node','Nerve','Skin','Muscle','Bone',
  'Adipose_Tissue','Soft_Tissue','Multiple_Organs','Other','Pituitary']);

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

/* SVG paths: anterior view, patient's right = image left */
const ANATOMY={
  Brain:'M210 38 Q235 38 248 54 Q252 72 240 86 Q220 94 210 94 Q200 94 180 86 Q168 72 172 54 Q185 38 210 38 Z',
  Eye:'M188 64 Q188 58 194 56 L200 56 Q206 58 206 64 Q206 70 200 72 L194 72 Q188 70 188 64 Z M214 64 Q214 58 220 56 L226 56 Q232 58 232 64 Q232 70 226 72 L220 72 Q214 70 214 64 Z',
  Salivary_Gland:'M168 98 Q164 94 168 90 Q174 88 178 92 Q178 98 174 100 Z M252 98 Q256 94 252 90 Q246 88 242 92 Q242 98 246 100 Z',
  Thyroid:'M196 112 Q210 106 224 112 Q220 120 210 122 Q200 120 196 112 Z',
  Esophagus:'M207 128 L213 128 L213 188 L207 188 Z',
  Lung:'M168 148 Q148 160 144 200 Q144 236 160 252 Q178 258 192 240 L198 200 Q198 168 186 152 Z M252 148 Q272 160 276 200 Q276 236 260 252 Q242 258 228 240 L222 200 Q222 168 234 152 Z',
  Heart:'M218 188 Q232 178 240 192 Q244 210 232 224 Q218 232 210 224 Q202 232 188 224 Q176 210 180 192 Q188 178 202 188 Q210 196 218 188 Z',
  Breast:'M176 172 Q164 178 164 192 Q164 206 176 210 Q188 206 188 192 Q188 178 176 172 Z M244 172 Q256 178 256 192 Q256 206 244 210 Q232 206 232 192 Q232 178 244 172 Z',
  Liver:'M148 228 Q140 252 152 272 Q172 282 198 268 L210 248 Q208 228 188 218 Q162 214 148 228 Z',
  Stomach:'M228 242 Q248 236 256 258 Q252 282 232 288 Q214 284 210 266 Q208 250 228 242 Z',
  Spleen:'M262 248 Q272 258 268 278 Q258 290 246 282 Q242 262 252 250 Z',
  Pancreas:'M178 286 L242 282 L244 294 L180 298 Z',
  Adrenal_Gland:'M168 306 Q176 300 184 306 Q180 314 172 312 Z M236 306 Q244 300 252 306 Q248 314 240 312 Z',
  Kidney:'M162 318 Q152 330 154 348 Q160 364 172 362 Q182 350 180 332 Q176 318 162 318 Z M258 318 Q268 330 266 348 Q260 364 248 362 Q238 350 240 332 Q244 318 258 318 Z',
  Small_Intestine:'M182 352 Q210 340 238 352 Q252 372 240 392 Q210 404 180 392 Q168 372 182 352 Z',
  Colon:'M168 368 L168 400 Q180 412 210 414 Q240 412 252 400 L252 368 Q240 356 210 354 Q180 356 168 368 Z',
  Bladder:'M196 408 Q210 400 224 408 Q228 422 210 428 Q192 422 196 408 Z',
  Uterus:'M198 404 Q210 396 222 404 L220 422 L200 422 Z',
  Ovary:'M186 428 Q178 432 180 440 Q186 446 192 440 Z M234 428 Q242 432 240 440 Q234 446 228 440 Z',
  Cervix:'M204 424 L216 424 L214 434 L206 434 Z',
  Prostate:'M200 418 Q210 414 220 418 Q220 426 210 428 Q200 426 200 418 Z',
  Testis:'M198 448 Q192 458 198 468 Q206 472 210 464 Q214 472 222 468 Q228 458 222 448 Q214 444 210 452 Q206 444 198 448 Z'
};

function organCount(o){ return C[o]||0; }

function organGroup(o){
  if(!organCount(o)||SYSTEMIC.has(o)||!ANATOMY[o]) return '';
  const d=ANATOMY[o];
  const eh=`onclick="sel('${o}')" onmouseenter="st(event,'${o}')" onmouseleave="ht()"`;
  return `<g class="organ-g" data-o="${o}" ${eh}>
    <path class="anatomy-part" d="${d}"/>
    <path class="org-hit" d="${d}"/>
  </g>`;
}

function bodySilhouette(){
  return `
    <defs>
      <linearGradient id="sk" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#243049"/>
        <stop offset="100%" stop-color="#151c2c"/>
      </linearGradient>
    </defs>
    <g class="body-silhouette" pointer-events="none">
      <ellipse cx="210" cy="58" rx="34" ry="40" fill="url(#sk)" class="body-out"/>
      <path d="M 194 94 Q 194 108 200 118 L 220 118 Q 226 108 226 94 Z" fill="url(#sk)" class="body-out"/>
      <path d="M 158 126 Q 168 120 200 118 L 220 118 Q 252 120 262 126
               L 272 158 Q 278 198 274 246 L 266 314 Q 260 352 252 378
               L 244 398 L 176 398 L 168 378 Q 160 352 154 314 L 146 246
               Q 142 198 148 158 Z" fill="url(#sk)" class="body-out"/>
      <path d="M 158 126 Q 128 136 116 166 L 106 236 Q 102 276 108 306 L 116 334
               Q 122 352 128 352 L 134 352 Q 138 332 134 306 L 128 236
               Q 128 196 136 168 Q 142 148 158 138 Z" fill="url(#sk)" class="body-out"/>
      <path d="M 262 126 Q 292 136 304 166 L 314 236 Q 318 276 312 306 L 304 334
               Q 298 352 292 352 L 286 352 Q 282 332 286 306 L 292 236
               Q 292 196 284 168 Q 278 148 262 138 Z" fill="url(#sk)" class="body-out"/>
      <path d="M 176 398 L 244 398 L 250 426 L 214 444 L 206 444 L 170 426 Z" fill="url(#sk)" class="body-out"/>
      <path d="M 170 426 L 206 444 L 202 548 Q 198 604 190 642 Q 186 668 176 676
               L 164 676 Q 158 658 160 622 L 162 548 Q 164 488 170 448 Z" fill="url(#sk)" class="body-out"/>
      <path d="M 250 426 L 214 444 L 218 548 Q 222 604 230 642 Q 234 668 244 676
               L 256 676 Q 262 658 260 622 L 258 548 Q 256 488 250 448 Z" fill="url(#sk)" class="body-out"/>
      <line x1="210" y1="126" x2="210" y2="382" class="body-inner"/>
      <text x="210" y="14" text-anchor="middle" fill="#64748b" font-size="9" font-family="Inter,sans-serif">Anterior · R ← · → L</text>
    </g>`;
}

function renderBody(){
  const active=Object.keys(ANATOMY).filter(o=>organCount(o)>0&&!SYSTEMIC.has(o));
  document.getElementById('bw').innerHTML=`
  <svg viewBox="0 0 420 720" xmlns="http://www.w3.org/2000/svg">
    ${bodySilhouette()}
    <g class="organs-layer">${active.map(organGroup).join('')}</g>
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
