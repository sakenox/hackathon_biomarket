  // Bind the form submit handler
  document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('navbar-search-form');

    if (searchForm) {
      searchForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const searchInput = document.getElementById('navbar-search-input').value.trim();
        const city = document.getElementById('search-city').value;
        const inStock = document.getElementById('inStock').checked;

        // Get selected categories
        const categories = Array.from(document.querySelectorAll('.category-check'))
          .filter(input => input.checked)
          .map(input => input.value);

        const queryParams = new URLSearchParams();

        if (searchInput) queryParams.set('search_title', searchInput);
        if (city) queryParams.set('city', city);
        if (inStock) queryParams.set('in_stock', 'true');
        if (categories.length > 0) queryParams.set('category', categories[0]); // optionally append multiple if supported

        // Redirect with query
        const queryString = queryParams.toString();
        window.location.href = `/search.html${queryString ? '?' + queryString : ''}`;
      });
    }
  });
