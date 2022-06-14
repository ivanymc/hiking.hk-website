/*
    Display Shopping Cart
*/
const SHOPPING_CART_BUTTON = document.querySelector(".shopping-cart-button");
const SHOPPING_CART_NUMBER = document.querySelector(".shopping-cart-number");

function displayShoppingCart(e) {
    let shoppingCart = e.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling;

    if (shoppingCart.style.display === "none") {
        shoppingCart.style.display = "flex"; // must be D-flex to align items 
    } else {
        shoppingCart.style.display = "none";
    } 
}

SHOPPING_CART_BUTTON.addEventListener('click', displayShoppingCart)
SHOPPING_CART_NUMBER.addEventListener('click', displayShoppingCart)


/*
    Add to Shopping Cart Button
*/
const ADD_TO_SHOPPING_CART_BUTTON = document.querySelectorAll('.add-to-shopping-cart');
const SHOPPING_CART_LIST = document.querySelector('.shopping-cart-uppergrid');
const SHOPPING_CART = document.querySelector('.shopping-cart');


// QuerySelectorAll is nodelist
Array.from(ADD_TO_SHOPPING_CART_BUTTON).forEach( button => {
    button.addEventListener('click', e => {
        e.preventDefault();
        let productName = e.target.parentNode.previousElementSibling.previousElementSibling;
        let productImage = e.target.parentNode.parentNode.previousElementSibling.firstElementChild;
        let productPrice = e.target.previousElementSibling;

        // .outerHTML directly convert to string
        let text = productName.outerHTML + productImage.outerHTML + productPrice.outerHTML 
        
        SHOPPING_CART_LIST.insertAdjacentHTML("afterbegin", text);
        if (SHOPPING_CART.style.display === "none") {
            SHOPPING_CART.style.display = "flex";
        }  
        button.disabled = true; // avoid multi click

    })
});


