
// Edit Product Modal
const editModal = document.createElement('div');
editModal.className = 'modal fade';
editModal.id = 'editProductModal';
editModal.innerHTML = `
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Edit Product</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
    </div>
    <div class="modal-body">
      <form id="editProductForm">
        <input type="hidden" id="editProductId">
        <div class="mb-3">
          <label class="form-label">Title</label>
          <input type="text" class="form-control" id="editTitle" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Description</label>
          <textarea class="form-control" id="editDescription"></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Price</label>
          <input type="number" class="form-control" id="editPrice" step="0.01" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Unit</label>
          <select class="form-select" id="editUnit" required>
            <option value="kg">Per Kilogram</option>
            <option value="piece">Per Piece</option>
          </select>
        </div>
        <div class="mb-3 form-check form-switch">
          <input class="form-check-input" type="checkbox" id="editStock">
          <label class="form-check-label" for="editStock">In Stock</label>
        </div>
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </form>
    </div>
  </div>
</div>`;
document.body.appendChild(editModal);

const modal = new bootstrap.Modal(editModal);

// Handle edit button clicks
document.addEventListener('click', async (e) => {
    if (e.target.closest('.edit-product')) {
      const productId = e.target.closest('.edit-product').dataset.id;
      try {
        const response = await fetch(`/api/products/${productId}`, {
          credentials: 'include'
        });
        
        if (!response.ok) throw new Error('Failed to fetch product');
        
        const product = await response.json();
        
        // Populate modal
        document.getElementById('editProductId').value = product._id;
        document.getElementById('editTitle').value = product.title;
        document.getElementById('editDescription').value = product.description || '';
        document.getElementById('editPrice').value = product.price;
        document.getElementById('editUnit').value = product.unit;
        document.getElementById('editStock').checked = product.stock;
        
        modal.show();
      } catch (err) {
        console.error('Error fetching product:', err);
        alert('Failed to load product details');
        showToast('Error loading product: ' + err.message, 'danger');
      }
    }
    
    // ... rest of your existing click handler
  });

  // Handle edit form submission
document.getElementById('editProductForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const productId = document.getElementById('editProductId').value;
    const formData = {
      title: document.getElementById('editTitle').value,
      description: document.getElementById('editDescription').value,
      price: parseFloat(document.getElementById('editPrice').value),
      unit: document.getElementById('editUnit').value,
      stock: document.getElementById('editStock').checked
    };
    
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      
      if (response.ok) {
        modal.hide();
        window.location.reload();
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update product');
      }
    } catch (err) {
      console.error('Error updating product:', err);
      alert(err.message);
    }
  });


// Add product
document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        title: e.target.title.value,
        description: e.target.description.value,
        category: e.target.category.value,
        price: parseFloat(e.target.price.value),
        unit: e.target.unit.value,
        stock: document.getElementById('stockSwitch').checked
      };
  
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
  
      if (response.ok) {
        window.location.reload();
      } else {
        alert('Failed to add product');
      }
    } catch (err) {
      console.error('Error adding product:', err);
    }
});
  
  // Load farmer's products
  (async () => {
    try {
      const response = await fetch('/api/products/my-products', { credentials: 'include' });
      const products = await response.json();
      
      const productsDiv = document.getElementById('farmerProducts');
    
    if (!products.length) {
      productsDiv.innerHTML = `
        <div class="col-12">
          <div class="alert alert-info">No products found. Add your first product!</div>
        </div>
      `;
      return;
    }
    
    productsDiv.innerHTML = `
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-light">
              <tr>
                <th>Product</th>
                <th>Description</th>
                <th>Price</th>
                <th>Unit</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${products.map(product => `
                <tr data-id="${product._id}">
                  <td>${product.title}</td>
                  <td>${product.description || '-'}</td>
                  <td>LEK ${product.price}</td>
                  <td>${product.unit}</td>
                  <td>
                    <span class="badge ${product.stock ? 'bg-success' : 'bg-danger'}">
                      ${product.stock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td>
                    <div class="d-flex gap-2">
                      <button class="btn btn-sm btn-warning edit-product" data-id="${product._id}">
                        <i class="bi bi-pencil"></i> Edit
                      </button>
                      <button class="btn btn-sm btn-danger delete-product" data-id="${product._id}">
                        <i class="bi bi-trash"></i> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    } catch (err) {
        console.error('Error loading products:', err);
        document.getElementById('farmerProducts').innerHTML = `
          <div class="col-12">
            <div class="alert alert-danger">Error loading products: ${err.message}</div>
          </div>
        `;
      }
  })();
  
  // Logout
  document.getElementById('logoutButton').addEventListener('click', async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    window.location.href = '/';
  });

// Handle edit button clicks
document.addEventListener('click', async (e) => {
    if (e.target.closest('.edit-product')) {
      const productId = e.target.closest('.edit-product').dataset.id;
      // Implement edit modal or redirect
      console.log('Edit product:', productId);
    }
    
    if (e.target.closest('.delete-product')) {
      const productId = e.target.closest('.delete-product').dataset.id;
      if (confirm('Are you sure you want to delete this product?')) {
        try {
          const response = await fetch(`/api/products/${productId}`, {
            method: 'DELETE',
            credentials: 'include'
          });
          
          if (response.ok) {
            window.location.reload();
          } else {
            throw new Error('Failed to delete product');
          }
        } catch (err) {
          console.error('Delete error:', err);
          alert(err.message);
        }
      }
    }
});

function showToast(message, type = 'success') {
    const toastContainer = document.createElement('div');
    toastContainer.innerHTML = `
      <div class="toast align-items-center text-white bg-${type} border-0 show" role="alert">
        <div class="d-flex">
          <div class="toast-body">
            ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      </div>
    `;
    toastContainer.style.position = 'fixed';
    toastContainer.style.top = '20px';
    toastContainer.style.right = '20px';
    toastContainer.style.zIndex = '1100';
    document.body.appendChild(toastContainer);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      toastContainer.remove();
    }, 5000);
  }
  

