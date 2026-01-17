/**
 * Easter Eggs - Hidden features and fun surprises
 */
class EasterEggs {
  constructor(windowManager) {
    this.wm = windowManager;
    this.konamiSequence = [];
    this.dndRevealed = false;

    // Simplified Konami: ↑↑↓↓BA
    this.KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'b', 'a'];

    // Sound system
    this.soundEnabled = false;
    this.sounds = {
      startup: new Audio('sounds/startup.mp3'),
      reveal: new Audio('sounds/reveal.mp3')
    };

    this.init();
  }

  init() {
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
    this.initComingSoon();
    this.logConsoleHint();
  }

  handleKeydown(e) {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    this.konamiSequence.push(key);
    if (this.konamiSequence.length > 6) this.konamiSequence.shift();

    if (this.konamiSequence.join(',') === this.KONAMI.join(',')) {
      this.revealDndCorner();
    }
  }

  revealDndCorner() {
    if (this.dndRevealed) return;
    this.dndRevealed = true;
    this.playSound('reveal');
    this.wm.open('dnd');
  }

  logConsoleHint() {
    console.log('%c🎲 Secret portal detected...', 'color:#800080;font-weight:bold;font-size:14px');
    console.log('%cTry: ↑↑↓↓BA', 'color:#0000ff;font-size:12px');
  }

  initComingSoon() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.coming-soon')) {
        e.preventDefault();
        this.showComingSoonDialog();
      }
    });
  }

  showComingSoonDialog() {
    new WinBox('Error', {
      width: 320,
      height: 140,
      x: 'center',
      y: 'center',
      modal: true,
      class: ['win95-window', 'no-full', 'no-max', 'no-min', 'no-resize'],
      html: `
        <div style="padding: 12px; display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 32px;">⚠️</span>
          <div>
            <p style="margin: 0 0 8px 0;"><strong>Application not found</strong></p>
            <p style="margin: 0; font-size: 12px;">This project is still under development.</p>
          </div>
        </div>
      `
    });
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    if (this.soundEnabled) {
      this.sounds.startup.play().catch(() => {});
    }
    return this.soundEnabled;
  }

  playSound(name) {
    if (this.soundEnabled && this.sounds[name]) {
      this.sounds[name].currentTime = 0;
      this.sounds[name].play().catch(() => {});
    }
  }
}
