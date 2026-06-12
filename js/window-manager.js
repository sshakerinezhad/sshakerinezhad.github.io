/**
 * WindowManager - Creates and tracks WinBox windows
 */
class WindowManager {
  constructor() {
    this.windows = new Map();
    this.listeners = {};
  }

  /**
   * Subscribe to window events
   * @param {string} event - Event name (windowOpen, windowClose, windowFocus, windowMinimize, windowRestore)
   * @param {Function} callback - Callback function
   */
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  /**
   * Emit an event to all subscribers
   * @param {string} event - Event name
   * @param {...any} args - Arguments to pass to callbacks
   */
  emit(event, ...args) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(...args));
    }
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

    const isMobile = CONFIG.isMobile();

    // Skip WinBox entirely in scroll mode on mobile
    if (isMobile && CONFIG.mobile.mode === 'scroll') {
      return null;
    }

    const template = document.getElementById(config.contentId);
    const content = template ? template.content.cloneNode(true) : null;

    // Desktop area bounds: header above, taskbar/nav below
    const topBound = isMobile ? 64 : 40;
    const bottomBound = isMobile ? 68 : 36;
    const margin = 8;
    const availW = window.innerWidth;
    const availH = window.innerHeight - topBound - bottomBound;

    // Clamp size to the desktop area so no window can ever extend past it
    const width = Math.min(isMobile ? 400 : config.width, availW - margin * 2);
    const height = Math.min(isMobile ? 500 : config.height, availH - margin * 2);

    // Resolve position ourselves: WinBox's 'center' ignores the top/bottom
    // reserves (windows land under the header on short screens), and numeric
    // coords are never bounds-checked.
    const clamp = (v, min, max) => Math.max(min, Math.min(v, max));
    const wantsCenterX = isMobile || config.x === 'center';
    const wantsCenterY = isMobile || config.y === 'center';
    const x = clamp(
      wantsCenterX ? (availW - width) / 2 : config.x,
      margin, Math.max(margin, availW - width - margin)
    );
    const y = clamp(
      wantsCenterY ? topBound + (availH - height) / 2 : config.y,
      topBound, Math.max(topBound, topBound + availH - height)
    );

    const winbox = new WinBox(config.title, {
      width,
      height,
      x,
      y,
      class: isMobile
        ? ['win95-window', 'no-full', 'no-move', 'no-resize']
        : ['win95-window', 'no-full'],

      // Constrain dragging/resizing to desktop area
      top: topBound,
      bottom: bottomBound,

      onclose: () => {
        this.windows.delete(id);
        this.emit('windowClose', id, config);
      },

      onfocus: () => {
        const win = this.windows.get(id);
        if (win) {
          win.focused = true;
          this.emit('windowFocus', id, config);
        }
      },

      onblur: () => {
        const win = this.windows.get(id);
        if (win) {
          win.focused = false;
          this.emit('windowBlur', id, config);
        }
      },

      onminimize: () => {
        const win = this.windows.get(id);
        if (win) {
          win.state = 'minimized';
          this.emit('windowMinimize', id, config);
        }
      },

      onrestore: () => {
        const win = this.windows.get(id);
        if (win) {
          win.state = 'normal';
          this.emit('windowRestore', id, config);
        }
      }
    });

    if (content) {
      const container = document.createElement('div');
      container.appendChild(content);
      winbox.mount(container);

      // Initialize module based on window type
      this.initWindowType(config.type, container, config);
    }

    this.windows.set(id, {
      config,
      instance: winbox,
      state: 'normal',
      focused: true
    });

    this.emit('windowOpen', id, config);

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

  /**
   * Initialize a window's module based on its type
   */
  initWindowType(type, container, config) {
    if (!type) return;

    const modules = {
      blog: typeof Blog !== 'undefined' ? Blog : null,
      explorer: typeof FileExplorer !== 'undefined' ? FileExplorer : null,
      doom: typeof Doom !== 'undefined' ? Doom : null
    };

    const module = modules[type];
    if (module && typeof module.init === 'function') {
      module.init(container, config, this);
    }
  }
}
