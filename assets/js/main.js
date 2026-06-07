/* ==========================================================================
   EYZE COFFEE — script principal
   ========================================================================== */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  const BRL = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------------- Mobile nav ---------------- */
  const toggle = $('.nav-toggle');
  const links = $('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
    $$('.nav-links a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }));
  }

  /* ---------------- Carousel ---------------- */
  const carousel = $('[data-carousel]');
  if (carousel) {
    const slides = $$('.slide', carousel);
    const dotsWrap = $('.carousel-dots', carousel);
    let idx = 0, timer;

    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', 'Ir para slide ' + (i + 1));
      b.addEventListener('click', () => go(i, true));
      dotsWrap.appendChild(b);
    });
    const dots = $$('button', dotsWrap);

    function go(n, manual) {
      idx = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === idx));
      dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
      if (manual) restart();
    }
    function next() { go(idx + 1); }
    function restart() { clearInterval(timer); timer = setInterval(next, 5500); }

    $('.carousel-arrow.next', carousel)?.addEventListener('click', () => go(idx + 1, true));
    $('.carousel-arrow.prev', carousel)?.addEventListener('click', () => go(idx - 1, true));
    go(0); restart();
  }

  /* ---------------- Cart (localStorage) ---------------- */
  const KEY = 'eyze_cart';
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { cart = []; }

  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} };
  const countItems = () => cart.reduce((s, i) => s + i.qty, 0);
  const total = () => cart.reduce((s, i) => s + i.qty * i.price, 0);

  function updateBadges() {
    const n = countItems();
    $$('.nav-cart .count').forEach(el => {
      el.textContent = n;
      el.style.display = n ? 'flex' : 'none';
    });
  }

  function addToCart(p) {
    const ex = cart.find(i => i.id === p.id);
    if (ex) ex.qty += 1; else cart.push({ ...p, qty: 1 });
    save(); updateBadges(); renderCart(); toast(`${p.name} adicionado ao carrinho`);
  }
  function changeQty(id, d) {
    const it = cart.find(i => i.id === id); if (!it) return;
    it.qty += d; if (it.qty <= 0) cart = cart.filter(i => i.id !== id);
    save(); updateBadges(); renderCart();
  }
  function removeItem(id) { cart = cart.filter(i => i.id !== id); save(); updateBadges(); renderCart(); }

  /* drawer */
  const drawer = $('#cartDrawer');
  const overlay = $('#overlay');
  function openCart() { drawer?.classList.add('open'); overlay?.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeCart() { drawer?.classList.remove('open'); overlay?.classList.remove('open'); document.body.style.overflow = ''; }

  $$('.nav-cart').forEach(b => b.addEventListener('click', openCart));
  $('.cart-close')?.addEventListener('click', closeCart);
  overlay?.addEventListener('click', closeCart);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

  function renderCart() {
    const wrap = $('#cartItems'); if (!wrap) return;
    if (!cart.length) {
      wrap.innerHTML = '<div class="cart-empty"><i class="fa-solid fa-mug-hot"></i><p>Seu carrinho está vazio.</p></div>';
      $('#cartFoot')?.style.setProperty('display', 'none');
      return;
    }
    $('#cartFoot')?.style.setProperty('display', 'block');
    wrap.innerHTML = cart.map(i => `
      <div class="cart-item">
        <img src="${i.img}" alt="${i.name}">
        <div class="ci-body">
          <h4>${i.name}</h4>
          <div class="ci-price">${BRL(i.price)}</div>
          <div class="qty">
            <button data-dec="${i.id}" aria-label="Diminuir">&minus;</button>
            <span>${i.qty}</span>
            <button data-inc="${i.id}" aria-label="Aumentar">+</button>
          </div>
        </div>
        <button class="ci-remove" data-rm="${i.id}" aria-label="Remover"><i class="fa-solid fa-trash-can"></i></button>
      </div>`).join('');
    const t = $('#cartTotal'); if (t) t.textContent = BRL(total());
    $$('[data-inc]', wrap).forEach(b => b.onclick = () => changeQty(b.dataset.inc, 1));
    $$('[data-dec]', wrap).forEach(b => b.onclick = () => changeQty(b.dataset.dec, -1));
    $$('[data-rm]', wrap).forEach(b => b.onclick = () => removeItem(b.dataset.rm));
  }

  /* checkout */
  $('#checkoutBtn')?.addEventListener('click', () => {
    if (!cart.length) return;
    toast('Pedido finalizado! Obrigado pela preferência ☕');
    cart = []; save(); updateBadges(); renderCart(); setTimeout(closeCart, 900);
  });

  /* product "add" buttons (catalog) */
  $$('[data-add]').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = btn.closest('[data-product]');
      addToCart({
        id: c.dataset.product,
        name: c.dataset.name,
        price: parseFloat(c.dataset.price),
        img: c.dataset.img
      });
    });
  });

  /* ---------------- Catalog filter ---------------- */
  const chips = $$('.filter-chip');
  if (chips.length) {
    chips.forEach(chip => chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.dataset.cat;
      $$('[data-product]').forEach(card => {
        const show = cat === 'all' || card.dataset.cat === cat;
        card.style.display = show ? '' : 'none';
      });
    }));
  }

  /* ---------------- Toast ---------------- */
  let toastTimer;
  function toast(msg) {
    let t = $('#toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
    t.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`;
    requestAnimationFrame(() => t.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* ---------------- Contact form validation ---------------- */
  const form = $('#contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true;
      $$('[data-required]', form).forEach(field => {
        const input = $('input, textarea, select', field);
        let valid = input.value.trim() !== '';
        if (valid && input.type === 'email') valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        field.classList.toggle('invalid', !valid);
        if (!valid) ok = false;
      });
      if (ok) {
        $('#formOk').classList.add('show');
        form.reset();
        setTimeout(() => $('#formOk').classList.remove('show'), 5000);
      }
    });
    $$('input, textarea, select', form).forEach(i =>
      i.addEventListener('input', () => i.closest('.field')?.classList.remove('invalid')));
  }

  /* ---------------- Scroll reveal ---------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: .14 });
  $$('.reveal').forEach(el => io.observe(el));

  /* ---------------- Footer year ---------------- */
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();

  /* init */
  updateBadges(); renderCart();
})();
