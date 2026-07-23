
// Select all gallery items
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

// Keep track of current item for navigation
let currentIndex = 0;

// Add click event to each gallery item
galleryItems.forEach((item, index) => {
  item.setAttribute('data-index', index); // ensure data-index is set
  item.addEventListener('click', () => {
    currentIndex = index; // Set current index
    showModal(item);
  });
});

// Function to show modal with selected item data
function showModal(item) {
  const imageSrc = item.getAttribute('data-image') || item.getAttribute('data-large');
  const title = item.getAttribute('data-title');
  const text = item.getAttribute('data-text');

  document.getElementById('modalImage').src = imageSrc;
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalDescription').innerText = text;

  document.getElementById('galleryModal').style.display = 'flex'; // Show modal

  // Highlight the thumbnail
  highlightThumbnail(currentIndex);
}

// Function to close modal
function closeGallery() {
  document.getElementById('galleryModal').style.display = 'none';
  // Optionally, remove highlight
  document.querySelectorAll('.modal-thumbnail').forEach(thumb => thumb.classList.remove('active-thumbnail'));
}

// Function for next/prev navigation
function changeImage(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = galleryItems.length - 1;
  if (currentIndex >= galleryItems.length) currentIndex = 0;

  // Update modal with new item
  showModal(galleryItems[currentIndex]);
}

// Thumbnail gallery functionality
const thumbnails = document.querySelectorAll('.modal-thumbnail');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');

// When clicking a thumbnail
thumbnails.forEach((thumb, index) => {
  thumb.setAttribute('data-index', index); // ensure data-index is set
  thumb.addEventListener('click', () => {
    currentIndex = index;
    // Update modal content
    showModal(galleryItems[index]);
  });
});

// When clicking the modal image, sync back to thumbnail
modalImage.addEventListener('click', () => {
  highlightThumbnail(currentIndex);
});

// Function to highlight the active thumbnail
function highlightThumbnail(index) {
  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle('active-thumbnail', i === index);
  });
}

// Close button event (adjust selector if needed)
const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', () => {
  closeGallery();
});

// Select the main product element
const mainProduct = document.querySelector('.gallery-item'); // Assuming the main product has this class or use specific ID if needed

mainProduct.addEventListener('click', () => {
  // Call showModal with this element
  showModal(mainProduct);
});

//for thumbnail gallery sliding effect
const galleryContainer = document.getElementById('galleryContainer');
const thumbnailGallery = document.getElementById('thumbnailGallery');

let slideInterval = null;
let slideDirection = 0;

galleryContainer.addEventListener('mouseenter', () => {
  // Start sliding on mouse move
  galleryContainer.addEventListener('mousemove', handleMouseMove);
});

galleryContainer.addEventListener('mouseleave', () => {
  // Stop sliding when mouse leaves
  galleryContainer.removeEventListener('mousemove', handleMouseMove);
  clearInterval(slideInterval);
  // Reset position
  thumbnailGallery.style.transform = 'translateX(0)';
});

function handleMouseMove(e) {
  const rect = galleryContainer.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;

  if (mouseX < rect.width / 2) {
    // Hovering on left side: slide right
    slideDirection = 1;
  } else {
    // Hovering on right side: slide left
    slideDirection = -1;
  }

  if (slideInterval) clearInterval(slideInterval);

  slideInterval = setInterval(() => {
    // Get current transform value
    const styleTransform = thumbnailGallery.style.transform;
    let currentTranslateX = 0;
    if (styleTransform) {
      const match = styleTransform.match(/translateX\((-?\d+\.?\d*)px\)/);
      if (match) currentTranslateX = parseFloat(match[1]);
    }

    // Calculate new position
    const newTranslateX = currentTranslateX + slideDirection * 30; // Adjust speed here

    // Optional: limit slide to prevent overscroll
    const maxTranslate = 0;
    const minTranslate = -(thumbnailGallery.scrollWidth - galleryContainer.clientWidth);
    if (newTranslateX <= minTranslate) {
      thumbnailGallery.style.transform = `translateX(${minTranslate}px)`;
    } else if (newTranslateX >= maxTranslate) {
      thumbnailGallery.style.transform = `translateX(0px)`;
    } else {
      thumbnailGallery.style.transform = `translateX(${newTranslateX}px)`;
    }
  }, 20); // Adjust interval for smoothness
}
