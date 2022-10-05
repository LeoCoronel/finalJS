const shoesContainer = document.querySelector('.shop__shoes');

const renderShoe = (shoe) => {
    const { id, name, price, image, description } = shoe;
    return `
        <div class="sneakerCard glass" id="${id}">
            <div> 
                <img src="${image ? image : "https://voax.co/img/noitem.png"}" alt="">
                <p class="sneakerCard__price">${price}</p>
            </div>
            <div class="sneak__desc">
                <p class="sneakerCard__name">${name}</p>
                <button>Comprar</button>
            </div>
        </div>
    `
}

const renderShoes = () => {
    shoesContainer.innerHTML += SHOES.map(renderShoe).join('');
}

const render = () => {
    // Cargar contenido en el dom
    document.addEventListener('DOMContentLoaded', renderShoes());
}

render();
