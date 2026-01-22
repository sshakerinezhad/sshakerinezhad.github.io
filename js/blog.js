const Blog = {
  posts: [],

  async init(container) {
    try {
      const response = await fetch('blog/posts.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      this.posts = await response.json();
      this.renderList(container);
    } catch (err) {
      console.error('Blog: Failed to load posts', err);
      container.querySelector('.blog-list').innerHTML =
        '<p style="color: #808080; font-style: italic;">Could not load posts.</p>';
    }
  },

  renderList(container) {
    const listEl = container.querySelector('.blog-list');

    // Sort posts by date (newest first)
    const sorted = [...this.posts].sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    );

    listEl.innerHTML = sorted.map(post => `
      <div class="blog-item" data-id="${post.id}">
        <span class="blog-item-date">${this.formatDate(post.date)}</span>
        <span class="blog-item-title">${post.title}</span>
        <div class="blog-item-desc">${post.description}</div>
      </div>
    `).join('');

    // Attach click handlers
    listEl.querySelectorAll('.blog-item').forEach(item => {
      item.addEventListener('click', () => {
        const post = this.posts.find(p => p.id === item.dataset.id);
        if (post) this.openPost(post, container);
      });
    });

    // Set up back button
    container.querySelector('.blog-back-btn').addEventListener('click', () => {
      this.showListView(container);
    });
  },

  async openPost(post, container) {
    const response = await fetch(post.file);
    const markdown = await response.text();
    const html = marked.parse(markdown);

    container.querySelector('.blog-article-title').textContent = post.title;
    container.querySelector('.blog-article-date').textContent = this.formatDate(post.date);
    container.querySelector('.blog-article-content').innerHTML = html;

    // Handle source link visibility
    const sourceLink = container.querySelector('.blog-article-source');
    if (post.source) {
      sourceLink.href = post.source;
      sourceLink.style.display = 'inline';
    } else {
      sourceLink.style.display = 'none';
    }

    this.showArticleView(container);
  },

  showListView(container) {
    container.querySelector('.blog-container').classList.remove('detail-active');
  },

  showArticleView(container) {
    container.querySelector('.blog-container').classList.add('detail-active');
  },

  formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
};
