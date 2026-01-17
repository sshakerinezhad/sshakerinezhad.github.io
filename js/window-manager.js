/**
 * WindowManager - Creates and tracks WinBox windows
 */
class WindowManager {
  constructor() {
    this.windows = new Map();
  }

  /**
   * Open a window by its config ID
   * @param {string} id - Window ID from CONFIG.windows
   * @returns {WinBox|null}
   */
  open(id) {
    if (this.windows.has(id)) {
      const existing = this.windows.get(id);
      if (existing.state === 'minimized') {
        existing.instance.restore();
        existing.state = 'normal';
      }
      existing.instance.focus();
      return existing.instance;
    }

    const config = CONFIG.windows[id];
    if (!config) {
      console.error(`WindowManager: Unknown window "${id}"`);
      return null;
    }

    const template = document.getElementById(config.contentId);
    const content = template ? template.content.cloneNode(true) : null;

    const winbox = new WinBox(config.title, {
      width: config.width,
      height: config.height,
      x: config.x,
      y: config.y,
      class: ['win95-window'],

      onclose: () => {
        this.windows.delete(id);
        return true;
      },

      onfocus: () => {
        const win = this.windows.get(id);
        if (win) win.focused = true;
      },

      onblur: () => {
        const win = this.windows.get(id);
        if (win) win.focused = false;
      },

      onminimize: () => {
        const win = this.windows.get(id);
        if (win) win.state = 'minimized';
      },

      onrestore: () => {
        const win = this.windows.get(id);
        if (win) win.state = 'normal';
      }
    });

    if (content) {
      const container = document.createElement('div');
      container.appendChild(content);
      winbox.mount(container);
    }

    this.windows.set(id, {
      config,
      instance: winbox,
      state: 'normal',
      focused: true
    });

    return winbox;
  }

  /**
   * Close a window by ID
   */
  close(id) {
    const win = this.windows.get(id);
    if (win) {
      win.instance.close();
    }
  }

  /**
   * Get all currently open windows
   */
  getOpenWindows() {
    return Array.from(this.windows.entries()).map(([id, data]) => ({
      id,
      ...data
    }));
  }

  /**
   * Check if a window is open
   */
  isOpen(id) {
    return this.windows.has(id);
  }

  /**
   * Focus a window by ID
   */
  focus(id) {
    const win = this.windows.get(id);
    if (win) {
      win.instance.focus();
    }
  }

  /**
   * Minimize a window by ID
   */
  minimize(id) {
    const win = this.windows.get(id);
    if (win) {
      win.instance.minimize();
    }
  }
}
