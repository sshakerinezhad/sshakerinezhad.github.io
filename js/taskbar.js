/**
 * Taskbar - Manages taskbar, start menu, and running window buttons
 */
class Taskbar {
  constructor(windowManager) {
    this.wm = windowManager;
    this.startMenuOpen = false;
  }

  init() {
    this.taskbarEl = document.getElementById('taskbar-windows');
    this.startButton = document.getElementById('start-button');
    this.startMenu = document.getElementById('start-menu');
    this.clockEl = document.getElementById('clock');

    this.renderStartMenu();
    this.bindEvents();
    this.subscribeToWindowManager();
    this.startClock();
  }

  renderStartMenu() {
    const itemsContainer = document.getElementById('start-menu-items');
    itemsContainer.innerHTML = '';

    // Add menu items for non-hidden windows
    Object.entries(CONFIG.windows).forEach(([id, config]) => {
      if (config.hidden) return;

      const item = document.createElement('div');
      item.className = 'start-menu-item';
      item.dataset.windowId = id;
      item.innerHTML = `
        <span class="smi-icon">${this.getIconForWindow(id)}</span>
        <span>${config.title}</span>
      `;
      itemsContainer.appendChild(item);
    });
  }

  getIconForWindow(windowId) {
    const iconConfig = CONFIG.desktopIcons[windowId];
    return iconConfig ? iconConfig.icon : '📄';
  }

  bindEvents() {
    // Start button
    this.startButton.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleStartMenu();
    });

    // Start menu items
    this.startMenu.addEventListener('click', (e) => {
      const item = e.target.closest('.start-menu-item');
      if (item) {
        const windowId = item.dataset.windowId;
        this.wm.open(windowId);
        this.closeStartMenu();
      }
    });

    // Close start menu when clicking elsewhere
    document.addEventListener('click', (e) => {
      if (this.startMenuOpen && !this.startMenu.contains(e.target) && e.target !== this.startButton) {
        this.closeStartMenu();
      }
    });
  }

  subscribeToWindowManager() {
    this.wm.on('windowOpen', (id, config) => {
      this.addTaskbarButton(id, config);
    });

    this.wm.on('windowClose', (id) => {
      this.removeTaskbarButton(id);
    });

    this.wm.on('windowFocus', (id) => {
      this.setActiveButton(id);
    });

    this.wm.on('windowBlur', (id) => {
      this.clearActiveButton(id);
    });

    this.wm.on('windowMinimize', (id) => {
      this.clearActiveButton(id);
    });

    this.wm.on('windowRestore', (id) => {
      this.setActiveButton(id);
    });
  }

  addTaskbarButton(id, config) {
    // Don't add duplicate
    if (document.querySelector(`.taskbar-button[data-window-id="${id}"]`)) return;

    const btn = document.createElement('button');
    btn.className = 'taskbar-button active';
    btn.dataset.windowId = id;
    btn.innerHTML = `
      <span class="tb-icon">${this.getIconForWindow(id)}</span>
      <span class="tb-title">${config.title}</span>
    `;

    btn.addEventListener('click', () => {
      const win = this.wm.windows.get(id);
      if (win) {
        if (win.state === 'minimized') {
          win.instance.restore();
        } else if (win.focused) {
          win.instance.minimize();
        } else {
          win.instance.focus();
        }
      }
    });

    this.taskbarEl.appendChild(btn);
  }

  removeTaskbarButton(id) {
    const btn = document.querySelector(`.taskbar-button[data-window-id="${id}"]`);
    if (btn) btn.remove();
  }

  setActiveButton(id) {
    // Remove active from all
    document.querySelectorAll('.taskbar-button').forEach(btn => btn.classList.remove('active'));
    // Add to focused
    const btn = document.querySelector(`.taskbar-button[data-window-id="${id}"]`);
    if (btn) btn.classList.add('active');
  }

  clearActiveButton(id) {
    const btn = document.querySelector(`.taskbar-button[data-window-id="${id}"]`);
    if (btn) btn.classList.remove('active');
  }

  toggleStartMenu() {
    if (this.startMenuOpen) {
      this.closeStartMenu();
    } else {
      this.openStartMenu();
    }
  }

  openStartMenu() {
    this.startMenu.classList.remove('hidden');
    this.startButton.classList.add('active');
    this.startMenuOpen = true;
  }

  closeStartMenu() {
    this.startMenu.classList.add('hidden');
    this.startButton.classList.remove('active');
    this.startMenuOpen = false;
  }

  startClock() {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      this.clockEl.textContent = `${hours}:${minutes} ${ampm}`;
    };

    updateClock();
    setInterval(updateClock, 1000);
  }
}
