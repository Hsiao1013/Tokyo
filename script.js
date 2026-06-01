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

const missionPasswords = {
  mission1: 'closer',
  mission2: 'to',
  mission3: 'you',
  mission4: 'henry',
  mission5: 'lau',
  mission6: 'love'
};

function unlockMission(key) {
  const input = document.getElementById(`mission-password-${key}`);
  const msg = document.getElementById(`mission-lock-msg-${key}`);
  const gate = document.getElementById(`gate-${key}`);
  const card = document.getElementById(`mission-card-${key}`);
  if (!input || !msg || !gate || !card) return;

  if (!missionPasswords[key]) {
    msg.textContent = '此任務無法解鎖。';
    return;
  }

  if (input.value.trim().toUpperCase() === missionPasswords[key].toUpperCase()) {
    gate.classList.add('unlocked');
    input.value = '';
    msg.textContent = '已解鎖！翻牌查看任務內容。';
  } else {
    msg.textContent = '密碼錯誤，請再試一次。';
  }
}
