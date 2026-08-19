const SHEET='1M6hc3vmk1bNchMvEwXsIyyO5iq3mAzP877HTXzhzg38';
const GID='1072380314';
const SHEET_CSV=`https://docs.google.com/spreadsheets/d/${SHEET}/export?format=csv&gid=${GID}`;
const SHEET_VIEW=`https://docs.google.com/spreadsheets/d/${SHEET}/edit?gid=${GID}`;

/* Result files live in tmt-projects → Projects/<PID>/ */
const GH_REPO='https://github.com/arinaatom-cyber/tmt-projects';
const GH_RESULTS_PATH='Projects';
const ghProjectFolder=(rowOrId)=>{
  const raw=typeof rowOrId==='string'?rowOrId.trim():(rowOrId?.ghFolder||rowOrId?.projectId||rowOrId?.['Project ID']||rowOrId?.pid||'').trim();
  if(!raw) return '';
  if (/^IPX\d+\s*\(PXD\d+\)/i.test(raw)) return raw;
  return raw;
};
const ghResultsUrl=(rowOrId)=>`${GH_REPO}/tree/main/${GH_RESULTS_PATH}/${encodeURIComponent(ghProjectFolder(rowOrId))}`;
const ghSearchUrl =pid=>`${GH_REPO}/search?q=${encodeURIComponent(pid)}&type=code`;
const pubmedUrl   =pmid=>`https://pubmed.ncbi.nlm.nih.gov/${encodeURIComponent(pmid)}/`;
const prideUrl    =pid =>`https://www.ebi.ac.uk/pride/archive/projects/${encodeURIComponent(pid)}`;
const MAP_BUILD='20260620-pro13';

