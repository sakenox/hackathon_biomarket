export function getNavbar() {
  return `
    <style>
      .form-control:focus, .form-select:focus, .btn:focus {
        box-shadow: none !important;
        outline: none !important;
      }

      .dropdown-menu {
        z-index: 1050 !important;
      }

      .navbar {
        position: relative;
        z-index: 1;
      }

      .dropdown-toggle::after {
        display: none !important;
      }

      /* Updated search bar styling */
      .search-container {
        max-width: 360px;
        border: 1px solid #dee2e6 !important;
        border-radius: 0 !important;
      }
      .search-filter-btn {
        border-right: 1px solid #dee2e6 !important;
        border-radius: 0 !important;
      }
      .search-input {
        border-left: none !important;
        border-right: none !important;
        border-radius: 0 !important;
      }
      .search-submit-btn {
        border-left: 1px solid #dee2e6 !important;
        border-radius: 0 !important;
      }
    </style>

    <nav class="navbar navbar-expand-lg bg-white">
      <div class="container">
        <a class="navbar-brand fw-bold text-success" href="#">
          <i class="bi bi-emoji-smile me-2"></i>Merr Bio
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto gap-3">
            <li class="nav-item"><a class="nav-link text-success fw-semibold" href="#">Home</a></li>
            <li class="nav-item"><a class="nav-link fw-semibold" href="#">Shop</a></li>
            <li class="nav-item"><a class="nav-link fw-semibold" href="#">About Us</a></li>
            <li class="nav-item"><a class="nav-link fw-semibold" href="#">Contact Us</a></li>
          </ul>

          <!-- Modified Search Bar -->
          <form class="position-relative me-3">
            <div class="d-flex search-container">
              <!-- Filter Dropdown -->
              <div class="dropdown">
                <button class="btn bg-white border-0 search-filter-btn px-3" 
                        type="button" 
                        data-bs-toggle="dropdown">
                  <i class="bi bi-funnel-fill text-secondary"></i>
                </button>
                <div class="dropdown-menu p-3 shadow-lg" style="width: 250px;">
                  <strong class="d-block mb-2">Categories</strong>
                  ${['Dairy','Meat','Fruit','Vegetable','Nuts'].map(cat => `
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="${cat.toLowerCase()}">
                      <label class="form-check-label" for="${cat.toLowerCase()}">${cat}</label>
                    </div>`).join('')}
                  <hr>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="inStock">
                    <label class="form-check-label" for="inStock">In Stock</label>
                  </div>
                  <hr>
                  <label class="form-label">City</label>
                  <select class="form-select">
                    <option>Select City</option>
                    ${[
                      "Tirana", "Durres", "Shkoder", "Vlore", "Elbasan", 
                      "Korce", "Fier", "Berat", "Kukes", "Gjirokaster"
                    ].map(city => `<option>${city}</option>`).join('')}
                  </select>
                </div>
              </div>

              <input type="text" class="form-control search-input border-0" placeholder="Search...">

              <button class="btn bg-white border-0 search-submit-btn px-3" type="submit">
                <i class="bi bi-search text-success"></i>
              </button>
            </div>
          </form>

          <select class="form-select w-auto me-3 border-0 text-success fw-semibold">
            <option selected>English</option>
            <option>Shqip</option>
          </select>

          <a href="#inquiries" class="text-success fw-semibold me-3 d-flex align-items-center text-decoration-none">
            <i class="bi bi-envelope-fill me-1"></i> Inquiries
          </a>

          <div class="d-flex gap-2">
            <button class="btn bg-white text-success fw-semibold rounded-pill px-3 border-0">Login</button>
            <button class="btn btn-success text-white fw-semibold rounded-pill px-3">Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
  `;
}