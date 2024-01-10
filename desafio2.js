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
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.error("Todos los campos son obligatorios.");
      return;
    }

    const isCodeDuplicate = this.products.some(p => p.code === product.code);
    if (isCodeDuplicate) {
      console.error("El código del producto ya existe.");
      return;
    }

    const newProduct = {
      id: this.productIdCounter++,
      ...product
    };

    this.products.push(newProduct);
    console.log("Producto agregado:", newProduct);
    this.saveToFile();
  }

  updateProduct(productId, updatedFields) {
    const productIndex = this.products.findIndex(p => p.id === productId);

    if (productIndex !== -1) {
      this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
      console.log("Producto actualizado:", this.products[productIndex]);
      this.saveToFile();
    } else {
      console.error("Producto no encontrado.");
    }
  }

  deleteProduct(productId) {
    const productIndex = this.products.findIndex(p => p.id === productId);

    if (productIndex !== -1) {
      const deletedProduct = this.products.splice(productIndex, 1);
      console.log("Producto eliminado:", deletedProduct);
      this.saveToFile();
    } else {
      console.error("Producto no encontrado.");
    }
  }

  getProductById(productId) {
    return this.products.find(p => p.id === productId);
  }

  loadFromFile() {
    try {
      const data = fs.readFileSync(this.filename, 'utf8');
      this.products = JSON.parse(data);
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

const productIdToUpdate = 1;
const updatedFields = {
  price: 250,
  stock: 30
};
productManager.updateProduct(productIdToUpdate, updatedFields);

console.log("Productos después de la actualización:");
console.log(productManager.getProducts());

const productIdToDelete = 2;
productManager.deleteProduct(productIdToDelete);

console.log("Productos después de la eliminación:");
console.log(productManager.getProducts());


module.exports = ProductManager;