/* Minimal stroke icons (24×24) — no emoji, consistent professional UI */
const ICO={
  search:'<circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/>',
  atlas:'<circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><line x1="2" y1="12" x2="22" y2="12"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
  moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  brain:'<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>',
  heart:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  lung:'<path d="M12 4c-2 0-4 2-4 5v9c0 1.1.9 2 2 2h1v-7H8V9c0-2.2 1.8-4 4-4s4 1.8 4 4v4h-3v7h1c1.1 0 2-.9 2-2V9c0-3-2-5-4-5Z"/>',
  digest:'<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  flask:'<path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>',
  droplet:'<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  female:'<circle cx="12" cy="9" r="5"/><line x1="12" y1="14" x2="12" y2="22"/><line x1="9" y1="18" x2="15" y2="18"/>',
  male:'<circle cx="10" cy="14" r="5"/><line x1="19" y1="5" x2="13.5" y2="10.5"/><polyline points="15 5 19 5 19 9"/>',
  immune:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  bone:'<path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 1 0 0 5 .5.5 0 0 1 .5.5 2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"/>',
  box:'<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  body:'<circle cx="12" cy="5" r="2"/><path d="M12 7v3M9 20v-8l-2-4h10l-2 4v8"/><path d="M9 12h6"/>',
  projects:'<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
  organs:'<circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  db:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>',
  tmt:'<path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/>',
  sample:'<path d="M14 2v6a2 2 0 0 0 2 2h4"/><path d="M4 7V4a2 2 0 0 1 2-2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z"/>',
  check:'<path d="M20 6 9 17l-5-5"/>',
  warn:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  github:'<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-.88.28-1.85 0-2.73 0 0-1 0-3 1.5A10.35 10.35 0 0 0 12 6c-1.09 0-2.16.1-3.19.32-2-1.5-3-1.5-3-1.5-.28.88-.28 1.85 0 2.73-.73 1.02-1.08 2.25-1 3.5C4 16 7 18 10 18.5a4.8 4.8 0 0 0-1 3.5v4"/>'
};
function iconSvg(n,c='ico'){
  const p=ICO[n]||ICO.box;
  return `<svg class="${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
}
function applyThemeBtn(theme){
  const b=document.getElementById('themeBtn');
  if(b) b.innerHTML=iconSvg(theme==='light'?'moon':'sun','ico ico-btn');
}

/* Pin all Chart.js text to the site font (Inter) for typographic consistency */
if(typeof window!=='undefined'&&window.Chart&&Chart.defaults){
  Chart.defaults.font.family="'Inter',system-ui,-apple-system,sans-serif";
  Chart.defaults.color='#94a3b8';
}

/* Fixed atlas reference subjects — two central-reference models (NOT clinical norms).
   Sources: CAP organ-weight tables (masses), Radiopaedia / Radiology Key (linear sizes),
   Cleveland Clinic / StatPearls (GI & urinary), PubMed radiology, NLM Visible Human (3D coords). */
const REFERENCE_MODELS={
  female:{id:'adult_nulliparous_nonpregnant_female_30y_165cm_65kg', age:30, height_cm:165, weight_kg:65},
  male:{id:'adult_male_30y_175cm_80kg', age:30, height_cm:175, weight_kg:80},
  value_type:'central_atlas_reference', clinical_use:false
};
/* [ruName, enName, femaleRu, maleRu, femaleEn, maleEn]  ('—' = not applicable for that sex) */
const ORGAN_REF=[
  ['Головной мозг','Brain','1300 г','1440 г','1300 g','1440 g'],
  ['Сердце','Heart','12 × 8,5 × 6 см · 300 г','12 × 8,5 × 6 см · 380 г','12 × 8.5 × 6 cm · 300 g','12 × 8.5 × 6 cm · 380 g'],
  ['Правое лёгкое','Right lung','высота 24 см · 400 г','высота 24 см · 525 г','height 24 cm · 400 g','height 24 cm · 525 g'],
  ['Левое лёгкое','Left lung','высота 24 см · 340 г','высота 24 см · 460 г','height 24 cm · 340 g','height 24 cm · 460 g'],
  ['Трахея','Trachea','11 × 1,8 см','11 × 1,8 см','11 × 1.8 cm','11 × 1.8 cm'],
  ['Пищевод','Esophagus','длина 29 см · ⌀ 1,9 см','длина 29 см · ⌀ 1,9 см','length 29 cm · ⌀ 1.9 cm','length 29 cm · ⌀ 1.9 cm'],
  ['Печень','Liver','CC 11,5 см; попереч. 21,5 см · 1500 г','CC 11,5 см; попереч. 21,5 см · 1754 г','CC 11.5 cm; transv. 21.5 cm · 1500 g','CC 11.5 cm; transv. 21.5 cm · 1754 g'],
  ['Жёлчный пузырь','Gallbladder','8,5 × 3,5 см · 50 мл · стенка 2 мм','8,5 × 3,5 см · 50 мл · стенка 2 мм','8.5 × 3.5 cm · 50 mL · wall 2 mm','8.5 × 3.5 cm · 50 mL · wall 2 mm'],
  ['Селезёнка','Spleen','12 × 7,5 × 2,5 см · 130 г','12 × 7,5 × 2,5 см · 170 г','12 × 7.5 × 2.5 cm · 130 g','12 × 7.5 × 2.5 cm · 170 g'],
  ['Поджелудочная железа','Pancreas','длина 16 см (головка 2,2 / тело 1,1 / хвост 2,1 см AP)','то же','length 16 cm (head 2.2 / body 1.1 / tail 2.1 cm AP)','same'],
  ['Правая почка','Right kidney','11 × 4 × 3 см · 130 г','12 × 4,5 × 3 см · 160 г','11 × 4 × 3 cm · 130 g','12 × 4.5 × 3 cm · 160 g'],
  ['Левая почка','Left kidney','11,2 × 4 × 3 см · 130 г','12,2 × 4,5 × 3 см · 170 г','11.2 × 4 × 3 cm · 130 g','12.2 × 4.5 × 3 cm · 170 g'],
  ['Надпочечник (каждый)','Adrenal gland (each)','4,5 × 3 × 0,8 см','4,5 × 3 × 0,8 см','4.5 × 3 × 0.8 cm','4.5 × 3 × 0.8 cm'],
  ['Щитовидная, доля','Thyroid lobe','5 × 1,6 × 1,5 см','5 × 1,6 × 1,5 см','5 × 1.6 × 1.5 cm','5 × 1.6 × 1.5 cm'],
  ['Щитовидная, объём','Thyroid volume','12 мл','15 мл','12 mL','15 mL'],
  ['Перешеек щитовидной','Thyroid isthmus','толщина 0,3 см','толщина 0,3 см','thickness 0.3 cm','thickness 0.3 cm'],
  ['Гипофиз','Pituitary','высота 9 мм','высота 8 мм','height 9 mm','height 8 mm'],
  ['Эпифиз','Pineal gland','7 × 6 × 3 мм','7 × 6 × 3 мм','7 × 6 × 3 mm','7 × 6 × 3 mm'],
  ['Паращитовидная (одна)','Parathyroid (one)','6,5 × 5 × 3,5 мм','6,5 × 5 × 3,5 мм','6.5 × 5 × 3.5 mm','6.5 × 5 × 3.5 mm'],
  ['Тимус (взрослый)','Thymus (adult)','толщина 1,0 см','толщина 1,0 см','thickness 1.0 cm','thickness 1.0 cm'],
  ['Желудок, пустой','Stomach (empty)','45 мл · стенка 2–3 мм','45 мл · стенка 2–3 мм','45 mL · wall 2–3 mm','45 mL · wall 2–3 mm'],
  ['Желудок, наполненный','Stomach (filled)','290 мл','290 мл','290 mL','290 mL'],
  ['Двенадцатиперстная кишка','Duodenum','длина 27 см','длина 27 см','length 27 cm','length 27 cm'],
  ['Тонкая кишка','Small intestine','длина 670 см · ⌀ 2,5 см','длина 670 см · ⌀ 2,5 см','length 670 cm · ⌀ 2.5 cm','length 670 cm · ⌀ 2.5 cm'],
  ['Толстая кишка','Colon','длина 155 см','длина 145 см','length 155 cm','length 145 cm'],
  ['Мочеточник (каждый)','Ureter (each)','длина 26 см','длина 26 см','length 26 cm','length 26 cm'],
  ['Мочевой пузырь','Bladder','350 мл (емкость)','350 мл (емкость)','350 mL (capacity)','350 mL (capacity)'],
  ['Матка (нерожавшая)','Uterus (nulliparous)','7,2 × 4,0 × 3,0 см · 50 мл','—','7.2 × 4.0 × 3.0 cm · 50 mL','—'],
  ['Шейка матки','Cervix','длина 3 см','—','length 3 cm','—'],
  ['Яичник (каждый)','Ovary (each)','3,5 × 2,5 × 1,5 см · 6,5 мл','—','3.5 × 2.5 × 1.5 cm · 6.5 mL','—'],
  ['Маточная труба (каждая)','Fallopian tube (each)','длина 11 см · ⌀ 2 мм','—','length 11 cm · ⌀ 2 mm','—'],
  ['Влагалище','Vagina','длина 6,3 см · ширина 3,25 см','—','length 6.3 cm · width 3.25 cm','—'],
  ['Женская уретра','Female urethra','длина 4 см','—','length 4 cm','—'],
  ['Предстательная железа','Prostate','—','3 × 4 × 2 см · 25 мл','—','3 × 4 × 2 cm · 25 mL'],
  ['Яичко (каждое)','Testis (each)','—','4 × 3 × 2,5 см · 20 мл','—','4 × 3 × 2.5 cm · 20 mL'],
  ['Придаток яичка','Epididymis','—','длина 6,5 см','—','length 6.5 cm'],
  ['Семенной пузырёк (каждый)','Seminal vesicle (each)','—','длина 4,5 см · ⌀ 1,5 см','—','length 4.5 cm · ⌀ 1.5 cm'],
  ['Мужская уретра','Male urethra','—','длина 19 см','—','length 19 cm']
];

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
const FEMALE_ONLY=new Set(['Uterus','Ovary','Cervix','Breast']);
const MALE_ONLY=new Set(['Prostate','Testis']);
const MAP_MODE='dual'; /* 'dual' | 'single' — set 'single' to restore one combined body */
const MAP_HIDE_SIDEBAR=true; /* dual: hide left organ list (Nervous, Digestive, …) */
const MAP_DUAL_LABELS=true; /* dual: organ labels L+R per figure (white, full size) */
const MAP_DUAL_PAD_L=36;
const MAP_DUAL_GAP=24;

const I18N={
  ru:{
    loading:'Загрузка данных…',subtitle:'Интерактивная карта экспрессии тканей',
    searchPh:'Орган, PXD, PMID…',allTmt:'Все TMT',allSamples:'Все образцы',
    cancerOnly:'Только cancer',normalOnly:'Только normal',exportAll:'Экспорт CSV (все)',
    about:'О проекте',close:'Закрыть',bodyCap:'Женщина (слева) · мужчина (справа) · подписи слева и справа',
    anatomyNote:'Схематический вид спереди. Органы не в масштабе. Забрюшинные органы показаны в передней проекции.',
    noMapProjects:'Нет проектов при текущем фильтре',
    pickOrgan:'Клик по органу на карте или в подписи',footer:'Human Proteome Atlas · TMT протеомика',
    aboutTitle:'О атласе',aboutP1:'Интерактивная карта TMT-протеомных проектов по органам. Данные из Google Sheets (PRIDE, CPTAC, PDC).',
    aboutP2:'Группировка органов согласована со справочником MSD Manual (Merck Manual): основные системы органов человека.',
    sysRefTitle:'Основные системы органов (MSD Manual)',
    refTitle:'Референс-размеры органов (эталон атласа)',
    refSubject:'Модели: Ж — нерожавшая небеременная, 30 л, 165 см, 65 кг · М — 30 л, 175 см, 80 кг',
    refClinical:'value_type = central_atlas_reference · clinical_use = false. Одно центральное значение на орган для единообразия карты, не клиническая норма (без поправки на рост, вес, возраст, метод измерения).',
    refColOrgan:'Орган',refColFemale:'Женщина',refColMale:'Мужчина',
    refSources:'Пропорции: CAP (массы), Radiopaedia / Radiology Key (размеры), Visible Human (3D). См. таблицу выше.',
    allOrgansTitle:'Все органы по системам',
    allOrgansHint:'Полный перечень органов (классификация MSD Manual). На карте показаны органы, которые можно изобразить на силуэте; остальные перечислены и подписаны здесь и в таблице референс-размеров («О проекте»).',
    litTitle:'Литература и источники',
    litHint:'Размеры и массы органов — радиологические и патологоанатомические референсы; координаты — атласы 3D-анатомии. Не для клинической диагностики.',
    mapOnly:'на карте',offMap:'вне карты (подпись)',
    methods:'Методы',m1:'Один Project ID = один проект (при двойной записи — PXD).',
    m2:'Мульти-органные строки учитываются по каждому органу; ≥3 органа → Multiple Organs.',
    m3:'Пан-органные атласы (≥8 органов) — бейдж PAN-ORGAN.',m4:'Диагнозы группируются (NSCLC → Lung cancer).',
    cite:'Цитирование',exportOrgan:'Экспорт органа',extras:'Дополнительно',
    compare:'Сравнение двух органов',compareHint:'Выберите два органа и нажмите «Сравнить»',runCompare:'Сравнить',
    panBadge:'PAN-ORGAN',projects:'проектов',proteins:'белков',rows:'строк',organs:'органов',databases:'баз',
    tmtFormats:'форматов TMT',sampleTypes:'типов образцов',validOk:'Данные загружены',
    navMap:'Карта',navAbout:'О проекте',navGithub:'GitHub',navMethods:'Методы',
    footerGithub:'GitHub',footerMethods:'Методы',footerSheet:'Каталог',
    uvpTitle:'Атлас TMT-протеомики человека',
    patients:'пациентов',samples:'образцов',patientsShort:'пациент.',samplesShort:'обр.',
    sumPatients:'Σ пациентов',sumSamples:'Σ образцов',
    patSampHint:'Пациенты/доноры и Total Samples — из таблицы; для PDC — из Atlas summary (*_summary.csv). Для клеточных линий пациенты = 0. Часть значений Total Samples (не PDC) отражает каналы/файлы TMT, а не биообразцы — суммы приблизительные.',
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
    sheetCountHint:'Proteins Quantified — из таблицы; для PDC — уникальные UniProt из Atlas summary.',
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
    about:'About',close:'Close',bodyCap:'Female (left) · Male (right) · labels on both sides',
    anatomyNote:'Schematic anterior view. Organs are not shown to scale. Retroperitoneal organs are projected onto the anterior view.',
    noMapProjects:'No projects with current filters',
    pickOrgan:'Click an organ on the map or its label',footer:'Human Proteome Atlas · TMT proteomics',
    aboutTitle:'About the Atlas',aboutP1:'Interactive map of TMT proteomics projects by organ. Data from Google Sheets.',
    aboutP2:'Organ grouping follows the MSD Manual (Merck Manual) classification of major human organ systems.',
    sysRefTitle:'Major organ systems (MSD Manual)',
    refTitle:'Reference organ sizes (atlas central reference)',
    refSubject:'Models: F — nulliparous non-pregnant, 30 y, 165 cm, 65 kg · M — 30 y, 175 cm, 80 kg',
    refClinical:'value_type = central_atlas_reference · clinical_use = false. One central value per organ for map consistency, not a clinical norm (no adjustment for height, weight, age, or measurement method).',
    refColOrgan:'Organ',refColFemale:'Female',refColMale:'Male',
    refSources:'Proportions: CAP (masses), Radiopaedia / Radiology Key (sizes), Visible Human (3D). See table above.',
    allOrgansTitle:'All organs by system',
    allOrgansHint:'Full organ list (MSD Manual classification). Organs that can be drawn are shown on the silhouette; the rest are listed and labeled here and in the reference-size table (About).',
    litTitle:'Literature & sources',
    litHint:'Organ sizes and masses are radiology / autopsy reference values; coordinates come from 3D anatomy atlases. Not for clinical diagnosis.',
    mapOnly:'on map',offMap:'off-map (label)',
    methods:'Methods',m1:'One Project ID = one project (PXD when dual-listed).',
    m2:'Multi-organ rows count per organ; ≥3 organs → Multiple Organs.',
    m3:'Pan-organ atlases (≥8 organs) show PAN-ORGAN badge.',m4:'Disease labels are grouped (e.g. NSCLC → Lung cancer).',
    cite:'Citation',exportOrgan:'Export organ',extras:'More',
    compare:'Compare two organs',compareHint:'Pick two organs and click Compare',runCompare:'Compare',
    panBadge:'PAN-ORGAN',projects:'projects',proteins:'proteins',rows:'rows',organs:'organs',databases:'databases',
    tmtFormats:'TMT formats',sampleTypes:'sample types',validOk:'Data loaded',
    navMap:'Map',navAbout:'About',navGithub:'GitHub',navMethods:'Methods',
    footerGithub:'GitHub',footerMethods:'Methods',footerSheet:'Catalog',
    uvpTitle:'Human TMT proteomics atlas',
    patients:'patients',samples:'samples',patientsShort:'pat.',samplesShort:'smp.',
    sumPatients:'Σ patients',sumSamples:'Σ samples',
    patSampHint:'Patients/donors and Total Samples come from the sheet; for PDC they come from each Atlas summary (*_summary.csv). Cell-line studies have 0 patients. Some non-PDC Total Samples values reflect TMT channels/files rather than biological samples — sums are approximate.',
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
    sheetCountHint:'Proteins Quantified — from the sheet; for PDC — unique UniProt from Atlas summary.',
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
let lang=localStorage.getItem('hpa-lang')||'en';
function t(k){return (I18N[lang]||I18N.ru)[k]||k;}
function L(ru,en){return lang==='ru'?ru:en;}
const ORGAN_LABELS={
  ru:{
    Liver:'Печень',Lung:'Лёгкие',Heart:'Сердце',Brain:'Головной мозг',Kidney:'Почки',
    Stomach:'Желудок',Pancreas:'Поджелудочная железа',Spleen:'Селезёнка',Colon:'Толстая кишка',
    Gallbladder:'Жёлчный пузырь',Appendix:'Аппендикс',Thymus:'Тимус',
    Breast:'Молочная железа',Prostate:'Предстательная железа',Ovary:'Яичники',Uterus:'Матка',
    Cervix:'Шейка матки',Testis:'Семенники',Small_Intestine:'Тонкая кишка',
    Salivary_Gland:'Слюнные железы',Pituitary:'Гипофиз',Thyroid:'Щитовидная железа',
    Bladder:'Мочевой пузырь',Skin:'Кожа',Muscle:'Мышцы',Bone:'Кости',
    Blood:'Кровь',Bone_Marrow:'Костный мозг',Lymph_Node:'Лимфоузлы',
    Esophagus:'Пищевод',Adrenal_Gland:'Надпочечники',Eye:'Глаза',Nerve:'Нервы',
    Adipose_Tissue:'Жировая ткань',Soft_Tissue:'Мягкие ткани',
    Multiple_Organs:'Несколько органов',Other:'Другое'
  },
  en:{
    Liver:'Liver',Lung:'Lungs',Heart:'Heart',Brain:'Brain',Kidney:'Kidneys',
    Stomach:'Stomach',Pancreas:'Pancreas',Spleen:'Spleen',Colon:'Large intestine',
    Gallbladder:'Gallbladder',Appendix:'Appendix',Thymus:'Thymus',
    Breast:'Breast tissue',Prostate:'Prostate',Ovary:'Ovaries',Uterus:'Uterus',
    Cervix:'Uterine cervix',Testis:'Testes',Small_Intestine:'Small intestine',
    Salivary_Gland:'Salivary glands',Pituitary:'Pituitary gland',Thyroid:'Thyroid gland',
    Bladder:'Bladder',Skin:'Skin',Muscle:'Muscle',Bone:'Bones',
    Blood:'Blood',Bone_Marrow:'Bone marrow',Lymph_Node:'Lymph nodes',
    Esophagus:'Esophagus',Adrenal_Gland:'Adrenal glands',Eye:'Eyes',Nerve:'Nerves',
    Adipose_Tissue:'Adipose tissue',Soft_Tissue:'Soft tissue',
    Multiple_Organs:'Multiple organs',Other:'Other'
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
function toggleLang(){lang=lang==='ru'?'en':'ru';localStorage.setItem('hpa-lang',lang);i18nApply();refreshAll();if(document.getElementById('aboutModal')?.classList.contains('open')){renderSysRef();renderOrganRef();}}

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
  renderOrganRef();
}
function renderSysRef(){
  const el=document.getElementById('sysRefTable');
  if(!el) return;
  el.innerHTML=`<table class="sys-ref"><thead><tr><th>${lang==='ru'?'Система':'System'}</th><th>${lang==='ru'?'Органы на карте':'Organs on map'}</th></tr></thead><tbody>`+
    GRP.map(g=>`<tr><td>${esc(grpTitle(g))}</td><td>${g.o.map(organDisplayName).join(' · ')}</td></tr>`).join('')+
    `</tbody></table>`;
}
/* Full organ inventory by MSD system. map = ANATOMY key when drawn on the silhouette;
   entries without map are "taken out" and only labeled (off-map). */
const ORGAN_SYSTEMS=[
  {tKey:'sysNervous', items:[
    {ru:'Головной мозг',en:'Brain',map:'Brain'},{ru:'Спинной мозг',en:'Spinal cord'},
    {ru:'Нервы',en:'Nerves'},{ru:'Гипофиз',en:'Pituitary',map:'Pituitary'},
    {ru:'Эпифиз',en:'Pineal gland'},{ru:'Глаза',en:'Eyes',map:'Eye'}]},
  {tKey:'sysEndocrine', items:[
    {ru:'Щитовидная железа',en:'Thyroid',map:'Thyroid'},{ru:'Паращитовидные железы',en:'Parathyroid glands'},
    {ru:'Надпочечники',en:'Adrenal glands',map:'Adrenal_Gland'},{ru:'Тимус',en:'Thymus',map:'Thymus'}]},
  {tKey:'sysCardio', items:[
    {ru:'Сердце',en:'Heart',map:'Heart'},{ru:'Кровеносные сосуды',en:'Blood vessels'},
    {ru:'Кровь',en:'Blood'}]},
  {tKey:'sysResp', items:[
    {ru:'Нос / глотка / гортань',en:'Nose / pharynx / larynx'},{ru:'Трахея',en:'Trachea'},
    {ru:'Бронхи',en:'Bronchi'},{ru:'Лёгкие',en:'Lungs',map:'Lung'}]},
  {tKey:'sysDigest', items:[
    {ru:'Слюнные железы',en:'Salivary glands',map:'Salivary_Gland'},{ru:'Пищевод',en:'Esophagus',map:'Esophagus'},
    {ru:'Желудок',en:'Stomach',map:'Stomach'},{ru:'Двенадцатиперстная кишка',en:'Duodenum'},
    {ru:'Тонкая кишка',en:'Small intestine',map:'Small_Intestine'},{ru:'Толстая кишка',en:'Large intestine',map:'Colon'},
    {ru:'Аппендикс',en:'Appendix',map:'Appendix'},{ru:'Прямая кишка',en:'Rectum'},
    {ru:'Печень',en:'Liver',map:'Liver'},{ru:'Жёлчный пузырь',en:'Gallbladder',map:'Gallbladder'},
    {ru:'Поджелудочная железа',en:'Pancreas',map:'Pancreas'},{ru:'Селезёнка',en:'Spleen',map:'Spleen'}]},
  {tKey:'sysUrinary', items:[
    {ru:'Почки',en:'Kidneys',map:'Kidney'},{ru:'Мочеточники',en:'Ureters'},
    {ru:'Мочевой пузырь',en:'Bladder',map:'Bladder'},{ru:'Мочеиспускательный канал',en:'Urethra'}]},
  {tKey:'sysFemale', items:[
    {ru:'Яичники',en:'Ovaries',map:'Ovary'},{ru:'Маточные трубы',en:'Fallopian tubes'},
    {ru:'Матка',en:'Uterus',map:'Uterus'},{ru:'Шейка матки',en:'Cervix',map:'Cervix'},
    {ru:'Влагалище',en:'Vagina'}]},
  {tKey:'sysMale', items:[
    {ru:'Яички',en:'Testes',map:'Testis'},{ru:'Придаток яичка',en:'Epididymis'},
    {ru:'Семенные пузырьки',en:'Seminal vesicles'},{ru:'Предстательная железа',en:'Prostate',map:'Prostate'},
    {ru:'Половой член',en:'Penis'}]},
  {tKey:'sysImmune', items:[
    {ru:'Костный мозг',en:'Bone marrow'},{ru:'Лимфоузлы',en:'Lymph nodes'},
    {ru:'Тимус',en:'Thymus'},{ru:'Селезёнка',en:'Spleen'}]},
  {tKey:'sysMSK', items:[
    {ru:'Кожа',en:'Skin'},{ru:'Кости',en:'Bones'},{ru:'Мышцы',en:'Muscles'},
    {ru:'Молочная железа',en:'Breast',map:'Breast'},{ru:'Жировая ткань',en:'Adipose tissue'},
    {ru:'Мягкие ткани',en:'Soft tissue'}]}
];
function renderSiteSections(){ /* bottom sections removed — map-only UI */ }

function renderOrganRef(){
  const el=document.getElementById('organRefTable');
  if(!el) return;
  const isRu=lang==='ru';
  const rows=ORGAN_REF.map(([ruN,enN,fRu,mRu,fEn,mEn])=>
    `<tr><td>${esc(isRu?ruN:enN)}</td><td>${esc(isRu?fRu:fEn)}</td><td>${esc(isRu?mRu:mEn)}</td></tr>`).join('');
  el.innerHTML=`<p class="ref-subject">${esc(t('refSubject'))}</p>`+
    `<table class="sys-ref"><thead><tr><th>${t('refColOrgan')}</th><th>${t('refColFemale')}</th><th>${t('refColMale')}</th></tr></thead><tbody>${rows}</tbody></table>`+
    `<p class="ref-clinical">${esc(t('refClinical'))}</p>`+
    `<p class="ref-sources">${esc(t('refSources'))}</p>`;
}
function closeAboutNoop(){}
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
function renderUvp(){
  const el=document.getElementById('uvp');
  if(!el) return;
  const proj=META.uniqPids||D.length;
  const org=Object.keys(C).filter(o=>!['Multiple_Organs','Other'].includes(o)).length;
  let pat=0;const seen=new Set();
  D.forEach(r=>{if(seen.has(r.pid))return;seen.add(r.pid);if(r.patients!=null)pat+=r.patients;});
  el.innerHTML=`<h2>${t('uvpTitle')}</h2>`+
    `<span class="uvp-sub"><b>${proj}</b> ${t('projects')} · <b>${pat.toLocaleString()}</b> ${t('patients')} · `+
    `<b>${org}</b> ${t('organs')} · PRIDE · CPTAC/PDC · iProX</span>`;
}
function initStaticIcons(){
  const set=(id,n,c)=>{const e=document.getElementById(id);if(e)e.innerHTML=iconSvg(n,c);};
  set('logoIco','atlas','ico');
  set('globalSearchIco','search','ico ico-search');
  set('placeholderIco','body','ico');
  set('footerGhIco','github','ico');
  applyThemeBtn(document.documentElement.getAttribute('data-theme')||'dark');
}
function refreshAll(){
  initStaticIcons();
  buildHeader();
  const dualMap=MAP_MODE==='dual';
  const hideSide=dualMap&&MAP_HIDE_SIDEBAR;
  const app=document.querySelector('.app');
  const uvp=document.getElementById('uvp');
  if(uvp) uvp.style.display=hideSide?'none':'';
  if(app) app.classList.toggle('map-click-only',hideSide);
  document.body.classList.toggle('map-layout',hideSide);
  const lp=document.getElementById('lp');
  if(lp){
    if(hideSide){ lp.innerHTML=''; lp.setAttribute('aria-hidden','true'); }
    else{ lp.removeAttribute('aria-hidden'); buildSidebar(); }
  }
  renderBody();fillFilterSelects();renderLegend();
  renderAtlasMaterialChart();renderSiteSections();renderUvp();
  const cap=document.getElementById('bodyCaption');
  if(cap) cap.textContent=dualMap?t('bodyCap'):`${t('bodyCap')} · map ${MAP_BUILD}`;
  const anNote=document.getElementById('bodyAnatomyNote');
  if(anNote) anNote.textContent=t('anatomyNote');
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
  const statIco={projects:'projects',rows:'sample',organs:'organs',databases:'db',tmtFormats:'tmt',sampleTypes:'sample'};
  const statKeys=['projects','rows','organs','databases','tmtFormats','sampleTypes'];
  const statVals=[uniqPid,rows.length,tis,dbs,tmt,types];
  document.getElementById('hs').innerHTML=statKeys.map((k,i)=>
    `<div class="hstat"><div class="hstat-ico">${iconSvg(statIco[k],'ico ico-stat')}</div><div class="v">${statVals[i]}</div><div class="l">${t(k)}</div></div>`
  ).join('');
  const vb=document.getElementById('validBanner');
  if(vb){
    const ok=META.uniqPids===uniqPid&&!F.q&&!F.tmt&&!F.health&&!F.db;
    const src=META.dataSource==='sheet'?t('dataFromSheet'):t('dataFromBundle');
    const when=formatUpdated();
    vb.className='valid-banner '+(ok?'ok':'warn');
    vb.innerHTML=(ok?iconSvg('check','ico ico-banner'):iconSvg('warn','ico ico-banner'))+
      `<span>${ok
      ? `${t('validOk')}: ${META.rawRows} ${t('rows')}, ${META.uniqPids} ID · ${uniqPid} ${t('projects')} · ${t('updated')} ${when} (${src}) · <a href="${SHEET_VIEW}" target="_blank" rel="noopener">${t('openSheet')}</a>`
      : `${t('validWarn')}: ${uniqPid}/${META.uniqPids} · ${t('updated')} ${when}`}</span>`;
  }
}
function buildSidebar(){
  const lp=document.getElementById('lp');
  if(!lp) return;
  let h=`<div class="search"><span class="si">${iconSvg('search','ico ico-search')}</span><input placeholder="${esc(t('searchOrgan'))}" oninput="filtSidebar(this.value)"></div>`;
  GRP.forEach(g=>{
    const items=g.o.filter(o=>(C[o]||0)>0&&rowMatchesSidebar(o));
    if(!items.length) return;
    h+=`<div class="card"><div class="card-head"><span class="sys-ico">${iconSvg(g.ico,'ico ico-sys')}</span><h3>${grpTitle(g)}</h3></div><div class="olist">`;
    items.forEach(o=>{
      const n=C[o],c=organBadgeColor(o),sz=organDotSize(n);
      h+=`<div class="oitem${selOrgan===o?' on':''}" data-o="${o}" onclick="sel('${o}')"><div class="odot" style="background:${c};width:${sz}px;height:${sz}px"></div><span class="nm">${organDisplayName(o)}</span><span class="ct">${n}</span></div>`;
    });
    h+=`</div></div>`;
  });
  lp.innerHTML=h;
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
  {tKey:'sysNervous', ico:'brain', o:['Brain','Pituitary','Eye','Nerve']},
  {tKey:'sysCardio',  ico:'heart', o:['Heart','Blood']},
  {tKey:'sysResp',    ico:'lung', o:['Lung','Thymus','Esophagus']},
  {tKey:'sysDigest',  ico:'digest', o:['Salivary_Gland','Stomach','Liver','Gallbladder','Pancreas','Spleen','Small_Intestine','Colon','Appendix']},
  {tKey:'sysEndocrine',ico:'flask', o:['Thyroid','Adrenal_Gland']},
  {tKey:'sysUrinary', ico:'droplet', o:['Kidney','Bladder']},
  {tKey:'sysFemale',  ico:'female', o:['Ovary','Uterus','Cervix']},
  {tKey:'sysMale',    ico:'male', o:['Prostate','Testis']},
  {tKey:'sysImmune',  ico:'immune', o:['Bone_Marrow','Lymph_Node']},
  {tKey:'sysMSK',     ico:'bone', o:['Bone','Muscle','Skin','Breast','Adipose_Tissue','Soft_Tissue']},
  {tKey:'sysOther',   ico:'box', o:['Multiple_Organs','Other']}
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

/* PDC counts from disk Atlas *_summary.csv (data/pdc-summary-overrides.json).
   Prefer these over the Google sheet / projects.csv for matching Project ID. */
const PDC_OVERRIDES_URL='data/pdc-summary-overrides.json';
const PDC_OVERRIDE_FIELDS=[
  'Patients / donors','Total Samples','Samples Used N','Proteins Quantified',
  'Organ','Disease','Sample Type','Control Healthy','Case Cancer Untreated',
  'Case Cancer Treated','preCancer','Healthy_treated','PMID',
  'Male','Female','Sex unknown','Male_patients','Female_patients','Sex_unknown'
];
let pdcOverrides={};

function applyPdcOverride(row){
  const pid=(row['Project ID']||'').trim();
  const ov=pdcOverrides[pid];
  if(!ov) return row;
  const out={...row};
  for(const f of PDC_OVERRIDE_FIELDS){
    if(ov[f]!=null&&String(ov[f]).trim()!=='') out[f]=ov[f];
  }
  return out;
}

async function loadPdcOverrides(){
  try{
    const res=await fetch(PDC_OVERRIDES_URL,{cache:'no-store'});
    if(!res.ok) return {};
    const j=await res.json();
    return j.projects||{};
  }catch(e){
    console.warn('PDC overrides not loaded:',e);
    return {};
  }
}

function normalizeRow(x){
  const organRaw=pickOrganRaw(x);
  const tumorType=x['Tumor Type']||x['Disease Subtype']||x['Disease']||'Not specified';
  const sampleType=normalizeSampleType(x['Sample Type'])||'Unknown';
  const title=x['Title']||'';
  const organList=trimMetastasisOrgans(classifyAllOrgans(organRaw),tumorType);
  const isPan=organList.length>=PAN_ORGAN_THRESHOLD;
  let projectId=(x['Project ID']||'').trim();
  let pid=projectId;
  const m=pid.match(/^(IPX\d+)\s*\((PXD\d+)\)/i);
  if(m) pid=m[2];
  const resultFiles=window.ProteinAtlas?ProteinAtlas.parseResultFiles(x['Result Files']):[];
  const resultFile=resultFiles[0]||'';
  const proteinCount=window.ProteinAtlas?ProteinAtlas.parseProteinCount(x['Proteins Quantified']):null;
  const numField=v=>{const n=parseFloat(String(v??'').replace(/,/g,'').trim());return isFinite(n)?n:null;};
  const male=numField(x['Male']??x['Male_patients']);
  const female=numField(x['Female']??x['Female_patients']);
  const sexUnknown=numField(x['Sex unknown']??x['Sex_unknown']);
  return {
    ...x,
    organs:organList,om:organList[0],isMulti:organList.length>1,isPan,
    patients:numField(x['Patients / donors']),
    male,female,sexUnknown,
    totalSamples:numField(x['Total Samples']),
    samplesUsed:numField(x['Samples Used N']),
    caseCancer:numField(x['Case Cancer Untreated']),
    controlHealthy:numField(x['Control Healthy']),
    dis:tumorType,
    healthy:isHealthy(tumorType,sampleType,title,x['Disease']),
    st:sampleType,
    cl:title||'Not specified',
    pid,
    projectId,
    ghFolder:ghProjectFolder(projectId),
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
    .map(applyPdcOverride)
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
const LOCAL_PROTEOMICS='data/proteomics_stats.json';
const RAW_PROTEOMICS='https://raw.githubusercontent.com/arinaatom-cyber/TMT/main/data/proteomics_stats.json';

/** Optional proteomics-derived overrides (PDC from *_summary.csv). */
let PROTEOMICS_STATS=null;

function applyProteomicsOverrides(rows){
  if(!PROTEOMICS_STATS||!PROTEOMICS_STATS.projects) return rows;
  return rows.map(x=>{
    const pid=(x['Project ID']||'').trim();
    const o=PROTEOMICS_STATS.projects[pid];
    if(!o) return x;
    const y={...x};
    if(o.Patients!=null) y['Patients / donors']=String(o.Patients);
    if(o.Total_Samples!=null||o.Samples!=null){
      const n=o.Total_Samples!=null?o.Total_Samples:o.Samples;
      y['Total Samples']=String(n);
      y['Samples Used N']=String(n);
    }
    if(o.preCancer!=null) y['preCancer']=String(o.preCancer);
    if(o.Case_Cancer_Untreated!=null) y['Case Cancer Untreated']=String(o.Case_Cancer_Untreated);
    if(o.Case_Cancer_Treated!=null) y['Case Cancer Treated']=String(o.Case_Cancer_Treated);
    if(o.Control_Healthy!=null) y['Control Healthy']=String(o.Control_Healthy);
    if(o.Healthy_treated!=null) y['Healthy_treated']=String(o.Healthy_treated);
    if(o.UniProt_proteins!=null) y['Proteins Quantified']=String(o.UniProt_proteins);
    if(o.Organ) y['Organ']=o.Organ;
    if(o.Disease) y['Disease']=o.Disease;
    if(o.Biospecimen_type) y['Sample Type']=o.Biospecimen_type;
    if(o.Male!=null) y['Male']=String(o.Male);
    if(o.Female!=null) y['Female']=String(o.Female);
    if(o.Sex_unknown!=null) y['Sex unknown']=String(o.Sex_unknown);
    if(o.Tissue_samples!=null) y['Tissue samples']=String(o.Tissue_samples);
    if(o.Cell_line_samples!=null) y['Cell line samples']=String(o.Cell_line_samples);
    y._proteomicsSource=o.Source||'proteomics_stats.json';
    return y;
  });
}

function parseCsvText(text,msg,sourceName){
  if(typeof Papa==='undefined') throw new Error('PapaParse not loaded');
  if(!text||text.length<100) throw new Error('Empty CSV');
  Papa.parse(text,{
    header:true,
    skipEmptyLines:true,
    complete(r){
      try{onDataLoaded(applyProteomicsOverrides(r.data),sourceName);}
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

async function loadProteomicsStats(){
  for(const url of [LOCAL_PROTEOMICS, RAW_PROTEOMICS]){
    try{
      const res=await fetch(url,{cache:'no-store'});
      if(!res.ok) continue;
      const data=await res.json();
      if(data&&data.projects){
        PROTEOMICS_STATS=data;
        return;
      }
    }catch(e){
      console.warn('proteomics_stats failed:',url,e);
    }
  }
}

async function loadSheetData(){
  const msg=document.querySelector('#loader p');
  msg.textContent=t('loading');
  pdcOverrides=await loadPdcOverrides();
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
      parseCsvText(text,msg,src.name+(Object.keys(pdcOverrides).length?`+pdc-summary(${Object.keys(pdcOverrides).length})`:''));
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
  boot.then(()=>loadProteomicsStats()).then(loadSheetData);
});

/* Anatomical organs.
   pos = anchor point for label leader; side = label column;
   icon = iconify name (https://icon-sets.iconify.design/);
   size = pixel size of icon in SVG;
   d = fallback SVG path (used if no icon defined) */
/* Organ atlas drawn TO SCALE from the reference female (165 cm).
   Scale ≈ 4.1 px/cm (vertex y=20 → pubic symphysis y=355 ≈ 335 px ≈ 82.5 cm).
   Organ bounding boxes match ORGAN_REF: liver CC 11.5cm≈47px / transv 21.5cm≈88px,
   lung H 24cm≈98px, heart 12×8.5cm≈49×35px, kidney 11×4cm≈45×16px, spleen 12cm≈49px,
   uterus 7.2×4cm≈30×16px, testis 4×3cm≈16×12px. Sides: patient-right = viewer-left (low x).
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

  Thyroid:         {pos:{x:240, y:120}, anchor:{x:208, y:120}, side:'L', size:0,  z:2, d:
    'M 230 112 Q 224 116 226 126 L 229 130 Q 235 132 237 124 L 237 116 Q 235 112 230 112 Z '+
    'M 250 112 Q 256 116 254 126 L 251 130 Q 245 132 243 124 L 243 116 Q 245 112 250 112 Z '+
    'M 237 120 L 243 120 L 243 124 L 237 124 Z'},

  /* THORAX */
  Esophagus:       {pos:{x:240, y:172}, anchor:{x:241, y:172}, side:'L', size:0, z:1, d:
    'M 239.2 128 L 240.8 128 L 240.8 200 L 241.5 216 L 244 228 L 250 234 L 254 232 '+
    'L 250 226 L 246 222 L 242 216 L 240.5 200 L 239.2 128 Z'},
  Lung:            {pos:{x:240, y:182}, anchor:{x:240, y:182}, side:'L', size:0, z:2, d:
    'M 228 136 Q 204 138 195 156 Q 186 188 190 216 Q 196 230 218 230 L 230 224 Q 232 194 232 158 Q 231 140 228 136 Z '+
    'M 258 138 Q 274 140 282 154 Q 290 178 288 206 Q 284 226 266 228 L 262 218 Q 256 208 258 194 Q 256 174 258 158 Q 258 146 258 138 Z '+
    'M 262 178 Q 268 184 266 196 Q 262 204 258 198 Q 256 188 262 178 Z'},
  Thymus:          {pos:{x:240, y:156}, anchor:{x:208, y:154}, side:'L', size:0, mapHidden:true, z:2, d:
    'M 230 146 Q 240 143 250 146 Q 252 156 248 166 Q 240 170 232 166 Q 228 156 230 146 Z'},
  Heart:           {pos:{x:244, y:190}, anchor:{x:244, y:190}, side:'R', size:0, z:3, d:
    'M 242 168 Q 230 170 226 182 Q 224 198 236 210 L 252 218 Q 264 208 264 192 Q 262 176 250 168 Q 246 166 242 168 Z'},
  Breast:          {pos:{x:240, y:198}, anchor:{x:178, y:198}, side:'L', size:0, z:4, breast:true, d:
    'M 176 184 Q 168 192 170 204 Q 178 214 190 210 Q 198 200 196 188 Q 190 180 176 184 Z '+
    'M 284 182 Q 292 190 290 202 Q 282 212 270 208 Q 262 198 264 186 Q 270 178 284 182 Z'},

  /* ABDOMEN — anterior view: liver left, stomach/spleen right */
  Liver:           {pos:{x:208, y:244}, anchor:{x:188, y:242}, side:'L', size:0, z:2, d:
    'M 186 224 Q 214 216 246 219 Q 268 223 274 236 Q 273 252 258 261 Q 224 269 198 264 Q 186 259 183 244 Q 182 230 186 224 Z'},
  Gallbladder:     {pos:{x:210, y:276}, anchor:{x:182, y:276}, side:'L', size:0, mapHidden:true, z:3, d:
    'M 206 262 Q 216 260 218 270 Q 219 282 212 290 Q 204 292 202 282 Q 201 270 206 262 Z'},
  Stomach:         {pos:{x:258, y:242}, anchor:{x:298, y:238}, side:'R', size:0, z:4, d:
    'M 248 224 Q 252 218 258 220 Q 268 224 272 236 Q 274 248 268 258 Q 258 264 248 260 Q 240 252 242 240 Q 244 230 248 224 Z'},
  Spleen:          {pos:{x:294, y:232}, anchor:{x:300, y:234}, side:'R', size:0, z:4, d:
    'M 288 218 Q 298 222 300 236 Q 298 248 290 250 Q 282 244 284 230 Q 286 222 288 218 Z'},
  Pancreas:        {pos:{x:242, y:258}, anchor:{x:248, y:256}, side:'R', size:0, z:2, d:
    'M 186 260 Q 202 252 222 254 Q 244 256 264 258 Q 280 260 288 252 Q 282 246 266 250 Q 244 252 224 254 Q 204 256 192 264 Q 184 268 186 260 Z'},
  Kidney:          {pos:{x:238, y:262}, anchor:{x:192, y:266}, side:'L', size:0, z:3, kidney:true, d:
    'M 176 248 C 170 254 168 266 172 278 C 176 290 186 294 198 290 C 208 284 210 272 208 260 C 206 250 198 246 188 246 C 180 246 176 248 176 248 Z '+
    'M 286 238 C 292 244 294 256 290 268 C 286 280 276 284 266 280 C 256 274 254 262 256 250 C 258 240 266 236 276 238 C 282 238 286 238 286 238 Z'},
  Adrenal_Gland:   {pos:{x:238, y:248}, anchor:{x:192, y:244}, side:'R', size:0, z:5, adrenal:true, d:
    'M 184 246 L 190 240 L 196 246 L 190 250 Z '+
    'M 264 234 Q 272 232 278 236 Q 272 240 266 238 Z'},

  /* INTESTINES — organic colon frame; irregular small-bowel loops */
  Colon:           {pos:{x:240, y:302}, anchor:{x:302, y:298}, side:'R', size:0, z:2, colon:true, d:
    'M 236 346 Q 252 344 264 334 Q 278 318 284 296 Q 288 276 282 260 Q 272 252 254 254 Q 236 256 220 262 Q 204 270 196 286 Q 190 304 196 322 Q 206 338 224 344 Q 230 346 236 346 Z '+
    'M 222 288 Q 240 284 258 288 Q 272 296 274 310 Q 270 324 254 330 Q 236 332 220 324 Q 210 312 212 298 Q 216 290 222 288 Z'},
  Small_Intestine: {pos:{x:240, y:306}, anchor:{x:240, y:306}, side:'L', size:0, z:3, smallBowel:true, d:
    'M 216 292 Q 230 286 244 294 Q 250 304 238 310 Q 224 308 216 300 Z '+
    'M 248 296 Q 262 290 272 300 Q 270 314 256 316 Q 244 312 248 296 Z '+
    'M 224 306 Q 238 302 250 310 Q 246 322 232 324 Q 220 318 224 306 Z '+
    'M 256 304 Q 266 308 264 320 Q 252 324 246 314 Q 248 304 256 304 Z '+
    'M 230 316 Q 242 312 254 318 Q 250 330 236 332 Q 226 326 230 316 Z '+
    'M 248 318 Q 260 314 266 324 Q 258 334 246 330 Q 242 324 248 318 Z '+
    'M 236 300 Q 246 296 250 304 Q 244 312 234 310 Q 232 304 236 300 Z'},
  Appendix:        {pos:{x:198, y:348}, anchor:{x:178, y:348}, side:'L', size:0, mapHidden:true, z:5, d:
    'M 200 332 Q 192 336 190 346 Q 192 356 198 359 Q 203 353 201 344 Q 200 336 200 332 Z'},

  /* PELVIS */
  Bladder:         {pos:{x:240, y:342}, anchor:{x:240, y:344}, side:'R', size:0, z:6, d:
    'M 226 336 Q 240 330 254 336 Q 256 346 248 352 Q 240 354 232 352 Q 224 346 226 336 Z'},
  Uterus:          {pos:{x:240, y:312}, anchor:{x:244, y:310}, side:'L', size:0, z:3, d:
    'M 236 304 Q 248 298 254 310 Q 256 320 250 326 Q 244 328 238 324 Q 232 316 234 308 Q 234 304 236 304 Z'},
  Ovary:           {pos:{x:240, y:308}, anchor:{x:206, y:308}, side:'L', size:0, z:4, d:
    'M 206 304 Q 200 308 202 314 Q 208 316 212 310 Q 210 304 206 304 Z '+
    'M 274 302 Q 280 306 278 312 Q 272 314 268 308 Q 270 302 274 302 Z'},
  Cervix:          {pos:{x:240, y:328}, anchor:{x:218, y:328}, side:'L', size:0, z:4, d:
    'M 238 324 Q 242 324 244 328 Q 242 332 240 332 Q 237 330 238 324 Z'},
  Prostate:        {pos:{x:241, y:358}, anchor:{x:241, y:356}, side:'R', size:0, z:5, d:
    'M 232 352 Q 241 348 250 352 Q 252 360 241 364 Q 230 360 232 352 Z'},
  Testis:          {pos:{x:240, y:386}, anchor:{x:240, y:386}, side:'R', size:0, z:3, d:
    'M 214 378 Q 240 370 266 378 Q 268 394 240 398 Q 212 394 214 378 Z '+
    'M 228 382 Q 224 388 228 394 Q 234 396 238 390 Q 236 384 228 382 Z '+
    'M 252 382 Q 256 388 252 394 Q 246 396 242 390 Q 244 384 252 382 Z'},

  Bone:            {pos:{x:240, y:165}, side:'R', size:0, z:0, skeleton:true, d:
    'M 237 132 L 243 132 L 242 198 L 238 198 Z'},

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
          :a.breast
            ?`fill:${fill};fill-opacity:.34;stroke:rgba(255,255,255,.48);stroke-width:.7;stroke-linejoin:round;fill-rule:evenodd`
            :a.smallBowel
              ?`fill:${fill};fill-opacity:.72;stroke:rgba(255,255,255,.45);stroke-width:.65;stroke-linejoin:round`
              :a.adrenal
                ?`fill:${fill};fill-opacity:.96;stroke:rgba(255,255,255,.6);stroke-width:.65;stroke-linejoin:round;fill-rule:evenodd`
                :a.kidney
                  ?`fill:${fill};fill-opacity:.93;stroke:rgba(255,255,255,.55);stroke-width:.75;stroke-linejoin:round;fill-rule:evenodd`
                  :a.colon
                    ?`fill:${fill};fill-opacity:.86;fill-rule:evenodd;stroke:rgba(255,255,255,.5);stroke-width:.7;stroke-linejoin:round`
                    :`fill:${fill};fill-opacity:.9;stroke:rgba(255,255,255,.5);stroke-width:.7;stroke-linejoin:round;fill-rule:evenodd`;
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
  const ghHref=ghResultsUrl(r.ghFolder||r.projectId||r.pid);
  const ghAlt =ghSearchUrl(r.pid);
  const tag=r.healthy
    ?`<span class="status normal">NORMAL</span>`
    :`<span class="status cancer">CANCER</span>`;
  const pan=r.isPan?`<span class="status pan">${t('panBadge')}</span>`:'';
  const organs=r.organs.map(x=>organDisplayName(x)).join(', ');
  const tmt=r.tmt?`<span class="meta-pill">${esc(r.tmt)}</span>`:'';
  const proteins=window.ProteinAtlas?.proteinBadgesHtml?.(r)||'';
  const platform=r.platform?`<span class="meta-pill">${esc(r.platform.slice(0,28))}</span>`:'';
  const sexBits=[
    r.male!=null?`M ${r.male}`:'',
    r.female!=null?`F ${r.female}`:''
  ].filter(Boolean).join(' · ');
  const cohort=[
    r.patients!=null?`<span class="meta-pill cohort" title="Patients / donors">👥 ${r.patients} ${t('patientsShort')}</span>`:'',
    sexBits?`<span class="meta-pill cohort" title="Male / Female from patients">${esc(sexBits)}</span>`:'',
    r.totalSamples!=null?`<span class="meta-pill cohort" title="Total Samples">🧪 ${r.totalSamples} ${t('samplesShort')}</span>`:''
  ].join('');
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
        <button type="button" class="proj-id proj-id-btn" onclick="openProject('${esc(r.pid)}')" title="${L('Открыть досье проекта','Open project dossier')}">${esc(r.pid)}</button>
        ${tag}${pan}
      </div>
      <div class="proj-organs">${esc(organs)}</div>
    </div>
    <div class="proj-disease" title="${esc(r.dis)}">${esc(diseaseDisplayName(r.disCanon)||'—')}<span style="color:var(--t3);font-size:10px"> · ${esc((r.dis||'').slice(0,40))}</span></div>
    <div class="proj-meta">
      <span class="meta-pill subtle">${esc(r.st||'—')}</span>
      ${cohort}${tmt}${platform}${proteins}
    </div>
    <div class="proj-links">
      <button type="button" class="plink plink-dossier" onclick="openProject('${esc(r.pid)}')" title="${L('Полное досье: критерии отбора, дизайн, выводы, методы, источники','Full dossier: selection criteria, design, findings, methods, sources')}">
        <span class="li">ℹ</span><span class="lt">${L('Досье','Dossier')}</span></button>
      ${linkProj}${linkArt}${linkGh}
    </div>
    ${window.ProteinAtlas?ProteinAtlas.projectProteinBlock(r):''}
  </div>`;
}

