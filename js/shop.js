/*
    Shop
    Add to Shopping Cart Button
*/
// QuerySelectorAll is nodelist
const ADD_TO_SHOPPING_CART_BUTTON = document.querySelectorAll('.add-to-shopping-cart');
const SHOPPING_CART_NUMBER = document.querySelector(".shopping-cart-number");



// load local storage shoppingCartNumber
let storage = JSON.parse(localStorage.getItem("ShoppingCart")) || [ ];
let shoppingCartNumber = 0;
if (storage.length != 0) {
    SHOPPING_CART_NUMBER.innerHTML = JSON.parse(localStorage.getItem("ShoppingCart")).length;
    shoppingCartNumber = JSON.parse(localStorage.getItem("ShoppingCart")).length;
};

// Count how many product added 
Array.from(ADD_TO_SHOPPING_CART_BUTTON).forEach( button => {
    button.addEventListener('click', e => {
        e.preventDefault();

        // Show in the cart number
        shoppingCartNumber++;
        SHOPPING_CART_NUMBER.innerHTML = shoppingCartNumber;

        // Add to shopping cart
        let productName = e.target.parentNode.previousElementSibling.previousElementSibling;
        let productImage = e.target.parentNode.parentNode.previousElementSibling.firstElementChild;
        let productPrice = e.target.previousElementSibling;

        // .outerHTML directly convert to string
        let text = '<div class="shopping-cart-items row">'
                        + '<div class="shopping-cart-image col">' 
                            + productImage.outerHTML
                        + '</div>'
                        + '<div class="colshopping-cart-product col">'
                            + productName.innerHTML
                        + '</div>'
                        + '<div class="shopping-cart-quantity col">'
                            + '<input type="button" value="-" class="buy-minus-button input-group-text disabled">'
                            + '<span class="buy-number form-control w-25">' 
                                +  '1'
                            + '</span>'
                            + '<input type="button" value="+" class="buy-add-button input-group-text">'
                        + '</div>'
                        + '<div class="shopping-cart-price col">'
                            + productPrice.innerHTML 
                        + '</div>'
                        + '<div class="shopping-cart-delete col-2">'
                            + '<i class="bi bi-trash3"></i>'
                        + '</div>'
                    + '</div>'
        
        // Add the number and shopping list to local storage
        storage.push( { 
            shoppingCartNumber: shoppingCartNumber,
            shoppingList: text
         } );

        storage.push( { 
            shoppingCartNumber: shoppingCartNumber,
            shoppingList: text
         } );


        localStorage.setItem("ShoppingCart", shoppingCartNumber);
        localStorage.setItem("ShoppingCart", JSON.stringify(storage));
    })
});    



