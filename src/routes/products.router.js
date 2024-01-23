import express from "express";
import ProductManager from "../productMaganer.js";

const pm = new ProductManager("./src/productos.json");
const router = express.Router();

router.get("/api/products", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await pm.getProducts();
    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit));
      res.status(200).send(limitedProducts);
    } else {
      res.status(200).send(products);
    }
  } catch (error) {
    res.status(500).send("Error al obtener productos");
  }
});

router.get("/api/products/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await pm.getProductById(productId);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al obtener el producto");
  }
});

router.post("/api/products", async (req, res) => {
  try {
    await pm.addProduct(req.body);
    res.status(200).send("Producto agregado");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/api/products/:pid", (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    pm.updateProduct(productId, req.body);
    res.status(200).send("Producto actualizado");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/api/products/:pid", (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    pm.deleteProduct(productId);
    res.status(200).send("Producto eliminado");
  } catch (error) {
    res.status(500).send("Error al eliminar el producto");
  }
});

export default router;
