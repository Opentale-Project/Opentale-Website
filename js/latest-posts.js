document.addEventListener('DOMContentLoaded', function() {
  loadLatestPosts();
});

async function loadLatestPosts() {
  const loading = document.getElementById('loading-posts');
  const postsGrid = document.getElementById('posts-grid');

  try {
    const response = await fetch('devlog/data/devlog.json');
    if (!response.ok) throw new Error('Failed to load posts');

    const data = await response.json();
    const latestPosts = data.posts
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

    loading.style.display = 'none';
    postsGrid.style.display = 'grid';

    postsGrid.innerHTML = latestPosts.map(post => `
      <article style="
        background: rgba(255, 255, 255, 0.05);
        border: 2px solid #4e2b8d;
        border-radius: 15px;
        padding: 25px;
        transition: transform 0.3s, box-shadow 0.3s;
        cursor: pointer;
      " onclick="openPost(${post.id})">
        <header style="margin-bottom: 15px;">
          <h3 style="color: #c79bff; margin: 0 0 10px 0; font-size: 1.4em;">${post.title}</h3>
          <div style="color: #aaa; font-size: 0.9em; margin-bottom: 15px;">
            <span>${formatDateSimple(post.date)}</span>
          </div>
        </header>
        
        <div style="line-height: 1.6;">
          <p style="font-weight: bold; color: #ddd; margin-bottom: 15px;">${post.excerpt}</p>
          <div style="
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            color: #ccc;
          ">${stripHtmlTags(post.content).substring(0, 150)}...</div>
          <div style="margin-top: 15px; color: #a676ff; font-weight: bold;">
            Read more →
          </div>
        </div>
      </article>
    `).join('');

    const articles = postsGrid.querySelectorAll('article');
    articles.forEach(article => {
      article.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 30px rgba(167, 118, 255, 0.3)';
      });
      
      article.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
      });
    });

  } catch (err) {
    console.error('Failed to load latest posts:', err);
    loading.innerHTML = '<p style="color: #aaa;">Unable to load latest updates.</p>';
  }
}

function stripHtmlTags(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || '';
}

function formatDateSimple(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function openPost(postId) {
  window.location.href = `devlog/post.html?id=${postId}`;
}
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}
