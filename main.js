// main.js - کۆدی جاڤاسکریپت بۆ ناوبەر، مۆدال و گەڕان

// 📌 گەڕانی ناوبەر - فیلترینگی بەرهەمەکان
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const productsContainer = document.getElementById('productsContainer');

  if (searchInput && productsContainer) {
    searchInput.addEventListener('input', () => {
      const filter = searchInput.value.toLowerCase();
      const productCards = productsContainer.querySelectorAll('.product-card');

      productCards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        if (title.includes(filter)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
});

// 📌 فلتەرەکان - جۆر و ناوچە (لەلایەن products.html کار دەکات)
function filterProducts() {
  const typeSelect = document.getElementById('filterType');
  const locationSelect = document.getElementById('filterLocation');
  const searchInput = document.getElementById('searchInput');
  const products = document.querySelectorAll('.product-card');

  const selectedType = typeSelect.value.toLowerCase();
  const selectedLocation = locationSelect.value.toLowerCase();
  const searchText = searchInput.value.toLowerCase();

  products.forEach(product => {
    const productType = product.getAttribute('data-type').toLowerCase();
    const productLocation = product.getAttribute('data-location').toLowerCase();
    const productName = product.querySelector('h4').textContent.toLowerCase();

    const typeMatch = selectedType === 'all' || productType === selectedType;
    const locationMatch = selectedLocation === 'all' || productLocation === selectedLocation;
    const searchMatch = productName.includes(searchText);

    if (typeMatch && locationMatch && searchMatch) {
      product.style.display = '';
    } else {
      product.style.display = 'none';
    }
  });
}

// 📌 هەموو فلتەرەکان بۆ ئەوەی کە هەر کاتێک گۆڕانکاری بکەیت جێبەجێ بکە
document.addEventListener('DOMContentLoaded', () => {
  const typeSelect = document.getElementById('filterType');
  const locationSelect = document.getElementById('filterLocation');
  const searchInput = document.getElementById('searchInput');

  if (typeSelect) typeSelect.addEventListener('change', filterProducts);
  if (locationSelect) locationSelect.addEventListener('change', filterProducts);
  if (searchInput) searchInput.addEventListener('input', filterProducts);
});

// 📌 popup - مۆدالەکانی چوونەژوورەوە و تۆماربوون
function closeModal() {
  document.getElementById('loginModal').style.display = 'none';
  document.getElementById('registerModal').style.display = 'none';
}

function showRegister() {
  document.getElementById('loginModal').style.display = 'none';
  document.getElementById('registerModal').style.display = 'block';
}

function showLogin() {
  document.getElementById('registerModal').style.display = 'none';
  document.getElementById('loginModal').style.display = 'block';
}

// بۆ کەرەستەکردنی modal لە login.html
document.addEventListener('DOMContentLoaded', () => {
  const loginModal = document.getElementById('loginModal');
  if (loginModal) {
    loginModal.style.display = 'block';
  }
});

// 📌 Swiper - سلايدەر بۆ ناوەڕۆکی سلايدی
const swiper = new Swiper('.swiper', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false
  }
});

// 🛒 فەرمی زیادکردن بۆ cart
function addToCart(product) {
  // دابەزاندنی cart لە localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // پشکنین ئەگەر بەرهەمەکە هەیە
  let existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({...product, qty: 1});
  }

  // نوێکردنەوەی localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // نوێکردنەوەی ژمارەی cart
  updateCartCount();
}



