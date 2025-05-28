module.exports = {
  // E.g: kebab-case
  toKebabCase: (s) => s.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase(),
  // E.g: PascalCase
  toPascalCase: (s) => (s.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join(''),
  // E.g: camelCase
  toCamelCase: (s) => (s.match(/[a-zA-Z0-9]+/g) || []).map(
    (w, i) => `${i != 0 ? w.charAt(0).toUpperCase() : w.charAt(0).toLowerCase()}${w.slice(1)}`
  ).join(''),
  // E.g: test -> Test
  capitaliseFirstLetter: (s) => s.charAt(0).toUpperCase() + s.slice(1),
  // E.g remove-hyphens-please -> removeallhyphensplease
  removeHyphens: (s) => s.replaceAll('-', '')
  snakeCaseToCamelCase: (s) => s.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};
