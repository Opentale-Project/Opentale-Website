let currentGallery = null;
let currentImageIndex = 0;
let galleryData = {};

async function ensureGalleryData() {
  if (Object.keys(galleryData).length === 0) {
    try {
      const response = await fetch('data/gallery.json');
      if (response.ok) {
        galleryData = await response.json();
      } else {
        console.warn('Gallery data not found');
      }
    } catch (error) {
      console.error('Error loading gallery data:', error);
    }
  }
}

window.openGallery = openGallery;
window.closeGallery = closeGallery;
window.nextImage = nextImage;
window.previousImage = previousImage;
window.scrollGallery = scrollGallery;

function openGallery(index, type) {
  currentGallery = type;
  currentImageIndex = index;
  
  const modal = document.getElementById('galleryModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalCounter = document.getElementById('modalCounter');
  
  const images = galleryData[type] || [];
  
  if (images.length === 0) {
    console.warn('No images found for gallery type:', type);
    return;
  }
  
  const currentImage = images[index];
  
  modalImage.src = currentImage.src;
  modalImage.alt = currentImage.title;
  modalTitle.textContent = currentImage.title;
  modalDescription.textContent = currentImage.description;
  modalCounter.textContent = `${index + 1} / ${images.length}`;
  
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeGallery() {
  const modal = document.getElementById('galleryModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

function nextImage() {
  if (!currentGallery) return;
  
  const images = galleryData[currentGallery] || [];
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateModalContent();
}

function previousImage() {
  if (!currentGallery) return;
  
  const images = galleryData[currentGallery] || [];
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateModalContent();
}

function updateModalContent() {
  const images = galleryData[currentGallery] || [];
  const currentImage = images[currentImageIndex];
  
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalCounter = document.getElementById('modalCounter');
  
  modalImage.src = currentImage.src;
  modalImage.alt = currentImage.title;
  modalTitle.textContent = currentImage.title;
  modalDescription.textContent = currentImage.description;
  modalCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
}

function scrollGallery(type, amount) {
  const gallery = document.getElementById(type + '-gallery');
  if (gallery) {
    gallery.scrollBy({
      left: amount,
      behavior: 'smooth'
    });
  }
}

document.addEventListener('keydown', function(e) {
  const modal = document.getElementById('galleryModal');
  if (modal && modal.style.display === 'block') {
    switch(e.key) {
      case 'Escape':
        closeGallery();
        break;
      case 'ArrowLeft':
        previousImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
    }
  }
});

// Click outside modal to close
document.addEventListener('click', function(e) {
  const modal = document.getElementById('galleryModal');
  if (e.target === modal) {
    closeGallery();
  }
});