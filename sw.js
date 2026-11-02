var V='carteira-v1';
var FILES=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(FILES);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==V;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET'||e.request.url.indexOf(self.location.origin)!==0)return;
  e.respondWith(fetch(e.request).then(function(res){var cp=res.clone();caches.open(V).then(function(c){c.put(e.request,cp);});return res;}).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match('index.html');});}));
});
