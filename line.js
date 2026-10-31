(function(){
var mq=window.matchMedia('(min-width:901px) and (hover:hover) and (prefers-reduced-motion:no-preference)');
if(!mq.matches)return;
var NS='http://www.w3.org/2000/svg',svg,path,glow,head,samples=[],total=0,ticking=false;
function css(n,f){var v=getComputedStyle(document.documentElement).getPropertyValue(n).trim();return v||f}
function build(){
 var h=document.documentElement,dh=Math.max(h.scrollHeight,document.body.scrollHeight),W=h.clientWidth;
 if(!svg){svg=document.createElementNS(NS,'svg');svg.setAttribute('aria-hidden','true');svg.id='thread';
  svg.style.cssText='position:absolute;left:0;top:0;width:100%;pointer-events:none;z-index:0;overflow:visible';
  svg.innerHTML='<defs><linearGradient id="tg" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF8AC8"/><stop offset="1" stop-color="#8FB4FF"/></linearGradient></defs><path id="tp0" fill="none" stroke-width="1.4" stroke-opacity=".16"/><path id="tp" fill="none" stroke="url(#tg)" stroke-width="2.2" stroke-linecap="round"/><circle id="th2" r="14" fill="#FF8AC8" opacity=".18"/><circle id="th" r="5" fill="#fff" stroke="#FF8AC8" stroke-width="2.5"/>';
  document.body.insertBefore(svg,document.body.firstChild);
  var secs=[].slice.call(document.querySelectorAll('section, .marq, .cta'));secs.forEach(function(s){if(getComputedStyle(s).position==='static')s.style.position='relative';s.style.zIndex=1});
 }
 svg.setAttribute('height',dh);svg.setAttribute('viewBox','0 0 '+W+' '+dh);
 var g=svg.querySelector('#tg');g.setAttribute('y2',dh);
 var hero=document.querySelector('header.top'),hb=hero?hero.getBoundingClientRect().bottom+scrollY:600;
 var inn=document.querySelector('section .in'),r=inn?inn.getBoundingClientRect():{left:60,right:W-60};
 var L=Math.max(18,r.left-24),R=Math.min(W-18,r.right+24);
 var pts=[[W*.5,hb-40]],side=0;
 [].slice.call(document.querySelectorAll('section, .cta')).forEach(function(s,i){
  var b=s.getBoundingClientRect(),y=b.top+scrollY+Math.min(90,b.height*.25);if(y<hb)return;
  pts.push([side?R:L,y]);side=1-side});
 var last=document.querySelector('#book');if(last){var lb=last.getBoundingClientRect();pts.push([W*.5,lb.top+scrollY+lb.height*.5])}
 var d='M'+pts[0][0]+' '+pts[0][1];
 for(var i=1;i<pts.length;i++){var a=pts[i-1],b=pts[i],m=(a[1]+b[1])/2;d+=' C'+a[0]+' '+m+' '+b[0]+' '+m+' '+b[0]+' '+b[1]}
 path=svg.querySelector('#tp');var p0=svg.querySelector('#tp0');p0.setAttribute('d',d);path.setAttribute('d',d);
 total=path.getTotalLength();samples=[];
 for(var l=0;l<=total;l+=14){var q=path.getPointAtLength(l);samples.push([l,q.x,q.y])}
 path.style.strokeDasharray=total;placeBubbles();head=svg.querySelector('#th');glow=svg.querySelector('#th2');
 update()}
var BUB=[['.marq','Missed call. Picked up.'],['.flow','Lead sorted by urgency.'],['#ways','Alert sent to you.'],['#sorting','Saved to your pipeline.'],['#where','Same process in any state.'],['#process','Set up with you first.'],['#book','Your turn. Book a demo.']],bubs=[],layer;
function placeBubbles(){
 if(!layer){layer=document.createElement('div');layer.id='tbub';layer.style.cssText='position:absolute;left:0;top:0;width:100%;height:0;pointer-events:none;z-index:2';document.body.insertBefore(layer,svg.nextSibling)}
 layer.innerHTML='';bubs=[];var W=document.documentElement.clientWidth;
 svg.querySelectorAll('.tm').forEach(function(n){n.remove()});
 BUB.forEach(function(b){var el=document.querySelector(b[0]);if(!el)return;var r=el.getBoundingClientRect(),ty=r.top+scrollY+(b[0]==='#book'?r.height*.5:34);
  var lo=0,hi=samples.length-1;while(lo<hi){var m=(lo+hi)>>1;if(samples[m][2]<ty)lo=m+1;else hi=m}var sp=samples[lo];
  var d=document.createElement('div');d.className='tb';d.textContent=b[1];var right=sp[1]>W/2;d.style.top=(sp[2]-22)+'px';
  if(right){d.style.right=(W-sp[1]+16)+'px';d.classList.add('r')}else d.style.left=(sp[1]+16)+'px';
  layer.appendChild(d);
  var c=document.createElementNS(NS,'circle');c.setAttribute('class','tm');c.setAttribute('cx',sp[1]);c.setAttribute('cy',sp[2]);c.setAttribute('r',7);c.setAttribute('fill','none');c.setAttribute('stroke','#FF8AC8');c.setAttribute('stroke-width','1.6');c.style.opacity=0;c.style.transition='opacity .4s';svg.appendChild(c);
  bubs.push({len:sp[0],el:d,ring:c})})}
function update(){ticking=false;if(!samples.length)return;
 var target=scrollY+innerHeight*.7,lo=0,hi=samples.length-1;
 while(lo<hi){var mid=(lo+hi)>>1;if(samples[mid][2]<target)lo=mid+1;else hi=mid}
 var s=samples[lo],atEnd=target>=samples[samples.length-1][2];if(atEnd)s=samples[samples.length-1];
 path.style.strokeDashoffset=total-s[0];
 head.setAttribute('cx',s[1]);head.setAttribute('cy',s[2]);glow.setAttribute('cx',s[1]);glow.setAttribute('cy',s[2]);
 bubs.forEach(function(b){var on=s[0]>=b.len;b.el.classList.toggle('on',on);b.ring.style.opacity=on?1:0});var on=scrollY>200;head.style.opacity=glow.style.opacity=on?'':0}
function tick(){if(!ticking){ticking=true;requestAnimationFrame(update)}}
function init(){build();addEventListener('scroll',tick,{passive:true});var t;addEventListener('resize',function(){clearTimeout(t);t=setTimeout(build,200)});
 if('ResizeObserver' in window){var last=0;new ResizeObserver(function(){var h=document.body.scrollHeight;if(Math.abs(h-last)>4){last=h;clearTimeout(t);t=setTimeout(build,150)}}).observe(document.body)}}
if(document.readyState==='complete')init();else addEventListener('load',init);
})();
