/* --------CAPA DE INTERACCION---------- */
import express from "express";
import ProductManager from "./productMaganer.js";
import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/carts.router.js";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";

const app = express();
const httpServer = app.listen(8080, () => console.log("Server running in port 8080"));
const socketServer = new Server(httpServer);

app.use(express.urlencoded({ extended: true }));

const pm = new ProductManager("./productos.json");
app.use(express.json()); // Esto devuelve un middleware
app.use(routerProducts);
app.use(routerCarts);
app.use(express.static(__dirname + "/public"));
app.use("/", viewsRouter);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

/* --------Test de vida del servidor---------- */
app.get("/ping", (req, res) => res.status(200).send("Pong!"));
/* ------------------------------------------- */
