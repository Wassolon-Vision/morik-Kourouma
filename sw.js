const V='hamac-v2',F=['./','./index.html','./logo.png','./favicon.png','./icon-192.png','./icon-512.png','./manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const u=new URL(e.request.url);
 if(u.hostname.endsWith('googleapis.com')||u.hostname.endsWith('firebaseio.com'))return; // les données Firebase ne passent pas par le cache
 e.respondWith(fetch(e.request).then(r=>{if(r.ok||r.type==='opaque'){const c=r.clone();caches.open(V).then(h=>h.put(e.request,c)).catch(()=>{})}return r}).catch(()=>caches.match(e.request)))});
