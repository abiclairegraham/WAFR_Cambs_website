function get(obj, path) {
  return path.split('.').reduce((o, k) => (o && k in o ? o[k] : undefined), obj);
}

let cfgCache = null;

async function ensureConfig() {
  if (cfgCache) return cfgCache;
  // Root-relative is safest if you navigate across pages:
  const res = await fetch('/data/config.json?cache=' + Date.now());
  if (!res.ok) throw new Error(`Failed to load config.json (${res.status})`);
  cfgCache = await res.json();
  return cfgCache;
}

async function applyConfig() {
  try {
    const cfg = await ensureConfig();
    const els = document.querySelectorAll('[data-config-key]:not([data-config-applied])');
    els.forEach(el => {
      const key  = el.getAttribute('data-config-key');
      const attr = el.getAttribute('data-config-attr') || 'href';
      const val  = get(cfg, key);
      if (val) {
        el.setAttribute(attr, val);
        el.setAttribute('data-config-applied', '1'); // idempotent
      } else {
        console.warn(`config: key "${key}" not found`);
      }
    });
  } catch (err) {
    console.error('config error:', err);
  }
}

// run once on initial DOM (in case some elements are already there)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyConfig);
} else {
  applyConfig();
}

// expose for your includes:loaded hook
window.applyConfig = applyConfig;
