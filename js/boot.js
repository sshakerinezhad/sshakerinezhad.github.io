/**
 * Boot - Win95 boot sequence overlay
 * Plays once per browser session. Click/key/touch skips.
 * Self-contained: no dependency on the window system.
 */
(function() {
  'use strict';

  const BIOS_MS = 2000;
  const SPLASH_MS = 2500;
  const FADE_MS = 300;

  const screen = document.getElementById('boot-screen');
  if (!screen) return;

  // sessionStorage throws in some private-browsing contexts
  function hasBooted() {
    try { return sessionStorage.getItem('booted') === '1'; } catch (e) { return false; }
  }
  function markBooted() {
    try { sessionStorage.setItem('booted', '1'); } catch (e) { /* boot replays, acceptable */ }
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (hasBooted() || reducedMotion) {
    screen.remove();
    return;
  }

  const timers = [];
  let done = false;

  function finish() {
    if (done) return;
    done = true;
    timers.forEach(clearTimeout);
    markBooted();
    screen.classList.add('boot-fade');
    setTimeout(() => screen.remove(), FADE_MS);
  }

  ['click', 'keydown', 'touchstart'].forEach((evt) => {
    window.addEventListener(evt, finish, { once: true, passive: true });
  });

  timers.push(setTimeout(() => screen.classList.add('splash-active'), BIOS_MS));
  timers.push(setTimeout(finish, BIOS_MS + SPLASH_MS));
})();
