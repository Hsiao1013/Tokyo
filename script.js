// PETALS
const pc = document.getElementById('petals');
const em = ['🌸','🌺','✿','❀','🌷'];
for (let i = 0; i < 20; i++) {
  const p = document.createElement('div');
  p.className = 'petal';
  p.textContent = em[i % em.length];
  p.style.left = (Math.random() * 100) + 'vw';
  p.style.animationDuration = (8 + Math.random() * 10) + 's';
  p.style.animationDelay = (Math.random() * 14) + 's';
  p.style.fontSize = (.7 + Math.random() * .8) + 'rem';
  pc.appendChild(p);
}

// NAV
function goTo(id, btn) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// SCROLL SPY
const ids = ['flights','itinerary','spots','tips'];
const btns = document.querySelectorAll('nav button');
window.addEventListener('scroll', () => {
  let cur = '';
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 160) cur = id;
  });
  btns.forEach((b, i) => b.classList.toggle('active', ids[i] === cur));
}, { passive: true });
