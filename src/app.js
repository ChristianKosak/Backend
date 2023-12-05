const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 8080;

const manager = new ProductManager('./productos.json'); 

// Endpoint para obtener productos
app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit; 

    await manager.loadProducts(); // Cargar productos desde el archivo

    let products = manager.getProducts();

    if (limit) {
      products = products.slice(0, parseInt(limit)); 
    }

    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});


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


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
