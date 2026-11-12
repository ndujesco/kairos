'use strict';
const DATA=JSON.parse(document.getElementById('pitch-data').textContent);
const $=id=>document.getElementById(id);
const tabs=[...document.querySelectorAll('[role="tab"]')];
const panels=[...document.querySelectorAll('[role="tabpanel"]')];
const mmss=s=>Math.floor(Math.max(0,s)/60)+':'+String(Math.floor(Math.max(0,s)%60)).padStart(2,'0');
let current=0,readAll=false,deckOnly=false;
function activateTab(id,focus=false){
  const selected=tabs.find(t=>t.id===id)||tabs[0];
  tabs.forEach(t=>{const on=t===selected;t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1;});
  panels.forEach(p=>p.hidden=p.id!==selected.getAttribute('aria-controls'));
  window.scrollTo(0,0);
  if(focus)selected.focus();
  if(selected.id==='tab-questions'&&focus)$('search').focus();
}
tabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>activateTab(tab.id));
  tab.addEventListener('keydown',ev=>{
    let n=null;
    if(ev.key==='ArrowRight')n=(i+1)%tabs.length;
    if(ev.key==='ArrowLeft')n=(i-1+tabs.length)%tabs.length;
    if(ev.key==='Home')n=0;if(ev.key==='End')n=tabs.length-1;
    if(n!==null){ev.preventDefault();ev.stopPropagation();activateTab(tabs[n].id,true);}
  });
});
const blocks=[...document.querySelectorAll('.scriptblock')];
const images=[...document.querySelectorAll('.slideimage')];
const jumps=[...document.querySelectorAll('.jump button')];
const LAST=DATA.slides.at(-1).end;
let elapsed=0,startedAt=null,interval=null;
function seconds(){return elapsed+(startedAt===null?0:(performance.now()-startedAt)/1000);}
function paintClock(){
  const t=seconds();$('clock').textContent=mmss(t);
  $('meterfill').style.width=Math.min(100,100*t/LAST)+'%';
  $('meterfill').classList.toggle('over',t>LAST);
  const planned=DATA.slides.findIndex(s=>t>=s.start&&t<s.end);
  const status=$('clock-status');status.classList.remove('late');
  if(t===0){status.textContent='Ready. Start the clock when you begin speaking.';return;}
  if(t>LAST){status.textContent='Past the planning time by '+Math.ceil(t-LAST)+'s. Finish the thought, then take questions.';status.classList.add('late');return;}
  if(planned===current){status.textContent='On the planned slide · '+Math.max(0,Math.ceil(DATA.slides[current].end-t))+'s until the next section.';}
  else if(planned>current){status.textContent='The planning clock is on slide '+(planned+1)+'. Keep a natural pace and use the short route if needed.';status.classList.add('late');}
  else{status.textContent='You are ahead of the plan. Leave room for the receipt moment.';}
}
function showSlide(n){
  current=Math.max(0,Math.min(DATA.slides.length-1,n));
  images.forEach((im,i)=>im.hidden=i!==current);
  blocks.forEach((b,i)=>b.hidden=!readAll&&i!==current);
  jumps.forEach((b,i)=>b.setAttribute('aria-current',String(i===current)));
  $('prev').disabled=current===0;$('next').disabled=current===DATA.slides.length-1;
  $('current-label').textContent='Slide '+(current+1)+' of '+DATA.slides.length;
  paintClock();
  if(readAll)blocks[current].scrollIntoView({behavior:'smooth',block:'start'});
}
$('prev').addEventListener('click',()=>showSlide(current-1));
$('next').addEventListener('click',()=>showSlide(current+1));
jumps.forEach((b,i)=>b.addEventListener('click',()=>showSlide(i)));
function toggleClock(){
  if(startedAt!==null){elapsed=seconds();startedAt=null;clearInterval(interval);$('clock-toggle').textContent='Resume';}
  else{startedAt=performance.now();interval=setInterval(paintClock,200);$('clock-toggle').textContent='Pause';}
  paintClock();
}
$('clock-toggle').addEventListener('click',toggleClock);
$('clock-reset').addEventListener('click',()=>{elapsed=0;startedAt=null;clearInterval(interval);$('clock-toggle').textContent='Start';paintClock();});
function setReadAll(on){
  readAll=on;$('script-paper').classList.toggle('readall',on);
  $('one-slide').classList.toggle('on',!on);$('read-through').classList.toggle('on',on);
  $('one-slide').setAttribute('aria-pressed',String(!on));$('read-through').setAttribute('aria-pressed',String(on));
  showSlide(current);
}
$('one-slide').addEventListener('click',()=>setReadAll(false));
$('read-through').addEventListener('click',()=>setReadAll(true));
$('deck-mode').addEventListener('click',()=>{
  deckOnly=!deckOnly;document.body.classList.toggle('deckonly',deckOnly);
  $('deck-mode').textContent=deckOnly?'Show script':'Deck only';
  $('deck-mode').setAttribute('aria-pressed',String(deckOnly));
});
$('fullscreen').addEventListener('click',async()=>{
  try{if(document.fullscreenElement)await document.exitFullscreen();else await $('deck-view').requestFullscreen();}
  catch{deckOnly=true;document.body.classList.add('deckonly');$('deck-mode').textContent='Show script';$('deck-mode').setAttribute('aria-pressed','true');}
});
showSlide(0);

