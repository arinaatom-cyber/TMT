/** Bilingual UI: RU / EN — data-i18n on elements, localStorage lang key */
(function () {
  const STORAGE_KEY = "atlas_site_lang";

  const T = {
    ru: {
      brand_title: "Sirius Human TMT Proteome Atlas",
      brand_sub: "Discovery · QC · read-only catalog",
      nav_home: "Главная",
      nav_atlas: "Атлас",
      nav_discovery: "Discovery",
      nav_qc: "QC",
      footer_policy: "Каталог Excel не публикуется. На сайте — только новые кандидаты и анализ.",
      footer_github: "GitHub TMT",
      footer_live: "Live (TMT Pages)",
      /* Discovery page */
      disc_title: "Discovery — полный анализ",
      disc_lead: "Новые human TMT проекты · семантический разбор абстрактов · QC",
      disc_catalog_hidden: "каталог скрыт",
      disc_catalog_n: "проектов в атласе (read-only)",
      kpi_new: "новых проектов",
      kpi_abstracts_ai: "абстрактов ИИ",
      kpi_manual: "ручная проверка",
      kpi_rejected: "отклонено",
      sec_projects: "Новые проекты (candidate)",
      sec_projects_desc: "Только PXD/PDC/MSV/IPX, которых нет в TMT ATLAS",
      sec_abstracts: "ИИ-анализ абстрактов (Europe PMC)",
      sec_literature: "Статьи без accession — ручная проверка",
      sec_literature_desc: "По смыслу похоже на атлас, но номер проекта не найден",
      sec_qc: "QC — manual / rejected",
      search_projects: "Поиск по ID, названию…",
      search_abstracts: "Поиск по названию, анализу…",
      filter_all: "Все",
      th_id: "ID",
      th_title: "Название",
      th_source: "Источник",
      th_plex: "Plex",
      th_design: "Дизайн",
    th_similar: "Похож на",
    th_ai: "ИИ-анализ",
    th_data: "Данные",
      th_fit: "Fit",
      th_material: "Материал",
      th_theme: "Тема атласа",
      th_analysis: "Анализ",
      th_reason: "Причина",
      th_included: "Included",
      th_excluded: "Excluded",
      note_abstracts: "ИИ читает абстракты по смыслу (few-shot из TMT ATLAS). Accession в тексте не извлекаются. PDC: TMT10/11/12/16, без CPTAC program.",
      no_projects: "Нет новых проектов",
      no_pubs: "Нет проанализированных статей",
      no_literature: "Нет статей для ручной проверки",
      no_rows: "Нет записей",
      /* QC page */
      qc_title: "Discovery QC Report",
      qc_lead: "Candidate · manual check · rejected · filtered",
      qc_rules_title: "Правила материала",
      qc_rules: "Homo sapiens only · tumor / adjacent normal / patient plasma·serum·blood · human cancer cell lines OK · reject organoids-only, PDX-only, xenograft-only, animal tissue · mixed → manual check.",
      qc_candidate: "Candidate",
      qc_manual: "Requires manual check",
      qc_rejected: "Rejected (material)",
      qc_filtered: "Filtered (technical)",
      qc_pubs: "статей проанализировано",
      /* Atlas page */
      atlas_title: "Профиль атласа",
      atlas_lead: "Сводка Sirius Human TMT Proteome Atlas (метаданные, без выгрузки каталога)",
      atlas_datasets: "датасетов",
      atlas_publications: "уникальных ID",
      atlas_repos: "Репозитории",
      atlas_organs: "Топ органов / тканей",
      atlas_diseases: "Топ нозологий",
      atlas_tmt: "TMT-плексы",
      atlas_keywords: "Ключевые слова поиска Discovery",
      atlas_link: "Полный реестр на GitHub",
      atlas_discovery: "Запустить анализ новых наборов",
      /* Portal */
      portal_title: "Atlas Discovery Portal",
      portal_lead: "Мониторинг новых human TMT наборов в PRIDE, PDC, MassIVE, iProX · ИИ читает абстракты в контексте вашего атласа.",
      card_discovery_title: "Полный анализ Discovery",
      card_discovery_desc: "Новые PXD/PDC · семантический разбор Europe PMC · литература без accession · встроенный QC.",
      card_qc_title: "QC отчёт",
      card_qc_desc: "Candidate / manual / rejected с колонкой ИИ-анализа.",
      card_atlas_title: "Профиль атласа",
      card_atlas_desc: "Статистика каталога, репозитории, органы, нозологии — без публикации Excel.",
      card_open: "Открыть →",
      card_update_title: "Обновление",
      card_update_desc: "Локально: python run_discovery.py scan · publish · export для TMT Pages.",
    },
    en: {
      brand_title: "Sirius Human TMT Proteome Atlas",
      brand_sub: "Discovery · QC · read-only catalog",
      nav_home: "Home",
      nav_atlas: "Atlas",
      nav_discovery: "Discovery",
      nav_qc: "QC",
      footer_policy: "Excel catalog is not published. Site shows new candidates and analysis only.",
      footer_github: "GitHub TMT",
      footer_live: "Live (TMT Pages)",
      disc_title: "Discovery — full analysis",
      disc_lead: "New human TMT projects · semantic abstract screening · QC",
      disc_catalog_hidden: "catalog hidden",
      disc_catalog_n: "projects in atlas (read-only)",
      kpi_new: "new projects",
      kpi_abstracts_ai: "LLM abstracts",
      kpi_manual: "manual review",
      kpi_rejected: "rejected",
      sec_projects: "New projects (candidate)",
      sec_projects_desc: "PXD/PDC/MSV/IPX not yet in TMT ATLAS",
      sec_abstracts: "LLM abstract analysis (Europe PMC)",
      sec_literature: "Papers without accession — manual review",
      sec_literature_desc: "Atlas-like by meaning; dataset ID not resolved",
      sec_qc: "QC — manual / rejected",
      search_projects: "Search ID, title…",
      search_abstracts: "Search title, analysis…",
      filter_all: "All",
      th_id: "ID",
      th_title: "Title",
      th_source: "Source",
      th_plex: "Plex",
      th_design: "Design",
    th_similar: "Similar to",
    th_ai: "AI analysis",
    th_data: "Data",
      th_fit: "Fit",
      th_material: "Material",
      th_theme: "Atlas theme",
      th_analysis: "Analysis",
      th_reason: "Reason",
      th_included: "Included",
      th_excluded: "Excluded",
      note_abstracts: "LLM reads abstracts by meaning (few-shot from TMT ATLAS). Accessions are not regex-extracted. PDC: TMT10/11/12/16, CPTAC programs excluded.",
      no_projects: "No new projects",
      no_pubs: "No analyzed publications",
      no_literature: "No papers for manual review",
      no_rows: "No records",
      qc_title: "Discovery QC Report",
      qc_lead: "Candidate · manual check · rejected · filtered",
      qc_rules_title: "Material rules",
      qc_rules: "Homo sapiens only · tumor / adjacent normal / patient plasma·serum·blood · human cancer cell lines OK · reject organoids-only, PDX-only, xenograft-only, animal tissue · mixed → manual check.",
      qc_candidate: "Candidate",
      qc_manual: "Requires manual check",
      qc_rejected: "Rejected (material)",
      qc_filtered: "Filtered (technical)",
      qc_pubs: "publications analyzed",
      atlas_title: "Atlas profile",
      atlas_lead: "Sirius Human TMT Proteome Atlas summary (metadata only, catalog not exported)",
      atlas_datasets: "datasets",
      atlas_publications: "unique IDs",
      atlas_repos: "Repositories",
      atlas_organs: "Top organs / tissues",
      atlas_diseases: "Top diseases",
      atlas_tmt: "TMT plexes",
      atlas_keywords: "Discovery search keywords",
      atlas_link: "Full registry on GitHub",
      atlas_discovery: "Analyze new datasets",
      portal_title: "Atlas Discovery Portal",
      portal_lead: "Monitor new human TMT datasets in PRIDE, PDC, MassIVE, iProX · LLM reads abstracts in atlas context.",
      card_discovery_title: "Full Discovery analysis",
      card_discovery_desc: "New PXD/PDC · Europe PMC semantic screening · literature without accession · embedded QC.",
      card_qc_title: "QC report",
      card_qc_desc: "Candidate / manual / rejected with AI analysis column.",
      card_atlas_title: "Atlas profile",
      card_atlas_desc: "Catalog stats, repositories, organs, diseases — Excel not published.",
      card_open: "Open →",
      card_update_title: "Update",
      card_update_desc: "Run: python run_discovery.py scan · publish · export for TMT Pages.",
    },
  };

  function getLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "ru") return stored;
    const nav = (navigator.language || "").toLowerCase();
    return nav.startsWith("ru") ? "ru" : "en";
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    apply(lang);
    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  function apply(lang) {
    const dict = T[lang] || T.en;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        if (el.tagName === "INPUT" && el.placeholder !== undefined) {
          el.placeholder = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) el.placeholder = dict[key];
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const lang = getLang();
    document.documentElement.lang = lang;
    apply(lang);
    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
      btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });
  });

  window.AtlasI18n = { setLang, getLang, T };
})();
