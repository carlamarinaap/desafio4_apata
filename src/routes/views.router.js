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

export default router;
