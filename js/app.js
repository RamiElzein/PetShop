const products = [
  { id: 1, name: "Business Laptop", category: "Computers", price: 3400, stock: 18, description: "High-performance laptop for professionals" },
  { id: 2, name: "iPhone17", category: "Phones", price: 299, stock: 25, description: "Latest smartphone with advanced camera" },
  { id: 3, name: "Camera Device", category: "Samsung Camera", price: 180, stock: 8, description: "Compact digital camera for sharp photography" },
  { id: 4, name: "HP Laptop", category: "Computers", price: 2999, stock: 4, description: "Reliable laptop for everyday multitasking" },
  { id: 5, name: "Lenovo Laptop", category: "Computers", price: 2500, stock: 8, description: "Durable and fast student/work laptop" },
  { id: 6, name: "Wireless Mouse", category: "Accessories", price: 129, stock: 20, description: "Fast-charging durable USB-C cable" },
  { id: 7, name: "Keyboard", category: "Accessories", price: 100, stock: 3, description: "Mechanical keyboard with responsive keys" },
  { id: 8, name: "USB-C Cable", category: "Accessories", price: 49, stock: 20, description: "Fast-charging durable USB-C cable" },
  { id: 9, name: "Headphones", category: "Phones", price: 200, stock: 6, description: "Wireless noise-cancelling headphones" },
  { id: 10, name: "Smartphone", category: "Phones", price: 2499, stock: 0, description: "Feature-packed smartphone at a great value" },
  { id: 11, name: "iPhone 15", category: "Phones", price: 3299, stock: 5, description: "Sleek design with powerful A16 chip" },
  { id: 12, name: "Samsung Galaxy", category: "Phones", price: 2799, stock: 12, description: "Vibrant AMOLED display and great battery life" },
  { id: 13, name: "Google Pixel", category: "Phones", price: 2399, stock: 2, description: "Pure Android experience with exceptional camera" },
  { id: 14, name: "Tablet", category: "Computers", price: 1599, stock: 9, description: "Portable tablet for media and productivity" },
  { id: 15, name: "Webcam", category: "Accessories", price: 179, stock: 10, description: "1080p HD webcam for clear video calls" },
  { id: 16, name: "Gaming Monitor", category: "Computers", price: 1899, stock: 8, description: "High refresh rate monitor for immersive gaming" },
  { id: 17, name: "Power Bank", category: "Accessories", price: 99, stock: 1, description: "Portable 10,000mAh power bank for mobile devices" }
];

const container = document.getElementById("product-list");

document.addEventListener("DOMContentLoaded", () => {
  if (!container) return;
  container.innerHTML = products.map(p => `
    <div class="product-card">
      <h3>${p.name}</h3>
      <p><strong>Category:</strong> ${p.category}</p>
      <p><strong>Price:</strong> $${p.price}</p>
      <p><strong>Stock:</strong> ${p.stock}</p>
      <p>${p.description}</p>
      <a href="product-detail.html?id=${p.id}" class="btn">View Details</a>
    </div>
  `).join('');
});