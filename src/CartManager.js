const fs = require('fs');

class CartManager {
    constructor(filePath) {
        this.path = filePath;
        this.carts = [];
        this.loadCarts();
    }

    loadCarts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.carts = JSON.parse(data);
        } catch (err) {
            console.error('Error al cargar el archivo de carritos:', err.message);
        }
    }

    saveCarts() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
        } catch (err) {
            console.error('Error al guardar el archivo de carritos:', err.message);
        }
    }

    createCart() {
        const newCart = {
            id: this.generateUniqueId(),
            products: []
        };
        this.carts.push(newCart);
        this.saveCarts();
        return newCart;
    }

    getProductsInCart(cartId) {
        const cart = this.carts.find(cart => cart.id === cartId);
        return cart ? cart.products : null;
    }

    addProductToCart(cartId, productId, quantity) {
        const cart = this.carts.find(cart => cart.id === cartId);
        if (cart) {
            const existingProduct = cart.products.find(product => product.id === productId);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ id: productId, quantity });
            }
            this.saveCarts();
            return cart;
        }
        return null;
    }

    generateUniqueId() {
        const ids = this.carts.map(cart => cart.id);
        let newId;
        do {
            newId = Math.floor(Math.random() * 1000) + 1;
        } while (ids.includes(newId));
        return newId;
    }
}

module.exports = CartManager;
