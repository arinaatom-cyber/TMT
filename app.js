const SHEET='1M6hc3vmk1bNchMvEwXsIyyO5iq3mAzP877HTXzhzg38';
const GID='1072380314';
const URL=`https://docs.google.com/spreadsheets/d/${SHEET}/export?format=csv&gid=${GID}`;
const SHEET_VIEW=`https://docs.google.com/spreadsheets/d/${SHEET}/edit?gid=${GID}`;

const COL={
  Brain:'#6B7BA8',Pituitary:'#8B9CC4',Eye:'#5B8FA8',Thyroid:'#5A9A94',
  Salivary_Gland:'#B89A6E',Esophagus:'#A68B62',
  Lung:'#B86B6B',Heart:'#9E5B5B',Breast:'#C49292',
  Liver:'#8E7A62',Stomach:'#A67E72',Pancreas:'#7E6F9A',Spleen:'#9A6262',
  Adrenal_Gland:'#B5A66E',Kidney:'#9A7258',Small_Intestine:'#7A9468',Colon:'#A68A7E',
  Bladder:'#6A8FA8',
  Blood:'#A85858',Bone_Marrow:'#7A4545',Lymph_Node:'#B07070',
  Ovary:'#A88AA8',Uterus:'#B87A9A',Cervix:'#9A6A82',Prostate:'#5A82A8',Testis:'#6A82B0',
  Bone:'#8A9098',Muscle:'#9A7070',Skin:'#B8A088',Adipose_Tissue:'#C4B098',
  Soft_Tissue:'#7A8494',Nerve:'#B0A060',
  Multiple_Organs:'#7A8499',Other:'#6B7280'
};
const CHART_COLORS=['#5B8FA8','#7E6F9A','#7A9468','#B5A66E','#B86B6B','#9A7258','#6A8FA8','#A88AA8','#8A9098'];

