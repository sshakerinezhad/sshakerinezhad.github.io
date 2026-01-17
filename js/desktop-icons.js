/**
 * DesktopIcons - Manages desktop icons and header socials
 */
class DesktopIcons {
  constructor(windowManager) {
    this.wm = windowManager;
    this.selectedIcon = null;
  }

  init() {
    this.renderIcons();
    this.renderSocials();
    this.bindEvents();
  }

  renderIcons() {
    const container = document.getElementById('desktop-icons');
    container.innerHTML = '';

    Object.entries(CONFIG.desktopIcons).forEach(([id, config]) => {
      const icon = document.createElement('div');
      icon.className = 'desktop-icon';
      icon.dataset.windowId = config.windowId;
      icon.tabIndex = 0;
      icon.setAttribute('role', 'button');
      icon.setAttribute('aria-label', `Open ${config.label}`);
      icon.innerHTML = `
        <span class="icon-image">${config.icon}</span>
        <span class="icon-label">${config.label}</span>
      `;
      container.appendChild(icon);
    });
  }

  renderSocials() {
    const container = document.querySelector('.header-socials');
    if (!container) return;

    container.innerHTML = '';

    Object.entries(CONFIG.socials).forEach(([id, config]) => {
      const link = document.createElement('a');
      link.className = 'social-link';
      link.href = config.url;
      link.target = config.url.startsWith('mailto:') ? '_self' : '_blank';
      link.title = config.title;
      link.setAttribute('aria-label', config.title);
      link.innerHTML = `<i class="${config.icon}"></i>`;
      container.appendChild(link);
    });
  }

  bindEvents() {
    const container = document.getElementById('desktop-icons');

    // Double-click to open window
    container.addEventListener('dblclick', (e) => {
      const icon = e.target.closest('.desktop-icon');
      if (icon) {
        const windowId = icon.dataset.windowId;
        this.wm.open(windowId);
      }
    });

    // Single click to select
    container.addEventListener('click', (e) => {
      const icon = e.target.closest('.desktop-icon');
      if (icon) {
        this.selectIcon(icon);
      }
    });

    // Keyboard: Enter to open
    container.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const icon = e.target.closest('.desktop-icon');
        if (icon) {
          const windowId = icon.dataset.windowId;
          this.wm.open(windowId);
        }
      }
    });

    // Click on desktop clears selection
    document.getElementById('desktop').addEventListener('click', (e) => {
      if (e.target.id === 'desktop') {
        this.clearSelection();
      }
    });
  }

  selectIcon(icon) {
    this.clearSelection();
    icon.classList.add('selected');
    this.selectedIcon = icon;
  }

  clearSelection() {
    document.querySelectorAll('.desktop-icon.selected').forEach(icon => {
      icon.classList.remove('selected');
    });
    this.selectedIcon = null;
  }
}
