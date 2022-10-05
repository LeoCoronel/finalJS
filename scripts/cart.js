const cartLogo = document.querySelector("#cart-logo");
const cartContainer = document.querySelector(".cart");
const btnAdd = document.querySelectorAll(".btn__add");
const cartProductsContainer = document.querySelector(".product-cart-list");
const cartTotal = document.querySelector(".totalPrice");
const cartBuyBtn = document.querySelector(".buyCartBtn");
const minusBtn = document.querySelector("minusQty");
const plusQty = document.querySelector("minusQty");

// Show cart
showCart = () => {
  if (cartContainer.classList.contains("hidden")) {
    cartContainer.classList.remove("hidden");
  } else {
    cartContainer.classList.add("hidden");
  }
};

// Inicializar carrito vacio o con lo que hay en localStorage
let cart = JSON.parse(localStorage.getItem("cartShoes")) || [];

const saveLocalStorage = (arr) => {
  localStorage.setItem("cartShoes", JSON.stringify(arr));
};

// Render producto
const renderCartProduct = (cartProduct) => {
  const { id, name, price, img, quantity } = cartProduct;
  return `
        <div class="cartProduct">
            <div class="cartProdInfo">
                <img src=${img} class="cartProdImg"></img>
                <div class="cartProdText">
                    <h5>${name}</h5>
                    <p>$${price}</p>
                </div>
                <div class="cartProductQty">
                    <div class="qtyButtons">
                        <button class="minusQty" data-id=${id}>-</button>
                        <p data-id=${id}>${quantity}</p>
                        <button class="plusQty"} data-id=${id}>+</button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Handle quantity
const handleQuantity = (e) => {
  if (e.target.classList.contains("minusQty")) {
    console.log("click");
    const existingCartItem = cart.find(
      (item) => item.id === e.target.dataset.id
    );

    if (existingCartItem.quantity === 1) {
      if (window.confirm("Do you wish to delete this product?")) {
        cart = cart.filter((prod) => prod.id !== existingCartItem.id);
        saveLocalStorage(cart);
        renderCart(cart);
        showTotal(cart);
        disableBuy();
        return;
      }
    }
    cart = cart.map((item) => {
      return item.id === existingCartItem.id
        ? { ...item, quantity: Number(item.quantity) - 1 }
        : item;
    });
  } else if (e.target.classList.contains("plusQty")) {
    const existingCartItem = cart.find(
      (item) => item.id === e.target.dataset.id
    );

    cart = cart.map((item) => {
      return item.id === existingCartItem.id
        ? { ...item, quantity: Number(item.quantity) + 1 }
        : item;
    });
  }
  saveLocalStorage(cart);
  renderCart(cart);
  showTotal(cart);
  disableBuy();
};

// Render Cart
const renderCart = (cart) => {
  if (!cart.length) {
    cartProductsContainer.innerHTML = `<p class="empty-cart">No items on the cart.</p>`;
    return;
  }
  cartProductsContainer.innerHTML = cart.map(renderCartProduct).join("");
};

// Total calc
const showTotal = (cart) => {
  cartTotal.innerHTML = `$${cart
    .reduce((acc, val) => acc + Number(val.price) * val.quantity, 0)
    .toFixed(2)}`;
};

// Disable buy btn
const disableBuy = () => {
  if (!cart.length) {
    cartBuyBtn.classList.add("disabled");
  } else {
    cartBuyBtn.classList.add("remove");
  }
};

const addProduct = (e) => {
  if (!e.target.classList.contains("btn__add")) return;

  // instanciamos producto
  const product = {
    id: e.target.dataset.id,
    name: e.target.dataset.name,
    price: e.target.dataset.price,
    img: e.target.dataset.img,
  };

  // Checkear si existe en el carrito
  const exist = cart.find((item) => item.id == product.id);
  if (exist) {
    cart = cart.map((item) => {
      return item.id === product.id
        ? { ...item, quantity: Number(item.quantity) + 1 }
        : item;
    });
  } else {
    cart = [...cart, { ...product, quantity: 1 }];
  }
  saveLocalStorage(cart);
  renderCart(cart);
  showTotal(cart);
  disableBuy();
};

const completeBuy = () => {
  if (!cart.length) return;
  if (window.confirm("Do you want to buy?")) {
    localStorage.removeItem("shoeCart");
    window.location.reload();
  }
};

const cartInitializer = () => {
  document.addEventListener("DOMContentLoaded", renderCart(cart));
  document.addEventListener("DOMContentLoaded", showTotal(cart));
  document.addEventListener("DOMContentLoaded", disableBuy(cart));
  shoesContainer.addEventListener("click", addProduct);
  shoesContainer.addEventListener("click", handleQuantity);
  cartLogo.addEventListener("click", showCart);
  cartBuyBtn("click", completeBuy);
};

cartInitializer();
