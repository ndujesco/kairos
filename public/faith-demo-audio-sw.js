// Offline storage is opt-in and scoped to /faith-demo-audio.html only.
const REVISION = "9cd4ab280a37";
const CACHE = "kairos-faith-demo-9cd4ab280a37-bc965bc4";
const FILES = [
  "/faith-demo-audio.html",
  "/faith-demo-audio/tracks/01-ai-interview.m4a?v=9cb431985e8f",
  "/faith-demo-audio/tracks/02-itemised-budget.m4a?v=b5a25bda0a86",
  "/faith-demo-audio/tracks/03-nin-face-check.m4a?v=25226c9b3ec1",
  "/faith-demo-audio/tracks/04-verification.m4a?v=b77256ceaadc",
  "/faith-demo-audio/tracks/05-okefe-donates.m4a?v=698ce4fa6dcc",
  "/faith-demo-audio/tracks/06-abigail-donates.m4a?v=f6dd3cdb6e08",
  "/faith-demo-audio/tracks/07-live-updates.m4a?v=4ee0fe0b7639",
  "/faith-demo-audio/tracks/08-wallet.m4a?v=2294c92a2fd3",
  "/faith-demo-audio/tracks/09-pay-fees.m4a?v=d9f392f9ba00",
  "/faith-demo-audio/tracks/10-donor-receipt.m4a?v=18b262604851",
  "/faith-demo-audio/all.m4a?v=139aaceab652"
];
const COMPLETE = '/faith-demo-audio/.complete?cache=' + CACHE;
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
  for(const name of await caches.keys())if(name.startsWith('kairos-faith-demo-')&&name!==CACHE)await caches.delete(name);
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
 if(url.pathname!=='/faith-demo-audio.html'&&!url.pathname.startsWith('/faith-demo-audio/'))return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  if(url.pathname==='/faith-demo-audio.html'){
   try{return await fetch(event.request);}catch{const saved=await cache.match('/faith-demo-audio.html');if(saved)return saved;throw new Error('Page not saved');}
  }
  const cached=await cache.match(event.request.url);
  return cached?await ranged(event.request,cached):fetch(event.request);
 })());
});
