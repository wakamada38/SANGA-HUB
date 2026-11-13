const C='sanga-hub-v1';
const CORE=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
const CDN=['https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js','https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js','https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js','https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.12.2/firebase-database-compat.js','https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js','https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js','https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js','https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(C);
await Promise.all([...CORE.map(u=>c.add(u).catch(()=>{})),...CDN.map(u=>fetch(u,{mode:'no-cors'}).then(r=>c.put(u,r)).catch(()=>{}))]);
self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
const cdn=(u.hostname==='www.gstatic.com'&&u.pathname.startsWith('/firebasejs/'))||(u.hostname==='cdnjs.cloudflare.com'&&u.pathname.startsWith('/ajax/libs/'))||u.hostname==='unpkg.com';
if(u.origin!==location.origin&&!cdn)return;
e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{
const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>null);
if(hit){e.waitUntil(net);return hit}
return net.then(res=>res||(r.mode==='navigate'?caches.match('./index.html'):Response.error()))}))});
