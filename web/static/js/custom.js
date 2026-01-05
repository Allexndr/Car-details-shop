/* 
   PREMIUM AUTOPARTS INTERACTIVE LOGIC 2026 
   - Mock Cart System
   - Theme Management
   - Animations & UX Enhancements
*/

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50
    });
  }

  // 2. Theme Management
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;

  // Check saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlEl.setAttribute('data-bs-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-bs-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      htmlEl.setAttribute('data-bs-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);

      // Visual feedback
      themeToggle.classList.add('animate__animated', 'animate__rotateIn');
      setTimeout(() => themeToggle.classList.remove('animate__animated', 'animate__rotateIn'), 500);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
  }

  // 3. Mock Cart System
  let cart = JSON.parse(localStorage.getItem('autoparts_cart') || '[]');
  updateCartUI();

  const addToCartBtns = document.querySelectorAll('.add-to-cart-dummy');
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price),
        img: btn.dataset.img || '',
        quantity: 1
      };

      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push(product);
      }

      saveCart();
      updateCartUI();
      showCartFeedback(btn);
    });
  });

  function saveCart() {
    localStorage.setItem('autoparts_cart', JSON.stringify(cart));
  }

  function updateCartUI() {
    const badges = document.querySelectorAll('.cart-badge');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalContainer = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    badges.forEach(b => b.textContent = totalItems);

    if (cartItemsContainer) {
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
                    <div class="text-center py-5 text-muted">
                        <i class="fa-solid fa-basket-shopping fs-1 mb-3 opacity-20"></i>
                        <p>Корзина пока пуста</p>
                    </div>
                `;
        if (checkoutBtn) checkoutBtn.disabled = true;
      } else {
        cartItemsContainer.innerHTML = cart.map(item => `
                    <div class="d-flex align-items-center gap-3 p-3 rounded-4 bg-light-subtle border border-white-10">
                        <img src="${item.img || '/static/img/no-image.png'}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 12px;">
                        <div class="flex-grow-1">
                            <h6 class="fw-bold mb-0 text-truncate" style="max-width: 150px;">${item.name}</h6>
                            <p class="small text-muted mb-0">${item.quantity} x ${item.price} $</p>
                        </div>
                        <button class="btn btn-sm btn-outline-danger border-0 rounded-circle remove-item" data-id="${item.id}">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                `).join('');
        if (checkoutBtn) checkoutBtn.disabled = false;

        // Add remove listeners
        document.querySelectorAll('.remove-item').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            cart = cart.filter(item => item.id !== id);
            saveCart();
            updateCartUI();
          });
        });
      }
    }

    if (cartTotalContainer) {
      cartTotalContainer.textContent = `${totalPrice.toFixed(2)} $`;
    }
  }

  function showCartFeedback(btn) {
    const originalHtml = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Добавлено';
    btn.classList.add('btn-success');
    btn.classList.remove('btn-premium');

    setTimeout(() => {
      btn.innerHTML = originalHtml;
      btn.classList.remove('btn-success');
      btn.classList.add('btn-premium');
    }, 1500);

    // Shake cart icon
    const cartIcons = document.querySelectorAll('.cart-trigger');
    cartIcons.forEach(icon => {
      icon.classList.add('animate__animated', 'animate__headShake');
      setTimeout(() => icon.classList.remove('animate__animated', 'animate__headShake'), 500);
    });
  }

  // 4. Cart Modal Trigger
  const cartToggles = [document.getElementById('cartToggle'), document.getElementById('cartToggleMobile')];
  const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));

  cartToggles.forEach(t => {
    if (t) {
      t.addEventListener('click', () => cartModal.show());
    }
  });

  // 5. Mock Notifications
  const notifyBtn = document.getElementById('notifyBtn');
  if (notifyBtn) {
    notifyBtn.addEventListener('click', () => {
      alert('📢 Ваши уведомления:\n1. Заказ №4829 принят в обработку\n2. Скидка -15% на раздел Двигатели!');
      const badge = notifyBtn.querySelector('.notification-badge');
      if (badge) badge.style.display = 'none';
    });
  }

  // 6. Navbar Scroll Effect
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.glass-nav');
    if (window.scrollY > 50) {
      nav.classList.add('shadow-lg', 'py-2');
      nav.style.background = 'var(--card-bg)';
    } else {
      nav.classList.remove('shadow-lg', 'py-2');
      nav.style.background = 'transparent';
    }
  });

  // 7. Checkout (Mock)
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      alert('🎉 Ваш заказ успешно имитирован! В реальной системе здесь был бы переход к оплате.');
      cart = [];
      saveCart();
      updateCartUI();
      cartModal.hide();
    });
  }
});
