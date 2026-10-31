(function(){
var mq=window.matchMedia('(min-width:901px) and (hover:hover) and (prefers-reduced-motion:no-preference)');
if(!mq.matches)return;
var NS='http://www.w3.org/2000/svg',svg,P=[],total=0,ymax=[],samples=[],bubs=[],layer,ticking=false,lastH=0,seed=(Math.random()*1e9)|0;
function rnd(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}
var SEED0=seed;
var BUB=['Missed call. Picked up.','Lead sorted by urgency.','Alert sent to you.','Saved to your pipeline.','Same process in any state.','Set up with you first.','Your turn. Book a demo.'];
function mk(tag,a){var e=document.createElementNS(NS,tag);for(var k in a)e.setAttribute(k,a[k]);return e}
function cr(pts){var d='M'+pts[0][0].toFixed(1)+' '+pts[0][1].toFixed(1);
 for(var i=0;i<pts.length-1;i++){var p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||p2,t=.5/3*2;
  d+=' C'+(p1[0]+(p2[0]-p0[0])*t/1).toFixed(1)+' '+(p1[1]+(p2[1]-p0[1])*t/1).toFixed(1)+' '+(p2[0]-(p3[0]-p1[0])*t/1).toFixed(1)+' '+(p2[1]-(p3[1]-p1[1])*t/1).toFixed(1)+' '+p2[0].toFixed(1)+' '+p2[1].toFixed(1)}
 return d}
function build(){
 seed=SEED0;var de=document.documentElement,W=de.clientWidth,dh=Math.max(de.scrollHeight,document.body.scrollHeight);lastH=dh;
 if(!svg){svg=mk('svg',{'aria-hidden':'true',id:'thread'});svg.style.cssText='position:absolute;left:0;top:0;width:100%;pointer-events:none;z-index:2;overflow:hidden';
  document.body.insertBefore(svg,document.body.firstChild);layer=document.createElement('div');layer.id='tbub';layer.style.cssText='position:absolute;left:0;top:0;width:100%;height:0;pointer-events:none;z-index:3';document.body.insertBefore(layer,svg.nextSibling)}
 svg.setAttribute('height',dh);svg.setAttribute('viewBox','0 0 '+W+' '+dh);svg.innerHTML='';layer.innerHTML='';bubs=[];
 var defs=mk('defs',{});var g=mk('linearGradient',{id:'tg',gradientUnits:'userSpaceOnUse',x1:0,y1:0,x2:0,y2:dh});g.appendChild(mk('stop',{offset:0,'stop-color':'#FF8AC8'}));g.appendChild(mk('stop',{offset:1,'stop-color':'#8FB4FF'}));defs.appendChild(g);svg.appendChild(defs);
 var hero=document.querySelector('header.top'),hb=hero?hero.getBoundingClientRect().bottom+scrollY:600;
 var inn=document.querySelector('section .in'),ir=inn?inn.getBoundingClientRect():{left:60};
 var Lc=Math.max(12,(ir.left+16)/2),Rc=W-Lc,rad=Math.min(15,Lc-4);
 var els=[].slice.call(document.querySelectorAll('.strip,.marq,section,.cta')).map(function(e){var r=e.getBoundingClientRect();return {t:r.top+scrollY,b:r.bottom+scrollY}}).filter(function(o){return o.b>hb}).sort(function(a,b){return a.t-b.t});
 var pts=[[W*.62,hb-50],[W*.55+rnd()*60,hb+20]],side=rnd()<.5?0:1,cross=[];
 function gx(s){return (s?Rc:Lc)+(rnd()-.5)*Lc*.5}
 for(var i=0;i<els.length;i++){var o=els[i],nx=gx(side);
  // cross from previous into this section's gutter, inside the text free gap
  var y0=(i?els[i-1].b-44:hb+10),y1=o.t+44;if(i>0){if(y1<y0+30)y1=y0+30;
   var from=pts[pts.length-1],mx=(from[0]+nx)/2+(rnd()-.5)*W*.18,my=(y0+y1)/2+(rnd()-.5)*14;
   pts.push([from[0],y0]);pts.push([mx,my]);cross.push(pts.length-1);pts.push([nx,y1])}
  else{pts.push([nx,y1])}
  // wander down the gutter with random wiggles and the odd curl
  var y=y1,end=o.b-60;while(y<end-120){var step=110+rnd()*160;y+=step;if(y>end)break;
   var x=gx(side),w=(rnd()-.5)*rad*1.4;pts.push([x+w,y]);
   if(rad>=6&&rnd()<.38){var r=Math.max(6,rad*(.6+rnd()*.4)),cxm=x,dir=side?-1:1;
    pts.push([cxm+dir*r,y+r*.7]);pts.push([cxm,y+r*1.7]);pts.push([cxm-dir*r,y+r*.8]);pts.push([cxm,y+.1*r]);y+=r*2}}
  side=rnd()<.78?1-side:side}
 var lastEl=els[els.length-1],bk=document.querySelector('#book'),by=bk?bk.getBoundingClientRect().top+scrollY+bk.getBoundingClientRect().height*.5:dh-200;
 var cb=bk?bk.getBoundingClientRect().top+scrollY-26:dh-200;pts.push([W*.5+(rnd()-.5)*200,cb]);
 var d=cr(pts),base=mk('path',{d:d,fill:'none',stroke:'#fff','stroke-opacity':.1,'stroke-width':1.3});svg.appendChild(base);
 var paths=[[10,.07],[5,.16],[2.2,1]].map(function(a){var p=mk('path',{d:d,fill:'none',stroke:'url(#tg)','stroke-width':a[0],'stroke-linecap':'round','stroke-opacity':a[1]});svg.appendChild(p);return p});
 P=paths;total=paths[2].getTotalLength();paths.forEach(function(p){p.style.strokeDasharray=total});
 samples=[];var mxv=-1;ymax=[];for(var l=0;l<=total;l+=16){var q=paths[2].getPointAtLength(l);samples.push([l,q.x,q.y]);mxv=Math.max(mxv,q.y);ymax.push(mxv)}
 var glow=mk('circle',{id:'th2',r:16,fill:'#FF8AC8',opacity:.22}),head=mk('circle',{id:'th',r:5,fill:'#fff',stroke:'#FF8AC8','stroke-width':2.5});svg.appendChild(glow);svg.appendChild(head);
 // callouts sit on the crossings, in the text free gaps
 cross.forEach(function(ci,k){if(k>=BUB.length)return;var p=pts[ci],tl=nearest(p[0],p[1]),dv=document.createElement('div');dv.className='tb';dv.textContent=BUB[k];var right=p[0]>W*.5;
  dv.style.top=(p[1]-48)+'px';if(right){dv.style.right=(W-p[0]+14)+'px';dv.classList.add('r')}else dv.style.left=(p[0]+14)+'px';layer.appendChild(dv);if(!right){var bw=dv.offsetWidth;if(p[0]+14+bw>W-12)dv.style.left=Math.max(12,W-12-bw)+'px'}
  var ring=mk('circle',{cx:p[0],cy:p[1],r:7,fill:'none',stroke:'#FF8AC8','stroke-width':1.6});ring.style.opacity=0;ring.style.transition='opacity .4s';svg.appendChild(ring);bubs.push({len:tl,el:dv,ring:ring})});
 svg._head=head;svg._glow=glow;update()}
function nearest(x,y){var b=1e18,bl=0;for(var i=0;i<samples.length;i++){var dx=samples[i][1]-x,dy=samples[i][2]-y,dd=dx*dx+dy*dy;if(dd<b){b=dd;bl=samples[i][0]}}return bl}
function update(){ticking=false;if(!samples.length)return;var target=scrollY+innerHeight*.7,lo=0,hi=ymax.length-1;
 while(lo<hi){var m=(lo+hi)>>1;if(ymax[m]<target)lo=m+1;else hi=m}
 var s=samples[lo];P.forEach(function(p){p.style.strokeDashoffset=total-s[0]});
 var h=svg._head,gl=svg._glow;h.setAttribute('cx',s[1]);h.setAttribute('cy',s[2]);gl.setAttribute('cx',s[1]);gl.setAttribute('cy',s[2]);
 var on=scrollY>200?'1':'0';h.style.opacity=on;gl.style.opacity=on==='1'?'':'0';
 bubs.forEach(function(b){var o=s[0]>=b.len;b.el.classList.toggle('on',o);b.ring.style.opacity=o?1:0})}
function tick(){if(!ticking){ticking=true;requestAnimationFrame(update)}}
function init(){var go=function(){build();addEventListener('scroll',tick,{passive:true})};
 var t;addEventListener('resize',function(){clearTimeout(t);t=setTimeout(build,250)});
 if('ResizeObserver' in window)new ResizeObserver(function(){var h=document.documentElement.scrollHeight;if(Math.abs(h-lastH)>60){clearTimeout(t);t=setTimeout(build,300)}}).observe(document.body);
 (window.requestIdleCallback||function(f){setTimeout(f,400)})(go,{timeout:1200})}
if(document.readyState==='complete')init();else addEventListener('load',init);
})();
