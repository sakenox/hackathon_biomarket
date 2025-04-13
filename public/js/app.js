const setupLoginForm = () => {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value
    };

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok) {
        window.location.href = data.user.type === 'farmer' ? '/dashboard.html' : '/';
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  });
};


// Handle registration (similar structure)


//lot
// Common function to check login status
const checkAuth = async () => {
  try {
    const response = await fetch('/api/auth/me', { credentials: 'include' });
    if (response.ok) {
      const user = await response.json();
      return user;
    }
    return null;
  } catch (err) {
    console.error('Auth check failed:', err);
    return null;
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  const authUser = await checkAuth();

  const authButtons = document.getElementById('auth-buttons');
  const userInfo = document.getElementById('user-info');
  if (authUser) {
    // Logged in
    if (authButtons) authButtons.classList.add('d-none');
    if (userInfo) userInfo.classList.remove('d-none');
  } else {
    // Not logged in
    if (authButtons) authButtons.classList.remove('d-none');
    if (userInfo) userInfo.classList.add('d-none');
  }
});


// Update UI based on login status
const updateAuthUI = async () => {
  const authButtons = document.getElementById('authButtons');
  const userInfo = document.getElementById('userInfo');
  const user = await checkAuth();

  if (user) {
    authButtons.classList.add('d-none');
    userInfo.classList.remove('d-none');
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userRole').textContent = user.type;
  } else {
    authButtons.classList.remove('d-none');
    userInfo.classList.add('d-none');
  }
};

// Load products and check auth on homepage
const loadProducts = async () => {
  try {
    const response = await fetch('/api/products/');
    const products = await response.json();
    console.log(products)
    const productsDiv = document.getElementById('products');
    if (productsDiv) {
      productsDiv.innerHTML = products.map(product => `
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.description || ''}</p>
              <div class="d-flex justify-content-between">
                <span>$${product.price}/${product.unit}</span>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error('Error loading products:', err);
  }
};

// Handle logout
const setupLogout = () => {
  document.addEventListener('click', async (e) => {
    if (e.target.id === 'logoutButton') {
      e.preventDefault();
      try {
        await fetch('/api/auth/logout', { 
          method: 'POST',
          credentials: 'include'
        });
        window.location.href = '/';
      } catch (err) {
        console.error('Logout failed:', err);
      }
    }
  });
};


const setupAccountTypeToggle = () => {
  const typeField = document.querySelector('[name="type"]');
  const citySelect = document.getElementById('citySelect');
  const cityWrapper = document.getElementById('farmerCity');

  if (!typeField || !citySelect || !cityWrapper) return;

  const updateCityField = (isFarmer) => {
    cityWrapper.classList.toggle('d-none', !isFarmer);
    if (isFarmer) {
      citySelect.removeAttribute('disabled');
      citySelect.setAttribute('required', '');
    } else {
      citySelect.setAttribute('disabled', '');
      citySelect.removeAttribute('required');
      citySelect.value = '';
    }
  };

  // Set initial state
  updateCityField(typeField.value === 'farmer');
  
  // Add change listener
  typeField.addEventListener('change', (e) => {
    updateCityField(e.target.value === 'farmer');
  });
};

document.addEventListener('change', (e) => {
  if (e.target && e.target.name === 'type') {
    setupAccountTypeToggle();
  }
});


// Handle registration
const setupSignupForm = () => {
  const signupForm = document.getElementById('signupForm');
  if (!signupForm) return;

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      fullName: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      type: e.target.type.value,
    };

    if (formData.type === 'farmer') {
      formData.city = document.getElementById('citySelect').value;
    }
  
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Registration successful! Please login.');
        window.location.href = '/login.html';
      } else {
        const error = await response.json();
        alert(error.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('Network error');
    }
  });
};

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  setupLoginForm();
  setupSignupForm();
  setupAccountTypeToggle();
  setupLogout();
});
