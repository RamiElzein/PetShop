// Initialize Supabase Client
const SUPABASE_URL = 'https://qwarunqonuuqxntlfo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable__7B1OZCaAdI9Mecm4SlOAw_urzY8tJk';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Fetch products dynamically from Supabase
async function loadProducts() {
  const { data: products, error } = await supabase.from('products').select('*');
  
  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  const container = document.getElementById('product-list');
  if (!container) return;

  container.innerHTML = '';
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image || 'https://via.placeholder.com/150'}" alt="${product.name}" style="width: 100%; height: 150px; object-fit: cover;">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <p>${product.description}</p>
      <a href="product-detail.html?id=${product.id}" class="btn">View Details</a>
    `;
    container.appendChild(productCard);
  });
}

document.addEventListener('DOMContentLoaded', loadProducts);