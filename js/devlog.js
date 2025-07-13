document.addEventListener('DOMContentLoaded', function() {
  loadDevlogPosts();
});

async function loadDevlogPosts() {
  const loading = document.getElementById('loading');
  const blogPosts = document.getElementById('blog-posts');
  const error = document.getElementById('error');
  
  try {
    const response = await fetch('./data/devlog.json');
    if (!response.ok) throw new Error('Failed to load posts');
    
    const data = await response.json();
    const posts = data.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    loading.style.display = 'none';
    blogPosts.style.display = 'block';
    
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
          <p style="
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            color: #ccc;
          ">${post.content}</p>
          <div style="margin-top: 15px; color: #a676ff; font-weight: bold;">
            Click for more →
          </div>
        </div>
      </article>
    `).join('');
    
  } catch (err) {
    console.error('Error loading devlog posts:', err);
    loading.style.display = 'none';
    error.style.display = 'block';
  }
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function openPost(postId) {
  window.location.href = `../devlog/post.html?id=${postId}`;
}
