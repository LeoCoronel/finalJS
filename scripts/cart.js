const cartLogo = document.querySelector("#cart-logo");
const cartContainer = document.querySelector(".cart");

// Show cart
showCart = () => {
    if(cartContainer.classList.contains("hidden")) {
        cartContainer.classList.remove("hidden");
    } else {
        cartContainer.classList.add("hidden");
    }
}

cartLogo.addEventListener("click", showCart);