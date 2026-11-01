(function(){
/* HOLIDAY OFFER SETTINGS: change SPOTS to 1 when a firm signs, 0 when both are taken */
var SPOTS=2,END=new Date('2027-01-01T00:00:00-05:00').getTime();
function p(n){return n<10?'0'+n:''+n}
var spotText=SPOTS<=0?'Both holiday spots are taken':(SPOTS===1?'Only 1 spot left':'Only '+SPOTS+' spots left');
var sp=document.querySelectorAll('[data-spots]');for(var i=0;i<sp.length;i++)sp[i].textContent=spotText;
var cd=document.querySelectorAll('[data-cd]');
function set(k,v){for(var i=0;i<cd.length;i++)if(cd[i].getAttribute('data-cd')===k)cd[i].textContent=v}
var ann=document.querySelectorAll('.ann'),dead=false;
function tick(){var t=END-Date.now();
 if(t<=0||SPOTS<=0){if(!dead){dead=true;for(var i=0;i<ann.length;i++)ann[i].hidden=true;var h=document.querySelectorAll('.hban');for(var j=0;j<h.length;j++)h[j].hidden=true;var c=document.querySelectorAll('.cd');for(var k=0;k<c.length;k++)c[k].style.opacity=.35}
  if(t<=0){set('d','00');set('h','00');set('m','00');set('s','00')}return}
 var D=Math.floor(t/864e5),H=Math.floor(t%864e5/36e5),M=Math.floor(t%36e5/6e4),S=Math.floor(t%6e4/1e3);
 set('d',D<100?p(D):''+D);set('h',p(H));set('m',p(M));set('s',p(S));set('short',D+'d '+p(H)+'h '+p(M)+'m '+p(S)+'s')}
tick();setInterval(tick,1000);
/* thin scroll progress bar */
var bar=document.querySelector('.sp');
if(bar){var tk=false;function u(){tk=false;var de=document.documentElement,m=de.scrollHeight-innerHeight;bar.style.transform='scaleX('+(m>0?Math.min(1,scrollY/m):0)+')'}
 addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(u)}},{passive:true});u()}
})();
