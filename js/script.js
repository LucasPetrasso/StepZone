"use strict";

const products = [
    {
        id: 1,
        name: "Step Runner",
        category: "corrida",
        price: 299.90,
        image: "./assets/images/step-runner.jpg",
        description: "Tênis leve e confortável para acompanhar seus treinos e corridas."
    },
    {
        id: 2,
        name: "Urban Move",
        category: "casual",
        price: 249.90,
        image: "./assets/images/urban-move.jpg",
        description: "Estilo e conforto para o dia a dia."
    },
    {
        id: 3,
        name: "Court Pro",
        category: "basquete",
        price: 399.90,
        image: "./assets/images/court-pro.jpg",
        description: "Desempenho e estabilidade para dominar as quadras."
    },
    {
        id: 4,
        name: "Goal Elite",
        category: "futebol",
        price: 349.90,
        image: "./assets/images/goal-elite.jpg",
        description: "Precisão e velocidade para quem vive o futebol."
    },
    {
        id: 5,
        name: "Street One",
        category: "casual",
        price: 279.90,
        image: "./assets/images/street-one.jpg",
        description: "Um visual moderno para completar seu estilo."
    },
    {
        id: 6,
        name: "Runner X",
        category: "corrida",
        price: 329.90,
        image: "./assets/images/runner-x.jpg",
        description: "Amortecimento e leveza para seus melhores quilômetros."
    },
    {
        id: 7,
        name: "Dunk Force",
        category: "basquete",
        price: 429.90,
        image: "./assets/images/dunk-force.jpg",
        description: "Potência e suporte para suas jogadas."
    },
    {
        id: 8,
        name: "Speed Pro",
        category: "futebol",
        price: 379.90,
        image: "./assets/images/speed-pro.jpg",
        description: "Velocidade e controle para dominar o campo."
    }
];

const productsGrid = document.querySelector("#products-grid");

function renderProducts(productsList) {
    productsGrid.innerHTML = "";

    productsList.forEach(product => {
        const productCard = document.createElement("article");

        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <div class="product-card-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-card-content">
                <span class="product-category">${product.category}</span>
                <h3 class="product-card-title">${product.name}</h3>
                <p class="product-card-description">${product.description}</p>
                <div class="product-card-footer">
                    <span class="product-price">R$ ${product.price.toFixed(2).replace(".", ",")}</span>
                    <button class="button" type="button" data-id="${product.id}">Ver produto</button>
                </div>
            </div>
        `;

        productsGrid.appendChild(productCard);
    });
}

renderProducts(products);

// ==================== FILTROS ====================

const filterButtons = document.querySelectorAll(".filter-button");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.dataset.category;

        filterButtons.forEach(button => {
            button.classList.remove("active");
        });

        button.classList.add("active");

        if (category === "todos") {
            renderProducts(products);
            return;
        }

        const filteredProducts = products.filter(product => {
            return product.category === category;
        });

        renderProducts(filteredProducts);
    });
});