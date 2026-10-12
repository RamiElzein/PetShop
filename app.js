const SUPABASE_URL = "https://pcwpnhluaqfgstkrmvie.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_6lx3SK9RSLTDfMfieaUUdA_vYF28OAp";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let allProducts = []; // Stores fetched products locally for filtering/sorting

// Fetch products live from Supabase
async function loadProducts() {
  const { data: products, error } = await supabaseClient
    .from("product")
    .select("*, category(category_name)")
    .order("name");

  if (error) {
    document.getElementById("product-list").innerHTML = `<p>Could not load products: ${error.message}</p>`;
    return;
  }

  allProducts = products || [];
  renderProducts(allProducts);
}

// Render products dynamically
function renderProducts(list) {
  const container = document.getElementById("product-list");
  if (!container) return;
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>No products match your search.</p>";
    return;
  }

  list.forEach(product => {
    const stockLabel = 
      product.stock === 0
        ? "Out of Stock"
        : product.stock <= 5
        ? "Low Stock"
        : "In Stock";

    const categoryName = product.category ? product.category.category_name : "N/A";
    const isDisabled = product.stock === 0 ? "disabled" : "";

    container.innerHTML += `
      <div class="product">
        <h3>${product.name}</h3>
        <p>Category: ${categoryName}</p>
        <p>AED ${product.price.toLocaleString()}</p>
        <p class="stock">${stockLabel}</p>
        <a href="product-detail.html?id=${product.product_id}" style="display: block; margin-bottom: 8px;">View details</a>
        <button ${isDisabled} onclick="addToCart(${product.product_id})">
          ${product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    `;
  });
}

// Add to Cart functionality
window.addToCart = function(productId) {
  const product = allProducts.find(p => p.product_id === productId);
  if (!product) return;

  if (product.stock === 0) {
    alert("This product is out of stock.");
    return;
  }

  alert(product.name + " has been added to your cart!");
};

// Search functionality
const searchBox = document.getElementById("search-box");
if (searchBox) {
  searchBox.addEventListener("input", function(event) {
    const term = event.target.value.toLowerCase();
    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(term)
    );
    renderProducts(filtered);
  });
}

// Category filter buttons
document.querySelectorAll(".category-btn").forEach(button => {
  button.addEventListener("click", function() {
    const category = button.dataset.category;
    if (category === "All") {
      renderProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product => {
        const catName = product.category ? product.category.category_name : "";
        return catName.toLowerCase() === category.toLowerCase();
      });
      renderProducts(filtered);
    }
  });
});

// Sort products
const sortSelect = document.getElementById("sort-select");
if (sortSelect) {
  sortSelect.addEventListener("change", function(event) {
    let sorted = [...allProducts];
    const value = event.target.value;

    if (value === "low-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (value === "high-low") {
      sorted.sort((a, b) => b.price - a.price);
    }

    renderProducts(sorted);
  });
}

// Initial load
loadProducts();
