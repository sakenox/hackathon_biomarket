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
            <li class="nav-item"><a class="nav-link text-success fw-semibold" href="/">Home</a></li>
            <li class="nav-item"><a class="nav-link fw-semibold" href="/search.html">Shop</a></li>
            <li class="nav-item"><a class="nav-link fw-semibold" href="/">About Us</a></li>
            <li class="nav-item"><a class="nav-link fw-semibold" href="/">Contact Us</a></li>
          </ul>

          <!-- Modified Search Bar -->
          <form class="position-relative me-3" id="navbar-search-form">
            <div class="d-flex search-container">
              <div class="dropdown">
                <button class="btn bg-white border-0 search-filter-btn px-3" type="button" data-bs-toggle="dropdown">
                  <i class="bi bi-funnel-fill text-secondary"></i>
                </button>
                <div class="dropdown-menu p-3 shadow-lg" style="width: 250px;">
                  <strong class="d-block mb-2">Categories</strong>
                  ${['Dairy','Meat','Fruit','Vegetables','Grains', 'Other'].map(cat => `
                    <div class="form-check">
                      <input class="form-check-input category-check" type="checkbox" id="cat-${cat.toLowerCase()}" value="${cat.toLowerCase()}">
                      <label class="form-check-label" for="cat-${cat.toLowerCase()}">${cat}</label>
                    </div>`).join('')}
                  <hr>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="inStock">
                    <label class="form-check-label" for="inStock">In Stock</label>
                  </div>
                  <hr>
                  <label class="form-label" for="search-city">City</label>
                  <select class="form-select" id="search-city">
                    <option value="">Select City</option>
                    ${[
                      "Tirana", "Durres", "Shkoder", "Vlore", "Elbasan", 
                      "Korce", "Fier", "Berat", "Kukes", "Gjirokaster"
                    ].map(city => `<option value="${city}">${city}</option>`).join('')}
                  </select>
                </div>
              </div>

              <input type="text" id="navbar-search-input" class="form-control search-input border-0" placeholder="Search...">

              <button class="btn bg-white border-0 search-submit-btn px-3" type="submit">
                <i class="bi bi-search text-success"></i>
              </button>
            </div>
          </form>

          <select class="form-select w-auto me-3 border-0 text-success fw-semibold">
            <option selected>English</option>
            <option>Shqip</option>
          </select>

          <a href="/inquiries.html" class="text-success fw-semibold me-3 d-flex align-items-center text-decoration-none">
            <i class="bi bi-envelope-fill me-1"></i> Inquiries
          </a>

          <div class="d-flex gap-2" id="auth-buttons">
            <a href="/login.html" class="btn bg-white text-success fw-semibold rounded-pill px-3 border-0">Login</a>
            <a href="/signup.html" class="btn btn-success text-white fw-semibold rounded-pill px-3">Sign Up</a>
          </div>
          <div class="d-flex align-items-center gap-3 d-none" id="user-info">
            <span class="fw-semibold text-success" id="user-greeting"></span>
            <button class="btn btn-success text-white fw-semibold rounded-pill px-3" id="logoutButton" onclick="logout()">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  `;
}