const SUPABASE_URL = "https://pcwpnhluaqfgstkrmvie.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_6lx3SK9RSLTDfMfieaUUdA_vYF28OAp";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

  renderProducts(products);
}

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

    container.innerHTML += `
      <div class="product">
        <h3>${product.name}</h3>
        <p>Category: ${product.category ? product.category.category_name : "N/A"}</p>
        <p>AED ${product.price.toLocaleString()}</p>
        <p class="stock">${stockLabel}</p>
        <a href="product-detail.html?id=${product.product_id}">View details</a>
      </div>
    `;
  });
}

loadProducts();
