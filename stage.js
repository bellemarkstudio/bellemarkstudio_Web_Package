(function(){
var c=document.getElementById('pc');if(!c)return;
var cx=c.getContext('2d'),S=520,dpr=Math.min(2,window.devicePixelRatio||1);
c.width=c.height=S*dpr;cx.scale(dpr,dpr);
var reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
var names=['Call comes in','Answered right away','Alert sent to you','Lead saved to your pipeline'];
function shape(i){var o=document.createElement('canvas');o.width=o.height=S;var g=o.getContext('2d');
 g.strokeStyle='#000';g.fillStyle='#000';g.lineWidth=18;g.lineJoin=g.lineCap='round';
 function rr(x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
 if(i==0){rr(170,50,180,420,36);g.stroke();g.lineWidth=26;for(var k=0;k<3;k++){g.beginPath();g.moveTo(205,140+k*80);g.lineTo(315,140+k*80);g.stroke()}}
 if(i==1){g.lineWidth=16;g.beginPath();g.arc(260,260,34,0,7);g.fill();[100,165,230].forEach(function(r){g.beginPath();g.arc(260,260,r,0,7);g.stroke()})}
 if(i==2){rr(60,130,400,260,26);g.stroke();g.beginPath();g.moveTo(75,150);g.lineTo(260,285);g.lineTo(445,150);g.stroke()}
 if(i==3){g.beginPath();g.arc(260,260,190,0,7);g.stroke();g.lineWidth=28;g.beginPath();g.moveTo(170,265);g.lineTo(235,330);g.lineTo(355,195);g.stroke()}
 var d=g.getImageData(0,0,S,S).data,pts=[];
 for(var y=0;y<S;y+=9)for(var x=0;x<S;x+=9)if(d[(y*S+x)*4+3]>128)pts.push([x,y]);
 for(var j=pts.length-1;j>0;j--){var r=Math.floor(Math.random()*(j+1)),t=pts[j];pts[j]=pts[r];pts[r]=t}
 return pts}
var T=[0,1,2,3].map(shape),N=900,P=[];
for(var i=0;i<N;i++)P.push({x:Math.random()*S,y:Math.random()*S,vx:0,vy:0,tx:0,ty:0});
var cur=0,m={x:-999,y:-999};
function assign(k){T[k].length;for(var i=0;i<N;i++){var t=T[k][i%T[k].length];P[i].tx=t[0]+(Math.random()-.5)*3;P[i].ty=t[1]+(Math.random()-.5)*3}
 var l=document.querySelector('#schip span');if(l)l.textContent=names[k]}
assign(0);
c.addEventListener('mousemove',function(e){var b=c.getBoundingClientRect();m.x=(e.clientX-b.left)/b.width*S;m.y=(e.clientY-b.top)/b.height*S});
c.addEventListener('mouseleave',function(){m.x=m.y=-999});
var st=document.getElementById('stage');if(st){st.addEventListener('mousemove',function(e){var b=c.getBoundingClientRect();m.x=(e.clientX-b.left)/b.width*S;m.y=(e.clientY-b.top)/b.height*S});st.addEventListener('mouseleave',function(){m.x=m.y=-999})}
var cs=getComputedStyle(document.documentElement);
function col(){cs=getComputedStyle(document.documentElement);return [cs.getPropertyValue('--accent1').trim()||'#FF8AC8',cs.getPropertyValue('--accent2').trim()||'#8FB4FF']}
var C=col(),last=0,tm=0,vis=true;
if('IntersectionObserver' in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(c);
function frame(t){requestAnimationFrame(frame);if(!vis)return;
 if(t-tm>3400){tm=t;cur=(cur+1)%4;assign(cur);C=col()}
 cx.clearRect(0,0,S,S);
 for(var i=0;i<N;i++){var p=P[i],dx=m.x-p.x,dy=m.y-p.y,d2=dx*dx+dy*dy;
  p.vx+=(p.tx-p.x)*.045;p.vy+=(p.ty-p.y)*.045;
  if(d2<14400){var f=(1-d2/14400)*3.2,d=Math.sqrt(d2)||1;p.vx-=dx/d*f;p.vy-=dy/d*f}
  p.vx*=.84;p.vy*=.84;p.x+=p.vx;p.y+=p.vy;
  cx.fillStyle=C[(p.x/S>.5)?1:0];cx.globalAlpha=.9;cx.beginPath();cx.arc(p.x,p.y,2.6,0,6.3);cx.fill()}}
if(reduce){for(var i=0;i<N;i++){P[i].x=P[i].tx;P[i].y=P[i].ty}}
requestAnimationFrame(frame);
})();
