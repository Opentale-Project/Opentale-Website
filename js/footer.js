setTimeout(() => {
  const footerContainer = document.getElementById('site-footer');
  if (footerContainer) {
    footerContainer.innerHTML = `
      <footer>
        <div class="footer-content">
          <p>
            &copy; 2025 OpenTale Project. Not affiliated with Hypixel Studios or Hytale.<br>
            Built with ❤️ by the community.
          </p>
          <div class="social-links">
            <a href="https://github.com/Opentale-Project/Opentale" class="social-icon" title="GitHub" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-github"></i>
            </a>
            <a href="https://discord.gg/Auttze5Nhg" class="social-icon" title="Discord" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-discord"></i>
            </a>
            <a href="https://www.youtube.com/@Opentale-game" class="social-icon" title="YouTube" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-youtube"></i>
            </a>
            <a href="https://www.instagram.com/opentale_game/" class="social-icon" title="Instagram" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://x.com/Opentale_game" class="social-icon" title="X (Twitter)" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-x-twitter"></i>
            </a>
            <a href="https://www.reddit.com/r/OpenTale/" class="social-icon" title="Reddit" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-reddit-alien"></i>
            </a>
          </div>
        </div>
      </footer>
    `;
  }
}, 200);
