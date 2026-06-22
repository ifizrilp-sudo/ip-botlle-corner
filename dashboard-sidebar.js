document.addEventListener('DOMContentLoaded', function() {
  const dashboardNavLinks = document.querySelectorAll('.dashboard-nav a');
  const dashboardMain = document.querySelector('.dashboard-main');

  if (!dashboardNavLinks.length || !dashboardMain) return;

  function clearActive() {
    dashboardNavLinks.forEach(link => link.classList.remove('active'));
  }

  function showSection(section) {
    const sections = {
      dashboard: `
        <h2><i class="fas fa-tachometer-alt"></i> Dashboard</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <i class="fas fa-shopping-bag"></i>
            <div>
              <h3>12</h3>
              <p>Total Pesanan</p>
            </div>
          </div>
          <div class="stat-card">
            <i class="fas fa-credit-card"></i>
            <div>
              <h3>Rp 3.450.000</h3>
              <p>Total Belanja</p>
            </div>
          </div>
          <div class="stat-card">
            <i class="fas fa-truck"></i>
            <div>
              <h3>3</h3>
              <p>Dalam Pengiriman</p>
            </div>
          </div>
          <div class="stat-card">
            <i class="fas fa-star"></i>
            <div>
              <h3>4.8</h3>
              <p>Rating</p>
            </div>
          </div>
        </div>
        <div class="dashboard-section">
          <h3>Pesanan Terbaru</h3>
          <div class="order-list">
            <div class="order-item">
              <img src="https://via.placeholder.com/60" alt="Product">
              <div>
                <h4>Johnnie Walker Blue</h4>
                <p>Status: <span class="status-shipped">Dikirim</span></p>
                <p>Harga: Rp 3.850.000</p>
              </div>
              <span class="order-date">12 Jun 2026</span>
            </div>
            <div class="order-item">
              <img src="https://via.placeholder.com/60" alt="Product">
              <div>
                <h4>Château Margaux 2015</h4>
                <p>Status: <span class="status-processing">Diproses</span></p>
                <p>Harga: Rp 5.200.000</p>
              </div>
              <span class="order-date">10 Jun 2026</span>
            </div>
            <div class="order-item">
              <img src="https://via.placeholder.com/60" alt="Product">
              <div>
                <h4>Absolut Elyx</h4>
                <p>Status: <span class="status-delivered">Selesai</span></p>
                <p>Harga: Rp 1.250.000</p>
              </div>
              <span class="order-date">8 Jun 2026</span>
            </div>
          </div>
        </div>
      `,
      orders: `
        <h2><i class="fas fa-shopping-bag"></i> Pesanan Saya</h2>
        <div class="dashboard-section">
          <p>Berikut daftar pesanan Anda.</p>
          <div class="order-list">
            <div class="order-item">
              <img src="https://via.placeholder.com/60" alt="Product">
              <div>
                <h4>Château Margaux 2015</h4>
                <p>Status: <span class="status-processing">Diproses</span></p>
                <p>Harga: Rp 5.200.000</p>
              </div>
              <span class="order-date">10 Jun 2026</span>
            </div>
            <div class="order-item">
              <img src="https://via.placeholder.com/60" alt="Product">
              <div>
                <h4>Johnnie Walker Blue</h4>
                <p>Status: <span class="status-shipped">Dikirim</span></p>
                <p>Harga: Rp 3.850.000</p>
              </div>
              <span class="order-date">12 Jun 2026</span>
            </div>
          </div>
        </div>
      `,
      wishlist: `
        <h2><i class="fas fa-heart"></i> Wishlist</h2>
        <div class="dashboard-section">
          <p>Produk favorit Anda yang disimpan untuk nanti.</p>
          <div class="order-list">
            <div class="order-item">
              <img src="https://via.placeholder.com/60" alt="Product">
              <div>
                <h4>Château Margaux 2015</h4>
                <p>Harga: Rp 5.200.000</p>
              </div>
            </div>
            <div class="order-item">
              <img src="https://via.placeholder.com/60" alt="Product">
              <div>
                <h4>Absolut Elyx</h4>
                <p>Harga: Rp 1.250.000</p>
              </div>
            </div>
          </div>
        </div>
      `,
      profile: `
        <h2><i class="fas fa-edit"></i> Edit Profile</h2>
        <div class="dashboard-section">
          <form class="profile-form">
            <label>Nama Lengkap</label>
            <input type="text" value="John Doe" />
            <label>Email</label>
            <input type="email" value="john.doe@email.com" />
            <label>Telepon</label>
            <input type="text" value="+62 812 3456 7890" />
            <button type="button" class="btn-action">Simpan Perubahan</button>
          </form>
        </div>
      `,
      settings: `
        <h2><i class="fas fa-cog"></i> Pengaturan</h2>
        <div class="dashboard-section">
          <p>Atur preferensi akun dan notifikasi Anda.</p>
          <div class="settings-list">
            <div class="setting-item">
              <h4>Notifikasi Email</h4>
              <p>Menerima email promo dan update.</p>
            </div>
            <div class="setting-item">
              <h4>Privasi Akun</h4>
              <p>Kelola data pribadi dan riwayat belanja Anda.</p>
            </div>
          </div>
        </div>
      `
    };

    dashboardMain.innerHTML = sections[section] || sections.dashboard;
  }

  dashboardNavLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      clearActive();

      const text = link.textContent.trim();
      if (text.includes('Pesanan Saya')) {
        link.classList.add('active');
        showSection('orders');
      } else if (text.includes('Wishlist')) {
        link.classList.add('active');
        showSection('wishlist');
      } else if (text.includes('Edit Profile')) {
        link.classList.add('active');
        showSection('profile');
      } else if (text.includes('Pengaturan')) {
        link.classList.add('active');
        showSection('settings');
      } else {
        link.classList.add('active');
        showSection('dashboard');
      }
    });
  });
});
