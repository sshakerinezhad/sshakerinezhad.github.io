/**
 * App - Main entry point
 */
(function() {
  'use strict';

  const windowManager = new WindowManager();
  const taskbar = new Taskbar(windowManager);
  const desktopIcons = new DesktopIcons(windowManager);
  const easterEggs = new EasterEggs(windowManager);
  const mobileNav = new MobileNav(windowManager);

  // Expose for debugging
  window.wm = windowManager;

  // Sound toggle handler
  document.getElementById('sound-toggle').addEventListener('click', () => {
    const enabled = easterEggs.toggleSound();
    document.getElementById('sound-toggle').textContent = enabled ? '🔊' : '🔇';
  });

  function init() {
    console.log('Win95 Portfolio initializing...');

    // Initialize taskbar and desktop icons
    taskbar.init();
    desktopIcons.init();

    // Open windows based on device/mode
    if (CONFIG.isMobile() && CONFIG.mobile.mode === 'tabs') {
      // Mobile tabs mode: only open About initially
      windowManager.open('about');
    } else if (!CONFIG.isMobile()) {
      // Desktop: open windows marked as openOnLoad (skip hidden windows)
      Object.entries(CONFIG.windows).forEach(([id, config]) => {
        if (config.openOnLoad && !config.hidden) {
          windowManager.open(id);
        }
      });
    }
    // Scroll mode: windows are rendered as cards by MobileNav, no WinBox needed

    console.log('Win95 Portfolio ready!');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
