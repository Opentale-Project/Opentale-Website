document.addEventListener('DOMContentLoaded', function() {
  loadSinglePost();
});

async function loadSinglePost() {
  const loading = document.getElementById('loading');
  const postDetails = document.getElementById('post-details');
  const error = document.getElementById('error');
  
  // Get post ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get('id'));
  
  if (!postId) {
    loading.style.display = 'none';
    error.style.display = 'block';
    return;
  }
  
  try {
    const response = await fetch('data/devlog.json');
    if (!response.ok) throw new Error('Failed to load posts');
    
    const data = await response.json();
    const post = data.posts.find(p => p.id === postId);
    
    if (!post) {
      throw new Error('Post not found');
    }
    
    if (typeof updateBlogPostMeta === 'function') {
      updateBlogPostMeta(post);
    }
    
    loading.style.display = 'none';
    postDetails.style.display = 'block';
    
    postDetails.innerHTML = `
      <article style="
        background: transparent;
        border: 2px solid #4e2b8d;
        border-radius: 15px;
        padding: 40px;
        margin-bottom: 30px;
        word-wrap: break-word;
        overflow-wrap: break-word;
        max-width: 100%;
        box-sizing: border-box;
      ">
        <header style="margin-bottom: 30px; border-bottom: 2px solid #4e2b8d; padding-bottom: 20px;">
          <h1 style="color: #c79bff; margin: 0 0 15px 0; font-size: 2.5em; word-wrap: break-word;">${post.title}</h1>
          <div style="color: #aaa; font-size: 1em; margin-bottom: 15px;">
            <span>📅 ${formatDate(post.date)}</span>
            <span style="margin-left: 30px;">✍️ ${post.author}</span>
          </div>
          <div style="margin-bottom: 15px;">
            ${post.tags.map(tag => `<span style="
              background: #a676ff;
              color: white;
              padding: 5px 12px;
              border-radius: 15px;
              font-size: 0.9em;
              margin-right: 10px;
            ">${tag}</span>`).join('')}
          </div>
        </header>
        
        <div style="
          line-height: 1.8; 
          font-size: 1.1em;
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        ">
          <p style="
            font-weight: bold; 
            color: #ddd; 
            margin-bottom: 25px; 
            font-size: 1.2em;
            word-wrap: break-word;
          ">${post.excerpt}</p>
          <div style="
            color: #eee;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
          ">${post.content.replace(/\n/g, '<br>')}</div>
        </div>
        
        <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #4e2b8d;">
          <a href="index.html" style="
            background: #a676ff;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            transition: background 0.3s;
          " onmouseover="this.style.background='#c79bff'" onmouseout="this.style.background='#a676ff'">
            ← Back to Overview
          </a>
        </footer>
      </article>
    `;
    
  } catch (err) {
    console.error('Error loading post:', err);
    loading.style.display = 'none';
    error.style.display = 'block';
  }
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}
