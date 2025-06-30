
// cart.js - بەڕێوەبردنی سەبەتەی کڕین
// 🔹 گرتنی سەبەتەی کڕین لە localStorage (ئەگەر نییە، داتاکان خاڵە)
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}
// 🔹 ناردنی سەبەتەی نوێ بۆ localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
// 🔹 زیادکردنی بەرهەم بۆ سەبەتە
function addToCart(product) {
  const cart = getCart();
  // پشکنینی ئەگەر ئەم بەرهەمە هەیە لە سەبەتە، ژمارە زیاد بکە
  const existingProduct = cart.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  saveCart(cart);
  renderCart();
}
// 🔹 ڕەشکردنی (لابردن) بەرهەم لە سەبەتە
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  renderCart();
}
// 🔹 نمایش داتاکانی سەبەتە لە خشتەکە
function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  if (!cartItemsContainer || !cartTotalEl) return;
  const cart = getCart();
  // پاککردنی خشتە
  cartItemsContainer.innerHTML = '';
  // گەڕاندنەوەی هەموو بەرهەمەکان بۆ خشتە
  let total = 0;
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img src="${item.image}" alt="${item.name}" width="70"></td>
      <td>${item.name}</td>
      <td>${item.price} دینار</td>
      <td>${item.quantity}</td>
      <td><button class="remove-btn" data-id="${item.id}">ڕەشکردن</button></td>
    `;
    cartItemsContainer.appendChild(tr);
  });
  // نیشاندانی کۆی گشتی
  cartTotalEl.textContent = total + ' دینار';
  // زیادکردنی ئەو دوگمەی ڕەشکردنە بە event listener
  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      removeFromCart(id);
    });
  });
}
// 🔹 بەرزکردنەوەی ئەوەی کاتێک ماڵپەرەکە بارکرا، سەبەتەی کڕین پیشان بدات
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});