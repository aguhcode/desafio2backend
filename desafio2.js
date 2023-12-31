const fs = require('fs');

class ProductManager {
  constructor(filename) {
    this.filename = filename;
    this.products = [];
    this.productIdCounter = 1;
    this.loadFromFile();
  }

  getProducts() {
    return this.products;
  }

  addProduct(product) {

    this.saveToFile();
  }

  updateProduct(productId, updatedFields) {

    this.saveToFile();
  }

  deleteProduct(productId) {

    this.saveToFile();
  }

  getProductById(productId) {
  }

  loadFromFile() {
    try {
      const data = fs.readFileSync(this.filename, 'utf8');
      this.products = JSON.parse(data);
      // Reiniciar el contador de ID basado en la cantidad de productos cargados
      this.productIdCounter = this.products.reduce((maxId, product) => Math.max(maxId, product.id), 0) + 1;
    } catch (error) {
      this.products = [];
    }
  }

  saveToFile() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      fs.writeFileSync(this.filename, data, 'utf8');
    } catch (error) {
      console.error('Error al guardar datos en el archivo:', error.message);
    }
  }
}

const productManager = new ProductManager('productos.json');

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
