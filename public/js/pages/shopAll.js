import { getProductCard } from './productCard.js';
import { sortProducts } from './sort.js';

export function getShopHome(categories, products) {
  return `
    <div class="container py-5">
      ${getSortDropdown()}
      <div id="productGrid" class="row g-4">
        ${products.map(p => `
          <div class="col-md-3">${getProductCard(p)}</div>
        `).join('')}
      </div>
    </div>
  `;
}
