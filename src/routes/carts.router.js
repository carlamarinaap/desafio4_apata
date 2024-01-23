import express from "express";
import CartsManager from "../cartsMaganer.js";

const router = express.Router();
const cm = new CartsManager("./src/carritos.json");

router.get("/api/carts", async (req, res) => {
  try {
    const carts = await cm.getCarts();
    res.status(200).send(carts);
  } catch (error) {
    res.status(500).send("Error al obtener productos");
  }
});

router.get("/api/carts/:cid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const cart = await cm.getCartById(cartId);
    if (cart) {
      res.status(200).send(cart);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al obtener el producto");
  }
});

router.post("/api/carts", (req, res) => {
  try {
    cm.addCart();
    res.status(200).send("Se agregó correctamente el carrito");
  } catch (error) {
    res.status(500).send("Error al agregar el producto");
  }
});

router.post("/api/carts/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    cm.updateCart(cartId, productId);
    res.status(200).send("Producto añadido al carrito");
  } catch (error) {
    res.status(500).send("Error al cargar el producto");
  }
});

export default router;
