export function getShopHome(categories, products) {
  return `
    <style>
      .image-card {
        position: relative;
        overflow: hidden;
        border-radius: 1rem;
        background-size: cover;
        background-position: center;
        transition: transform 0.3s ease;
      }
      
      .category-card {
        height: 180px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 1.5rem;
      }
      
      .product-card {
        height: 280px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1.5rem;
      }
      
      .image-card:hover {
        transform: translateY(-5px);
      }
      
      .image-card-content {
        position: relative;
        z-index: 2;
        text-align: center;
        color: white;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
      }
      
      .image-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
        z-index: 1;
      }
      
      .image-card-badge {
        position: absolute;
        top: 1rem;
        left: 1rem;
        z-index: 3;
      }
      
      .active-category {
        border: 2px solid #28a745 !important;
        box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.3);
      }
      
      .image-card-rating {
        filter: brightness(0) invert(1) drop-shadow(0 0 2px rgba(0,0,0,0.5));
      }
      
      .image-card-price {
        filter: brightness(0) invert(1) drop-shadow(0 0 2px rgba(0,0,0,0.5));
      }
      
      .image-card-old-price {
        color: rgba(255,255,255,0.8) !important;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
      }
    </style>

    <div class="container py-5">
      <!-- Categories Section -->
      <h3 class="fw-bold mb-4">Popular Categories</h3>
      <div class="row g-4">
        ${categories
          .map(
            (cat) => `
            <div class="col-6 col-md-4 col-lg-3">
              <div class="image-card category-card ${cat.isActive ? 'active-category' : ''}" 
                   style="background-image: url('${cat.image}')">
                <div class="image-card-content">
                  <p class="fw-semibold mb-0">${cat.title}</p>
                </div>
              </div>
            </div>
          `
          )
          .join('')}
      </div>
    </div>
  `;
}