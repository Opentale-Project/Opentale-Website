document.addEventListener('DOMContentLoaded', function () {
  const currentPath = window.location.pathname;
  const isSubfolder =
    currentPath.includes('/devlog') ||
    currentPath.includes('/media') ||
    currentPath.includes('/vision') ||
    currentPath.includes('/press-kit');

  const basePath = isSubfolder ? '../' : './';
  const cssPath = `${basePath}css/opentale.css`;
  const jsPath = `${basePath}js/`;

  const fontAwesomeLink = document.createElement('link');
  fontAwesomeLink.rel = 'stylesheet';
  fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css';
  fontAwesomeLink.integrity = 'sha512-...'; // Füge hier den korrekten Integrity-Wert ein
  fontAwesomeLink.crossOrigin = 'anonymous';
  fontAwesomeLink.referrerPolicy = 'no-referrer';
  document.head.appendChild(fontAwesomeLink);
  

  const cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.href = cssPath;
  document.head.appendChild(cssLink);

  let pageTitle = 'OpenTale';
  if (currentPath.includes('/devlog')) {
    pageTitle = 'Development Blog | OpenTale';
  } else if (currentPath.includes('/media')) {
    pageTitle = 'Media | OpenTale';
  } else if (currentPath.includes('/vision')) {
    pageTitle = 'Our Vision | OpenTale';
  } else if (currentPath.includes('/press-kit')) {
    pageTitle = 'Press Kit | OpenTale';
  }
  document.title = pageTitle;

  const animatedBg = document.createElement('div');
  animatedBg.className = 'animated-bg';

  const headerContainer = document.createElement('div');
  headerContainer.id = 'site-header';

  const footerContainer = document.createElement('div');
  footerContainer.id = 'site-footer';

  document.body.prepend(headerContainer);
  document.body.prepend(animatedBg);

  document.body.appendChild(footerContainer);

  function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.onload = callback || function () {};
    script.onerror = function () {
      console.error('FEHLER: Skript konnte nicht geladen werden:', src);
    };
    document.body.appendChild(script);
  }

  loadScript(`${jsPath}header.js`, () => {
    console.log('Header-Skript geladen.');
    loadScript(`${jsPath}footer.js`, () => {
      console.log('Footer-Skript geladen.');
    });
  });
});

function updateBlogPostMeta(post) {
  const postTitle = `${post.title} | OpenTale`;
  const postDescription = post.excerpt;
  const postUrl = window.location.href;

  const imgMatch = post.content.match(/<img[^>]+src=['"]([^'"]+)['"][^>]*>/);
  const postImage = imgMatch ? imgMatch[1] : '../assets/opentale-og-image.jpg';

  document.title = postTitle;

  updateMetaTag('description', postDescription);
  updateMetaTag('og:title', postTitle);
  updateMetaTag('og:description', postDescription);
  updateMetaTag('og:image', postImage);
  updateMetaTag('og:url', postUrl);
  updateMetaTag('twitter:title', postTitle);
  updateMetaTag('twitter:description', postDescription);
  updateMetaTag('twitter:image', postImage);
  updateMetaTag('twitter:url', postUrl);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Organization",
      "name": post.author
    },
    "datePublished": post.date,
    "image": postImage,
    "url": postUrl
  };

  const oldScript = document.querySelector('script[type="application/ld+json"]');
  if (oldScript) oldScript.remove();

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

function updateMetaTag(property, content) {
  let selector = `meta[name="${property}"]`;
  if (property.startsWith('og:') || property.startsWith('twitter:')) {
    selector = `meta[property="${property}"]`;
  }

  let meta = document.querySelector(selector);
  if (meta) {
    meta.setAttribute('content', content);
  } else {
    meta = document.createElement('meta');
    if (property.startsWith('og:') || property.startsWith('twitter:')) {
      meta.setAttribute('property', property);
    } else {
      meta.setAttribute('name', property);
    }
    meta.setAttribute('content', content);
    document.head.appendChild(meta);
  }
}
