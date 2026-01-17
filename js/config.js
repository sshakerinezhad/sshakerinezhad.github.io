/**
 * Site configuration - all window definitions live here
 */
const CONFIG = {
  windows: {
    about: {
      id: 'about',
      title: 'About.exe',
      width: 420,
      height: 300,
      x: 80,
      y: 60,
      contentId: 'about-content',
      openOnLoad: true
    },
    projects: {
      id: 'projects',
      title: 'Research & Projects',
      width: 500,
      height: 400,
      x: 140,
      y: 100,
      contentId: 'projects-content',
      openOnLoad: true
    },
    plugs: {
      id: 'plugs',
      title: 'Shameless Plugs',
      width: 400,
      height: 320,
      x: 200,
      y: 140,
      contentId: 'plugs-content',
      openOnLoad: false
    },
    merlyn: {
      id: 'merlyn',
      title: 'Merlyn Labs',
      width: 480,
      height: 380,
      x: 260,
      y: 180,
      contentId: 'merlyn-content',
      openOnLoad: false
    },
    dnd: {
      id: 'dnd',
      title: 'D&D Corner',
      width: 450,
      height: 350,
      x: 320,
      y: 220,
      contentId: 'dnd-content',
      openOnLoad: false,
      hidden: true
    }
  },

  desktop: {
    containerId: 'desktop'
  },

  desktopIcons: {
    about: { windowId: 'about', label: 'About.exe', icon: '👤' },
    projects: { windowId: 'projects', label: 'Projects', icon: '📁' },
    plugs: { windowId: 'plugs', label: 'Shameless Plugs', icon: '🔗' },
    merlyn: { windowId: 'merlyn', label: 'Merlyn Labs', icon: '🧪' }
    // D&D Corner NOT shown (hidden easter egg)
  },

  socials: {
    github: { url: 'https://github.com/sshakerinezhad', icon: '💻', title: 'GitHub' },
    twitter: { url: 'https://twitter.com/TheSigilliteX', icon: '🐦', title: 'Twitter' },
    linkedin: { url: 'https://linkedin.com/in/shayan-shakeri-nezhad', icon: '💼', title: 'LinkedIn' },
    email: { url: 'mailto:sshakerinezhad@gmail.com', icon: '✉️', title: 'Email' }
  }
};
