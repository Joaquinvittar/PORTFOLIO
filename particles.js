(function(){
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w,h,dpr,particles,mouse={x:-9999,y:-9999};
  function resize(){ dpr=Math.max(1,devicePixelRatio||1); w=canvas.width=innerWidth*dpr; h=canvas.height=innerHeight*dpr; canvas.style.width=innerWidth+'px'; canvas.style.height=innerHeight+'px'; init(); }
  function rand(a,b){return Math.random()*(b-a)+a}
  function init(){ const count=Math.floor((innerWidth*innerHeight)/18000); particles=new Array(count).fill().map(()=>({x:rand(0,w),y:rand(0,h),vx:rand(-.2,.2),vy:rand(-.15,.15),r:rand(1.0,2.0)*dpr,a:rand(.15,.45)})); }
  function step(){
    ctx.clearRect(0,0,w,h);
    for(const p of particles){
      p.x+=p.vx; p.y+=p.vy;
      const dx=(mouse.x*dpr)-p.x, dy=(mouse.y*dpr)-p.y;
      const d2=dx*dx+dy*dy;
      if(d2<(140*dpr)*(140*dpr)){ p.vx+=dx*0.00001; p.vy+=dy*0.00001; }
      if(p.x<0)p.x=w; if(p.x>w)p.x=0;
      if(p.y<0)p.y=h; if(p.y>h)p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle='rgba(255,59,59,'+p.a+')'; ctx.fill();
    }
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const a=particles[i], b=particles[j];
        const dx=a.x-b.x, dy=a.y-b.y, d2=dx*dx+dy*dy, maxD=(120*dpr)*(120*dpr);
        if(d2<maxD){
          const alpha = 0.05*(1-(d2/maxD));
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.strokeStyle='rgba(255,59,59,'+alpha+')'; ctx.lineWidth=1*dpr; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(step);
  }
  addEventListener('mousemove', e=>{mouse.x=e.clientX; mouse.y=e.clientY;});
  addEventListener('mouseleave', ()=>{mouse.x=-9999; mouse.y=-9999;});
  resize(); step(); addEventListener('resize', resize);
})();