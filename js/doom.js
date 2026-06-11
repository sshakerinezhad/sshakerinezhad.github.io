/**
 * Doom - runs DOOM shareware in a window via self-hosted js-dos v8
 *
 * js-dos assets (~2MB) and the game bundle (~2MB) are lazy-loaded on
 * first open. Lifecycle: close stops the emulator, minimize pauses it.
 */
const Doom = (() => {
  let assetsPromise = null;  // js-dos script+css injected once, ever
  let props = null;          // current DosProps instance
  let listenersWired = false;

  function loadAssets() {
    if (assetsPromise) return assetsPromise;
    assetsPromise = new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'vendor/js-dos/js-dos.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'vendor/js-dos/js-dos.js';
      script.onload = resolve;
      script.onerror = () => {
        assetsPromise = null;  // allow retry on next open
        reject(new Error('Failed to load js-dos'));
      };
      document.head.appendChild(script);
    });
    return assetsPromise;
  }

  function destroy() {
    if (props) {
      try { props.stop(); } catch (e) { /* already stopped */ }
      props = null;
    }
  }

  function wireListeners(wm) {
    if (listenersWired) return;
    listenersWired = true;
    wm.on('windowClose', (id) => {
      if (id === 'doom') destroy();
    });
    wm.on('windowMinimize', (id) => {
      if (id === 'doom' && props) {
        props.setPaused(true);
        props.setVolume(0);
      }
    });
    wm.on('windowRestore', (id) => {
      if (id === 'doom' && props) {
        props.setPaused(false);
        props.setVolume(1);
      }
    });
  }

  async function init(container, config, wm) {
    wireListeners(wm);
    destroy();  // guard: never two emulators

    try {
      await loadAssets();
    } catch (e) {
      const fallback = container.querySelector('.doom-fallback');
      if (fallback) fallback.textContent = 'Failed to load DOOM. Reload and try again.';
      return;
    }

    const mount = container.querySelector('.doom-player');
    if (!mount) return;
    container.style.height = '100%';  // WinBox mount wrapper is auto-height; emulator needs the full window
    const fallback = container.querySelector('.doom-fallback');
    if (fallback) fallback.remove();

    props = Dos(mount, {
      url: 'games/doom.jsdos',
      pathPrefix: 'vendor/js-dos/emulators/',
      autoStart: true,
      noCloud: true,
      kiosk: !CONFIG.isMobile()  // hide js-dos UI on desktop; mobile keeps it for touch controls
    });
  }

  return { init };
})();
