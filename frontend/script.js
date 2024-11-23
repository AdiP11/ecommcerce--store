document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const productContainer = document.getElementById('products');
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button onclick="buyProduct('${product.id}')">Buy Now</button>
                `;
                productContainer.appendChild(productDiv);
            });
        });
});

function buyProduct(productId) {
    fetch(`/api/buy/${productId}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        });
}
