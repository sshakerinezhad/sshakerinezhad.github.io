/**
 * App - Main entry point
 */
(function() {
  'use strict';

  const windowManager = new WindowManager();
  const taskbar = new Taskbar(windowManager);
  const desktopIcons = new DesktopIcons(windowManager);

  // Expose for debugging
  window.wm = windowManager;

  function init() {
    console.log('Win95 Portfolio initializing...');

    // Initialize taskbar and desktop icons
    taskbar.init();
    desktopIcons.init();

    // Open windows marked as openOnLoad (skip hidden windows)
    Object.entries(CONFIG.windows).forEach(([id, config]) => {
      if (config.openOnLoad && !config.hidden) {
        windowManager.open(id);
      }
    });

    console.log('Win95 Portfolio ready!');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
