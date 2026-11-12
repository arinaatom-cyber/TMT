(function (root) {
  'use strict';
  function validate(data, expectedIds) {
    if (!data || !data.projects || !data.terms) throw new Error('Anatomical metadata are unavailable.');
    for (const [key, term] of Object.entries(data.terms)) {
      if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(key) || !term.label_en) throw new Error('Invalid anatomical category: ' + key);
    }
    for (const [id, project] of Object.entries(data.projects)) {
      if (!Array.isArray(project.categories) || !project.categories.length) throw new Error('Missing categories: ' + id);
      if (new Set(project.categories).size !== project.categories.length) throw new Error('Duplicate category: ' + id);
      for (const key of project.categories) if (!data.terms[key]) throw new Error('Undefined category: ' + id + '/' + key);
    }
    if (expectedIds) {
      const expected = new Set(expectedIds);
      if (expected.size !== expectedIds.length) throw new Error('Duplicate project identifiers in the catalogue.');
      const actual = Object.keys(data.projects);
      if (actual.length !== expected.size || actual.some(id => !expected.has(id))) throw new Error('Anatomical metadata and catalogue project identifiers do not match.');
    }
    return data;
  }
  function project(data, exactId) {
    const item = data && data.projects && data.projects[String(exactId || '').trim()];
    if (!item) throw new Error('No reviewed anatomical metadata for ' + exactId);
    return item;
  }
  function list(value) {
    if (Array.isArray(value)) return value.map(v => typeof v === 'string' ? v : (v.label_en || v.label || JSON.stringify(v))).join('; ');
    return value == null ? '' : String(value);
  }
  function label(data, key, language) {
    const term = data && data.terms && data.terms[key];
    return term ? ((language === 'ru' && term.label_ru) || term.label_en) : key.replace(/_/g, ' ');
  }
  function search(item) {
    return ['measured_material', 'collection_site', 'primary_site', 'cell_line_origin', 'uncertainty'].map(k => list(item && item[k])).join(' ').toLowerCase();
  }
  const api = {validate, project, list, label, search};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.AnatomyMapping = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