/* Per-project scientific dossier: provenance, selection rationale, design, findings,
   caveats, methods, cohort and all source links. Surfaces CSV columns that the
   compact card hides so a reader can fully trace why a project is in the atlas. */
function projDossier(r){
  const L2=L;
  const v=k=>{const s=(r[k]??'').toString().trim();return (!s||/^(not specified|not_specified|n\/a|na|—|-|unknown)$/i.test(s))?'':s;};
  const isPxd=/^PXD\d+/i.test(r.pid);
  const projHref=r.link||(isPxd?prideUrl(r.pid):'');
  const pmHref=r.pmid?pubmedUrl(r.pmid):'';
  const ghHref=ghResultsUrl(r.ghFolder||r.projectId||r.pid);
  const organs=r.organs.map(organDisplayName).join(', ');
  const fld=(label,val)=>val?`<div class="dos-row"><span class="dos-k">${label}</span><span class="dos-v">${esc(val)}</span></div>`:'';
  /* Selection rationale (mirrors the formal inclusion criteria in METHODS.md) */
  const crit=[L2('Человек','Human')];
  if(r.tmt) crit.push('TMT: '+r.tmt);
  if(r.proteinCount) crit.push(`${r.proteinCount.toLocaleString()} ${L2('белков','proteins')}`);
  crit.push(`${L2('орган','organ')}: ${organs}`);
  if(r.st) crit.push(r.st);
  const critChips=crit.map(c=>`<span class="dos-chip">${esc(c)}</span>`).join('');
  /* Cohort composition */
  const cohort=[
    fld(L2('Всего образцов','Total samples'),v('Total Samples')),
    fld(L2('Пациенты / доноры','Patients / donors'),v('Patients / donors')),
    fld(L2('Мужчины','Male'), (r.male!=null?String(r.male):v('Male')) || ''),
    fld(L2('Женщины','Female'), (r.female!=null?String(r.female):v('Female')) || ''),
    fld(L2('Пол не указан','Sex unknown'), (r.sexUnknown!=null?String(r.sexUnknown):v('Sex unknown')) || ''),
    fld(L2('Образцов использовано','Samples used'),v('Samples Used N')),
    fld(L2('Случаи: рак (без лечения)','Cases: cancer (untreated)'),v('Case Cancer Untreated')),
    fld(L2('Случаи: рак (после лечения)','Cases: cancer (treated)'),v('Case Cancer Treated')),
    fld(L2('Контроль: здоровые','Controls: healthy'),v('Control Healthy'))
  ].join('');
  /* Methods / acquisition & quantification */
  const methods=[
    fld(L2('MS-платформа','MS platform'),v('Platform MS (Unified)')),
    fld(L2('TMT-метка','TMT label'),v('TMT Label (Unified)')),
    fld(L2('Формат количественной оценки','Quantification format'),v('Quantification_Format')),
    fld(L2('Каналы TMT','TMT channels used'),v('TMT Channels Used')),
    fld(L2('Нормализация','Normalization'),v('Normalization Strategy')),
    fld('FDR (%)',v('FDR (Unified %)')),
    fld(L2('База FASTA','FASTA database'),[v('FASTA (Unified)'),v('FASTA Year')].filter(Boolean).join(' · ')),
    fld(L2('Модификации','Modifications'),v('Modifications')),
    fld(L2('Белков количественно','Proteins quantified'),v('Proteins Quantified'))
  ].join('');
  const sec=(title,html)=>html?`<div class="dos-section"><h4>${title}</h4>${html}</div>`:'';
  const findings=v('Main_Finding');
  const caveats=v('Data_Caveats');
  const design=v('Experimental Design');
  const summary=v('Short Description');
  return `
    <div class="dos-top">
      <div class="dos-id">${esc(r.pid)}
        ${r.healthy?'<span class="status normal">NORMAL</span>':'<span class="status cancer">CANCER</span>'}
        ${r.isPan?`<span class="status pan">${t('panBadge')}</span>`:''}
        <span class="meta-pill">${esc(r.db||'—')}</span>
      </div>
      <div class="dos-title">${esc(v('Title')||r.cl||r.pid)}</div>
      <div class="dos-sub">${esc(organs)} · ${esc(diseaseDisplayName(r.disCanon)||r.dis||'—')}</div>
    </div>
    ${sec(L('Почему включён в атлас · критерии отбора','Why it is in the atlas · selection criteria'),
      `<div class="dos-chips">${critChips}</div>
       <p class="dos-note">${L('Включается, если это человеческий датасет TMT-мультиплексной протеомики с количественной оценкой протеома и привязкой к органу/ткани. Полные критерии — см.','Included when it is a human TMT multiplex proteomics dataset with a quantified proteome and an organ/tissue assignment. Full criteria:')}
       <a href="https://github.com/arinaatom-cyber/TMT/blob/main/METHODS.md" target="_blank" rel="noopener">METHODS.md</a>.</p>`)}
    ${sec(L('Дизайн исследования','Study design'),design?`<p class="dos-text">${esc(design)}</p>`:'')}
    ${sec(L('Что собрано · когорта','What was collected · cohort'),cohort?`<div class="dos-grid">${cohort}</div>`:'')}
    ${sec(L('Ключевой вывод статьи','Main finding of the article'),findings?`<p class="dos-find">${esc(findings)}</p>`:'')}
    ${sec(L('Аннотация','Summary'),summary?`<p class="dos-text">${esc(summary)}</p>`:'')}
    ${sec(L('Методы · получение и количественная оценка','Methods · acquisition & quantification'),methods?`<div class="dos-grid">${methods}</div>`:'')}
    ${caveats?sec(L('Ограничения данных','Data caveats'),`<p class="dos-caveat">⚠ ${esc(caveats)}</p>`):''}
    ${sec(L('Источники · откуда данные','Sources · provenance'),
      `<div class="dos-links">
        ${projHref?`<a class="plink plink-db" href="${esc(projHref)}" target="_blank" rel="noopener"><span class="li">DB</span><span class="lt">${esc(r.db||'Database')}</span></a>`:''}
        ${pmHref?`<a class="plink plink-art" href="${esc(pmHref)}" target="_blank" rel="noopener"><span class="li">PMID</span><span class="lt">${esc(r.pmid)}</span></a>`:''}
        <a class="plink plink-gh" href="${esc(ghHref)}" target="_blank" rel="noopener"><span class="li">GH</span><span class="lt">Result files</span></a>
        <a class="plink" href="${esc(SHEET_VIEW)}" target="_blank" rel="noopener"><span class="li">CSV</span><span class="lt">${L('Строка таблицы','Sheet row')}</span></a>
      </div>`)}`;
}
function openProject(pid){
  const r=D.find(x=>x.pid===pid);
  if(!r) return;
  const body=document.getElementById('projModalBody');
  if(body) body.innerHTML=projDossier(r);
  const m=document.getElementById('projModal');
  if(m){m.classList.add('open');m.scrollTop=0;}
}
function closeProject(){const m=document.getElementById('projModal');if(m)m.classList.remove('open');}

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