const GRP=[
  {t:'Head & Neck',i:'🧠',o:['Brain','Pituitary','Eye','Thyroid','Salivary_Gland','Esophagus']},
  {t:'Thorax',i:'❤️',o:['Lung','Heart','Breast']},
  {t:'Abdomen',i:'🫁',o:['Liver','Stomach','Pancreas','Spleen','Adrenal_Gland','Kidney','Small_Intestine','Colon']},
  {t:'Pelvic & Urinary',i:'🩺',o:['Bladder','Ovary','Uterus','Cervix','Prostate','Testis']},
  {t:'Blood & Immune',i:'🩸',o:['Blood','Bone_Marrow','Lymph_Node']},
  {t:'Structural & Other',i:'🦴',o:['Bone','Muscle','Skin','Adipose_Tissue','Soft_Tissue','Nerve','Multiple_Organs','Other']}
];

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
    h+=`<div class="card"><div class="card-head"><span>${g.i}</span><h3>${g.t}</h3></div><div class="olist">`;
    g.o.forEach(o=>{
      const n=C[o]||0,c=COL[o]||'#888',off=n===0?'off':'';
      h+=`<div class="oitem ${off}" data-o="${o}" onclick="sel('${o}')"><div class="odot" style="background:${c}"></div><span class="nm">${o.replace(/_/g,' ')}</span><span class="ct" data-count="${n}">${n}</span></div>`;
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

const ORGANS={
  Brain:          {x:210, y:48,  side:'L', cy:48},
  Pituitary:      {x:210, y:72,  side:'R', cy:30},
  Eye:            {x:198, y:62,  side:'L', cy:88},
  Salivary_Gland: {x:188, y:92,  side:'L', cy:108},
  Thyroid:        {x:210, y:118, side:'R', cy:62},
  Esophagus:      {x:210, y:150, side:'L', cy:148},
  Lung:           {x:178, y:185, side:'L', cy:188},
  Heart:          {x:222, y:200, side:'R', cy:108},
  Breast:         {x:185, y:170, side:'L', cy:228},
  Liver:          {x:180, y:240, side:'L', cy:268},
  Stomach:        {x:228, y:248, side:'R', cy:148},
  Spleen:         {x:248, y:258, side:'R', cy:188},
  Adrenal_Gland:  {x:192, y:272, side:'L', cy:308},
  Pancreas:       {x:208, y:278, side:'L', cy:348},
  Kidney:         {x:186, y:295, side:'R', cy:228},
  Small_Intestine:{x:210, y:335, side:'R', cy:268},
  Colon:          {x:210, y:362, side:'R', cy:308},
  Bladder:        {x:210, y:402, side:'L', cy:388},
  Prostate:       {x:210, y:425, side:'R', cy:348},
  Ovary:          {x:194, y:405, side:'L', cy:428},
  Uterus:         {x:210, y:412, side:'R', cy:388},
  Cervix:         {x:210, y:424, side:'L', cy:468},
  Testis:         {x:210, y:482, side:'R', cy:428},
  Skin:           {x:128, y:235, side:'L', cy:508},
  Adipose_Tissue: {x:128, y:285, side:'L', cy:548},
  Muscle:         {x:128, y:380, side:'L', cy:588},
  Bone:           {x:135, y:455, side:'L', cy:628},
  Soft_Tissue:    {x:128, y:530, side:'L', cy:668},
  Blood:          {x:292, y:255, side:'R', cy:468},
  Bone_Marrow:    {x:292, y:330, side:'R', cy:508},
  Lymph_Node:     {x:292, y:380, side:'R', cy:548},
  Nerve:          {x:292, y:440, side:'R', cy:588},
  Multiple_Organs:{x:292, y:495, side:'R', cy:628}
};

function callout(o, pos){
  const n=C[o]||0;
  const col=COL[o]||'#888';
  const off=n===0?'off':'';
  const name=o.replace(/_/g,' ');
  const isL=pos.side==='L';
  const pillW=92, pillH=18;
  const pillX = isL ? 8 : (420-8-pillW);
  const pillY = pos.cy - pillH/2;
  const dotCx = isL ? pillX + 8 : pillX + pillW - 8;
  const textX = isL ? pillX + 16 : pillX + pillW - 16;
  const countX = isL ? pillX + pillW - 12 : pillX + 12;
  const leaderEndX = isL ? pillX + pillW : pillX;
  const path = `M ${pos.x} ${pos.y} L ${leaderEndX} ${pos.cy}`;
  const eh = n>0 ? `onclick="sel('${o}')" onmouseenter="st(event,'${o}')" onmouseleave="ht()"` : '';
  const countCol = n>0 ? col : '#556682';
  return `
    <path class="lead ${off}" data-lead="${o}" d="${path}"/>
    <g class="cb ${off}" data-cb="${o}" ${eh} style="color:${col}">
      <rect class="cb-pill" x="${pillX}" y="${pillY}" width="${pillW}" height="${pillH}"/>
      <circle class="cb-dot" cx="${dotCx}" cy="${pos.cy}" r="3.4" fill="${col}"/>
      <text class="cb-name ${isL?'':'right'}" x="${textX}" y="${pos.cy}">${name}</text>
      <text class="cb-count" x="${countX}" y="${pos.cy}" style="fill:${countCol}">${n}</text>
    </g>
  `;
}

function organShape(o, pos){
  const n=C[o]||0;
  const fill=n>0?COL[o]:'#1f2535';
  const cls=n>0?'org':'org off';
  const eh=n>0?`onclick="sel('${o}')" onmouseenter="st(event,'${o}')" onmouseleave="ht()"`:'';
  const da=`data-o="${o}"`;
  switch(o){
    case 'Brain':
      return `<ellipse cx="${pos.x}" cy="${pos.y}" rx="22" ry="18" fill="${fill}" class="${cls}" ${eh} ${da}/>`;
    case 'Pituitary':
      return `<circle cx="${pos.x}" cy="${pos.y}" r="3" fill="${fill}" class="${cls}" ${eh} ${da}/>`;
    case 'Eye':
      return `<circle cx="${pos.x-10}" cy="${pos.y}" r="3.5" fill="${fill}" class="${cls}" ${eh} ${da}/>
              <circle cx="${pos.x+10}" cy="${pos.y}" r="3.5" fill="${fill}" class="${cls}" ${eh} ${da}/>`;
    case 'Salivary_Gland':
      return `<ellipse cx="${pos.x-2}" cy="${pos.y}" rx="4" ry="3" fill="${fill}" class="${cls}" ${eh} ${da}/>
              <ellipse cx="${pos.x+24}" cy="${pos.y}" rx="4" ry="3" fill="${fill}" class="${cls}" ${eh} ${da}/>`;
    case 'Thyroid':
      return `<path d="M ${pos.x-12} ${pos.y} Q ${pos.x} ${pos.y-5} ${pos.x+12} ${pos.y} Q ${pos.x+6} ${pos.y+5} ${pos.x} ${pos.y+3} Q ${pos.x-6} ${pos.y+5} ${pos.x-12} ${pos.y} Z" fill="${fill}" class="${cls}" ${eh} ${da}/>`;
    case 'Esophagus':
      return `<rect x="${pos.x-3}" y="${pos.y-12}" width="6" height="60" rx="2" fill="${fill}" class="${cls}" ${eh} ${da} opacity=".75"/>`;
    case 'Lung':
      return `<ellipse cx="${pos.x}" cy="${pos.y}" rx="22" ry="42" fill="${fill}" class="${cls}" ${eh} ${da} opacity=".85"/>
              <ellipse cx="${pos.x+64}" cy="${pos.y}" rx="22" ry="42" fill="${fill}" class="${cls}" ${eh} ${da} opacity=".85"/>`;
    case 'Heart':
      return `<path d="M ${pos.x} ${pos.y-10} Q ${pos.x-12} ${pos.y-16} ${pos.x-10} ${pos.y} Q ${pos.x-8} ${pos.y+14} ${pos.x} ${pos.y+20} Q ${pos.x+8} ${pos.y+14} ${pos.x+10} ${pos.y} Q ${pos.x+12} ${pos.y-16} ${pos.x} ${pos.y-10} Z" fill="${fill}" class="${cls}" ${eh} ${da}/>`;
    case 'Breast':
      return `<circle cx="${pos.x}" cy="${pos.y}" r="10" fill="${fill}" class="${cls}" ${eh} ${da} opacity=".85"/>
              <circle cx="${pos.x+50}" cy="${pos.y}" r="10" fill="${fill}" class="${cls}" ${eh} ${da} opacity=".85"/>`;
    case 'Liver':
      return `<path d="M ${pos.x-26} ${pos.y-12} Q ${pos.x-30} ${pos.y+12} ${pos.x} ${pos.y+14} Q ${pos.x+22} ${pos.y+10} ${pos.x+20} ${pos.y-8} Q ${pos.x-4} ${pos.y-16} ${pos.x-26} ${pos.y-12} Z" fill="${fill}" class="${cls}" ${eh} ${da} opacity=".9"/>`;
    case 'Stomach':
      return `<path d="M ${pos.x-12} ${pos.y-10} Q ${pos.x+10} ${pos.y-14} ${pos.x+14} ${pos.y} Q ${pos.x+10} ${pos.y+14} ${pos.x-4} ${pos.y+12} Q ${pos.x-16} ${pos.y+6} ${pos.x-12} ${pos.y-10} Z" fill="${fill}" class="${cls}" ${eh} ${da} opacity=".9"/>`;
    case 'Pancreas':
      return `<path d="M ${pos.x-20} ${pos.y} Q ${pos.x} ${pos.y-4} ${pos.x+22} ${pos.y+2} L ${pos.x+22} ${pos.y+6} Q ${pos.x} ${pos.y+2} ${pos.x-20} ${pos.y+4} Z" fill="${fill}" class="${cls}" ${eh} ${da} opacity=".85"/>`;
    case 'Spleen':
      return `<ellipse cx="${pos.x}" cy="${pos.y}" rx="9" ry="13" fill="${fill}" class="${cls}" ${eh} ${da} opacity=".9"/>`;
    case 'Adrenal_Gland':
      return `<path d="M ${pos.x-7} ${pos.y} Q ${pos.x} ${pos.y-5} ${pos.x+7} ${pos.y} Q ${pos.x} ${pos.y+2} ${pos.x-7} ${pos.y} Z" fill="${fill}" class="${cls}" ${eh} ${da}/>
              <path d="M ${pos.x+34} ${pos.y} Q ${pos.x+41} ${pos.y-5} ${pos.x+48} ${pos.y} Q ${pos.x+41} ${pos.y+2} ${pos.x+34} ${pos.y} Z" fill="${fill}" class="${cls}" ${eh} ${da}/>`;
    case 'Kidney':
      return `<path d="M ${pos.x-4} ${pos.y-14} Q ${pos.x-12} ${pos.y} ${pos.x-4} ${pos.y+14} Q ${pos.x+6} ${pos.y+14} ${pos.x+6} ${pos.y-2} Q ${pos.x+4} ${pos.y-14} ${pos.x-4} ${pos.y-14} Z" fill="${fill}" class="${cls}" ${eh} ${da}/>
              <path d="M ${pos.x+38} ${pos.y-14} Q ${pos.x+30} ${pos.y} ${pos.x+38} ${pos.y+14} Q ${pos.x+48} ${pos.y+14} ${pos.x+48} ${pos.y-2} Q ${pos.x+46} ${pos.y-14} ${pos.x+38} ${pos.y-14} Z" fill="${fill}" class="${cls}" ${eh} ${da}/>`;
    case 'Small_Intestine':
      return `<path d="M ${pos.x-26} ${pos.y} Q ${pos.x-16} ${pos.y-8} ${pos.x-8} ${pos.y+4} Q ${pos.x} ${pos.y-8} ${pos.x+8} ${pos.y+4} Q ${pos.x+16} ${pos.y-6} ${pos.x+26} ${pos.y+2}" fill="none" stroke="${fill}" stroke-width="4" class="${cls}" ${eh} ${da} opacity=".8" stroke-linecap="round"/>`;
    case 'Colon':
      return `<path d="M ${pos.x-28} ${pos.y+6} L ${pos.x-28} ${pos.y-12} L ${pos.x+28} ${pos.y-12} L ${pos.x+28} ${pos.y+10} L ${pos.x-4} ${pos.y+10}" fill="none" stroke="${fill}" stroke-width="5" class="${cls}" ${eh} ${da} opacity=".8" stroke-linejoin="round"/>`;
    case 'Bladder':
      return `<ellipse cx="${pos.x}" cy="${pos.y}" rx="12" ry="10" fill="${fill}" class="${cls}" ${eh} ${da} opacity=".9"/>`;
    case 'Prostate':
      return `<ellipse cx="${pos.x}" cy="${pos.y}" rx="8" ry="6" fill="${fill}" class="${cls}" ${eh} ${da} opacity=".9"/>`;
    case 'Ovary':
      return `<ellipse cx="${pos.x}" cy="${pos.y}" rx="6" ry="4" fill="${fill}" class="${cls}" ${eh} ${da} opacity=".9"/>
              <ellipse cx="${pos.x+32}" cy="${pos.y}" rx="6" ry="4" fill="${fill}" class="${cls}" ${eh} ${da} opacity=".9"/>`;
    case 'Uterus':
      return `<path d="M ${pos.x-14} ${pos.y} L ${pos.x-10} ${pos.y+14} L ${pos.x+10} ${pos.y+14} L ${pos.x+14} ${pos.y} Q ${pos.x+8} ${pos.y-8} ${pos.x} ${pos.y-6} Q ${pos.x-8} ${pos.y-8} ${pos.x-14} ${pos.y} Z" fill="${fill}" class="${cls}" ${eh} ${da} opacity=".9"/>`;
    case 'Cervix':
      return `<rect x="${pos.x-5}" y="${pos.y-4}" width="10" height="9" rx="2" fill="${fill}" class="${cls}" ${eh} ${da} opacity=".9"/>`;
    case 'Testis':
      return `<ellipse cx="${pos.x-7}" cy="${pos.y}" rx="6" ry="8" fill="${fill}" class="${cls}" ${eh} ${da} opacity=".9"/>
              <ellipse cx="${pos.x+7}" cy="${pos.y}" rx="6" ry="8" fill="${fill}" class="${cls}" ${eh} ${da} opacity=".9"/>`;
    case 'Skin':
      return `<rect x="${pos.x-12}" y="${pos.y-12}" width="24" height="24" rx="4" fill="${fill}" class="${cls}" ${eh} ${da}/>`;
    case 'Adipose_Tissue':
      return `<circle cx="${pos.x}" cy="${pos.y}" r="11" fill="${fill}" class="${cls}" ${eh} ${da}/>`;
    case 'Muscle':
      return `<path d="M ${pos.x-12} ${pos.y-8} Q ${pos.x} ${pos.y-14} ${pos.x+12} ${pos.y-8} L ${pos.x+12} ${pos.y+8} Q ${pos.x} ${pos.y+14} ${pos.x-12} ${pos.y+8} Z" fill="${fill}" class="${cls}" ${eh} ${da}/>`;
    case 'Bone':
      return `<rect x="${pos.x-12}" y="${pos.y-5}" width="24" height="10" rx="5" fill="${fill}" class="${cls}" ${eh} ${da}/>`;
    case 'Soft_Tissue':
      return `<ellipse cx="${pos.x}" cy="${pos.y}" rx="13" ry="9" fill="${fill}" class="${cls}" ${eh} ${da}/>`;
    case 'Blood':
      return `<circle cx="${pos.x}" cy="${pos.y}" r="11" fill="${fill}" class="${cls}" ${eh} ${da}/>`;
    case 'Bone_Marrow':
      return `<circle cx="${pos.x}" cy="${pos.y}" r="10" fill="${fill}" class="${cls}" ${eh} ${da}/>`;
    case 'Lymph_Node':
      return `<circle cx="${pos.x}" cy="${pos.y}" r="6" fill="${fill}" class="${cls}" ${eh} ${da}/>
              <circle cx="${pos.x+12}" cy="${pos.y+8}" r="5" fill="${fill}" class="${cls}" ${eh} ${da}/>
              <circle cx="${pos.x-10}" cy="${pos.y+10}" r="4" fill="${fill}" class="${cls}" ${eh} ${da}/>`;
    case 'Nerve':
      return `<path d="M ${pos.x-12} ${pos.y-10} Q ${pos.x} ${pos.y-4} ${pos.x-6} ${pos.y+4} Q ${pos.x+8} ${pos.y+8} ${pos.x+12} ${pos.y+14}" fill="none" stroke="${fill}" stroke-width="3" class="${cls}" ${eh} ${da} stroke-linecap="round"/>`;
    case 'Multiple_Organs':
      return `<circle cx="${pos.x-6}" cy="${pos.y-4}" r="5" fill="${fill}" class="${cls}" ${eh} ${da}/>
              <circle cx="${pos.x+6}" cy="${pos.y-4}" r="5" fill="${fill}" class="${cls}" ${eh} ${da}/>
              <circle cx="${pos.x}" cy="${pos.y+6}" r="5" fill="${fill}" class="${cls}" ${eh} ${da}/>`;
    default:
      return `<circle cx="${pos.x}" cy="${pos.y}" r="6" fill="${fill}" class="${cls}" ${eh} ${da}/>`;
  }
}

function renderBody(){
  const all=Object.keys(ORGANS);
  let organHTML='', calloutHTML='';
  all.forEach(o=>{
    const pos=ORGANS[o];
    organHTML+=organShape(o,pos);
    calloutHTML+=callout(o,pos);
  });

  document.getElementById('bw').innerHTML=`
  <svg viewBox="0 0 420 720" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sk" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#202840"/>
        <stop offset="100%" stop-color="#141a2b"/>
      </linearGradient>
    </defs>
    <ellipse cx="210" cy="56" rx="36" ry="42" fill="url(#sk)" class="body-out"/>
    <path d="M 192 92 Q 192 108 198 120 L 222 120 Q 228 108 228 92 Z" fill="url(#sk)" class="body-out"/>
    <path d="M 150 128 Q 160 122 198 120 L 222 120 Q 260 122 270 128
             L 280 160 Q 286 200 282 250 L 274 320 Q 268 360 260 388
             L 252 410 L 168 410 L 160 388 Q 152 360 146 320 L 138 250
             Q 134 200 140 160 Z" fill="url(#sk)" class="body-out"/>
    <path d="M 150 128 Q 122 138 110 168 L 100 240 Q 96 280 102 310 L 110 340
             Q 116 360 122 360 L 130 360 Q 134 340 130 310 L 124 240
             Q 124 200 132 170 Q 138 150 150 140 Z" fill="url(#sk)" class="body-out"/>
    <path d="M 270 128 Q 298 138 310 168 L 320 240 Q 324 280 318 310 L 310 340
             Q 304 360 298 360 L 290 360 Q 286 340 290 310 L 296 240
             Q 296 200 288 170 Q 282 150 270 140 Z" fill="url(#sk)" class="body-out"/>
    <path d="M 168 410 L 252 410 L 258 440 L 220 460 L 200 460 L 162 440 Z" fill="url(#sk)" class="body-out"/>
    <path d="M 162 440 L 200 460 L 196 560 Q 192 620 184 660 Q 180 690 170 700
             L 156 700 Q 150 680 152 640 L 154 560 Q 156 500 162 460 Z" fill="url(#sk)" class="body-out"/>
    <path d="M 258 440 L 220 460 L 224 560 Q 228 620 236 660 Q 240 690 250 700
             L 264 700 Q 270 680 268 640 L 266 560 Q 264 500 258 460 Z" fill="url(#sk)" class="body-out"/>
    <line x1="210" y1="128" x2="210" y2="395" class="body-inner"/>
    ${calloutHTML}
    ${organHTML}
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
  document.querySelectorAll('[data-o]').forEach(x=>{
    if(x.closest('.olist')) return;
    x.classList.toggle('hi',x.dataset.o===o);
  });
  document.querySelectorAll('[data-cb]').forEach(x=>x.classList.toggle('hi',x.dataset.cb===o));
  document.querySelectorAll('[data-lead]').forEach(x=>x.classList.toggle('hi',x.dataset.lead===o));

  const col=COL[o]||'#888';
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
    const lw=d.toLowerCase();
    const healthyTag=(lw===''||lw==='normal'||lw==='healthy'||lw==='not specified'||lw.includes('normal')||lw.includes('healthy'));
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
        data:{labels:top8.map(d=>d[0].length>18?d[0].slice(0,18)+'…':d[0]),datasets:[{data:top8.map(d=>d[1]),backgroundColor:col+'cc',borderRadius:6,borderSkipped:false}]},
        options:{indexAxis:'y',responsive:true,plugins:{legend:{display:false}},
          scales:{x:{grid:{color:'#2d3a52'},ticks:{color:'#94a3b8',font:{family:'Inter',size:9}}},
                  y:{grid:{display:false},ticks:{color:'#94a3b8',font:{family:'Inter',size:9}}}}}
      }));
    }
  });
}
