export function getFooter() {
  return `
    <footer class="bg-white text-black pb-5">
      <div class="container">

        <hr class="my-5 border-success">

        <div class="row g-4">
          <!-- Useful Info -->
          <div class="col-md-4">
            <h5 class="fw-bold mb-4 text-success">Useful Info</h5>
            <ul class="list-unstyled">
              <li class="mb-3"><a href="#" class="text-black text-decoration-none">Seasonal Discounts</a></li>
              <li class="mb-3"><a href="#" class="text-black text-decoration-none">Sustainable Returns</a></li>
              <li class="mb-3"><a href="#" class="text-black text-decoration-none">Eco Privacy Policy</a></li>
              <li class="mb-3"><a href="#" class="text-black text-decoration-none">Fair Use Terms</a></li>
            </ul>
          </div>

          <!-- About Bio -->
          <div class="col-md-4">
            <h5 class="fw-bold mb-4 text-success">About Us</h5>
            <p class="text-muted">
              We’re rooted in nature. 🌱 From farm to table, our products are 100% certified organic, eco-conscious, and cruelty-free.<br><br>
              Thank you for helping the planet—one bio-product at a time.
            </p>
          </div>

          <!-- Social & Newsletter -->
          <div class="col-md-4">
            <h5 class="fw-bold mb-4 text-success">Connect With Us</h5>
            <div class="d-flex gap-3 mb-4">
              <a href="https://www.instagram.com" class="text-success fs-4" target="_blank">
                <i class="bi bi-instagram"></i>
              </a>
              <a href="https://www.x.com" class="text-success fs-4" target="_blank">
                <i class="bi bi-twitter-x"></i>
              </a>
              <a href="https://www.youtube.com" class="text-success fs-4" target="_blank">
                <i class="bi bi-youtube"></i>
              </a>
            </div>

            <h5 class="fw-bold mb-3 text-success">Newsletter</h5>
            <form class="input-group">
              <input type="email" class="form-control rounded-0" placeholder="Enter ur email ...">
              <button class="btn btn-success rounded-0" type="submit">
                <i class="bi bi-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>

        <hr class="my-5 border-success">

        <div class="text-center text-muted">
          <p class="mb-0">© ${currentYear} LAZANJA. Not just a food :)</p>
        </div>
      </div>
    </footer>
  `;
}

const currentYear = new Date().getFullYear();
