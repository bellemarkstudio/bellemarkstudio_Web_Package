(function(){
var c=document.getElementById('pc');if(!c)return;
var cx=c.getContext('2d'),S=640,dpr=Math.min(2,window.devicePixelRatio||1);
c.width=c.height=S*dpr;
var reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
var small=window.innerWidth<700,step=small?8:7,N=small?1200:1900;
var names=['Call comes in','Answered right away','Alert sent to you','Lead saved to your pipeline'];
function shape(i){var o=document.createElement('canvas');o.width=o.height=S;var g=o.getContext('2d');g.scale(S/520,S/520);
 g.lineJoin=g.lineCap='round';
 function col(r){g.strokeStyle=g.fillStyle='rgb('+r+',0,0)'}
 function rr(x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
 if(i==0){col(255);g.lineWidth=20;rr(160,40,200,440,40);g.stroke();
  col(200);g.fillRect(195,110,130,80);col(150);g.fillRect(195,215,130,70);col(100);g.fillRect(195,310,130,60);
  col(255);g.beginPath();g.arc(260,425,16,0,7);g.fill()}
 if(i==1){col(255);g.lineWidth=16;[110,175,240].forEach(function(r,k){col(k==0?200:k==1?150:255);g.beginPath();g.arc(260,260,r,0,7);g.stroke()});col(100);g.beginPath();g.arc(260,260,40,0,7);g.fill()}
 if(i==2){col(255);g.lineWidth=20;rr(50,120,420,280,30);g.stroke();col(200);g.lineWidth=22;g.beginPath();g.moveTo(80,150);g.lineTo(260,290);g.lineTo(440,150);g.stroke();col(100);g.fillRect(150,320,120,22);col(150);g.fillRect(150,355,200,16)}
 if(i==3){col(255);g.lineWidth=20;g.beginPath();g.arc(260,260,200,0,7);g.stroke();col(150);g.lineWidth=32;g.beginPath();g.moveTo(165,265);g.lineTo(235,335);g.lineTo(360,190);g.stroke();col(100);g.lineWidth=14;g.beginPath();g.arc(260,260,150,-.4,1.2);g.stroke()}
 var d=g.getImageData(0,0,S,S).data,pts=[];
 for(var y=0;y<S;y+=step)for(var x=0;x<S;x+=step){var k=(y*S+x)*4;if(d[k+3]>200){var r=d[k];pts.push([x,y,r>225?0:r>175?1:r>125?2:3])}}
 for(var j=pts.length-1;j>0;j--){var q=Math.floor(Math.random()*(j+1)),t=pts[j];pts[j]=pts[q];pts[q]=t}
 return pts}
var T=[shape(0),null,null,null],P=[];
function ensure(k){if(!T[k])T[k]=shape(k);return T[k]}
(window.requestIdleCallback||function(f){setTimeout(f,600)})(function(){ensure(1);setTimeout(function(){ensure(2);setTimeout(function(){ensure(3)},250)},250)});
for(var i=0;i<N;i++)P.push({x:Math.random()*S,y:Math.random()*S,vx:0,vy:0,tx:0,ty:0,z:0,r:1.5+Math.random()*2.3,k:0,a:.65+Math.random()*.35});
var F=[];for(var i=0;i<46;i++)F.push({x:Math.random()*S,y:Math.random()*S,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,r:1+Math.random()*3.2,k:Math.floor(Math.random()*4),a:.25+Math.random()*.5});
var B=[[],[],[],[],[],[],[],[],[],[],[],[]];var cur=0,m={x:-999,y:-999,in:false},rx=0,ry=0,trx=0,try_=0;
function assign(k){var L=ensure(k);for(var i=0;i<N;i++){var t=L[i%L.length];P[i].bx=t[0]+(Math.random()-.5)*2;P[i].by=t[1]+(Math.random()-.5)*2;P[i].k=t[2]}
 var l=document.querySelector('#schip span');if(l)l.textContent=names[k];
 var ds=document.querySelectorAll('#schip .pd b');for(var j=0;j<ds.length;j++)ds[j].className=j==k?'on':''}
assign(0);
function pos(e){var b=c.getBoundingClientRect();m.x=(e.clientX-b.left)/b.width*S;m.y=(e.clientY-b.top)/b.height*S;m.in=true}
var host=document.getElementById('hero')||document.querySelector('header.top')||c;
host.addEventListener('mousemove',function(e){pos(e);trx=Math.max(-1,Math.min(1,(m.y-S/2)/(S/2)))*.32;try_=Math.max(-1,Math.min(1,(m.x-S/2)/(S/2)))*.42});
host.addEventListener('mouseleave',function(){m.x=m.y=-999;m.in=false;trx=try_=0});
var cs;function pal(){cs=getComputedStyle(document.documentElement);var a=cs.getPropertyValue('--accent1').trim()||'#FF8AC8',b=cs.getPropertyValue('--accent2').trim()||'#8FB4FF';return [a,b,'#FFB28A','#A98BFF']}
var C=pal(),tm=0,vis=true;
if('IntersectionObserver' in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(c);
function frame(t){requestAnimationFrame(frame);if(!vis)return;
 if(t-tm>3600){tm=t;cur=(cur+1)%4;assign(cur);C=pal()}
 rx+=(trx-rx)*.06;ry+=(try_-ry)*.06;
 var cy=Math.cos(ry),sy=Math.sin(ry),cxr=Math.cos(rx),sxr=Math.sin(rx),h=S/2;
 cx.setTransform(dpr,0,0,dpr,0,0);cx.clearRect(0,0,S,S);
 for(var i=0;i<F.length;i++){var f=F[i];f.x+=f.vx;f.y+=f.vy;if(f.x<-10)f.x=S+10;if(f.x>S+10)f.x=-10;if(f.y<-10)f.y=S+10;if(f.y>S+10)f.y=-10;
  var dx=f.x-m.x,dy=f.y-m.y,d2=dx*dx+dy*dy;if(d2<9000){f.x+=dx*.02;f.y+=dy*.02}
  cx.globalAlpha=f.a;cx.fillStyle=C[f.k];cx.beginPath();cx.arc(f.x,f.y,f.r,0,6.3);cx.fill()}
 for(var q=0;q<12;q++)B[q].length=0;
 for(var i=0;i<N;i++){var p=P[i],X=p.bx-h,Y=p.by-h;
  var x1=X*cy,z1=-X*sy;var y2=Y*cxr-z1*sxr,z2=Y*sxr+z1*cxr;var sc=1/(1-z2/1100);
  p.tx=h+x1*sc;p.ty=h+y2*sc;p.z=z2;p.sc=sc;
  var dx=m.x-p.x,dy=m.y-p.y,d2=dx*dx+dy*dy;
  p.vx+=(p.tx-p.x)*.05;p.vy+=(p.ty-p.y)*.05;
  if(d2<8100){var f=(1-d2/8100)*2.6,d=Math.sqrt(d2)||1;p.vx-=dx/d*f;p.vy-=dy/d*f}
  p.vx*=.83;p.vy*=.83;p.x+=p.vx;p.y+=p.vy;
  var al=Math.max(.35,Math.min(1,p.a+p.z/500));B[p.k*3+(al<.6?0:al<.85?1:2)].push(p)}
 for(var q=0;q<12;q++){var L=B[q];if(!L.length)continue;cx.globalAlpha=[.5,.75,1][q%3];cx.fillStyle=C[(q/3)|0];cx.beginPath();
  for(var i=0;i<L.length;i++){var p=L[i],r=p.r*Math.max(.7,p.sc);cx.moveTo(p.x+r,p.y);cx.arc(p.x,p.y,r,0,6.3)}cx.fill()}
 cx.globalAlpha=1}
if(reduce){for(var i=0;i<N;i++){P[i].x=P[i].bx;P[i].y=P[i].by}}
requestAnimationFrame(frame);
})();