const cards=[...document.querySelectorAll('.qcard')];
const normalise=s=>s.normalize('NFKC').toLowerCase().replace(/[’']/g,'').replace(/\s+/g,' ');
const questionMap=new Map(DATA.questions.map(q=>[q.id,q]));
cards.forEach(c=>{const q=questionMap.get(c.dataset.id);c.dataset.search=normalise(q.question+' '+q.answer+' '+q.category);});
const STAR_KEY='kairos-cleva-prepitch-stars-v1';
let stars=new Set(),priorityOnly=false,starredOnly=false;
try{const saved=JSON.parse(localStorage.getItem(STAR_KEY)||'[]');if(Array.isArray(saved))stars=new Set(saved.filter(x=>questionMap.has(x)));}catch{}
function paintStars(){
  cards.forEach(c=>{const on=stars.has(c.dataset.id);c.classList.toggle('starred',on);const b=c.querySelector('.star');b.textContent=on?'★':'☆';b.setAttribute('aria-pressed',String(on));b.setAttribute('aria-label',(on?'Unstar: ':'Star: ')+questionMap.get(c.dataset.id).question);});
  $('star-count').textContent=stars.size;
}
cards.forEach(c=>c.querySelector('.star').addEventListener('click',()=>{
  const id=c.dataset.id;if(stars.has(id))stars.delete(id);else stars.add(id);
  try{localStorage.setItem(STAR_KEY,JSON.stringify([...stars]));}catch{}
  paintStars();if(starredOnly)filterQuestions();
}));
function filterQuestions(){
  const query=normalise($('search').value.trim());const words=query.split(' ').filter(Boolean);
  const category=$('category').value;let count=0;
  cards.forEach(c=>{
    const q=questionMap.get(c.dataset.id);
    const hit=(!category||q.category===category)&&(!priorityOnly||q.priority)&&(!starredOnly||stars.has(q.id))&&words.every(w=>c.dataset.search.includes(w));
    c.hidden=!hit;if(hit)count++;
    if(query)c.querySelector('details').open=hit;
  });
  $('question-count').textContent=count+' of '+DATA.questions.length+' questions';
  $('empty').hidden=count!==0;$('clear-search').hidden=!query;
}
$('search').addEventListener('input',filterQuestions);$('category').addEventListener('change',filterQuestions);
$('clear-search').addEventListener('click',()=>{$('search').value='';filterQuestions();$('search').focus();});
$('priority-filter').addEventListener('click',()=>{priorityOnly=!priorityOnly;$('priority-filter').setAttribute('aria-pressed',String(priorityOnly));filterQuestions();});
$('star-filter').addEventListener('click',()=>{starredOnly=!starredOnly;$('star-filter').setAttribute('aria-pressed',String(starredOnly));filterQuestions();});
$('clear-filters').addEventListener('click',()=>{
  $('search').value='';$('category').value='';priorityOnly=false;starredOnly=false;
  $('priority-filter').setAttribute('aria-pressed','false');$('star-filter').setAttribute('aria-pressed','false');
  cards.forEach(c=>c.querySelector('details').open=false);filterQuestions();
});
$('expand-answers').addEventListener('click',()=>{
  const visible=cards.filter(c=>!c.hidden);const open=visible.some(c=>!c.querySelector('details').open);
  visible.forEach(c=>c.querySelector('details').open=open);$('expand-answers').textContent=open?'Collapse answers':'Expand answers';
});
paintStars();filterQuestions();
document.querySelectorAll('[data-priority-link]').forEach(b=>b.addEventListener('click',()=>{
  activateTab('tab-questions');priorityOnly=true;$('priority-filter').setAttribute('aria-pressed','true');filterQuestions();window.scrollTo(0,0);
}));

let demoElapsed=0,demoStart=null,demoInterval=null;
function paintDemo(){const t=demoElapsed+(demoStart===null?0:(performance.now()-demoStart)/1000);$('demo-clock').textContent=mmss(t);}
$('demo-start').addEventListener('click',()=>{
  if(demoStart!==null){demoElapsed+=(performance.now()-demoStart)/1000;demoStart=null;clearInterval(demoInterval);$('demo-start').textContent='Resume';}
  else{demoStart=performance.now();demoInterval=setInterval(paintDemo,200);$('demo-start').textContent='Pause';}paintDemo();
});
$('demo-reset').addEventListener('click',()=>{demoElapsed=0;demoStart=null;clearInterval(demoInterval);$('demo-start').textContent='Start';paintDemo();});
const checks=[...document.querySelectorAll('[data-check]')];const CHECK_KEY='kairos-shared-pitch-checks-v2';
try{const saved=JSON.parse(localStorage.getItem(CHECK_KEY)||'{}');checks.forEach(c=>c.checked=saved[c.dataset.check]===true);}catch{}
checks.forEach(c=>c.addEventListener('change',()=>{try{localStorage.setItem(CHECK_KEY,JSON.stringify(Object.fromEntries(checks.map(x=>[x.dataset.check,x.checked]))));}catch{}}));
$('print').addEventListener('click',()=>window.print());
let printOpen=[];
window.addEventListener('beforeprint',()=>{printOpen=[...document.querySelectorAll('details')].map(d=>[d,d.open]);printOpen.forEach(([d])=>d.open=true);});
window.addEventListener('afterprint',()=>printOpen.forEach(([d,open])=>d.open=open));
document.addEventListener('keydown',ev=>{
  const editable=/^(INPUT|TEXTAREA|SELECT)$/.test(ev.target.tagName)||ev.target.isContentEditable;
  if(ev.key==='Escape'&&ev.target===$('search')){$('search').value='';filterQuestions();return;}
  if(editable||ev.altKey||ev.ctrlKey||ev.metaKey)return;
  if(ev.key==='/'){ev.preventDefault();activateTab('tab-questions');$('search').focus();return;}
  if($('panel-pitch').hidden)return;
  if(ev.key==='ArrowRight'||ev.key==='PageDown'){ev.preventDefault();showSlide(current+1);}
  if(ev.key==='ArrowLeft'||ev.key==='PageUp'){ev.preventDefault();showSlide(current-1);}
});
if(location.hash==='#questions')activateTab('tab-questions');
