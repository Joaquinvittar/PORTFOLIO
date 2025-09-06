// Año footer
document.getElementById('year').textContent = new Date().getFullYear();
// Header sombra
const header=document.querySelector('.site-header');
addEventListener('scroll',()=>{header.style.boxShadow=(scrollY>20)?'0 10px 30px rgba(0,0,0,.35)':'none';});

// --- Preservar posición de scroll entre páginas ---
try{
  const KEY='scrollY_main';
  if (sessionStorage.getItem(KEY)) {
    const y=parseInt(sessionStorage.getItem(KEY),10);
    if (!isNaN(y)) setTimeout(()=>scrollTo({top:y,behavior:'instant'}), 0);
  }
  addEventListener('beforeunload', ()=>{ sessionStorage.setItem(KEY, String(window.scrollY || 0)); });
}catch(e){ /* almacenamiento puede no estar disponible */ }
