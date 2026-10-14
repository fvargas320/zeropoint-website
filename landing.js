(() => {
  document.querySelectorAll('[data-screen]').forEach(image => {
    const screen = window.ZEROPOINT_SCREENS?.[image.dataset.screen];
    if (!screen) return;
    image.src = screen.src;
    image.alt = screen.alt;
    image.style.objectPosition = screen.position || 'top';
  });
  document.querySelectorAll('[data-art]').forEach(image => {
    const art = window.ZEROPOINT_ARTWORK?.[image.dataset.art];
    if (!art) return;
    image.src = art.src;
    image.alt = art.alt;
  });
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();

(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 901px)');
  const root = document.documentElement;
  const toggle = document.querySelector('.motion-toggle');
  const gearAnimations = new Set();
  let paused = false;
  try { paused = localStorage.getItem('zeropoint-reduce-motion') === 'true'; } catch {}
  const enabled = () => desktop.matches && !reduced.matches;
  function sync() {
    root.classList.toggle('motion-active', enabled());
    root.classList.toggle('motion-paused', paused || document.hidden);
    toggle.hidden = false;
    toggle.disabled = reduced.matches;
    toggle.textContent = reduced.matches ? 'Motion reduced' : paused ? 'Motion reduced' : 'Reduce motion';
    toggle.setAttribute('aria-pressed', String(paused || reduced.matches));
    toggle.title = reduced.matches ? 'Your system reduced-motion preference is enabled' : 'Reduce decorative animation';
    gearAnimations.forEach(animation => {
      if (!enabled()) animation.finish();
      else if (paused || document.hidden) animation.pause();
      else animation.play();
    });
  }
  // Animate independent website layers; preserve their authored CSS transforms.
  const gearGroups = new Map([
    [document.querySelector('.strip-inner'), ['.strip-ears', '.strip-ammo', '.session-ticket', '.strip-notebook']],
    [document.querySelector('.inventory-art'), ['.inventory-ears', '.inventory-ammo']],
    [document.querySelector('.care-visual'), ['.reminder-paper', '.care-kit']]
  ]);
  const gearObserver = new IntersectionObserver(entries => {
    entries.forEach(async ({target, isIntersecting}) => {
      if (!isIntersecting) return;
      gearObserver.unobserve(target);
      const pieces = gearGroups.get(target).map(selector => target.querySelector(selector)).filter(Boolean);
      await Promise.all(pieces.filter(piece => piece.tagName === 'IMG').map(image => image.decode().catch(() => {})));
      if (!enabled() || paused || document.hidden) return;
      pieces.forEach((piece, index) => {
        const animation = piece.animate([
          {opacity: 0, translate: `${index % 2 ? 22 : -22}px 42px`, rotate: `${index % 2 ? 5 : -5}deg`},
          {opacity: 1, translate: '0 0', rotate: '0deg'}
        ], {duration: 800, delay: index * 190, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'both'});
        gearAnimations.add(animation);
        animation.finished.then(() => {
          gearAnimations.delete(animation);
          animation.cancel(); // Hand styling back to CSS after the entrance.
        }).catch(() => gearAnimations.delete(animation));
      });
    });
  }, {threshold: 0, rootMargin: '0px 0px -100px 0px'});
  gearGroups.forEach((_, group) => { if (group) gearObserver.observe(group); });
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(({target, isIntersecting}) => {
      if (!isIntersecting) return;
      target.classList.remove('reveal-pending');
      target.classList.add('reveal-shown');
      revealObserver.unobserve(target);
    });
  }, {threshold: 0.08});
  document.querySelectorAll('.session-copy,.session-visual,.inventory-grid>div,.care-grid>div:first-child,.progress-heading,.calendar-composition,.streak-copy,.streak-story,.social-heading,.social-steps,.crew-plan').forEach((element, i) => {
    element.dataset.reveal = '';
    element.style.setProperty('--reveal-delay', `${i % 2 * 110}ms`);
    // Only stage offscreen content: the hero and anchor destinations remain readable.
    if (enabled() && element.getBoundingClientRect().top > innerHeight) element.classList.add('reveal-pending');
    revealObserver.observe(element);
  });
  toggle.addEventListener('click', () => { paused = !paused; try { localStorage.setItem('zeropoint-reduce-motion', String(paused)); } catch {} sync(); });
  reduced.addEventListener('change', sync);
  desktop.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  addEventListener('pagehide', event => {
    gearAnimations.forEach(animation => animation.pause());
    if (event.persisted) return;
    gearObserver.disconnect();revealObserver.disconnect();
    gearAnimations.forEach(animation => animation.cancel());
  });
  addEventListener('pageshow', sync);
  sync();
})();

// Keep shared feature links useful when the compact mobile content is shown.
(() => {
  function followFeatureLink() {
    if (!matchMedia('(max-width: 650px)').matches) return;
    const targets = {'#features': '#mobile-features', '#inventory': '#mobile-inventory', '#crew': '#mobile-crew', '#progress': '#mobile-progress'};
    const target = document.querySelector(targets[location.hash] || ':not(*)');
    if (!target) return;
    if (target.tagName === 'DETAILS') target.open = true;
    target.scrollIntoView();
  }
  addEventListener('hashchange', followFeatureLink);
  addEventListener('load', followFeatureLink);
})();
