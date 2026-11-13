// ====== EDIT THESE ======
const EMAIL = "trusttommy58@gmail.com";   // replace with Trust's email
const WHATSAPP = "231771436642";           // replace with Trust's number, country code first, no + or spaces
// ========================

const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

// Mobile menu
const menu = $('#menu');
$('#burger').onclick = () => menu.classList.toggle('open');
$$('#menu a').forEach(a => a.onclick = () => menu.classList.remove('open'));

// Nav shadow + active link
const links = $$('#menu a:not(.btn)');
addEventListener('scroll', () => {
  $('#nav').classList.toggle('scrolled', scrollY > 20);
  let cur = '';
  $$('section[id]').forEach(s => { if (scrollY >= s.offsetTop - 120) cur = s.id; });
  links.forEach(l => l.classList.toggle('active', l.hash === '#' + cur));
});

// Typing effect
const roles = ['Software Developer', 'Graphic Designer', 'Videographer', 'Media Personnel'];
let r = 0, c = 0, del = false;
(function type() {
  const word = roles[r];
  $('#typed').textContent = word.slice(0, c);
  if (!del && c === word.length) { del = true; return setTimeout(type, 1400); }
  if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
  c += del ? -1 : 1;
  setTimeout(type, del ? 40 : 90);
})();

// Reveal on scroll, skill bars, counters
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in', 'go');
  if (e.target.dataset.count) count(e.target);
  io.unobserve(e.target);
}), { threshold: .2 });
$$('.reveal, .bar, [data-count]').forEach(el => io.observe(el));

function count(el) {
  const end = +el.dataset.count; let n = 0;
  const t = setInterval(() => { n += Math.max(1, end / 40); if (n >= end) { n = end; clearInterval(t); } el.textContent = Math.round(n); }, 35);
}

// Lightbox
const lb = $('#lb');
$$('[data-full]').forEach(b => b.onclick = () => { $('img', lb).src = b.dataset.full; lb.classList.add('open'); });
lb.onclick = () => lb.classList.remove('open');
addEventListener('keydown', e => e.key === 'Escape' && lb.classList.remove('open'));

// Contact form
const text = () => `Hi Trust, my name is ${$('#name').value} (${$('#email').value}).\n\n${$('#msg').value}`;
$('#form').onsubmit = e => {
  e.preventDefault();
  location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Portfolio enquiry from ' + $('#name').value)}&body=${encodeURIComponent(text())}`;
  $('#note').textContent = 'Opening your email app…';
};
$('#wa').onclick = () => {
  if (!$('#form').reportValidity()) return;
  open(`https://wa.me/231771436642?text=${encodeURIComponent(text())}`, '_blank');
};

$('#year').textContent = new Date().getFullYear();
