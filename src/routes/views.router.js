import express from "express";
const router = express.Router();

import ProductManager from "../productMaganer.js";
const pm = new ProductManager("./src/productos.json");

router.get("/", async (req, res) => {
  const products = await pm.getProducts();
  res.render("home", { products });
});

router.get("/socket", (req, res) => {
  res.render("socket");
});

router.get("/realTimeProducts", async (req, res) => {
  const products = await pm.getProducts();
  res.render("realTimeProducts", { products });
});
router.post("/realTimeProducts", async (req, res) => {
  try {
    await pm.addProduct(req.body);
    const products = await pm.getProducts();
    res.status(200).render("realTimeProducts", { products });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
