/**
 * Site configuration - all window definitions live here
 */
const CONFIG = {
  mobile: {
    breakpoint: 480,
    mode: 'tabs'  // 'tabs' or 'scroll'
  },

  // === ALL WINDOWS - order determines icon order ===
  windows: {
    about: {
      id: 'about',
      title: 'About.exe',
      label: 'About.exe',
      icon: 'images/icons/Alchemy.png',
      width: 700,
      height: 500,
      x: 'center',
      y: 'center',
      contentId: 'about-content',
      openOnLoad: true,
      showInUI: true
    },
    projects: {
      id: 'projects',
      title: 'Research & Projects',
      label: 'Projects',
      icon: 'images/icons/projects.png',
      width: 500,
      height: 400,
      x: 140,
      y: 100,
      contentId: 'projects-content',
      openOnLoad: false,
      showInUI: true,
      type: 'explorer',
      dataUrl: 'data/projects.json'
    },
    plugs: {
      id: 'plugs',
      title: 'Blog',
      label: 'Blog',
      icon: 'images/icons/blogposts.png',
      width: 800,
      height: 500,
      x: 200,
      y: 140,
      contentId: 'plugs-content',
      openOnLoad: false,
      showInUI: true,
      type: 'blog'
    },
    merlyn: {
      id: 'merlyn',
      title: 'Merlyn Labs',
      label: 'Merlyn Labs',
      icon: 'images/icons/merlyn.png',  // Alternative: 'images/icons/merlyn-wizard.png'
      width: 480,
      height: 380,
      x: 260,
      y: 180,
      contentId: 'merlyn-content',
      openOnLoad: false,
      showInUI: true
    },
    books: {
      id: 'books',
      title: 'Library',
      label: 'Book Club',
      icon: 'images/icons/Myst.png',
      width: 550,
      height: 450,
      x: 160,
      y: 120,
      contentId: 'books-content',
      openOnLoad: false,
      showInUI: true,
      type: 'explorer',
      dataUrl: 'data/books.json'
    },
    contact: {
      id: 'contact',
      title: 'Contact Me',
      label: 'Contact Me',
      icon: 'images/icons/mail.png',
      width: 400,
      height: 320,
      x: 200,
      y: 140,
      contentId: 'mail-content',
      openOnLoad: false,
      showInUI: true
    },
    dnd: {
      id: 'dnd',
      title: 'D&D Corner',
      label: 'D&D Corner',
      icon: 'images/icons/dnd.png',
      width: 450,
      height: 350,
      x: 320,
      y: 220,
      contentId: 'dnd-content',
      openOnLoad: false,
      showInUI: false  // Hidden easter egg
    }
  },

  desktop: {
    containerId: 'desktop'
  },

  socials: {
    github: { url: 'https://github.com/sshakerinezhad', icon: 'fa-brands fa-github', title: 'GitHub' },
    twitter: { url: 'https://twitter.com/TheSigilliteX', icon: 'fa-brands fa-x-twitter', title: 'Twitter' },
    linkedin: { url: 'https://linkedin.com/in/shayan-shakeri-nezhad', icon: 'fa-brands fa-linkedin', title: 'LinkedIn' },
    email: { url: 'mailto:sshakerinezhad11@gmail.com', icon: 'fa-solid fa-envelope', title: 'Email' }
  },

  isMobile: () => window.innerWidth <= CONFIG.mobile.breakpoint
};
