export function getSignupForm() {
  return `
    <div class="py-5"> <!-- 🟢 This adds space above & below -->
      <div class="card border-0 shadow-sm py-5 px-4" style="width: 100%; max-width: 400px; margin: auto;">
        <h3 class="text-center fw-bold mb-4">Create Account</h3>

        <form id="signupForm">
          <div class="mb-3">
            <input type="email" class="form-control" name="email" id="signupEmail" placeholder="Email" required>
          </div>

          <div class="mb-3 position-relative">
            <input type="password" class="form-control pe-5" id="signupPassword" name="password" placeholder="Password" required>
            <i class="bi bi-eye form-icon" data-target="signupPassword"></i>
          </div>

          <div class="mb-3 position-relative">
            <input type="password" class="form-control pe-5" id="confirmPassword" placeholder="Confirm Password" required>
            <i class="bi bi-eye form-icon" data-target="confirmPassword"></i>
          </div>

          <div class="mb-3">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-control" name="name" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Account Type</label>
            <select class="form-select" name="type" id="accountType" required>
              <option value="user">Buyer</option>
              <option value="farmer">Farmer</option>
            </select>
          </div>
          <div id="farmerCity" class="d-none">
            <div class="mb-3">
              <label class="form-label">Select Your City</label>
              <select class="form-select" id="citySelect" disabled>
                <option value="">Choose City</option>
                <option value="Tirana">Tirana</option>
                <option value="Durrës">Durrës</option>
                <option value="Vlorë">Vlorë</option>
                <option value="Shkodër">Shkodër</option>
                <option value="Elbasan">Elbasan</option>
                <option value="Korçë">Korçë</option>
                <option value="Fier">Fier</option>
                <option value="Berat">Berat</option>
                <option value="Lushnjë">Lushnjë</option>
                <option value="Pogradec">Pogradec</option>
              </select>
            </div>
          </div>      

          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="termsCheck">
            <label class="form-check-label" for="termsCheck">
              Accept All Terms & Conditions
            </label>
          </div>

          <button type="submit" class="btn btn-success w-100 rounded-pill">Create Account</button>
        </form>

        <div class="text-center mt-3">
          Already Have Account? <a href="/login.html" id="loginLink">Login</a>
        </div>
      </div>
    </div>
  `;
}
