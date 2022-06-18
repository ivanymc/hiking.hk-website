/*
    Shop
    Add to Shopping Cart Button
*/
// QuerySelectorAll is nodelist
const ADD_TO_SHOPPING_CART_BUTTON = document.querySelectorAll('.add-to-shopping-cart');
const SHOPPING_CART_NUMBER = document.querySelector(".shopping-cart-number");

const MARKETPLACE_TOOLTIP = document.querySelectorAll('.marketplace-tooltip');


// load local storage shopping Cart Number
let cartTotalNumber = JSON.parse(localStorage.getItem("cartTotalNumber")) || [ ];
if (cartTotalNumber.length != 0) {
    SHOPPING_CART_NUMBER.innerHTML = JSON.parse(localStorage.getItem("cartTotalNumber")).length;
};

let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [ ];


// Every time click the shopping cart buttons
// count total number
// Add the product into local storage
// let cart.js can use the local storage
Array.from(ADD_TO_SHOPPING_CART_BUTTON).forEach( button => {
    button.addEventListener('click', e => {
        e.preventDefault();

        let tooltip = e.target.nextElementSibling;
        console.log(tooltip);
        tooltip.style.display = "block";
            setTimeout( () => {
                tooltip.style.display = "none"
            }, 2000)       
        
        // Count how many product added, and show in the cart number
        SHOPPING_CART_NUMBER.innerHTML = parseInt(SHOPPING_CART_NUMBER.innerHTML) + 1;

        // Add the number and shopping list to local storage
        cartTotalNumber.push( { 
            cartTotalNumber: SHOPPING_CART_NUMBER.innerHTML,
        } );
        localStorage.setItem("cartTotalNumber", JSON.stringify(cartTotalNumber));


        // Add to shopping cart
        let productName = e.target.parentNode.previousElementSibling.previousElementSibling;
        let productImage = e.target.parentNode.parentNode.previousElementSibling.firstElementChild;
        let productPrice = e.target.previousElementSibling;
        let productID = e.target.parentNode.parentNode.parentNode;
        let productQuantity = 1;
        // if(shoppingList.length != 0) {
        //     productQuantity =  JSON.parse(localStorage.getItem("shoppingList")).quantity;
        // }
        // console.log(productQuantity);

        // If item alreay exist in local storage , only increase quantity, not add new object
        if (shoppingList.length > 0 ) {                         // if something already exist
            for (let i = 0; i < shoppingList.length; i++) {
                if ( productID.id == shoppingList[i].id ) {     // check id already exist, if yes
                    shoppingList[i].quantity++;
                    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
                    return;
                } else if ( i == shoppingList.length - 1 ) {    //  if not exist and only push once eg: i = 0 , i < 1 , only loop once
                    shoppingList.push ({
                        id: productID.id,
                        name: productName.innerHTML,
                        quantity: productQuantity,            
                        price: productPrice.innerHTML,
                        img: productImage.outerHTML,
                    });
                    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
                    return;
                }
            }
        } else {{                                               // first one
            shoppingList.push ({
                id: productID.id,
                name: productName.innerHTML,
                quantity: productQuantity,            
                price: productPrice.innerHTML,
                img: productImage.outerHTML,
            });
            localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
        }};         
    })
})        
 