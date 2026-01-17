/**
 * MobileNav - Handles mobile-specific behavior
 * Supports two modes: 'tabs' (one window at a time) and 'scroll' (stacked cards)
 */
class MobileNav {
  constructor(windowManager) {
    this.wm = windowManager;
    this.mode = CONFIG.mobile.mode;
    this.init();
  }

  init() {
    this.updateBodyClass();
    window.addEventListener('resize', () => this.updateBodyClass());

    if (this.mode === 'tabs') {
      this.initTabsMode();
    } else if (this.mode === 'scroll') {
      this.initScrollMode();
    }
  }

  updateBodyClass() {
    const isMobile = CONFIG.isMobile();
    document.body.classList.remove('mobile-tabs', 'mobile-scroll');
    if (isMobile) {
      document.body.classList.add(`mobile-${this.mode}`);
    }
  }

  renderMobileNav(nav) {
    nav.innerHTML = '';

    Object.entries(CONFIG.windows).forEach(([id, config]) => {
      if (!config.showInUI) return;

      const btn = document.createElement('button');
      btn.dataset.window = id;
      btn.innerHTML = `
        <img src="${config.icon}" alt="">
        <span>${config.label.replace('.exe', '').replace('Shameless ', '')}</span>
      `;
      nav.appendChild(btn);
    });
  }

  // === TABS MODE ===
  initTabsMode() {
    const nav = document.getElementById('mobile-nav');
    if (!nav) return;

    this.renderMobileNav(nav);

    nav.querySelectorAll('button[data-window]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!CONFIG.isMobile()) return;

        const windowId = btn.dataset.window;

        // If window is already open, just focus it
        if (this.wm.isOpen(windowId)) {
          this.wm.focus(windowId);
        } else {
          // Close all other windows first
          this.wm.getOpenWindows().forEach(w => this.wm.close(w.id));
          // Open selected window
          this.wm.open(windowId);
        }

        // Update active button
        nav.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Sync active state when windows change
    this.wm.on('windowOpen', (id) => {
      if (!CONFIG.isMobile()) return;
      nav.querySelectorAll('button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.window === id);
      });
    });

    this.wm.on('windowClose', () => {
      if (!CONFIG.isMobile()) return;
      // If no windows open, remove all active states
      if (this.wm.getOpenWindows().length === 0) {
        nav.querySelectorAll('button').forEach(btn => {
          btn.classList.remove('active');
        });
      }
    });
  }

  // === SCROLL MODE ===
  initScrollMode() {
    if (!CONFIG.isMobile()) return;

    const stack = document.getElementById('window-stack');
    if (!stack) return;

    // Render all visible windows as cards
    const windowIds = Object.keys(CONFIG.windows).filter(id =>
      CONFIG.windows[id].showInUI
    );

    windowIds.forEach(id => {
      const config = CONFIG.windows[id];
      if (!config) return;

      const template = document.getElementById(config.contentId);
      if (!template) return;

      const card = document.createElement('div');
      card.className = 'window-card';
      card.innerHTML = `
        <div class="window-card-title">${config.title}</div>
        <div class="window-card-content"></div>
      `;
      card.querySelector('.window-card-content').appendChild(
        template.content.cloneNode(true)
      );
      stack.appendChild(card);
    });
  }
}
