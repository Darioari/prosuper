(() => {
  if (window.__proSuperPremiumMotion) return;
  window.__proSuperPremiumMotion = true;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  const header = document.querySelector('.page-header');
  const progress = document.createElement('div');
  progress.className = 'premium-scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);

  const heroItems = document.querySelector('.hero-grid')
    ? [...document.querySelectorAll('.hero-grid > div:first-child, .hero-chart')]
    : [...document.querySelectorAll('.page-hero .wrap')];

  heroItems.forEach((item, index) => {
    item.classList.add('premium-hero');
    if (index > 0) item.classList.add('premium-hero-media');
    item.style.transitionDelay = `${80 + index * 140}ms`;
  });

  const groups = [
    ['.proof-grid > *', 'reveal-scale'], ['.brands-head > *', 'reveal-rise'], ['.brand', 'reveal-scale'],
    ['.pain-head > *', 'reveal-from-left'], ['.pain-card', 'reveal-rise'], ['.pain-action', 'reveal-scale'],
    ['.services-top > *', 'reveal-from-left'], ['.service', 'reveal-rise'], ['.method-copy', 'reveal-from-left'],
    ['.step', 'reveal-from-right'], ['.outcome-grid > *', 'reveal-rise'], ['.portrait', 'reveal-from-left'],
    ['.about-grid > div:last-child', 'reveal-from-right'], ['.faq-contact-grid > *', 'reveal-rise'],
    ['.intro > *', 'reveal-from-left'], ['.client-card', 'reveal-rise'], ['.stat', 'reveal-scale'],
    ['.contact-layout > *', 'reveal-rise'], ['.channel', 'reveal-from-right'], ['.page-cta', 'reveal-scale'],
    ['.content-band-head > *', 'reveal-from-left'], ['.method-card', 'reveal-rise'], ['.pillar-panel', 'reveal-rise'],
    ['.profile-detail-head > *', 'reveal-from-left'], ['.profile-card', 'reveal-rise'], ['.statement', 'reveal-scale'],
    ['.shared-footer-grid > *', 'reveal-rise'], ['.shared-footer-bottom', 'reveal-scale']
  ];

  const reveals = [];
  groups.forEach(([selector, direction]) => {
    document.querySelectorAll(selector).forEach((item, index) => {
      if (item.classList.contains('premium-reveal')) return;
      item.classList.add('premium-reveal', direction);
      item.style.setProperty('--premium-delay', `${Math.min(index % 4, 3) * 85}ms`);
      reveals.push(item);
    });
  });

  document.querySelectorAll('.brand-logo, .channel > svg, .service h3').forEach(icon => icon.classList.add('premium-icon'));
  const createArrow = className => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.classList.add('premium-arrow', className);
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M16.1716 10.9999 10.8076 5.6359 12.2218 4.2217 20 12l-7.7782 7.7781-1.4142-1.4142L16.1716 13H4v-2h12.1716Z');
    svg.appendChild(path);
    return svg;
  };
  document.querySelectorAll('.button').forEach(button => {
    const label = button.textContent.replace(/\s*→\s*$/, '').trim();
    const text = document.createElement('span');
    text.className = 'premium-cta-text';
    text.textContent = label;
    const circle = document.createElement('span');
    circle.className = 'premium-cta-circle';
    button.replaceChildren(createArrow('arr-2'), text, circle, createArrow('arr-1'));
    button.classList.add('premium-cta');
  });

  if (reducedMotion || !('IntersectionObserver' in window)) {
    heroItems.forEach(item => item.classList.add('is-visible'));
    reveals.forEach(item => item.classList.add('is-visible'));
    return;
  }

  root.classList.add('premium-motion');
  requestAnimationFrame(() => requestAnimationFrame(() => heroItems.forEach(item => item.classList.add('is-visible'))));

  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      instance.unobserve(entry.target);
    });
  }, { threshold: .05, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(item => observer.observe(item));

  let ticking = false;
  const updateScrollEffects = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.transform = `scaleX(${Math.min(1, scrollTop / scrollRange)})`;
    if (header) header.classList.toggle('is-scrolled', scrollTop > 28);
    ticking = false;
  };
  const requestScrollUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateScrollEffects);
  };
  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate, { passive: true });
  updateScrollEffects();
})();
