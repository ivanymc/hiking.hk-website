/*
    Shopping Cart
*/

// load shopping list local storage already declared in shop.js
shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [ ];
cartTotalNumber = JSON.parse(localStorage.getItem("cartTotalNumber")) || [ ];
if (cartTotalNumber.length != 0) {
    SHOPPING_CART_NUMBER.innerHTML = JSON.parse(localStorage.getItem("cartTotalNumber")).length;
    shoppingCartNumber = JSON.parse(localStorage.getItem("cartTotalNumber")).length;
};

let shoppingList_htmlel = [ ];
const SHOPPING_CART_LIST = document.querySelector('.shopping-cart-list');

// create htmlel, insert and save to local storage
for (let i = 0; i < shoppingList.length; i++) {
    shoppingList_htmlel.push(`<div id="${shoppingList[i].id}" class="shopping-cart-items row">
                            <div class="shopping-cart-image col"> 
                                ${shoppingList[i].img}
                            </div>
                            <div class="colshopping-cart-product col">
                                ${shoppingList[i].name}
                            </div>
                            <div class="shopping-cart-quantity col">
                                <button type="button" class="buy-minus-button btn btn-secondary"> - </button>
                                <span class="buy-number form-control w-25 mx-1"> 
                                    ${shoppingList[i].quantity}
                                </span>
                                <button type="button" class="buy-add-button btn btn-secondary"> + </button>
                            </div>
                            <div class="shopping-cart-price col">
                            <span class="dollor-sign">$ </span>
                                ${shoppingList[i].price} 
                            </div>
                            <div class="shopping-cart-delete col-2">
                                <i class="bi bi-trash3"></i>
                            </div>
                        </div>`);

    SHOPPING_CART_LIST.insertAdjacentHTML('afterbegin', shoppingList_htmlel[i]);
    localStorage.setItem("shoppingList_htmlel", JSON.stringify(shoppingList_htmlel));   
}


// Add quantity
const BUY_ADD_BUTTON = document.querySelectorAll('.buy-add-button');

Array.from(BUY_ADD_BUTTON).forEach( button => {
    button.addEventListener('click', e=> {
        e.preventDefault();

        // Enable the minus button when buy number change from 1 to 2
        let minusButton = e.target.previousElementSibling.previousElementSibling;
        minusButton.disabled = false;

        // Update Total number and local stoarge
        shoppingCartNumber++;
        SHOPPING_CART_NUMBER.innerHTML = shoppingCartNumber;        
        cartTotalNumber.push({
            cartTotalNumber: shoppingCartNumber
        })
        localStorage.setItem("cartTotalNumber", JSON.stringify(cartTotalNumber));

        // Update buyNumber and local stoarge
        let buyNumber = e.target.previousElementSibling; // different from BUY_MINUS_BUTTON,
        buyNumber.innerHTML++;
        
        let productID = e.target.parentNode.parentNode; // this is different from shop.js, block scope
        for (let i = 0; i < shoppingList.length; i++) {
            if ( productID.id == shoppingList[i].id ) {     // check id already exist, if yes
                shoppingList[i].quantity++;
                localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
                return;
            }
        }    
    })
})

   
// Minus quantity
const BUY_MINUS_BUTTON = document.querySelectorAll('.buy-minus-button');

Array.from(BUY_MINUS_BUTTON).forEach( button => {
    button.addEventListener('click', e => {
        e.preventDefault();

        // stop when item equal 1
        let buyNumber = e.target.nextElementSibling;  // different from BUY_ADD_BUTTON, block scope
        let minusButton = e.target;        
        if (buyNumber.innerHTML <= 1) {   
            /*
                buyer need to click one more click
                to disabled the button
                bug need to fix
                because this is inside button event listener
            */
            minusButton.disabled = true;
            return;   
        }    

        // Update Total number and local stoarge
        shoppingCartNumber--;
        SHOPPING_CART_NUMBER.innerHTML = shoppingCartNumber;        
        cartTotalNumber.splice(-1);
        localStorage.setItem("cartTotalNumber", JSON.stringify(cartTotalNumber));

        // Update buyNumber and local stoarge       
        // if buyNumber > 1        
        buyNumber.innerHTML--;                 
        let productID = e.target.parentNode.parentNode;   
            for (let i = 0; i < shoppingList.length; i++) {
                if ( productID.id == shoppingList[i].id ) {     // check id already exist, if yes
                    shoppingList[i].quantity--;
                    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
                    return;
                }
            }
    })
})



// Display items subtotal
const ITEM_PRICE_SUBTOTAL = document.querySelector('.items-price-subtotal');
const DELIVERY_FEES_SUBTOTAL = document.querySelector('.delivery-fees-subtotal');
const ITEM_DISCOUNT_SUBTOTAL = document.querySelector('.items-discount-subtotal');
const ITEM_PRICE_TOTAL = document.querySelector('.items-price-total');

function displaySubtotal() {
    let subtotal = [ ];

    for (let i = 0; i < shoppingList.length; i++ ) {
        subtotal.push(shoppingList[i].quantity * shoppingList[i].price);
        console.log(subtotal);

    }
    subtotal.forEach( item => item);
        console.log(subtotal);
}