function assignLabelPositions(active, forceSide){
  const MIN_GAP=forceSide?34:40, TOP=40, BOTTOM=620;
  function layout(arr){
    arr.sort((a,b)=>a.y-b.y);
    let prev=TOP-MIN_GAP;
    arr.forEach(it=>{
      it.y=Math.max(it.y,prev+MIN_GAP);
      prev=it.y;
    });
    const excess=arr.length?arr[arr.length-1].y-BOTTOM:0;
    if(excess>0) arr.forEach(it=>it.y-=excess);
    return Object.fromEntries(arr.map(it=>[it.o,it.y]));
  }
  if(forceSide==='L'||forceSide==='R'){
    const arr=active.map(o=>{const p=organAnchor(ANATOMY[o]); return {o,y:p.y};});
    const laid=layout(arr);
    return forceSide==='L'?{L:laid,R:{}}:{L:{},R:laid};
  }
  const L=[],R=[];
  active.forEach(o=>{
    const a=ANATOMY[o];
    const p=organAnchor(a);
    (a.side==='L'?L:R).push({o,y:p.y});
  });
  return {L:layout(L),R:layout(R)};
}

function formatProjectCount(n){
  return n===1?'1 project':`${n} projects`;
}
function formatMapOrganStats(s){
  const pan=s.nPan?` · Pan: ${s.nPan}`:'';
  return `${formatProjectCount(s.n)} · C: ${s.nC} · N: ${s.nN}${pan}`;
}

