(function(){
var mq=window.matchMedia('(min-width:901px) and (hover:hover) and (prefers-reduced-motion:no-preference)');
if(!mq.matches)return;
var f=document.getElementById('flow'),lanes=f?[].slice.call(f.querySelectorAll('.lane')):[],t=false;
function run(){t=false;var r=f.getBoundingClientRect(),h=window.innerHeight;
 var p=(h-r.top)/(h+r.height);p=Math.max(0,Math.min(1,p));
 lanes.forEach(function(l,i){var d=+l.dataset.dir,span=Math.max(0,l.scrollWidth-window.innerWidth);
  var x=d>0?-(p*span):-((1-p)*span);l.style.transform='translate3d('+x+'px,0,0)'})}
function q(){if(!t){t=true;requestAnimationFrame(run)}}
if(f){window.addEventListener('scroll',q,{passive:true});window.addEventListener('resize',q);run()}
var hd=document.querySelector('header.top');
if(hd){hd.addEventListener('mousemove',function(e){var b=hd.getBoundingClientRect();hd.style.setProperty('--mx',(e.clientX-b.left)+'px');hd.style.setProperty('--my',(e.clientY-b.top)+'px')});
 hd.addEventListener('mouseleave',function(){hd.style.removeProperty('--mx');hd.style.removeProperty('--my')})}
})();
