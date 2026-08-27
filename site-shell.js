(() => {
  const ensureCss = (href) => {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  };

  ensureCss('site-shell.css');
  ensureCss('content-sections.css');
  ensureCss('premium-effects.css');

  // Detecção de ambiente: arquivo local (file:///) ou servidor web (http/https)
  const isLocalFile = location.protocol === 'file:';
  const url = (slug) => {
    if (slug === '' || slug === '/') return isLocalFile ? 'index.html' : '/';
    return isLocalFile ? `${slug}.html` : slug;
  };

  // Normalização de rota para identificar página ativa (compatível com /pagina, /pagina.html, /)
  const cleanPath = location.pathname.replace(/^\/+|\/+$/g, '').replace(/\.html$/, '');
  const isTarget = (name) => {
    const target = name.replace(/^\/+|\/+$/g, '').replace(/\.html$/, '');
    if (target === '' || target === 'index') {
      return (cleanPath === '' || cleanPath === 'index' || cleanPath.endsWith('index'));
    }
    return cleanPath.endsWith(target);
  };
  const activeAttr = (name) => isTarget(name) ? ' class="active"' : '';
  const activeClass = (name) => isTarget(name) ? ' active' : '';

  const header = document.querySelector('.page-header');
  if (header) {
    header.innerHTML = `<nav class="wrap nav" aria-label="Navegação principal">
      <a href="${url('/')}" class="nav-logo"><img src="imagens/Prosuper%20logo%20horixontal.webp" alt="Pró Super Consultoria"></a>
      <button class="menu" aria-label="Abrir menu de navegação" aria-expanded="false">
        <span class="menu-icon" aria-hidden="true">
          <span class="menu-bar"></span>
          <span class="menu-bar"></span>
          <span class="menu-bar"></span>
        </span>
      </button>
      <div class="nav-links">
        <a${activeAttr('desafios')} href="${url('desafios')}">Desafios</a>
        <a${activeAttr('solucoes')} href="${url('solucoes')}">Soluções</a>
        <a${activeAttr('clientes')} href="${url('clientes')}">Clientes</a>
        <a${activeAttr('consultor')} href="${url('consultor')}">Consultor</a>
        <a href="${url('contato')}" class="button${activeClass('contato')}">Diagnóstico grátis</a>
      </div>
    </nav>`;
  }

  const footer = document.querySelector('.page-footer');
  if (footer) {
    footer.classList.add('shared-footer');
    footer.innerHTML = `<div class="wrap shared-footer-grid">
      <div>
        <img class="shared-footer-logo" src="imagens/Prosuper%20logo%20horixontal.webp" alt="Pró Super">
        <p>Transformando supermercados em negócios altamente lucrativos com diagnóstico especializado, estratégias práticas e acompanhamento real de implementação.</p>
        <div class="shared-socials" aria-label="Canais da Pró Super">
          <a href="https://www.youtube.com/@prosuperconsultoria6665" target="_blank" rel="noopener" aria-label="YouTube">
            <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href="https://www.facebook.com/consultoriadesupermercados" target="_blank" rel="noopener" aria-label="Facebook">
            <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/flavio-constant-pires-13078122/" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
          </a>
          <a href="https://wa.me/5516982450555" target="_blank" rel="noopener" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.301-.15-1.782-.879-2.057-.979-.276-.1-.476-.15-.677.15-.2.301-.776.979-.952 1.18-.175.2-.351.226-.652.075s-1.272-.469-2.423-1.496c-.896-.799-1.501-1.787-1.677-2.088-.176-.3-.019-.463.132-.613.136-.135.301-.351.452-.527.15-.176.2-.301.3-.501.101-.2.051-.376-.025-.527-.075-.15-.677-1.633-.928-2.235-.244-.587-.493-.507-.677-.517l-.577-.01c-.2 0-.527.075-.802.376s-1.054 1.029-1.054 2.509 1.079 2.91 1.23 3.111c.15.2 2.123 3.242 5.143 4.547.719.311 1.28.497 1.718.636.722.23 1.378.197 1.898.12.579-.087 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.076-.126-.276-.201-.577-.351zM12.042 21.84c-1.782 0-3.528-.482-5.06-1.396L2.3 21.62l1.202-4.526A9.774 9.774 0 0 1 2.22 12.06c0-5.415 4.407-9.822 9.822-9.822 2.624 0 5.09 1.022 6.945 2.877a9.76 9.76 0 0 1 2.877 6.945c0 5.415-4.407 9.822-9.822 9.822zm0-17.644c-4.313 0-7.822 3.509-7.822 7.822 0 1.517.433 2.943 1.185 4.156l-.736 2.77 2.836-.744a7.79 7.79 0 0 0 4.537 1.44c4.313 0 7.822-3.509 7.822-7.822 0-4.313-3.509-7.822-7.822-7.822z"/></svg>
          </a>
        </div>
      </div>
      <div>
        <h2>Serviços</h2>
        <div class="shared-footer-list">
          <a href="${url('solucoes')}">Diagnóstico Completo</a>
          <a href="${url('solucoes')}">Gestão de Rentabilidade</a>
          <a href="${url('solucoes')}">Redução de Perdas</a>
          <a href="${url('solucoes')}">Precificação Estratégica</a>
          <a href="${url('solucoes')}">Treinamento de Equipes</a>
          <a href="${url('solucoes')}">Layout e Merchandising</a>
        </div>
      </div>
      <div>
        <h2>Links Úteis</h2>
        <div class="shared-footer-list">
          <a href="${url('consultor')}">Sobre Flávio Pires</a>
          <a href="${isLocalFile ? 'index.html#processo' : '/#processo'}">Como Funciona</a>
          <a href="${url('clientes')}">Nossos Clientes</a>
          <a href="https://www.youtube.com/@prosuperconsultoria6665" target="_blank" rel="noopener">Conteúdo Gratuito</a>
          <a href="${url('contato')}">Diagnóstico Gratuito</a>
        </div>
      </div>
    </div>
    <div class="wrap shared-footer-bottom">
      <span>© 2025 Pró Super Consultoria de Supermercados. Todos os direitos reservados.</span>
      <span>Site desenvolvido por <a href="https://dpmidias.com.br" target="_blank" rel="noopener">DPMídias</a> | <a href="https://prosuperconsultoria.com.br/">prosuperconsultoria.com.br</a></span>
    </div>`;
  }

  // Compatibilidade universal para navegação local em file:///
  if (isLocalFile) {
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      if (href === '/' || href === '/#processo' || href === '/#inicio') {
        a.setAttribute('href', href.replace('/', 'index.html'));
      } else if (!href.includes(':') && !href.startsWith('#') && !href.endsWith('.html') && !href.includes('.png') && !href.includes('.jpg') && !href.includes('.webp') && !href.includes('.svg')) {
        a.setAttribute('href', `${href}.html`);
      }
    });

    document.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (href && !href.includes(':') && !href.startsWith('#') && !href.endsWith('.html') && !href.includes('.png') && !href.includes('.jpg') && !href.includes('.webp') && !href.includes('.svg')) {
        e.preventDefault();
        const target = href.replace(/^\/+/, '');
        window.location.href = target === '' ? 'index.html' : `${target}.html`;
      }
    }, true);
  }

  // Comportamento Interativo e Efeitos de Clique no Menu
  const menu = document.querySelector('.menu');
  const navLinks = document.querySelector('.nav-links');

  if (menu && navLinks) {
    const toggleMenu = () => {
      const isOpen = navLinks.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(isOpen));
    };

    const closeMenu = () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
      }
    };

    menu.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Fechar ao clicar em qualquer item do menu
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        // Efeito Ripple ao clicar no item
        createRipple(e, link);
        closeMenu();
      });
    });

    // Fechar ao clicar fora do menu
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menu.contains(e.target)) {
        closeMenu();
      }
    });

    // Fechar ao pressionar a tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // Função para criar efeito de onda (ripple) no clique
  function createRipple(event, element) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'menu-ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    const clientX = event.clientX || (rect.left + rect.width / 2);
    const clientY = event.clientY || (rect.top + rect.height / 2);
    ripple.style.left = `${clientX - rect.left - size / 2}px`;
    ripple.style.top = `${clientY - rect.top - size / 2}px`;
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  // Adicionar ripple a todos os links do menu desktop também
  document.querySelectorAll('.page-header .nav-links a').forEach(a => {
    a.addEventListener('click', (e) => createRipple(e, a));
  });

  if (!window.__proSuperPremiumLoaded) {
    window.__proSuperPremiumLoaded = true;
    const premiumScript = document.createElement('script');
    premiumScript.src = 'premium-effects.js';
    document.body.appendChild(premiumScript);
  }
})();
