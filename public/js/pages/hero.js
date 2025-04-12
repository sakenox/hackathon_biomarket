export function getShopHero() {
  return `
    <div class="container py-4">
      <!-- Top Banner -->
      <div class="row g-4">
        <!-- Left Hero -->
        <div class="col-lg-8">
          <div class="p-4 bg-light rounded-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <h2 class="fw-bold">100% Fresh<br>Fruit & Vegetables</h2>
              <p class="text-muted">Free shipping on all your order. we deliver, you enjoy</p>
              <a href="#" class="btn btn-success rounded-pill px-4 py-2 mt-2">Shop Now</a>
            </div>
            <div class="position-relative mt-3">
              <span class="badge bg-warning text-dark position-absolute top-0 end-0 translate-middle rounded-pill px-3 py-2">
                43% OFF
              </span>
              <img src="https://i.imgur.com/6hD69FZ.png" alt="Vegetables" class="img-fluid rounded">
            </div>
          </div>
        </div>

        <!-- Right Two Boxes -->
        <div class="col-lg-4 d-flex flex-column gap-4">
          <!-- Fresh Orange -->
          <div class="p-3 bg-light rounded-4 d-flex flex-column justify-content-between">
            <div>
              <h6 class="fw-bold">20% OFF</h6>
              <h5>Fresh Orange</h5>
              <p class="text-muted">Starting at <strong>$9.00</strong></p>
              <a href="#" class="btn btn-success btn-sm rounded-pill px-3 py-1">Shop Now</a>
            </div>
            <img src="https://i.imgur.com/OQy3U0y.png" alt="Oranges" class="img-fluid mt-2 rounded">
          </div>
          
          <!-- Healthy Coconut -->
          <div class="p-3 bg-dark text-white rounded-4">
            <h6 class="fw-bold">Best Deal</h6>
            <h5>Healthy Coconuts</h5>
            <a href="#" class="btn btn-outline-light btn-sm rounded-pill mt-2 px-3 py-1">Shop Now</a>
            <img src="https://i.imgur.com/vMfhHXz.png" alt="Coconut" class="img-fluid mt-2 rounded">
          </div>
        </div>
      </div>

      <!-- Benefits Section -->
      <div class="row text-center mt-5">
        <div class="col-md-3">
          <i class="bi bi-truck fs-3 text-success"></i>
          <h6 class="fw-bold mt-2">Free Shipping</h6>
          <p class="text-muted small">Free shipping on all your order</p>
        </div>
        <div class="col-md-3">
          <i class="bi bi-headset fs-3 text-success"></i>
          <h6 class="fw-bold mt-2">Customer Support 24/7</h6>
          <p class="text-muted small">Instant access to Support</p>
        </div>
        <div class="col-md-3">
          <i class="bi bi-shield-lock fs-3 text-success"></i>
          <h6 class="fw-bold mt-2">100% Secure Payment</h6>
          <p class="text-muted small">We ensure your money is safe</p>
        </div>
        <div class="col-md-3">
          <i class="bi bi-arrow-counterclockwise fs-3 text-success"></i>
          <h6 class="fw-bold mt-2">Money-Back Guarantee</h6>
          <p class="text-muted small">30 Days Money-Back Guarantee</p>
        </div>
      </div>
    </div>
  `;
}
