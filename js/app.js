// Initialize Supabase client using the corrected URL
const SUPABASE_URL = "https://qwarunqonuuqxntlumfo.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable__7B1OZCaAdI9Mecm4SlOAw_urzY8tJk";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Function to fetch and display products
async function loadProducts() {
    try {
        const { data: products, error } = await supabaseClient
            .from('products')
            .select('*');

        if (error) {
            console.error('Error fetching products:', error);
            return;
        }

        const productList = document.getElementById('product-list');
        if (!productList) return;

        productList.innerHTML = '';

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description || ''}</p>
                <p><strong>$${product.price}</strong></p>
                <a href="product-detail.html?id=${product.id}">View Details</a>
            `;
            productList.appendChild(productCard);
        });
    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', loadProducts);