// Import components
import { getFooter } from './components/footer.js';
import { getShopHero } from './pages/hero.js';
import { getNavbar } from './components/navbar.js';
import { getShopHome } from './pages/shop.js';
import { getProductDetail } from './pages/product.js';
import { getSignupForm } from './components/signupForm.js';
import { getLoginForm } from './components/loginForm.js';
import { sortProducts } from './utils/sort.js';

// Data configuration
const APP_DATA = {
  categories: [
    { title: 'Fresh Fruit', image: 'fruit.png' },
    { title: 'Fresh Vegetables', image: 'vegetables.png' },
    { title: 'Meat & Fish', image: 'meat.png' },
    { title: 'Bakery', image: 'bakery.png' },
    { title: 'Dairy Products', image: 'dairy.png' },
    { title: 'Beverages', image: 'beverages.png' }
  ],
  
  products: [
    { 
      title: 'Green Apple', 
      image: 'apple.png', 
      price: 14.99, 
      originalPrice: 20.00, 
      rating: 5, 
      isOnSale: true, 
      createdAt: '2024-02-01'
    },
    { 
      title: 'Chinese Cabbage', 
      image: 'cabbage.png', 
      price: 12.00, 
      rating: 4, 
      createdAt: '2024-01-15'
    },
    { 
      title: 'Orange', 
      image: 'orange.png', 
      price: 10.00, 
      originalPrice: 14.99,
      rating: 3, 
      isOnSale: true, 
      createdAt: '2024-03-12'
    },
    { 
      title: 'Green Lettuce', 
      image: 'lettuce.png', 
      price: 8.99, 
      rating: 4, 
      createdAt: '2024-03-01'
    },
    { 
      title: 'Fresh Milk', 
      image: 'milk.png', 
      price: 4.99, 
      rating: 5, 
      createdAt: '2024-02-10'
    },
    { 
      title: 'Whole Chicken', 
      image: 'chicken.png', 
      price: 22.50, 
      rating: 4, 
      createdAt: '2024-01-28'
    }
  ],
  
  sampleProduct: {
    name: 'Chinese Cabbage',
    inStock: true,
    sku: '2,51,594',
    price: '17.28',
    oldPrice: '48.00',
    discount: '64%',
    reviews: 4,
    description: 'Crisp, refreshing and perfect for any salad or stir fry. 100% organic and grown sustainably.',
    category: 'Vegetables',
    tags: ['Organic', 'Bio', 'Cabbage', 'Fresh', 'Green'],
    images: [
      'https://i.imgur.com/OQy3U0y.png',
      'https://i.imgur.com/vMfhHXz.png',
      'https://i.imgur.com/6hD69FZ.png'
    ]
  }
};

// Initialize application
function initApp() {
  // Cache DOM elements
  const elements = {
    hero: document.getElementById('hero'),
    navbar: document.getElementById('navbar'),
    shop: document.getElementById('shop'),
    footer: document.getElementById('footer'),
    productContainer: document.getElementById('product-container'),
    login: document.getElementById('loginForm'),
    signUp: document.getElementById('signupForm'),
    sortSelect: document.getElementById('sortSelect')
  };

  // Sort logic (optional default sort)
  let sortedProducts = APP_DATA.products;
  if (elements.sortSelect) {
    elements.sortSelect.addEventListener('change', (e) => {
      sortedProducts = sortProducts(APP_DATA.products, e.target.value);
      if (elements.shop) {
        elements.shop.innerHTML = getShopHome(APP_DATA.categories, sortedProducts);
      }
    });
  }

  // Render components
  if (elements.hero) elements.hero.innerHTML = getShopHero();
  if (elements.navbar) elements.navbar.innerHTML = getNavbar();
  if (elements.footer) elements.footer.innerHTML = getFooter();
  if (elements.signUp) elements.signUp.innerHTML = getSignupForm();
  if (elements.login) elements.login.innerHTML = getLoginForm();
  if (elements.shop) elements.shop.innerHTML = getShopHome(APP_DATA.categories, sortedProducts);
  if (elements.productContainer) elements.productContainer.innerHTML = getProductDetail(APP_DATA.sampleProduct);

  loadProducts();

}

const loadProducts = async () => {
  try {
    const response = await fetch('/api/products/');
    const products = await response.json();
    console.log('Loaded products:', products);
    const productsDiv = document.getElementById('products');
    if (productsDiv) {
      productsDiv.innerHTML = products.map(product => `
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.description || ''}</p>
              <div class="d-flex justify-content-between">
                <span>$${product.price}/${product.unit || 'unit'}</span>
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


// Wait for DOM to load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}