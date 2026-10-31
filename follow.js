(function(){
var st=document.getElementById('fstage');if(!st)return;
var NS='http://www.w3.org/2000/svg',svg=st.querySelector(':scope > svg'),hls=[].slice.call(st.querySelectorAll('.hl')),rows=[].slice.call(st.querySelectorAll('.erow')),done=st.querySelector('.edone'),paper=st.querySelector('.fpaper');
var desk=window.matchMedia('(min-width:900px)'),reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches,paths=[],lens=[],ticking=false;
function rel(el){var a=el.getBoundingClientRect(),b=st.getBoundingClientRect();return {l:a.left-b.left,r:a.right-b.left,t:a.top-b.top,b:a.bottom-b.top,cy:a.top-b.top+a.height/2}}
function build(){
 svg.innerHTML='';paths=[];lens=[];if(!desk.matches){svg.style.display='none';return}svg.style.display='';
 var b=st.getBoundingClientRect();svg.setAttribute('viewBox','0 0 '+b.width+' '+b.height);
 var defs=document.createElementNS(NS,'defs');svg.appendChild(defs);
 function mk(x1,y1,x2,y2,i){var h=Math.max(70,(x2-x1)*.45),d='M'+x1+' '+y1+' C'+(x1+h)+' '+y1+' '+(x2-h)+' '+y2+' '+x2+' '+y2;
  var m=document.createElementNS(NS,'mask');m.id='fm'+i;var mp=document.createElementNS(NS,'path');mp.setAttribute('d',d);mp.setAttribute('fill','none');mp.setAttribute('stroke','#fff');mp.setAttribute('stroke-width','8');m.appendChild(mp);defs.appendChild(m);
  var p=document.createElementNS(NS,'path');p.setAttribute('d',d);p.setAttribute('fill','none');p.setAttribute('stroke','#FF6AB0');p.setAttribute('stroke-width','1.6');p.setAttribute('stroke-dasharray','6 5');p.setAttribute('mask','url(#fm'+i+')');svg.appendChild(p);
  var L=mp.getTotalLength();mp.style.strokeDasharray=L;mp.style.strokeDashoffset=L;paths.push(mp);lens.push(L)}
 hls.forEach(function(h,i){var a=rel(h),r=rel(rows[i]);mk(a.r+4,a.cy,r.l-2,r.cy,i)});
 update()}
function update(){ticking=false;var r=st.getBoundingClientRect(),vh=innerHeight;
 var t=Math.max(0,Math.min(1,(vh*.85-r.top)/(r.height*.85)));if(reduce||!desk.matches)t=1;
 hls.forEach(function(h,i){var a=.1+i*.14;h.classList.toggle('on',t>a)});
 paths.forEach(function(p,i){var a=.18+i*.14,q=Math.max(0,Math.min(1,(t-a)/.14));p.style.strokeDashoffset=lens[i]*(1-q);
  if(rows[i])rows[i].classList.toggle('on',q>=.95||!desk.matches||t>=1&&reduce);
  });
 if(done)done.classList.toggle('on',t>.18+hls.length*.14+.05);
 if(!desk.matches||reduce){rows.forEach(function(x){x.classList.add('on')});if(done)done.classList.add('on');hls.forEach(function(h){h.classList.add('on')})}
 if(paper&&desk.matches&&!reduce)paper.style.transform='rotate('+(3-t*3)+'deg) translateY('+((1-t)*14)+'px)'}
function tick(){if(!ticking){ticking=true;requestAnimationFrame(update)}}
function init(){build();addEventListener('scroll',tick,{passive:true});var tm;addEventListener('resize',function(){clearTimeout(tm);tm=setTimeout(build,200)});if(desk.addEventListener)desk.addEventListener('change',build)}
if(document.readyState==='complete')init();else addEventListener('load',init);
})();
