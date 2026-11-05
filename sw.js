// 婚禮籌備助手：離線快取。改了 index.html 想強制大家更新時，把版本號 +1
const C = 'wedding-helper-v2';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(C).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

const withTimeout = (ms, p) => new Promise((res, rej) => {
  const t = setTimeout(() => rej(new Error('timeout')), ms);
  p.then(v => { clearTimeout(t); res(v); }, e => { clearTimeout(t); rej(e); });
});

// 先試網路（最多等 3.5 秒），訊號差或離線就用手機裡存的版本
async function networkFirst(req, key) {
  const c = await caches.open(C);
  const net = fetch(req).then(r => { if (r && r.ok) c.put(key, r.clone()); return r; });
  try { return await withTimeout(3500, net); }
  catch (e) {
    const m = await c.match(key, { ignoreSearch: true });
    if (m) return m;
    return net;
  }
}
// 先用手機裡存的，背景再更新
async function cacheFirst(req) {
  const c = await caches.open(C);
  const m = await c.match(req);
  const net = fetch(req).then(r => { if (r && (r.ok || r.type === 'opaque')) c.put(req, r.clone()); return r; }).catch(() => m);
  return m || net;
}

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin === location.origin) {
    if (r.mode === 'navigate') return e.respondWith(networkFirst(r, new URL('./index.html', location).href));
    if (u.pathname.endsWith('/data.json')) return e.respondWith(networkFirst(r, u.origin + u.pathname));
    return e.respondWith(cacheFirst(r));
  }
  if (/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)) e.respondWith(cacheFirst(r));
});
