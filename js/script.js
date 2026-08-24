"use strict";

const products = [
    {
        id: 1,
        name: "Step Runner",
        category: "corrida",
        price: 299.90,
        image: "./images/step-runner.jfif",
        description: "Tênis leve e confortável para acompanhar seus treinos e corridas."
    },
    {
        id: 2,
        name: "Urban Move",
        category: "casual",
        price: 249.90,
        image: "./images/urban-move.jfif",
        description: "Estilo e conforto para o dia a dia."
    },
    {
        id: 3,
        name: "Court Pro",
        category: "basquete",
        price: 399.90,
        image: "./images/court-pro.jfif",
        description: "Desempenho e estabilidade para dominar as quadras."
    },
    {
        id: 4,
        name: "Goal Elite",
        category: "futebol",
        price: 349.90,
        image: "./images/goal-elite.jfif",
        description: "Precisão e velocidade para quem vive o futebol."
    },
    {
        id: 5,
        name: "Street One",
        category: "casual",
        price: 279.90,
        image: "./images/street-one.jfif",
        description: "Um visual moderno para completar seu estilo."
    },
    {
        id: 6,
        name: "Runner X",
        category: "corrida",
        price: 329.90,
        image: "./images/runner-x.jfif",
        description: "Amortecimento e leveza para seus melhores quilômetros."
    },
    {
        id: 7,
        name: "Dunk Force",
        category: "basquete",
        price: 429.90,
        image: "./images/dunk-force.jfif",
        description: "Potência e suporte para suas jogadas."
    },
    {
        id: 8,
        name: "Speed Pro",
        category: "futebol",
        price: 379.90,
        image: "./images/speed-pro.jfif",
        description: "Velocidade e controle para dominar o campo."
    }
];

let cart = [];
let selectedProduct = null;

const productsGrid = document.querySelector("#products-grid");
const productDetailsSection = document.querySelector("#produto-detalhes");
const productsSection = document.querySelector("#produtos");
const detailProductImage = document.querySelector("#detail-product-image");
const detailProductCategory = document.querySelector("#detail-product-category");
const detailProductName = document.querySelector("#detail-product-name");
const detailProductDescription = document.querySelector("#detail-product-description");
const detailProductPrice = document.querySelector("#detail-product-price");
const backToProductsButton = document.querySelector("#back-to-products");

// CART //
const detailAddToCart = document.querySelector("#detail-add-to-cart");
const cartButton = document.querySelector("#cart-button");
const cartCount = document.querySelector("#cart-count");
const cartSection = document.querySelector("#carrinho");
const cartItems = document.querySelector("#cart-items");
const emptyCart = document.querySelector("#empty-cart");
const cartSummary = document.querySelector("#cart-summary");
const cartSubtotal = document.querySelector("#cart-subtotal");
const cartShipping = document.querySelector("#cart-shipping");
const cartTotal = document.querySelector("#cart-total");

// Sessões //
const homeSection = document.querySelector("#home");
const checkoutSection = document.querySelector("#checkout");
const successSection = document.querySelector("#sucesso");

// Checkout //
const checkoutButton = document.querySelector("#checkout-button");
const checkoutForm = document.querySelector("#checkout-form");
const backToHomeButton = document.querySelector("#back-to-home");
const orderNumber = document.querySelector("#order-number");
const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");

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

// ==================== DETALHES DO PRODUTO ====================

function showProductDetails(productId) {
    const product = products.find(product => product.id === productId);

    if (!product) {
        return;
    }

    selectedProduct = product;

    detailProductImage.src = product.image;
    detailProductImage.alt = product.name;
    detailProductCategory.textContent = product.category;
    detailProductName.textContent = product.name;
    detailProductDescription.textContent = product.description;
    detailProductPrice.textContent = `R$ ${product.price.toFixed(2).replace(".", ",")}`;

    productsSection.classList.add("hidden");
    productDetailsSection.classList.remove("hidden");
}

productsGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-id]");

    if (!button) {
        return;
    }

    const productId = Number(button.dataset.id);

    showProductDetails(productId);
});

backToProductsButton.addEventListener("click", () => {
    showSection(productsSection);
});

// ==================== CARRINHO ====================

function addToCart() {
    if (!selectedProduct) {
        return;
    }

    const existingProduct = cart.find(item => item.id === selectedProduct.id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            ...selectedProduct,
            quantity: 1
        });
    }

    updateCartCount();
    renderCart();
}

detailAddToCart.addEventListener("click", addToCart);

function renderCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        emptyCart.classList.remove("hidden");
        cartSummary.classList.add("hidden");
        return;
    }

    emptyCart.classList.add("hidden");
    cartSummary.classList.remove("hidden");

    cart.forEach(item => {
        const cartItem = document.createElement("article");

        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img class="cart-item-image" src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3 class="cart-item-name">${item.name}</h3>
                <span class="cart-item-price">R$ ${item.price.toFixed(2).replace(".", ",")}</span>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-button" type="button" data-action="decrease" data-id="${item.id}">−</button>
                <span>${item.quantity}</span>
                <button class="quantity-button" type="button" data-action="increase" data-id="${item.id}">+</button>
            </div>
            <button class="remove-item" type="button" data-action="remove" data-id="${item.id}">Remover</button>
        `;

        cartItems.appendChild(cartItem);
    });

    updateCartTotal();
}

function updateCartTotal() {
    const subtotal = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const shipping = subtotal > 0 ? 20 : 0;
    const total = subtotal + shipping;

    cartSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace(".", ",")}`;
    cartShipping.textContent = `R$ ${shipping.toFixed(2).replace(".", ",")}`;
    cartTotal.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    cartCount.textContent = totalItems;
}

cartButton.addEventListener("click", () => {
    showSection(cartSection);
    renderCart();
});

// ==================== CONTROLE DO CARRINHO ====================

cartItems.addEventListener("click", event => {
    const button = event.target.closest("[data-action]");

    if (!button) {
        return;
    }

    const productId = Number(button.dataset.id);
    const action = button.dataset.action;

    const product = cart.find(item => item.id === productId);

    if (!product) {
        return;
    }

    if (action === "increase") {
        product.quantity++;
    }

    if (action === "decrease") {
        product.quantity--;

        if (product.quantity === 0) {
            cart = cart.filter(item => item.id !== productId);
        }
    }

    if (action === "remove") {
        cart = cart.filter(item => item.id !== productId);
    }

    updateCartCount();
    renderCart();
});

// ==================== NAVEGAÇÃO ====================

const sections = [
    homeSection,
    productsSection,
    productDetailsSection,
    cartSection,
    checkoutSection,
    successSection
];

function showSection(section) {
    sections.forEach(currentSection => {
        currentSection.classList.add("hidden");
    });

    section.classList.remove("hidden");
}

const logo = document.querySelector("#logo");
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            showSection(targetSection);
        }

        mainNav.classList.remove("active");
    });
});

checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
        return;
    }

    showSection(checkoutSection);
});

// ==================== CHECKOUT ====================

checkoutForm.addEventListener("submit", event => {
    event.preventDefault();

    if (cart.length === 0) {
        return;
    }

    const formData = new FormData(checkoutForm);
    const customerName = formData.get("name");

    const generatedOrderNumber = Math.floor(100000 + Math.random() * 900000);

    orderNumber.textContent = `#${generatedOrderNumber}`;

    showSection(successSection);

    checkoutForm.reset();
    cart = [];
    updateCartCount();
    renderCart();
});

// ==================== MENU MOBILE ====================

menuButton.addEventListener("click", () => {
    mainNav.classList.toggle("active");
});

const continueShoppingButton = document.querySelector("#continue-shopping");

continueShoppingButton.addEventListener("click", () => {
    showSection(productsSection);
});

logo.addEventListener("click", event => {
    event.preventDefault();

    showSection(homeSection);
    mainNav.classList.remove("active");
});