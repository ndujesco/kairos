// Offline storage is opt-in and scoped to /ugo-audio.html only.
const REVISION = "6e241a065a3c";
const CACHE = "kairos-ugo-6e241a065a3c-2b0810bb";
const FILES = [
  "/ugo-audio.html",
  "/ugo-audio/tracks/01-intro.m4a?v=2e3fa06803e0",
  "/ugo-audio/tracks/02-problem.m4a?v=5e59c30230a9",
  "/ugo-audio/tracks/03-solution.m4a?v=f9a36eee5a3a",
  "/ugo-audio/tracks/04-business-model.m4a?v=227b8e77a9db",
  "/ugo-audio/tracks/05-demo.m4a?v=d237d28eadf4",
  "/ugo-audio/tracks/06-responsible-operation.m4a?v=a7160735994e",
  "/ugo-audio/tracks/07-what-runs-today.m4a?v=96a507740422",
  "/ugo-audio/tracks/08-where-we-start.m4a?v=d71fc1c76bed",
  "/ugo-audio/tracks/09-meet-the-team.m4a?v=36258ca241af",
  "/ugo-audio/tracks/10-conclusion.m4a?v=945c28b71da1",
  "/ugo-audio/all.m4a?v=e3f00ee32fcb",
  "/ugo-audio/without-demo.m4a?v=c91b4e2af1a6"
];
const COMPLETE = '/ugo-audio/.complete?cache=' + CACHE;
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
const tell = (client, data) => client?.postMessage({ ...data, revision: REVISION });
let saving = null;
async function save(client) {
 try {
  const cache = await caches.open(CACHE);
  await cache.delete(COMPLETE);
  for(let i=0; i<FILES.length; i++) {
   const response = await fetch(FILES[i], {cache:'reload'});
   if(!response.ok || response.status!==200) throw new Error('Download failed');
   await cache.put(FILES[i],response);
   tell(client,{type:'progress',done:i+1,total:FILES.length});
  }
  await cache.put(COMPLETE,new Response('complete'));
  for(const name of await caches.keys())if(name.startsWith('kairos-ugo-')&&name!==CACHE)await caches.delete(name);
  tell(client,{type:'saved'});
 } catch {
  tell(client,{type:'failed'});
 }
}
self.addEventListener('message',event=>{
 if(event.data?.revision!==REVISION)return;
 if(event.data.type==='save'){
  if(!saving)saving=save(event.source).finally(()=>{saving=null;});
  event.waitUntil(saving);
 }
 if(event.data.type==='status')event.waitUntil((async()=>{const cache=await caches.open(CACHE);if(await cache.match(COMPLETE))tell(event.source,{type:'saved'});})());
});
async function ranged(request,cached){
 const range=request.headers.get('range');
 if(!range)return cached;
 const bytes=await cached.arrayBuffer(),size=bytes.byteLength;
 const match=/^bytes=(\d*)-(\d*)$/.exec(range);
 if(!match || (!match[1]&&!match[2]))return new Response(null,{status:416,headers:{'Content-Range':`bytes */${size}`}});
 let start=match[1]?Number(match[1]):Math.max(0,size-Number(match[2]));
 let end=match[1]?(match[2]?Math.min(Number(match[2]),size-1):size-1):size-1;
 if(start>=size||end<start)return new Response(null,{status:416,headers:{'Content-Range':`bytes */${size}`}});
 const headers=new Headers(cached.headers);headers.set('Content-Range',`bytes ${start}-${end}/${size}`);headers.set('Content-Length',String(end-start+1));headers.set('Accept-Ranges','bytes');
 return new Response(bytes.slice(start,end+1),{status:206,statusText:'Partial Content',headers});
}
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
 if(url.pathname!=='/ugo-audio.html'&&!url.pathname.startsWith('/ugo-audio/'))return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  if(url.pathname==='/ugo-audio.html'){
   try{return await fetch(event.request);}catch{const saved=await cache.match('/ugo-audio.html');if(saved)return saved;throw new Error('Page not saved');}
  }
  const cached=await cache.match(event.request.url);
  return cached?await ranged(event.request,cached):fetch(event.request);
 })());
});
