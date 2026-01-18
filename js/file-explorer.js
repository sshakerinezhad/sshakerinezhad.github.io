/**
 * FileExplorer - Windows-style file browser
 */
const FileExplorer = {
  async init(container, config) {
    console.log('FileExplorer.init()', { container, config });

    if (!config.dataUrl) {
      console.error('FileExplorer: No dataUrl in config');
      return;
    }

    try {
      const data = await this.fetchData(config.dataUrl);
      const categories = this.extractCategories(data.items);

      console.log('FileExplorer loaded:', {
        itemCount: data.items.length,
        categories: categories
      });

      // Store for use in rendering
      this.currentData = data;
      this.currentCategories = categories;
      this.activeCategory = 'All';
      this.container = container.querySelector('.explorer-container');

      // Render the explorer
      this.renderSidebar(container, categories);
      this.renderGrid(container, data.items);

      // Wire up back button
      container.querySelector('.explorer-back-btn').addEventListener('click', () => {
        this.closeDetail();
      });

    } catch (error) {
      console.error('FileExplorer: Failed to load data', error);
    }
  },

  async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  },

  extractCategories(items) {
    const tagSet = new Set();
    items.forEach(item => {
      item.tags.forEach(tag => tagSet.add(tag));
    });
    return ['All', ...Array.from(tagSet).sort()];
  },

  renderSidebar(container, categories) {
    const sidebar = container.querySelector('.explorer-sidebar');
    sidebar.innerHTML = categories.map(cat => `
      <button class="explorer-filter${cat === this.activeCategory ? ' active' : ''}" data-category="${cat}">
        ${cat}
      </button>
    `).join('');

    // Add filter click handlers
    sidebar.querySelectorAll('.explorer-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeCategory = btn.dataset.category;
        this.renderSidebar(container, this.currentCategories);
        this.renderGrid(container, this.currentData.items);
      });
    });
  },

  renderGrid(container, items) {
    const grid = container.querySelector('.explorer-grid');

    // Filter by active category
    const filtered = this.activeCategory === 'All'
      ? items
      : items.filter(item => item.tags.includes(this.activeCategory));

    grid.innerHTML = filtered.map(item => `
      <div class="explorer-item${item.status === 'coming-soon' ? ' coming-soon' : ''}" data-id="${item.id}">
        <img class="explorer-item-icon" src="${item.icon || 'images/icons/folder.png'}" alt="">
        <span class="explorer-item-title">${item.title}</span>
      </div>
    `).join('');

    // Add click handlers for non-coming-soon items
    const clickableItems = grid.querySelectorAll('.explorer-item:not(.coming-soon)');
    console.log('Attaching click handlers to', clickableItems.length, 'items');

    clickableItems.forEach(el => {
      el.addEventListener('click', async () => {
        console.log('Folder clicked:', el.dataset.id);
        const id = el.dataset.id;
        const item = this.currentData.items.find(p => p.id === id);
        if (item) {
          try {
            await this.openDetail(item);
          } catch (err) {
            console.error('openDetail failed:', err);
          }
        } else {
          console.error('Item not found for id:', id);
        }
      });
    });
  },

  async openDetail(item) {
    const detailContent = this.container.querySelector('.explorer-detail-content');

    try {
      const response = await fetch(item.contentFile);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      detailContent.innerHTML = await response.text();
    } catch (error) {
      detailContent.innerHTML = `<p>Failed to load content.</p>`;
      console.error('FileExplorer: Failed to load detail', error);
    }

    this.container.classList.add('detail-active');
  },

  closeDetail() {
    this.container.classList.remove('detail-active');
  }
};
