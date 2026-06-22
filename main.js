// Data Produk
const products = [
  {
    id: 1,
    name: 'Johnnie Walker Blue',
    category: 'Whisky',
    price: 3850000,
    description: 'Edisi terbatas, smooth & berlapis.',
    image: 'img/minuman 1.jpg',
    icon: 'fa-whiskey-glass',
    featured: true
  },
  {
    id: 2,
    name: 'Château Margaux 2015',
    category: 'Wine',
    price: 5200000,
    description: 'Bordeaux Grand Cru, elegan & kompleks.',
    image: 'img/minuman 2.jpg',
    icon: 'fa-wine-glass-alt',
    featured: true
  },
  {
    id: 3,
    name: 'Absolut Elyx',
    category: 'Vodka',
    price: 1250000,
    description: 'Vodka premium dengan tekstur sutra.',
    image: 'img/3.jpg',
    icon: 'fa-flask',
    featured: true
  },
  {
    id: 4,
    name: 'Diplomático Reserva',
    category: 'Rum',
    price: 1890000,
    description: 'Rum Venezuela, manis & berkarakter.',
    image: 'img/minuman 4.jpg',
    icon: 'fa-cocktail',
    featured: true
  },
  {
    id: 5,
    name: 'Dassai 23 Junmai',
    category: 'Sake',
    price: 1450000,
    description: 'Sake ultra-premium, polish 23%.',
    image: 'img/minuman 5.jpg',
    icon: 'fa-wine-bottle',
    featured: true
  },
  {
    id: 6,
    name: 'Hennessy X.O',
    category: 'Brandy',
    price: 4200000,
    description: 'Cognac ikonik, rasa buah & rempah.',
    image: 'img/minuman 6.jpg',
    icon: 'fa-glass-whiskey',
    featured: true
  },
  {
    id: 7,
    name: 'Macallan 18 Sherry',
    category: 'Whisky',
    price: 6750000,
    description: 'Edisi 1998, warna keemasan.',
    image: 'img/minuman 7.jpg',
    icon: 'fa-whiskey-glass',
    featured: false
  },
  {
    id: 8,
    name: 'Penfolds Grange',
    category: 'Wine',
    price: 3200000,
    description: 'Shiraz Australia, ikonik 2012.',
    image: 'img/minuman 8.jpg',
    icon: 'fa-wine-glass-alt',
    featured: false
  },
  {
    id: 9,
    name: 'Zacapa XO',
    category: 'Rum',
    price: 2100000,
    description: 'Rum Guatemala, 6-23 tahun.',
    image: 'img/minuman 9.jpg',
    icon: 'fa-cocktail',
    featured: false
  }
];

// Data Kategori
const categories = [
  { name: 'Whisky', icon: 'fa-whiskey-glass', count: 2 },
  { name: 'Wine', icon: 'fa-wine-glass-alt', count: 2 },
  { name: 'Vodka', icon: 'fa-flask', count: 1 },
  { name: 'Rum', icon: 'fa-cocktail', count: 2 },
  { name: 'Brandy', icon: 'fa-glass-whiskey', count: 1 },
  { name: 'Sake', icon: 'fa-wine-bottle', count: 1 }
];

// Fungsi untuk format Rupiah
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
}

// Fungsi render produk
function renderProducts(productList, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = productList.map(product => `
    <div class="product-card">
      <div class="product-img">
        <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="product-icon-fallback" style="display:none;">
          <i class="fas ${product.icon}"></i>
        </div>
      </div>
      <span class="product-category">${product.category}</span>
      <div class="product-name">${product.name}</div>
      <div class="product-desc">${product.description}</div>
      <div class="product-bottom">
        <span class="price">${formatRupiah(product.price)} <small>/botol</small></span>
        <button class="btn-buy" onclick="addToCart(${product.id})">
          <i class="fas fa-plus-circle"></i> Beli
        </button>
      </div>
    </div>
  `).join('');
}

// Fungsi render kategori
function renderCategories() {
  const container = document.getElementById('category-grid');
  if (!container) return;

  container.innerHTML = categories.map(cat => `
    <div class="category-card" onclick="filterByCategory('${cat.name}')">
      <i class="fas ${cat.icon}"></i>
      <h4>${cat.name}</h4>
      <p>${cat.count} produk</p>
    </div>
  `).join('');
}

