/* KCC site.js: everything here is an enhancement; pages still read without it. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const cfg = document.body.dataset;
  document.documentElement.classList.add('js');

  /* mobile menu */
  const burger = $('.burger'), nl = $('#nl');
  if (burger && nl) {
    burger.addEventListener('click', () => burger.setAttribute('aria-expanded', String(nl.classList.toggle('open'))));
    nl.addEventListener('click', () => { nl.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); });
  }

  /* home hero slideshow */
  const slides = $$('.slide'), dots = $('#dots');
  if (slides.length && dots) {
    let cur = 0, timer;
    const go = (n) => {
      slides[cur].classList.remove('on'); dots.children[cur].classList.remove('on');
      cur = (n + slides.length) % slides.length;
      slides[cur].classList.add('on'); dots.children[cur].classList.add('on');
    };
    const start = () => { clearInterval(timer); timer = setInterval(() => go(cur + 1), 6000); };
    slides.forEach((s, i) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', 'Show photo ' + (i + 1));
      if (!i) b.className = 'on';
      b.onclick = () => { go(i); start(); };
      dots.appendChild(b);
    });
    start();
  }

  /* sticky header, progress bar, back-to-top, hero parallax */
  const hd = $('header'), pg = $('#pg'), tt = $('#tt'), hero = $('.hero, .phero'), tag = hero && $('.tag', hero);
  const onScroll = () => {
    const y = scrollY, limit = hero ? hero.offsetHeight - 100 : 200;
    tt && tt.classList.toggle('show', y > 700);
    hd && hd.classList.toggle('stuck', y > limit);
    if (pg) pg.style.width = (y / Math.max(1, document.documentElement.scrollHeight - innerHeight) * 100) + '%';
    if (tag && y < 700) tag.style.transform = 'translateY(' + y * 0.25 + 'px)';
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* reveal on scroll */
  const mark = (sel, cls, step) => $$(sel).forEach((e, i) => {
    e.classList.add('rv'); cls && e.classList.add(cls);
    e.style.setProperty('--d', (step ? i % 4 * step : 0) + 's');
  });
  mark('.band h3', 'l'); mark('.band .stack', 'r'); mark('.overlap', 'l'); mark('.two>div:last-child', 'r');
  mark('.mission, section h2, .lead'); mark('.cols4>div, .cols5>div', '', .14); mark('.tile', 'z', .1);
  mark('.pastor .frame', 'l'); mark('.pastor>div:last-child', 'r'); mark('.events>div:first-child', 'l'); mark('.ev', 'r', .14);
  mark('.post', '', .16); mark('.tcard', '', .12); mark('.belief', '', .12); mark('.vals span', 'z', .08);
  mark('.give .wrap>div:first-child', 'l'); mark('.give .box, .give form', 'r');
  mark('.contact>div', 'l'); mark('.contact form', 'r'); mark('.feature>*:first-child', 'l'); mark('.feature>*:last-child', 'r');
  mark('.faq details', '', .08); mark('.fg>div', '', .12);
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    $$('.rv,.eyebrow').forEach((e) => io.observe(e));
  } else $$('.rv,.eyebrow').forEach((e) => e.classList.add('in'));

  /* Harare time: countdown bar and "next service" pill */
  const toMins = (t) => { const [h, m] = (t || '0:0').split(':'); return +h * 60 + +m; };
  const START = toMins(cfg.sunStart), END = toMins(cfg.sunEnd), LABEL = cfg.sunLabel || '';
  const harare = () => {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Harare', hour: '2-digit', minute: '2-digit', weekday: 'short', hour12: false }).formatToParts(new Date()).map((x) => [x.type, x.value]));
    return { day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday), mins: (+p.hour % 24) * 60 + +p.minute };
  };
  const live = $('#live'), pill = $('#next');
  const force = new URLSearchParams(location.search).get('live'); // preview: ?live=on or ?live=soon
  const tick = () => {
    const { day, mins } = harare();
    const isLive = force === 'on' || (day === 0 && mins >= START && mins < END);
    const minsTo = day === 6 ? 1440 - mins + START : day === 0 && mins < START ? START - mins : null;
    const soon = force === 'soon' ? 135 : minsTo !== null && minsTo <= 900 ? minsTo : null;
    if (live) {
      live.classList.toggle('is-live', isLive);
      if (isLive) $('span', live).innerHTML = '<b>Happening now</b> · Sunday service is on. Come and join us.';
      else if (soon !== null) { const h = Math.floor(soon / 60), m = soon % 60; $('span', live).innerHTML = '<b>Sunday service</b> starts in ' + (h ? h + 'h ' : '') + m + 'm'; }
      live.hidden = !(isLive || soon !== null);
    }
    if (pill) {
      let days = (7 - day) % 7; if (days === 0 && mins >= END) days = 7;
      pill.innerHTML = isLive ? '<b>Happening now</b> · Sunday service is on'
        : days === 0 ? '<b>Today</b> · Sunday service at ' + LABEL
        : days === 1 ? '<b>Tomorrow</b> · Sunday service at ' + LABEL
        : '<b>This Sunday</b> · ' + LABEL + ' · in ' + days + ' days';
    }
  };
  if (live || pill) { tick(); setInterval(tick, 30000); }

  /* forms: build a message and hand it to WhatsApp or the visitor's email app */
  $$('form[data-msg]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const via = (e.submitter && e.submitter.dataset.via) || 'wa';
      const lines = [form.dataset.msg, ''];
      $$('[name]', form).forEach((el) => {
        const label = el.dataset.label || el.name;
        if (el.type === 'checkbox' || el.type === 'radio') { if (el.checked) lines.push(el.type === 'radio' ? label + ': ' + el.value : '• ' + el.value); }
        else if (el.value.trim()) lines.push(label + ': ' + el.value.trim());
      });
      const text = lines.join('\n');
      const url = via === 'mail'
        ? 'mailto:' + cfg.email + '?subject=' + encodeURIComponent(form.dataset.msg) + '&body=' + encodeURIComponent(text)
        : 'https://wa.me/' + cfg.wa + '?text=' + encodeURIComponent(text);
      if (via === 'mail') location.href = url; else window.open(url, '_blank', 'noopener');
      const ok = $('.ok', form);
      if (ok) { ok.style.display = 'block'; ok.textContent = 'Your message is ready in ' + (via === 'mail' ? 'your email app' : 'WhatsApp') + '. Press send there to deliver it to the church.'; }
    });
  });

  /* church notes: search and series filter */
  const search = $('#nsearch');
  if (search) {
    const cards = $$('[data-note]'), count = $('#ncount'), empty = $('#nempty');
    let series = '';
    const apply = () => {
      const q = search.value.trim().toLowerCase(); let shown = 0;
      cards.forEach((c) => {
        const ok = (!q || c.dataset.search.includes(q)) && (!series || c.dataset.series === series);
        c.hidden = !ok; if (ok) { shown++; c.classList.add('in'); }
      });
      count.textContent = shown + ' note' + (shown === 1 ? '' : 's');
      empty.hidden = shown > 0;
    };
    search.addEventListener('input', apply);
    $$('.chip').forEach((b) => b.addEventListener('click', () => {
      series = b.dataset.series;
      $$('.chip').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      apply();
    }));
  }

  /* share and print on a note */
  $$('[data-print]').forEach((b) => b.addEventListener('click', () => print()));
  $$('[data-share]').forEach((b) => b.addEventListener('click', async () => {
    try {
      if (navigator.share) await navigator.share({ title: document.title, url: location.href });
      else { await navigator.clipboard.writeText(location.href); const t = b.textContent; b.textContent = 'Link copied'; setTimeout(() => (b.textContent = t), 2000); }
    } catch (_) { /* cancelled */ }
  }));

  /* map loads only when tapped (saves mobile data) */
  $$('[data-map]').forEach((b) => b.addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = b.dataset.map; f.title = 'Map to Kuwadzana Community Church'; f.loading = 'lazy';
    b.replaceWith(f);
  }));
})();