function mapOrganVisible(o){
  const a=ANATOMY[o];
  return a&&!SYSTEMIC.has(o)&&!a.systemic&&!a.skeleton&&!a.mapHidden;
}

function organInlineGhostLabel(o){
  if(organCount(o)>0||!mapOrganVisible(o)) return '';
  const a=ANATOMY[o];
  const ap=organAnchor(a);
  return `<text x="${ap.x}" y="${ap.y+3}" text-anchor="middle" class="ghost-inline" pointer-events="none">${organDisplayName(o)}</text>`;
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
  const dotR=Math.max(3.5, Math.min(9, 2.4+Math.sqrt(s.n)*0.65));
  const panTag=s.nPan?` · ${s.nPan} pan`:'';
  const eh=`onclick="sel('${o}')" onmouseenter="st(event,'${o}')" onmouseleave="ht()"`;
  const lead=`M ${ox} ${oy} L ${turnX} ${oy} L ${turnX} ${labelY} L ${lineEnd} ${labelY}`;
  const tx=labelX+(isL?14:-14);
  return `<g class="lbl-g" data-cb="${o}" opacity="0.95" ${eh}>
    <path class="lbl-lead" d="${lead}"/>
    <circle class="lbl-dot-label" cx="${labelX}" cy="${labelY}" r="${dotR}" fill="${badge}" stroke="rgba(255,255,255,.55)" stroke-width=".6" transform="translate(${isL?6:-6},0)"/>
    <text class="lbl-name" fill="#e8ecf4" font-size="11" font-weight="700" font-family="Inter,sans-serif" x="${tx}" y="${labelY-3}" text-anchor="${anchor}">${name}</text>
    <text class="lbl-count" fill="#c5cdd8" font-size="8.5" font-family="Inter,sans-serif" x="${tx}" y="${labelY+9}" text-anchor="${anchor}">${formatMapOrganStats(s)}</text>
  </g>`;
}

