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
  }
};
