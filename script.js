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

const finalSongYear = '2025'; // 如果需要，請改成實際歌曲年份
const missionPasswords = {
  mission1: 'closer',
  mission2: 'to',
  mission3: 'you',
  mission4: 'henry',
  mission5: 'lau',
  mission6: 'love',
  mission7: finalSongYear
};

function arePreviousMissionsUnlocked() {
  return ['mission1','mission2','mission3','mission4','mission5','mission6'].every(key => {
    const gate = document.getElementById(`gate-${key}`);
    return gate && gate.classList.contains('unlocked');
  });
}

function unlockMission(key) {
  const input = document.getElementById(`mission-password-${key}`);
  const msg = document.getElementById(`mission-lock-msg-${key}`);
  const gate = document.getElementById(`gate-${key}`);
  // `mission-card-<key>` may not exist for custom layouts (envelope), so don't require it
  const card = document.getElementById(`mission-card-${key}`);
  if (!input || !msg || !gate) return;

  if (key === 'mission7' && !arePreviousMissionsUnlocked()) {
    msg.textContent = '請先解鎖前六個任務，再來挑戰最終任務。';
    return;
  }

  if (!missionPasswords[key]) {
    msg.textContent = '此任務無法解鎖。';
    return;
  }

  if (input.value.trim().toUpperCase() === missionPasswords[key].toUpperCase()) {
    gate.classList.add('unlocked');
    input.value = '';
    msg.textContent = '已解鎖！打開信封查看任務內容。';
  } else {
    msg.textContent = '密碼錯誤，請再試一次。';
  }
}

// Generic spin wheel: builds wedges + labels, spins so the chosen option lands
// under the top pointer, and reveals the result with a pop after it stops.
function setupWheel({ ringId, buttonId, resultId, options, palette, format }) {
  const ring = document.getElementById(ringId);
  const button = document.getElementById(buttonId);
  const result = document.getElementById(resultId);
  if (!ring || !button || !result) return;

  const len = options.length;
  const seg = 360 / len;
  const half = seg / 2;
  let rotation = 0;
  let spinning = false;
  let pending = '';

  // Coloured wedges centred on each label + thin white dividers between them.
  ring.style.background =
    `repeating-conic-gradient(from ${-half}deg, rgba(255,255,255,.85) 0deg .7deg, transparent .7deg ${seg}deg),` +
    `repeating-conic-gradient(from ${-half}deg, ${palette[0]} 0deg ${seg}deg, ${palette[1]} ${seg}deg ${seg * 2}deg)`;

  // Build labels.
  ring.innerHTML = '';
  options.forEach((opt) => {
    const d = document.createElement('div');
    d.className = 'wheel-label';
    d.textContent = opt;
    ring.appendChild(d);
  });

  function arrange() {
    const labels = Array.from(ring.querySelectorAll('.wheel-label'));
    const radius = Math.max((ring.getBoundingClientRect().width / 2) - 56, 70);
    labels.forEach((lab, i) => {
      lab.style.transform = `rotate(${i * seg}deg) translate(0, -${radius}px) rotate(${-i * seg}deg)`;
    });
  }
  setTimeout(arrange, 50);
  window.addEventListener('resize', () => setTimeout(arrange, 80));

  button.addEventListener('click', () => {
    if (spinning) return;
    spinning = true;
    button.disabled = true;

    const choice = Math.floor(Math.random() * len);
    // Label i sits at angle i*seg from the top; rotate forward so label `choice`
    // ends up directly under the pointer (top, 0deg).
    const desiredMod = (((360 - choice * seg) % 360) + 360) % 360;
    const currentMod = ((rotation % 360) + 360) % 360;
    let delta = desiredMod - currentMod;
    if (delta < 0) delta += 360;
    rotation += 360 * 5 + delta; // always forward, lands aligned

    ring.style.transition = 'transform 4s cubic-bezier(.22,.61,.36,1)';
    ring.style.transform = `rotate(${rotation}deg)`;

    pending = options[choice];
    result.classList.remove('pop');
    result.textContent = '轉啊轉…正在決定 🎯';
  });

  ring.addEventListener('transitionend', () => {
    spinning = false;
    button.disabled = false;
    if (pending) {
      result.textContent = format(pending);
      void result.offsetWidth; // re-trigger pop animation
      result.classList.add('pop');
    }
  });
}

const buyResults = {
  '買': '買！買爆 💸',
  '不買': '不買，理智一點 🙅',
  '小波決定': '這題交給小波決定 🐾',
  '小蔡決定': '這題交給小蔡決定 ✨',
  '猜拳決定': '猜拳吧！剪刀石頭布 ✊✋✌️'
};

window.addEventListener('load', () => {
  setupWheel({
    ringId: 'food-wheel-ring',
    buttonId: 'spin-food-button',
    resultId: 'food-wheel-result',
    options: ['壽司','拉麵','烤串','豬排','壽喜燒','大阪燒','丼飯','餃子','咖哩飯','燒肉','蛋包飯','火鍋','定食'],
    palette: ['#ffe1ec', '#fdeef5'],
    format: (f) => `吃這個！${f} 🍽️`
  });

  setupWheel({
    ringId: 'buy-wheel-ring',
    buttonId: 'spin-buy-button',
    resultId: 'buy-wheel-result',
    options: ['買','不買','小波決定','小蔡決定','猜拳決定'],
    palette: ['#ffe6d9', '#fff3ec'],
    format: (c) => buyResults[c] || c
  });
});