function bodyCavities(){
  /* Thorax / abdomen / pelvis — continuous regions (textbook cavity layout) */
  const t='rgba(120,70,70,.07)', a='rgba(100,65,55,.09)', p='rgba(110,60,70,.05)';
  return `<g class="body-cavities" pointer-events="none">
    <path d="M 220 132 Q 196 136 186 146 L 182 188 Q 184 218 192 228 L 288 228 Q 296 218 298 188 L 294 146 Q 282 136 258 132 Q 240 130 222 132 Z" fill="${t}"/>
    <path d="M 186 228 Q 182 280 186 334 L 188 358 Q 198 366 212 368 L 268 368 Q 282 366 292 358 L 294 334 Q 298 280 294 228 L 186 228 Z" fill="${a}"/>
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

function bodySilhouetteSex(sex){
  const head=`M 240 20 Q 272 20 274 50 Q 274 80 258 94 L 222 94 Q 206 80 206 50 Q 208 20 240 20 Z`;
  const neck=`M 224 94 L 256 94 L 260 130 L 220 130 Z`;
  let torso,armL,armR,legL,legR,title;
  if(sex==='male'){
    torso=`M 222 130 Q 196 132 184 142 L 178 186 Q 180 228 184 268
           Q 186 300 192 332 Q 198 350 206 362 L 212 370 L 268 370 L 274 362
           Q 282 350 288 332 Q 294 300 296 268 Q 300 228 302 188 L 296 144
           Q 286 136 260 130 Z`;
    armL=`M 184 144 Q 160 152 148 188 L 140 260 Q 136 310 144 350 L 154 384
          Q 160 396 170 392 L 180 388 Q 180 366 174 348 L 166 280 Q 166 240
          174 200 Q 180 168 192 152 Z`;
    armR=`M 296 144 Q 320 152 332 188 L 340 260 Q 344 310 336 350 L 326 384
          Q 320 396 310 392 L 300 388 Q 300 366 306 348 L 314 280 Q 314 240
          306 200 Q 300 168 288 152 Z`;
    legL=`M 214 370
          Q 202 376 198 396 L 194 468 Q 192 528 196 578
          L 202 624 Q 208 640 216 638 L 224 630
          Q 226 556 229 482 L 232 412 Q 234 382 238 372
          L 240 370 L 214 370 Z`;
    legR=`M 266 370
          Q 278 376 282 396 L 286 468 Q 288 528 284 578
          L 278 624 Q 272 640 264 638 L 256 630
          Q 254 556 251 482 L 248 412 Q 246 382 242 372
          L 240 370 L 266 370 Z`;
    title='MALE · ANTERIOR VIEW';
  }else{
    torso=`M 218 130 Q 192 136 180 146 L 174 188 Q 176 230 180 270
           Q 184 304 192 336 Q 200 352 206 362 L 210 370 L 270 370 L 276 362
           Q 284 348 290 330 Q 296 300 300 270 Q 304 230 306 188 L 300 144
           Q 288 132 262 130 Z`;
    armL=`M 186 144 Q 166 154 156 188 L 148 260 Q 144 310 152 350 L 162 384
          Q 168 396 178 392 L 188 388 Q 188 366 182 348 L 174 280 Q 174 240
          182 200 Q 188 168 200 152 Z`;
    armR=`M 294 144 Q 314 154 324 188 L 332 260 Q 336 310 328 350 L 318 384
          Q 312 396 302 392 L 292 388 Q 292 366 298 348 L 306 280 Q 306 240
          298 200 Q 292 168 280 152 Z`;
    legL=`M 206 370
          Q 194 376 190 396 L 186 468 Q 184 528 188 578
          L 194 624 Q 200 640 208 638 L 216 630
          Q 218 556 221 482 L 224 412 Q 226 382 230 372
          L 232 370 L 206 370 Z`;
    legR=`M 274 370
          Q 286 376 290 396 L 294 468 Q 296 528 292 578
          L 286 624 Q 280 640 272 638 L 264 630
          Q 262 556 259 482 L 256 412 Q 254 382 250 372
          L 248 370 L 274 370 Z`;
    title='FEMALE · ANTERIOR VIEW';
  }
  const stroke='#c88888', fill='rgba(200,136,136,.09)';
  return `
    <g class="body-silhouette body-${sex}" pointer-events="none">
      <path d="${head}" fill="${fill}" stroke="${stroke}" stroke-width="1.15" stroke-linejoin="round"/>
      <path d="${neck}" fill="${fill}" stroke="${stroke}" stroke-width="1.15"/>
      <path d="${torso}" fill="${fill}" stroke="${stroke}" stroke-width="1.15" stroke-linejoin="round"/>
      <path d="${armL}" fill="${fill}" stroke="${stroke}" stroke-width="1.15" stroke-linejoin="round"/>
      <path d="${armR}" fill="${fill}" stroke="${stroke}" stroke-width="1.15" stroke-linejoin="round"/>
      <path d="${legL}" fill="${fill}" stroke="${stroke}" stroke-width="1.15" stroke-linejoin="round"/>
      <path d="${legR}" fill="${fill}" stroke="${stroke}" stroke-width="1.15" stroke-linejoin="round"/>
      <text x="240" y="10" text-anchor="middle" fill="#94a3b8" font-family="Inter,sans-serif" font-size="8" letter-spacing="3" font-weight="600">${title}</text>
    </g>`;
}

function mapOrgansForSex(sex){
  const exclude=sex==='female'?MALE_ONLY:FEMALE_ONLY;
  return mapAnatomyOrgans().filter(o=>!exclude.has(o));
}

function buildFigurePanel(sex,offsetX){
  const allMap=mapOrgansForSex(sex);
  const active=allMap.filter(o=>organCount(o)>0);
  const drawOrder=[...allMap].sort((a,b)=>(ANATOMY[a].z||1)-(ANATOMY[b].z||1));
  let labelsSvg='';
  if(MAP_MODE==='dual'&&MAP_DUAL_LABELS){
    const labelY=assignLabelPositions(active);
    const orderedY=o=>{
      const a=ANATOMY[o];
      const ymap=a.side==='L'?labelY.L:labelY.R;
      return ymap[o]||organAnchor(a).y;
    };
    labelsSvg=`<g class="labels-layer">${active.map(o=>organLabel(o,orderedY(o))).join('')}</g>`;
  }
  const ghostSvg=MAP_DUAL_LABELS?'':allMap.filter(o=>!organCount(o)).map(organInlineGhostLabel).join('');
  return `<g class="figure-panel figure-${sex}" transform="translate(${offsetX},0)">
    ${bodySilhouetteSex(sex)}
    ${bodyCavities()}
    <g class="organs-layer">${drawOrder.map(organGroup).join('')}${ghostSvg}</g>
    ${labelsSvg}
  </g>`;
}

function renderBodySingle(){
  const allMap=mapAnatomyOrgans();
  const active=allMap.filter(o=>organCount(o)>0);
  const drawOrder=[...allMap].sort((a,b)=>(ANATOMY[a].z||1)-(ANATOMY[b].z||1));
  const labelY=assignLabelPositions(active);
  const orderedY=o=>{
    const a=ANATOMY[o]; const ymap=a.side==='L'?labelY.L:labelY.R; return ymap[o]||a.pos.y;
  };
  document.getElementById('bw').innerHTML=`
  <svg viewBox="-16 0 512 720" xmlns="http://www.w3.org/2000/svg" class="anatomy-svg" preserveAspectRatio="xMidYMid meet">
    ${bodySilhouette()}
    ${bodyCavities()}
    <g class="organs-layer">${drawOrder.map(organGroup).join('')}${allMap.filter(o=>!organCount(o)).map(organInlineGhostLabel).join('')}</g>
    <g class="labels-layer">${active.map(o=>organLabel(o,orderedY(o))).join('')}</g>
  </svg>`;
  bindMapClicks();
}

function renderBodyDual(){
  const pad=MAP_DUAL_PAD_L;
  const gap=MAP_DUAL_GAP;
  const maleX=pad+480+gap;
  const totalW=maleX+480;
  const divider=`<line x1="${pad+480+gap/2}" y1="16" x2="${pad+480+gap/2}" y2="704" stroke="#2a3650" stroke-width="1" opacity="0.4"/>`;
  document.getElementById('bw').innerHTML=`
  <svg viewBox="0 0 ${totalW} 720" xmlns="http://www.w3.org/2000/svg" class="anatomy-svg anatomy-dual" preserveAspectRatio="xMidYMid meet">
    ${divider}
    ${buildFigurePanel('female',pad)}
    ${buildFigurePanel('male',maleX)}
  </svg>`;
  bindMapClicks();
}

function renderBody(){
  if(MAP_MODE==='dual') renderBodyDual();
  else renderBodySingle();
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
    <div class="tc">${formatMapOrganStats(s)}</div>
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
  let nHealthy=0,nCancer=0,sumPat=0,nPat=0,sumSamp=0,nSamp=0,sumMale=0,sumFemale=0,nSex=0;
  uniqRows.forEach(r=>{
    const dk=r.disCanon||r.dis;
    dis[dk]=(dis[dk]||0)+1;
    sam[r.st]=(sam[r.st]||0)+1;
    if(r.db) dbs[r.db]=(dbs[r.db]||0)+1;
    if(r.healthy) nHealthy++; else nCancer++;
    if(r.patients!=null){sumPat+=r.patients;nPat++;}
    if(r.totalSamples!=null){sumSamp+=r.totalSamples;nSamp++;}
    if(r.male!=null||r.female!=null){
      sumMale+=(r.male||0); sumFemale+=(r.female||0); nSex++;
    }
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
    <div class="ms" title="${esc(t('patSampHint'))}"><div class="v">${nPat?sumPat.toLocaleString():'—'}</div><div class="l">${t('sumPatients')}</div></div>
    <div class="ms" title="Male / Female from patients"><div class="v">${nSex?`${sumMale.toLocaleString()} / ${sumFemale.toLocaleString()}`:'—'}</div><div class="l">M / F</div></div>
    <div class="ms" title="${esc(t('patSampHint'))}"><div class="v">${nSamp?sumSamp.toLocaleString():'—'}</div><div class="l">${t('sumSamples')}</div></div>
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
window.applyThemeBtn=applyThemeBtn;
window.openAbout=openAbout;
window.closeAbout=closeAbout;
window.openProject=openProject;
window.closeProject=closeProject;
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
