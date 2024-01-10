const express = require('express');
const ProductManager = require('./desafio2'); 

const app = express();
const port = 3000; 

const productManager = new ProductManager('productos.json');

app.get('/products', (req, res) => {
  const limit = req.query.limit;

  let productsToReturn = productManager.getProducts();

  if (limit) {
    const parsedLimit = parseInt(limit, 10);
    if (!isNaN(parsedLimit) && parsedLimit > 0) {
      productsToReturn = productsToReturn.slice(0, parsedLimit);
    } else {
      return res.status(400).json({ error: 'El parámetro limit debe ser un número positivo.' });
    }
  }

  res.json({ products: productsToReturn });
});

app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid, 10);

  if (!isNaN(productId)) {
    const product = productManager.getProductById(productId);

    if (product) {
      res.json({ product });
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } else {
    res.status(400).json({ error: 'El parámetro pid debe ser un número.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
