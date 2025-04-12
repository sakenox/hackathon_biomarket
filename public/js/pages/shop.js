export function getShopHome(categories, products) {
  return `
    <div class="container py-5">
      <!-- Categories Section -->
      <h3 class="fw-bold mb-4">Popular Categories</h3>
      <div class="row g-4">
        ${categories
          .map(
            (cat) => `
            <div class="col-6 col-md-4 col-lg-3">
              <div class="bg-light rounded-4 p-3 text-center h-100 shadow-sm ${
                cat.isActive ? 'border border-success' : ''
              }">
                <div class="d-flex justify-content-center align-items-center mb-2" style="width: 120px; height: 120px; margin: 0 auto;">
                  <img src="${cat.image}" alt="${cat.title}" class="img-fluid" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
                </div>
                <p class="fw-semibold mb-0">${cat.title}</p>
              </div>
            </div>
          `
          )
          .join('')}
      </div>

      <!-- Products Section -->
      <h3 class="fw-bold my-5">Featured Products</h3>
      <div class="row g-4">
        ${products
          .map(
            (product) => `
            <div class="col-6 col-md-4 col-lg-3">
              <div class="bg-white rounded-4 p-3 shadow-sm h-100 d-flex flex-column justify-content-between position-relative">
                ${
                  product.isOnSale
                    ? `<span class="badge bg-danger position-absolute top-0 start-0 m-2">Sale</span>`
                    : ''
                }
                <div class="d-flex justify-content-center align-items-center mb-2" style="width: 120px; height: 120px; margin: 0 auto;">
                  <img src="${product.image}" alt="${product.title}" class="img-fluid" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
                </div>
                <h6 class="fw-bold text-center">${product.title}</h6>
                <div class="text-center mt-1">
                  <span class="text-success fw-bold">$${product.price.toFixed(2)}</span>
                  ${
                    product.originalPrice
                      ? `<del class="text-muted small ms-2">$${product.originalPrice.toFixed(2)}</del>`
                      : ''
                  }
                </div>
                <div class="text-center mt-2">
                  ${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}
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
