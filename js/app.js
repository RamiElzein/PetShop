// PetShop - shared code for every page
const SUPABASE_URL = "https://qwarunqonuuqxntlumfo.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable__7B1OZCaAdI9Mecm4SlOAw_urzY8tJk";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Stop user/database text from being run as HTML (XSS protection)
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text == null ? "" : String(text);
  return div.innerHTML;
}

function formatPrice(n) {
  return "AED " + Number(n).toFixed(2);
}

// ---------- Cart (saved in localStorage) ----------
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(product) {
  const cart = getCart();
  const item = cart.find(i => i.id === product.id);
  if (item) item.quantity += 1;
  else cart.push({ id: product.id, name: product.name, price: Number(product.price), quantity: 1 });
  saveCart(cart);
  showMessage(product.name + " added to cart");
}

function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (el) el.textContent = getCart().reduce((sum, i) => sum + i.quantity, 0);
}

function showMessage(text) {
  const box = document.getElementById("message");
  if (!box) return;
  box.textContent = text;
  box.style.display = "block";
  setTimeout(() => (box.style.display = "none"), 2000);
}

// ---------- Header: show login state ----------
async function setupHeader() {
  updateCartCount();
  const authLink = document.getElementById("auth-link");
  if (!authLink) return;
  const { data } = await supabaseClient.auth.getSession();
  if (data.session) {
    authLink.textContent = "Log out (" + data.session.user.email + ")";
    authLink.href = "#";
    authLink.onclick = async e => {
      e.preventDefault();
      await supabaseClient.auth.signOut();
      window.location.href = "index.html";
    };
  }
}

// ---------- Products ----------
const categoryIcons = { Food: "🍖", Toys: "🧶", Beds: "🛏️", Enclosures: "🏠", Accessories: "🦴" };

// Product photo, or an icon box if the product has no photo
function productImage(p) {
  if (p.image) return `<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}">`;
  return `<div class="no-image">${categoryIcons[p.category] || "🐾"}</div>`;
}

function productCard(p) {
  return `
    <div class="product">
      ${productImage(p)}
      <h3>${escapeHtml(p.name)}</h3>
      <p class="category">${escapeHtml(p.category || "")}</p>
      <p class="price">${formatPrice(p.price)}</p>
      <button class="btn" data-id="${p.id}">Add to Cart</button>
      <a href="product-detail.html?id=${p.id}">View Details</a>
    </div>`;
}

let allProducts = [];

function renderProducts(list) {
  const grid = document.getElementById("product-list");
  if (!grid) return;
  grid.innerHTML = list.length ? list.map(productCard).join("") : "<p>No products found.</p>";
  grid.querySelectorAll("button[data-id]").forEach(btn => {
    btn.onclick = () => addToCart(allProducts.find(p => p.id == btn.dataset.id));
  });
}

async function loadProducts() {
  const grid = document.getElementById("product-list");
  if (!grid) return;
  const { data, error } = await supabaseClient.from("products").select("*").order("id");
  if (error) {
    grid.innerHTML = "<p>Could not load products.</p>";
    console.error(error);
    return;
  }
  allProducts = data;
  const limit = Number(grid.dataset.limit) || data.length;
  renderProducts(data.slice(0, limit));
}

// Search box + category filter on products.html
function setupFilters() {
  const search = document.getElementById("search");
  const category = document.getElementById("category");
  if (!search) return;
  function apply() {
    const q = search.value.toLowerCase().trim();
    const c = category.value;
    renderProducts(allProducts.filter(p =>
      (p.name + " " + (p.description || "")).toLowerCase().includes(q) &&
      (c === "" || p.category === c)
    ));
  }
  search.addEventListener("input", apply);
  category.addEventListener("change", apply);
}

document.addEventListener("DOMContentLoaded", async () => {
  setupHeader();
  await loadProducts();
  setupFilters();
});
