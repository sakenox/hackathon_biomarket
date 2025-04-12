export function getLoginForm() {
  return `
    <div class="py-5"> <!-- 🟢 Adds top & bottom spacing -->
      <div class="card border-0 shadow-sm py-5 px-4" style="width: 100%; max-width: 400px; margin: auto;">
        <h3 class="text-center fw-bold mb-4">Welcome Back</h3>

        <form id="loginForm">
          <div class="mb-3">
            <input type="email" class="form-control" name="email" id="loginEmail" placeholder="Email" required>
          </div>

          <div class="mb-3 position-relative">
            <input type="password" class="form-control pe-5" name="password" id="loginPassword" placeholder="Password" required>
            <i class="bi bi-eye form-icon" data-target="loginPassword"></i>
          </div>

          <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="rememberMe">
              <label class="form-check-label" for="rememberMe">
                Remember Me
              </label>
            </div>
            <a href="#" class="small">Forgot Password?</a>
          </div>

          <button type="submit" class="btn btn-success w-100 rounded-pill">Login</button>
        </form>

        <div class="text-center mt-3">
          Don't have an account? <a href="/signup.html" id="signupLink">Sign Up</a>
        </div>
      </div>
    </div>
  `;
}
