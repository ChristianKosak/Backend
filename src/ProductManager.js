const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (err) {
            
            console.error('Error al cargar el archivo de productos:', err.message);
        }
    }

    saveProducts() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
        } catch (err) {
            
            console.error('Error al guardar el archivo de productos:', err.message);
        }
    }

    addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;
        const newProduct = {
            id: this.generateUniqueId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
            this.saveProducts();
            return this.products[productIndex];
        }
        return null; 
    }

    deleteProduct(id) {
        const initialLength = this.products.length;
        this.products = this.products.filter(product => product.id !== id);
        if (this.products.length !== initialLength) {
            this.saveProducts();
            return true; 
        }
        return false; // Producto no encontrado o no eliminado
    }

    generateUniqueId() {
        const ids = this.products.map(product => product.id);
        let newId;
        do {
            newId = Math.floor(Math.random() * 1000) + 1;
        } while (ids.includes(newId));
        return newId;
    }
}

module.exports = ProductManager;

  



const manager = new ProductManager('productos.json');


console.log("Productos iniciales:", manager.getProducts());


const newProduct = manager.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
});

console.log("Producto agregado:", newProduct);

console.log("Lista de productos actualizada:", manager.getProducts());

console.log("Obtener producto por ID:", manager.getProductById(newProduct.id));

const updatedProduct = manager.updateProduct(newProduct.id, { price: 250, stock: 30 });
console.log("Producto actualizado:", updatedProduct);

const deletionResult = manager.deleteProduct(newProduct.id);
if (deletionResult) {
    console.log("Producto eliminado exitosamente");
} else {
    console.log("No se pudo eliminar el producto");
}
