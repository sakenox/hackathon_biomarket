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
    { title: 'Fresh Fruit', image: '../assets/images/fruits.jpg', short: 'fruits' },
    { title: 'Fresh Vegetables', image: '../assets/images/vegetables.png', short: 'vegetables' },
    { title: 'Meat & Fish', image: '../assets/images/meat.png', short: 'meat' },
    { title: 'Bakery', image: '../assets/images/bakery.png', short: 'grains' },
    { title: 'Dairy Products', image: '../assets/images/dairy.png', short: 'dairy' },
    { title: 'Beverages', image: '../assets/images/beverages.png', short: 'other' }
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

    const productsDiv = document.getElementById('products');
    if (productsDiv) {
      productsDiv.innerHTML = `
        <style>
          .custom-product-card {
            background: #fff;
            border-radius: 1rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
            padding: 1.5rem;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            position: relative;
          }

          .custom-product-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          }

          .custom-product-image {
            width: 110px;
            height: 110px;
            object-fit: contain;
            margin-bottom: 1rem;
          }

          .custom-badge {
            position: absolute;
            top: 1rem;
            left: 1rem;
            font-size: 0.75rem;
            padding: 0.35rem 0.6rem;
          }

          .custom-product-title {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #333;
          }

          .custom-price {
            font-size: 1rem;
            font-weight: 600;
            color: #28a745;
          }

          .custom-old-price {
            font-size: 0.875rem;
            color: #888;
            margin-left: 0.5rem;
          }

          .custom-rating {
            margin-top: 0.5rem;
            font-size: 0.9rem;
            color: #f0ad4e;
          }

          .custom-description,
          .custom-unit {
            font-size: 0.8rem;
            color: #777;
            margin-top: 0.3rem;
          }
        </style>

        <div class="container py-5 px-3">
          <h3 class="fw-bold mb-4">Featured Products</h3>
          <div class="row gy-4 gx-4">
            ${products.map(product => `
              <div class="col-6 col-md-4 col-lg-3">
                <div class="custom-product-card">
                  ${product.isOnSale ? 
                    `<span class="badge bg-danger custom-badge">Sale</span>` : ''
                  }
                  <img src="${product.image}" alt="${product.title}" class="custom-product-image">
                  <div class="custom-product-title">${product.title}</div>
                  <div>
                    <span class="custom-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? 
                      `<del class="custom-old-price">$${product.originalPrice.toFixed(2)}</del>` : ''
                    }
                  </div>
                  <div class="custom-rating">
                    ${'★'.repeat(product.rating || 0)}${'☆'.repeat(5 - (product.rating || 0))}
                  </div>
                  ${product.description ? 
                    `<p class="custom-description">${product.description}</p>` : ''
                  }
                  ${product.unit ?
                    `<div class="custom-unit">Per ${product.unit}</div>` : ''
                  }
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  } catch (err) {
    console.error('Error loading products:', err);
    const productsDiv = document.getElementById('products');
    if (productsDiv) {
      productsDiv.innerHTML = `
        <div class="alert alert-danger text-center">
          Failed to load products. Please try again later.
        </div>
      `;
    }
  }
};


// Wait for DOM to load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}