document.getElementById("site-header").innerHTML = `
  <header class="header">
    <div class="header-container">
<a href="/" class="logo" style="cursor: pointer;">OpenTale</a>
      
      <nav class="nav" id="main-nav">
        <ul>
          <li><a href="/devlog" id="nav-devlog">Devlog</a></li>
          <li><a href="/vision" id="nav-vision">Vision</a></li>
          <!-- <li><a href="/media" id="nav-media">Media</a></li> -->
          <li><a href="/press-kit" id="nav-press-kit">Press-Kit</a></li>
          <li><a href="https://github.com/Opentale-Project/Opentale" class="btn-nav" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://discord.gg/9cxjhbfp24" class="btn-nav" target="_blank" rel="noopener noreferrer">Discord</a></li>
        </ul>
      </nav>
      
      <button class="hamburger" id="hamburger-menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
`;

setTimeout(() => {
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', () => {
      window.location.href = '/';
    });
    logo.style.cursor = 'pointer';
  }
  
  const currentPath = window.location.pathname;
  const navLinks = {
    'devlog': document.getElementById('nav-devlog'),
    'vision': document.getElementById('nav-vision'), 
    'media': document.getElementById('nav-media'),
    'press-kit': document.getElementById('nav-press-kit')
  };
  
  Object.values(navLinks).forEach(link => {
    if (link) link.classList.remove('active');
  });
  
  if (currentPath.includes('/devlog') && navLinks.devlog) {
    navLinks.devlog.classList.add('active');
  } else if (currentPath.includes('/vision') && navLinks.vision) {
    navLinks.vision.classList.add('active');
  } else if (currentPath.includes('/media') && navLinks.media) {
    navLinks.media.classList.add('active');
  } else if (currentPath.includes('/press-kit') && navLinks['press-kit']) {
    navLinks['press-kit'].classList.add('active');
  }
  
  const hamburger = document.getElementById('hamburger-menu');
  const nav = document.getElementById('main-nav');
  
  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });
    
    // Schließe Menü beim Klick auf Links
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }
}, 100);