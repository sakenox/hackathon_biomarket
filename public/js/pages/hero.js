export function getShopHero() {
  return `
    <style>
      .hero-card {
        position: relative;
        overflow: hidden;
        border-radius: 1rem;
        height: 100%;
        padding: 2rem;
      }
      
      .hero-content {
        position: relative;
        z-index: 2;
        max-width: 60%;
      }
      
      .hero-bg-image {
        position: absolute;
        right: 0;
        bottom: 0;
        height: 100%;
        width: 50%;
        object-fit: cover;
        z-index: 1;
        opacity: 0.8;
      }
      
      .small-card {
        position: relative;
        overflow: hidden;
        border-radius: 1rem;
        height: 100%;
        padding: 1.5rem;
      }
      
      .small-card-content {
        position: relative;
        z-index: 2;
      }
      
      .small-card-bg {
        position: absolute;
        right: 0;
        bottom: 0;
        height: 100%;
        width: 50%;
        object-fit: cover;
        z-index: 1;
        opacity: 0.8;
      }
      
      .dark-card .small-card-bg {
        opacity: 0.8;
      }
    </style>

    <div class="container py-4">
      <!-- Top Banner -->
      <div class="row g-4">
        <!-- Left Hero -->
        <div class="col-lg-8">
          <div class="hero-card bg-light">
            <div class="hero-content">
              <h2 class="fw-bold display-5">100% Fresh<br>Fruit & Vegetables</h2>
              <p class="text-muted">Free shipping on all your order. we deliver, you enjoy</p>
              <a href="#" class="btn btn-success rounded-pill px-4 py-2 mt-2">Shop Now</a>
            </div>
            <img src="../assets/images/fruit.png" alt="Vegetables" class="hero-bg-image">
            <span class="badge bg-warning text-dark position-absolute top-0 end-0 m-3 rounded-pill px-3 py-2">
              43% OFF
            </span>
          </div>
        </div>

        <!-- Right Two Boxes -->
        <div class="col-lg-4 d-flex flex-column gap-4">
          <!-- Fresh Orange -->
          <div class="small-card bg-light">
            <div class="small-card-content">
              <h6 class="fw-bold text-warning">20% OFF</h6>
              <h5 class="fw-bold">Fresh Orange</h5>
              <p class="text-muted">Starting at <strong>$9.00</strong></p>
              <a href="#" class="btn btn-success btn-sm rounded-pill px-3 py-1">Shop Now</a>
            </div>
            <img src="../assets/images/orange.png" alt="Oranges" class="small-card-bg">
          </div>
          
          <!-- Healthy Coconut -->
          <div class="small-card bg-dark text-white dark-card">
            <div class="small-card-content">
              <h6 class="fw-bold text-success">Best Deal</h6>
              <h5 class="fw-bold">Healthy Coconuts</h5>
              <a href="#" class="btn btn-outline-light btn-sm rounded-pill mt-2 px-3 py-1">Shop Now</a>
            </div>
            <img src="../assets/images/coconut.png" alt="Coconut" class="small-card-bg">
          </div>
        </div>
      </div>

      <!-- Benefits Section -->
      <div class="row text-center mt-5 g-4">
        <div class="col-md-3">
          <div class="p-3 bg-light rounded-3 h-100">
            <i class="bi bi-truck fs-3 text-success"></i>
            <h6 class="fw-bold mt-2">Free Shipping</h6>
            <p class="text-muted small">Free shipping on all your order</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="p-3 bg-light rounded-3 h-100">
            <i class="bi bi-headset fs-3 text-success"></i>
            <h6 class="fw-bold mt-2">Customer Support 24/7</h6>
            <p class="text-muted small">Instant access to Support</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="p-3 bg-light rounded-3 h-100">
            <i class="bi bi-shield-lock fs-3 text-success"></i>
            <h6 class="fw-bold mt-2">100% Secure Payment</h6>
            <p class="text-muted small">We ensure your money is safe</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="p-3 bg-light rounded-3 h-100">
            <i class="bi bi-arrow-counterclockwise fs-3 text-success"></i>
            <h6 class="fw-bold mt-2">Money-Back Guarantee</h6>
            <p class="text-muted small">30 Days Money-Back Guarantee</p>
          </div>
        </div>
      </div>
    </div>
  `;
}