// Fungsi filter produk
function filterByCategory(category) {
  const filtered = products.filter(p => p.category === category);
  renderProducts(filtered, 'category-products');
  document.querySelector('.section-title h3').textContent = `Produk ${category}`;
}

// Fungsi filter di menu
function filterProducts() {
  const filter = document.getElementById('filterCategory').value;
  if (filter === 'all') {
    renderProducts(products, 'all-products');
  } else {
    const filtered = products.filter(p => p.category === filter);
    renderProducts(filtered, 'all-products');
  }
}

// Fungsi sort produk
function sortProducts() {
  const sort = document.getElementById('sortBy').value;
  let sorted = [...products];
  
  switch(sort) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      sorted = products;
  }
  
  renderProducts(sorted, 'all-products');
}

// Fungsi untuk get cart dari localStorage
function getCart() {
  const cartJSON = localStorage.getItem('cart');
  return cartJSON ? JSON.parse(cartJSON) : [];
}

// Fungsi untuk save cart ke localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
}

// Fungsi add to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  // Get cart dari localStorage
  let cart = getCart();
  
  // Cek apakah produk sudah ada di cart
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      icon: product.icon,
      quantity: 1
    });
  }
  
  // Save cart
  saveCart(cart);
  alert(`${product.name} berhasil ditambahkan ke keranjang!`);
}

// Fungsi update cart badge
function updateCartBadge() {
  const badge = document.querySelector('.badge');
  if (badge) {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
  }
}

// Fungsi open cart
function openCart() {
  window.location.href = 'cart.html';
}

// Fungsi render cart
function renderCart() {
  const cart = getCart();
  const cartItems = document.getElementById('cart-items');
  
  if (!cartItems) return;
  
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <p>Keranjang belanja Anda kosong</p>
        <a href="menu.html" class="btn-continue">
          <i class="fas fa-arrow-left"></i> Kembali ke Menu
        </a>
      </div>
    `;
    return;
  }
  
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="product-icon-fallback" style="display:none;">
          <i class="fas ${item.icon}"></i>
        </div>
      </div>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${item.category}</p>
        <div class="cart-item-price">${formatRupiah(item.price)} /botol</div>
      </div>
      <div class="cart-item-qty">
        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
        Hapus
      </button>
    </div>
  `).join('');
  
  calculateCart();
}

// Fungsi update quantity
function updateQuantity(productId, newQuantity) {
  if (newQuantity < 1) {
    removeFromCart(productId);
    return;
  }
  
  let cart = getCart();
  const item = cart.find(item => item.id === productId);
  
  if (item) {
    item.quantity = newQuantity;
    saveCart(cart);
    renderCart();
  }
}

// Fungsi remove from cart
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  renderCart();
}

// Fungsi calculate cart
function calculateCart() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  
  const subtotalEl = document.getElementById('subtotal');
  const taxEl = document.getElementById('tax');
  const totalEl = document.getElementById('total');
  
  if (subtotalEl) subtotalEl.textContent = formatRupiah(subtotal);
  if (taxEl) taxEl.textContent = formatRupiah(tax);
  if (totalEl) totalEl.textContent = formatRupiah(total);
}

// Fungsi checkout
function checkout() {
  const cart = getCart();
  
  if (cart.length === 0) {
    alert('Keranjang belanja kosong!');
    return;
  }
  
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (!isLoggedIn) {
    alert('Silakan login terlebih dahulu untuk checkout!');
    window.location.href = 'login.html';
    return;
  }
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  
  const message = `Checkout berhasil!\n\nSubtotal: ${formatRupiah(subtotal)}\nPajak: ${formatRupiah(tax)}\nTotal: ${formatRupiah(total)}\n\nTerima kasih telah berbelanja!`;
  alert(message);
  
  // Clear cart
  localStorage.removeItem('cart');
  updateCartBadge();
  renderCart();
}

// Fungsi login
function loginUser(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  // Simulasi login
  if (email && password) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    alert('Login berhasil! Selamat datang kembali.');
    window.location.href = 'profile&dashboard.html';
  } else {
    alert('Silakan isi email dan password.');
  }
}

