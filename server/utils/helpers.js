export function isEmail(str) {
  if (typeof str !== 'string') return false;

  const s = str.trim();

  const parts = s.split('@');
  if (parts.length !== 2) return false;

  const [before, after] = parts;

  return before.length > 0 && after.length > 0;
}
