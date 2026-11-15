// ===== Année du footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Thème clair / sombre (mémorisé) =====
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
try {
  const saved = localStorage.getItem('theme');
  if (saved) root.setAttribute('data-theme', saved);
} catch (e) {}
toggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// ===== Menu burger =====
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// ===== Barre de nav au scroll =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20));

// ===== Effet machine à écrire =====
const words = ['ingénieur géomatique', 'spécialiste des données spatiales', 'passionné de biodiversité', 'pilote de drone'];
const typed = document.getElementById('typed');
let w = 0, c = 0, deleting = false;
function type() {
  const word = words[w];
  typed.textContent = word.slice(0, c);
  if (!deleting && c < word.length) { c++; return setTimeout(type, 90); }
  if (!deleting && c === word.length) { deleting = true; return setTimeout(type, 1500); }
  if (deleting && c > 0) { c--; return setTimeout(type, 45); }
  deleting = false; w = (w + 1) % words.length;
  setTimeout(type, 300);
}
type();

// ===== Apparition au scroll + barres + compteurs =====
function animateCount(el) {
  const target = +el.dataset.count;
  let n = 0;
  const step = Math.max(1, Math.ceil(target / 30));
  const t = setInterval(() => {
    n = Math.min(target, n + step);
    el.textContent = n;
    if (n >= target) clearInterval(t);
  }, 40);
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    entry.target.querySelectorAll('[data-count]').forEach(animateCount);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal, .bars').forEach(el => observer.observe(el));