// Fungsi register
function registerUser(event) {
  event.preventDefault();
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirm-password').value;
  
  if (password !== confirm) {
    alert('Password tidak cocok!');
    return;
  }
  
  alert('Registrasi berhasil! Silakan login.');
  window.location.href = 'login.html';
}

// Fungsi send message
function sendMessage(event) {
  event.preventDefault();
  alert('Pesan Anda telah terkirim! Kami akan segera merespon.');
  document.getElementById('contactForm').reset();
}

// Fungsi untuk update navbar
function updateNavbar() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const authButtons = document.querySelector('.auth-buttons');
  const cartIcon = document.querySelector('.cart-icon');
  const hamburgerButton = document.getElementById('hamburgerButton');
  const navLinks = document.getElementById('navLinks');

  if (cartIcon) {
    cartIcon.style.display = isLoggedIn ? 'flex' : 'none';
  }
  
  if (!authButtons) return;
  
  if (isLoggedIn) {
    // Hapus tombol login dan register, tampilkan profile dan logout
    authButtons.innerHTML = `
      <a href="profile&dashboard.html" class="btn-profile">
        <i class="fas fa-user-circle"></i> Profile
      </a>
      <a href="#" class="btn-logout" onclick="logoutUser(event)">
        <i class="fas fa-sign-out-alt"></i> Logout
      </a>
    `;
  } else {
    // Tampilkan tombol login dan register
    authButtons.innerHTML = `
      <a href="login.html" class="btn-login"><i class="fas fa-sign-in-alt"></i> Login</a>
      <a href="register.html" class="btn-register"><i class="fas fa-user-plus"></i> Daftar</a>
    `;
  }
}


function toggleMobileMenu() {
  const hamburgerButton = document.getElementById('hamburgerButton');
  const navLinks = document.getElementById('navLinks');
  if (!hamburgerButton || !navLinks) return;

  const isOpen = navLinks.classList.toggle('open');
  hamburgerButton.classList.toggle('active', isOpen);
  hamburgerButton.setAttribute('aria-expanded', String(isOpen));
}

// Fungsi logout
function logoutUser(event) {
  event.preventDefault();
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
  alert('Logout berhasil!');
  window.location.href = 'index.html';
}

// Fungsi untuk halaman kategori - render all products
function renderCategoryProducts() {
  const container = document.getElementById('category-products');
  if (container) {
    renderProducts(products, 'category-products');
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Update navbar
  updateNavbar();
  
  // Update cart badge
  updateCartBadge();
  
  // Add click event ke cart icon
  const cartIcon = document.querySelector('.cart-icon');
  if (cartIcon) {
    cartIcon.addEventListener('click', openCart);
  }
  const hamburgerButton = document.getElementById('hamburgerButton');
  if (hamburgerButton) {
    hamburgerButton.addEventListener('click', toggleMobileMenu);
  }
  
  // Render featured products di index
  const featured = products.filter(p => p.featured === true);
  renderProducts(featured, 'featured-products');
  
  // Render categories
  renderCategories();
  
  // Render all products di menu
  renderProducts(products, 'all-products');
  
  // Render category products
  renderCategoryProducts();
  
  // Handle active navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
  document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('navLinks');
    const hamburgerButton = document.getElementById('hamburgerButton');
    if (!navLinks || !hamburgerButton) return;
    if (!navLinks.classList.contains('open')) return;
    if (hamburgerButton.contains(event.target)) return;
    if (navLinks.contains(event.target)) return;
    navLinks.classList.remove('open');
    hamburgerButton.classList.remove('active');
    hamburgerButton.setAttribute('aria-expanded', 'false');
  });
});

// Ekspor fungsi untuk digunakan di HTML
window.addToCart = addToCart;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.registerUser = registerUser;
window.sendMessage = sendMessage;
window.filterByCategory = filterByCategory;
window.filterProducts = filterProducts;
window.sortProducts = sortProducts;
window.updateNavbar = updateNavbar;
window.openCart = openCart;
window.renderCart = renderCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.calculateCart = calculateCart;
window.checkout = checkout;