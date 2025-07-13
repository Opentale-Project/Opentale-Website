let allPosts = [];
let filteredPosts = [];
let currentFilters = {
  year: '',
  author: '',
  category: ''
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('[Init] DOM fully loaded');
  loadDevlogPosts();
});

async function loadDevlogPosts() {
  const loading = document.getElementById('loading');
  const blogPosts = document.getElementById('blog-posts');
  const error = document.getElementById('error');

  try {
    const response = await fetch('data/devlog.json');
    if (!response.ok) throw new Error('Failed to load posts');

    const data = await response.json();
    console.log('[Data Loaded]', data);

    allPosts = data.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log('[Sorted Posts]', allPosts);

    filteredPosts = [...allPosts];
    console.log('[Initial Filtered Posts]', filteredPosts);

    setupFilters();

    loading.style.display = 'none';
    blogPosts.style.display = 'block';

    renderPosts(filteredPosts);

  } catch (err) {
    console.error('[Error] Failed to load devlog posts:', err);
    loading.style.display = 'none';
    error.style.display = 'block';
  }
}

function setupFilters() {
  console.log('[Setup] Initializing filters...');
  setupYearFilter();
  setupAuthorFilter();
  setupCategoryFilter();
  setupClearButton();
}

function setupYearFilter() {
  const yearSelect = document.getElementById('yearSelect');
  if (!yearSelect) return;

  const years = [...new Set(allPosts.map(post => new Date(post.date).getFullYear()))].sort((a, b) => b - a);
  console.log('[Year Filter] Available years:', years);

  yearSelect.innerHTML = '<option value="">All Years</option>';
  years.forEach(year => {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  });

  yearSelect.addEventListener('change', function () {
    currentFilters.year = this.value;
    console.log('[Filter] Year changed to:', this.value);
    applyFilters();
  });
}

function setupAuthorFilter() {
  const authorSelect = document.getElementById('authorSelect');
  if (!authorSelect) return;

  const authors = [...new Set(allPosts.map(post => post.author))].sort();
  console.log('[Author Filter] Available authors:', authors);

  authorSelect.innerHTML = '<option value="">All Authors</option>';
  authors.forEach(author => {
    const option = document.createElement('option');
    option.value = author;
    option.textContent = author;
    authorSelect.appendChild(option);
  });

  authorSelect.addEventListener('change', function () {
    currentFilters.author = this.value;
    console.log('[Filter] Author changed to:', this.value);
    applyFilters();
  });
}

function setupCategoryFilter() {
  const categorySelect = document.getElementById('categorySelect');
  if (!categorySelect) return;

  const categories = [...new Set(allPosts.flatMap(post => post.tags))].sort();
  console.log('[Category Filter] Available categories:', categories);

  categorySelect.innerHTML = '<option value="">All Categories</option>';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categorySelect.appendChild(option);
  });

  categorySelect.addEventListener('change', function () {
    currentFilters.category = this.value;
    console.log('[Filter] Category changed to:', this.value);
    applyFilters();
  });
}

function setupClearButton() {
  const clearButton = document.getElementById('clearFilters');
  if (!clearButton) return;

  clearButton.addEventListener('click', function () {
    console.log('[Filter] Clearing all filters...');
    currentFilters = { year: '', author: '', category: '' };

    document.getElementById('yearSelect').value = '';
    document.getElementById('authorSelect').value = '';
    document.getElementById('categorySelect').value = '';

    applyFilters();
  });
}

function applyFilters() {
  console.log('[Filter] Applying filters:', currentFilters);

  filteredPosts = allPosts.filter(post => {
    if (currentFilters.year && new Date(post.date).getFullYear() != currentFilters.year) {
      return false;
    }
    if (currentFilters.author && post.author !== currentFilters.author) {
      return false;
    }
    if (currentFilters.category && !post.tags.includes(currentFilters.category)) {
      return false;
    }
    return true;
  });

  console.log('[Filter] Filtered posts count:', filteredPosts.length);
  renderPosts(filteredPosts);
}

function stripHtmlTags(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || '';
}

function renderPosts(posts) {
  const blogPosts = document.getElementById('blog-posts');
  const postCount = document.getElementById('post-count');

  if (postCount) {
    const count = posts.length;
    postCount.textContent = count === 1 ? '1 post' : `${count} posts`;
  }

  if (posts.length === 0) {
    blogPosts.innerHTML = '<p style="text-align: center; color: #aaa; padding: 40px;">No posts found with the current filters.</p>';
    return;
  }

  blogPosts.innerHTML = posts.map(post => `
    <article class="blog-post" style="
      background: rgba(255, 255, 255, 0.05);
      border: 2px solid #4e2b8d;
      border-radius: 15px;
      padding: 30px;
      margin-bottom: 30px;
      transition: transform 0.3s;
      cursor: pointer;
    " onclick="openPost(${post.id})">
      <header style="margin-bottom: 20px;">
        <h2 style="color: #c79bff; margin: 0 0 10px 0;">${post.title}</h2>
        <div style="color: #aaa; font-size: 0.9em; margin-bottom: 10px;">
          <span>📅 ${formatDate(post.date)}</span>
          <span style="margin-left: 20px;">✍️ ${post.author}</span>
        </div>
        <div style="margin-bottom: 15px;">
          ${post.tags.map(tag => `<span style="
            background: #a676ff;
            color: white;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 0.8em;
            margin-right: 8px;
          ">${tag}</span>`).join('')}
        </div>
      </header>
      
      <div style="line-height: 1.6;">
        <p style="font-weight: bold; color: #ddd; margin-bottom: 15px;">${post.excerpt}</p>
        <div style="
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          color: #ccc;
        ">${stripHtmlTags(post.content).substring(0, 200)}...</div>
        <div style="margin-top: 15px; color: #a676ff; font-weight: bold;">
          Click for more →
        </div>
      </div>
    </article>
  `).join('');
}

function openPost(postId) {
  console.log('[Navigation] Opening post with ID:', postId);
  window.location.href = `post.html?id=${postId}`;
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}
