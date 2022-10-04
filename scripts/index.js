const shoesContainer = document.querySelector('.shoes__container');
const shoeGallery = document.querySelector('.shop__gallery__cards');

const renderShoe = (shoe) => {
    const { id, name, price, image, description } = shoe;
    return `
        <div class="sneakerCard" id="${id}">
            <div> 
                <img src="${image ? image : "https://voax.co/img/noitem.png"}" alt="">
                <p class="sneakerCard__price">${price}</p>
            </div>
            <p class="sneakerCard__name">${name}</p>
        </div>
    `
}

const renderShoes = () => {
    //shoesContainer.innerHTML += SHOES.map(renderShoe).join('');
}

const render3Shoes = () => {
    console.log("ASASDK")
    let randomNumber = Math.floor(Math.random() * 11);
    let random3 = SHOES.slice(randomNumber, randomNumber + 3);
    shoeGallery.innerHTML += random3.map(renderShoe).join('');
}

const render = () => {
    // Cargar contenido en el dom
    document.addEventListener('DOMContentLoaded', renderShoes());
    document.addEventListener('DOMContentLoaded', render3Shoes());
    
}

render();