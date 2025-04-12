export function getProductDetail(product) {
  const {
    name,
    inStock = true,
    sku,
    price,
    oldPrice,
    discount,
    reviews,
    description,
    category,
    tags,
    images,
    stockQuantity = 10,
  } = product;

  const mainImage = images[0];
  
  const tagBadges = tags.map(tag =>
    `<span class="badge bg-light text-dark border me-1">${tag}</span>`
  ).join('');

  return `
  <div class="container py-5">
    <div class="row g-5">
      <!-- Main Image (now using col-md-6 since we removed thumbs) -->
      <div class="col-md-6 text-center">
        <img src="${mainImage}" class="img-fluid rounded" alt="Main Product Image">
      </div>

      <!-- Product Info -->
      <div class="col-md-6">
        <h2 class="fw-bold">${name} 
          ${inStock ? `<span class="badge" style="background-color: #00c851;">In Stock</span>` : `<span class="badge bg-danger">Out of Stock</span>`}
        </h2>
        <div class="mb-2 text-warning">★★★★☆ <small class="text-muted ms-1">${reviews} Reviews</small></div>
        <p><strong>SKU:</strong> ${sku}</p>

        <div class="d-flex align-items-center gap-3 mb-3">
          ${oldPrice ? `<del class="text-muted fs-5">$${oldPrice}</del>` : ''}
          <span class="fs-4 fw-bold text-success">$${price}</span>
          ${discount ? `<span class="badge bg-danger">${discount} OFF</span>` : ''}
        </div>

        <hr class="border border-2" style="border-color: #00c851;">

        <p class="text-muted">${description}</p>

        <div class="d-flex align-items-center gap-3 my-4">
          <div class="input-group" style="max-width: 120px;">
            <input id="quantityInput" type="number" class="form-control text-center" value="1" min="1" max="${stockQuantity}">
          </div>
          <button class="btn btn-success text-white px-4 py-2 fw-bold ${!inStock ? 'disabled' : ''}">
            ${inStock ? 'Inquire' : 'Unavailable'} <i class="bi bi-bag ms-2"></i>
          </button>
        </div>

        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Tags:</strong> ${tagBadges}</p>

        <div class="mt-3 d-flex gap-3">
          <a href="#" class="text-dark fs-4"><i class="bi bi-facebook"></i></a>
          <a href="#" class="text-dark fs-4"><i class="bi bi-twitter-x"></i></a>
          <a href="#" class="text-dark fs-4"><i class="bi bi-pinterest"></i></a>
          <a href="#" class="text-dark fs-4"><i class="bi bi-instagram"></i></a>
        </div>
      </div>
    </div>
  </div>
  <script>
    (function() {
      const decreaseBtn = document.getElementById('decreaseQty');
      const increaseBtn = document.getElementById('increaseQty');
      const quantityInput = document.getElementById('quantityInput');
      const stockBadge = document.getElementById('stockBadge');
      
      let availableStock = ${stockQuantity};
      let currentQty = 1;

      function updateStockDisplay() {
        const remainingStock = availableStock - currentQty;
        stockBadge.textContent = remainingStock > 0 ? \`\${remainingStock} In Stock\` : 'Out of Stock';
        stockBadge.className = remainingStock > 0 ? 'badge bg-success' : 'badge bg-danger';
        
        // Update button states
        decreaseBtn.disabled = currentQty <= 1;
        increaseBtn.disabled = remainingStock <= 0;
        quantityInput.max = availableStock;
      }

      decreaseBtn.addEventListener('click', () => {
        if (currentQty > 1) {
          currentQty--;
          quantityInput.value = currentQty;
          updateStockDisplay();
        }
      });

      increaseBtn.addEventListener('click', () => {
        if (currentQty < availableStock) {
          currentQty++;
          quantityInput.value = currentQty;
          updateStockDisplay();
        }
      });

      quantityInput.addEventListener('change', () => {
        let newQty = parseInt(quantityInput.value) || 1;
        newQty = Math.max(1, Math.min(newQty, availableStock));
        currentQty = newQty;
        quantityInput.value = currentQty;
        updateStockDisplay();
      });

      // Initialize
      updateStockDisplay();
    })();
  </script>
  `;
}