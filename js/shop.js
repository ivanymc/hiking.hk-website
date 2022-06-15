/*
    Add to Shopping Cart Button
*/
const SHOPPING_CART_NUMBER = document.querySelector(".shopping-cart-number");
// QuerySelectorAll is nodelist
const ADD_TO_SHOPPING_CART_BUTTON = document.querySelectorAll('.add-to-shopping-cart');

// load local storage shoppingCartNumber
let storage = JSON.parse(localStorage.getItem("shoppingCartNumber")) || [ ];
let shoppingCartNumber = 0;
if (storage.length != 0) {
    SHOPPING_CART_NUMBER.innerHTML = JSON.parse(localStorage.getItem("shoppingCartNumber")).length;
    shoppingCartNumber = JSON.parse(localStorage.getItem("shoppingCartNumber")).length;
};

// Count how many product added 
Array.from(ADD_TO_SHOPPING_CART_BUTTON).forEach( button => {
    button.addEventListener('click', e => {
        e.preventDefault();
        shoppingCartNumber++;
        SHOPPING_CART_NUMBER.innerHTML = shoppingCartNumber;

        // Add to local storage
        storage.push( { shoppingCartNumber: shoppingCartNumber } );
        localStorage.setItem("shoppingCartNumber", JSON.stringify(storage));
    })
});       
