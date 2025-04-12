export function getProductCard(product) {
  return `
    <div class="card border-0 shadow-sm p-3 h-100">
      ${product.isOnSale ? `<span class="badge bg-danger position-absolute" style="top: 10px; left: 10px;">Sale ${Math.round((1 - product.price / product.originalPrice) * 100)}%</span>` : ''}
      <img src="${product.image}" class="card-img-top mb-3" alt="${product.title}">
      <div class="card-body p-0">
        <h6 class="card-title mb-1">${product.title}</h6>
        <p class="mb-1">
          <strong>$${product.price.toFixed(2)}</strong>
          ${product.originalPrice ? `<span class="text-muted text-decoration-line-through">$${product.originalPrice.toFixed(2)}</span>` : ''}
        </p>
        <div class="text-warning mb-1">
          ${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}
        </div>
        <button class="btn btn-outline-secondary w-100 rounded-pill">
          <i class="bi bi-bag"></i>
        </button>
      </div>
    </div>
  `;
}
