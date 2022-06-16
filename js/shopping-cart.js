
/*
    Shopping Cart
*/

// load local storage shopping Cart List
let storage = JSON.parse(localStorage.getItem("shoppingCartNumber")) || [ ];
let shoppingCartNumber = 0;
if (storage.length != 0) {
    SHOPPING_CART_NUMBER.innerHTML = JSON.parse(localStorage.getItem("shoppingCartNumber")).length;
    shoppingCartNumber = JSON.parse(localStorage.getItem("shoppingCartNumber")).length;
};

// Add to shopping cart
const SHOPPING_CART_LIST = document.querySelector('.shopping-cart-list');
SHOPPING_CART_LIST.insertAdjacentHTML("afterbegin", text);

// button.disabled = true; // avoid multi click