const socket = io();

const form = document.getElementById("productForm");
const productList = document.getElementById("productList");
const button = document.getElementById("button");

button.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const code = document.getElementById("code").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;
  const newProduct = { title, description, price, code, stock, category };

  socket.emit("newProduct", newProduct);
});

socket.on("card", (data) => {
  const allCArds = data.map((prod) => {
    return `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">${prod.title}</h5>
    <p class="card-text">${prod.description}</p>
    <p class="card-text">$ ${prod.price}</p>
    </div>
    </div>
    `;
  });
  productList.innerHTML = allCArds.join("");
});
