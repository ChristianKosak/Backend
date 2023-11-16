class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1;
    }
  
    addProduct(product) {
      const { title, description, price, thumbnail, code, stock } = product;
  
      // Validar datos 
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Todos los campos son obligatorios");
        return;
      }
  
      // Validacion del producto si es que el mismo  ya existe
      const existingProduct = this.products.find((p) => p.code === code);
      if (existingProduct) {
        console.log("El código del producto ya existe. Introduce un código único.");
        return;
      }
  
      const newProduct = {
        id: this.productIdCounter++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      this.products.push(newProduct);
      console.log("Producto agregado correctamente:", newProduct);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find((p) => p.id === id);
      if (product) {
        return product;
      } else {
        console.log("Error: Producto no encontrado");
      }
    }
  }
  
  // Ejemplo de uso:
  const manager = new ProductManager();
  
  manager.addProduct({
    title: "Pantalon",
    description: "Jeans azules",
    price: 2000,
    thumbnail: "Sin Imagen",
    code: "PJA",
    stock: 50,
  });
  
  manager.addProduct({
    title: "Remera",
    description: "Mangas cortas blancas",
    price: 1000,
    thumbnail: "Sin Imagen",
    code: "RMCB",
    stock: 30,
  });
  
  console.log("Lista de productos:", manager.getProducts());
  
  console.log("Obtener producto por ID:", manager.getProductById(1));
  console.log("Obtener producto por ID:", manager.getProductById(3)); // En este el producto no existe
  