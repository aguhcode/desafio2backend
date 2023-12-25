class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1;
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct(product) {
      // Validar que todos los campos sean obligatorios
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        console.error("Todos los campos son obligatorios.");
        return;
      }
  
      // Validar que no se repita el campo "code"
      const isCodeDuplicate = this.products.some(p => p.code === product.code);
      if (isCodeDuplicate) {
        console.error("El código del producto ya existe.");
        return;
      }
  
      // Agregar producto con id autoincrementable
      const newProduct = {
        id: this.productIdCounter++,
        ...product
      };
  
      this.products.push(newProduct);
      console.log("Producto agregado:", newProduct);
    }
  
    updateProduct(productId, updatedFields) {
      const productIndex = this.products.findIndex(p => p.id === productId);
  
      if (productIndex !== -1) {
        // Actualizar el producto sin borrar su ID
        this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
        console.log("Producto actualizado:", this.products[productIndex]);
      } else {
        console.error("Producto no encontrado.");
      }
    }
  
    deleteProduct(productId) {
      const productIndex = this.products.findIndex(p => p.id === productId);
  
      if (productIndex !== -1) {
        // Eliminar el producto
        const deletedProduct = this.products.splice(productIndex, 1);
        console.log("Producto eliminado:", deletedProduct);
      } else {
        console.error("Producto no encontrado.");
      }
    }
  
    getProductById(productId) {
      const product = this.products.find(p => p.id === productId);
  
      if (product) {
        return product;
      } else {
        throw new Error("Producto no encontrado.");
      }
    }
  }
  
  // Crear una instancia de ProductManager
  const productManager = new ProductManager();
  
  // Agregar productos
  productManager.addProduct({
    title: "Producto 1",
    description: "Descripción del Producto 1",
    price: 200,
    thumbnail: "Imagen 1",
    code: "abc123",
    stock: 25
  });
  
  productManager.addProduct({
    title: "Producto 2",
    description: "Descripción del Producto 2",
    price: 150,
    thumbnail: "Imagen 2",
    code: "def456",
    stock: 15
  });
  
  console.log("Productos antes de la actualización:");
  console.log(productManager.getProducts());
  
  // Actualizar un producto
  const productIdToUpdate = 1;
  const updatedFields = {
    price: 250,
    stock: 30
  };
  productManager.updateProduct(productIdToUpdate, updatedFields);
  
  console.log("Productos después de la actualización:");
  console.log(productManager.getProducts());
  
  // Eliminar un producto
  const productIdToDelete = 2;
  productManager.deleteProduct(productIdToDelete);
  
  console.log("Productos después de la eliminación:");
  console.log(productManager.getProducts());
  