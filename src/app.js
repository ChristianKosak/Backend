const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 8080;

const manager = new ProductManager('./productos.json'); // Asegúrate de tener un archivo 'productos.json' con productos existentes

// Endpoint para obtener productos
app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit; // Obtener el límite de productos desde la query param

    await manager.loadProducts(); // Cargar productos desde el archivo

    let products = manager.getProducts();

    if (limit) {
      products = products.slice(0, parseInt(limit)); // Limitar la cantidad de productos si se especifica el límite
    }

    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Endpoint para obtener un producto por su ID
app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);

    await manager.loadProducts(); // Cargar productos desde el archivo

    const product = manager.getProductById(productId);

    if (product) {
      res.json({ product });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
