export function getSortDropdown() {
  return `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <button class="btn btn-success rounded-pill">
        <i class="bi bi-sliders"></i> Filter
      </button>
      <div class="d-flex align-items-center">
        <label for="sortSelect" class="me-2 mb-0 fw-medium">Sort By:</label>
        <select id="sortSelect" class="form-select">
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="ratingHigh">Rating</option>
        </select>
      </div>
    </div>
  `;
}
