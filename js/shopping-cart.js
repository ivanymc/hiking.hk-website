/*
    Shopping Cart
*/

// load shopping list local storage already declared in shop.js
// put shop.js script in shopping-cart.html


// Display items subtotal
const ITEM_PRICE_SUBTOTAL = document.querySelector('.items-price-subtotal');
const DELIVERY_FEES_SUBTOTAL = document.querySelector('.delivery-fees-subtotal');
const ITEM_DISCOUNT_SUBTOTAL = document.querySelector('.items-discount-subtotal');
const ITEM_PRICE_TOTAL = document.querySelector('.items-price-total');
const DELIVERY_WAY = document.querySelector('#delivery-way');

// Display Item Price
function displayItemPriceSubtotal() {
    let itemsPriceSubtotal = [ ];
    for (let i = 0; i < shoppingList.length; i++ ) {
        itemsPriceSubtotal.push(shoppingList[i].quantity * shoppingList[i].price);      
    }

    ITEM_PRICE_SUBTOTAL.innerHTML = "$ " + itemsPriceSubtotal.reduce( (a, b) => a + b, 0);
};

// Display Delivery Fee
DELIVERY_WAY.addEventListener('change', function() {
    if (this.value == "1") {
        DELIVERY_FEES_SUBTOTAL.innerHTML = "$ " + 0;
    } else if (this.value == "2") {
        DELIVERY_FEES_SUBTOTAL.innerHTML = "$ " + 20;
    } else if (this.value == "3") {
        DELIVERY_FEES_SUBTOTAL.innerHTML = "$ " + 40;
    }
    displayTotalPrice();
});

// Display Total Price
function displayTotalPrice() {    
    // remove "$" and change from string to number
    ITEM_PRICE_TOTAL.innerHTML = "$ "
                                + ( parseInt(ITEM_PRICE_SUBTOTAL.innerHTML.substring(2))
                                + parseInt(DELIVERY_FEES_SUBTOTAL.innerHTML.substring(2)) );
};



// create htmlel, insert and save to local storage
let shoppingList_htmlel = [ ];
const SHOPPING_CART_LIST = document.querySelector('.shopping-cart-list');

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
                            <div class="shopping-cart-price col ps-4">
                            <span class="dollor-sign">$ </span>
                                ${shoppingList[i].price} 
                            </div>
                            <div class="shopping-cart-delete col-2 ps-4">
                                <i class="shopping-cart-delete-button bi bi-trash3"></i>
                            </div>
                        </div>`);

    SHOPPING_CART_LIST.innerHTML = ""; //remove .shopping-cart-list-msg-before-any-items
    SHOPPING_CART_LIST.insertAdjacentHTML('beforeend', shoppingList_htmlel[i]);
    localStorage.setItem("shoppingList_htmlel", JSON.stringify(shoppingList_htmlel)); 
    displayItemPriceSubtotal();
    displayTotalPrice();
}


// Add quantity +++++++++++++
const BUY_ADD_BUTTON = document.querySelectorAll('.buy-add-button');

Array.from(BUY_ADD_BUTTON).forEach( button => {
    button.addEventListener('click', e=> {
        e.preventDefault();

        // Enable the minus button when buy number change from 1 to 2
        let minusButton = e.target.previousElementSibling.previousElementSibling;
        minusButton.disabled = false;

        // Update Total number and local stoarge
        SHOPPING_CART_NUMBER.innerHTML = parseInt(SHOPPING_CART_NUMBER.innerHTML) + 1;  
        cartTotalNumber.push({
            cartTotalNumber: SHOPPING_CART_NUMBER.innerHTML,
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
                displayItemPriceSubtotal();
                displayTotalPrice();
                return;
            }
        }
    })
})

   
// Minus quantity ----------------
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

        // if buyNumber > 1 
        // Update Total number and local stoarge
        SHOPPING_CART_NUMBER.innerHTML = parseInt(SHOPPING_CART_NUMBER.innerHTML) - 1;      
        cartTotalNumber.splice(-1);  // remove last one
        localStorage.setItem("cartTotalNumber", JSON.stringify(cartTotalNumber));

        // Update buyNumber and local stoarge      
        buyNumber.innerHTML--;                 
        let productID = e.target.parentNode.parentNode;   
            for (let i = 0; i < shoppingList.length; i++) {
                if ( productID.id == shoppingList[i].id ) {     // check id already exist, if yes
                    shoppingList[i].quantity--;
                    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
                    displayItemPriceSubtotal();
                    displayTotalPrice();
                    return;
                }
            }
    })
})


// Delete button
const SHOPPING_CART_DELETE_BUTTON = document.querySelectorAll('.shopping-cart-delete-button');

Array.from(SHOPPING_CART_DELETE_BUTTON).forEach( button => {
    button.addEventListener('click', e => {
    let product = e.target.parentNode.parentNode;
    product.remove();
    

    for (let i = 0; i < shoppingList.length; i++) {
        if ( product.id == shoppingList[i].id ) { 

            // remove total number local storage
            // do not care where to start splice, because count .length as the total number
            SHOPPING_CART_NUMBER.innerHTML = parseInt(SHOPPING_CART_NUMBER.innerHTML) - shoppingList[i].quantity;
            cartTotalNumber.splice(0, shoppingList[i].quantity);
            localStorage.setItem("cartTotalNumber", JSON.stringify(cartTotalNumber));            

            // remove shoppinglist local storage contain product.id
            shoppingList.splice(i, 1);  
            localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
            
            displayItemPriceSubtotal();
            displayTotalPrice();
            return;
        }
    }
    })
});


// Submit button
const CHECKOUT_BUTTON = document.querySelector('.checkout-button');

CHECKOUT_BUTTON.addEventListener('click', e => {
    e.preventDefault();
    if(confirm("要課金了嗎 ?")) {
        localStorage.clear();
        location.reload();
    } else {
        return;
    }
});
