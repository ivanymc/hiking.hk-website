/*
    Display Chat Box
*/
const CHAT_BOX_BUTTON = document.querySelector(".chat-box-button");
const CHAT_BOX_ICON = `chat-box-button bi bi-chat-text`;
const CHAT_BOX_CLOSE_ICON = `chat-box-button bi bi-x-circle`;

CHAT_BOX_BUTTON.addEventListener('click', e => {
    let chatBox = e.target.nextElementSibling;

    if (chatBox.style.display === "none") {
        chatBox.style.display = "flex"; // must be D-flex to align items 
        CHAT_BOX_BUTTON.classList = CHAT_BOX_CLOSE_ICON;
    } else {
        chatBox.style.display = "none";
        CHAT_BOX_BUTTON.classList = CHAT_BOX_ICON;
    }
})


/*
    Chat Box input - self messages
    Other Messages
*/
const CHAT_BOX_INPUT = document.querySelector(".chat-box-input");
const CHAT_BOX_UPPERGRID = document.querySelector(".chat-box-uppergrid");
const CHAT_BOX = document.querySelector(".chat-box");

// https://blog.techbridge.cc/2016/07/02/ChatBot-with-Wit/


/*
// Opening Message
CHAT_BOX.addEventListener('visibilitychange', e => {
    if(document.visibilityState === 'visible') {
        setTimeout( () => {
            let text = `<div class="chat-box-other-messages"> 
                            ${fakeMessagesArray[0]} 
                        </div>`;
            displayText(text);
        }, 1)
    }
})

/*
function openingMessage() {
    let text = 
    displayText(text);

    if (CHAT_BOX_INPUT.value) {
        text = `<div class="chat-box-other-messages"> 
        Hello, ${CHAT_BOX_INPUT.value}. What can I help you?
    </div>`;
    displayText(text);
    }
    
let fakeMessagesArray = [
    " Hello, I am Ivan. What's your name? ",
    
]
}
*/


// Auto Fake Reply
CHAT_BOX_INPUT.addEventListener('keypress', e => {
    if (e.key === "Enter" && CHAT_BOX_INPUT.value) {
        e.preventDefault();
        let text = `<div class="chat-box-self-messages">  
                        ${CHAT_BOX_INPUT.value} 
                    </div>`;
        displayText(text);
        CHAT_BOX_INPUT.disabled = true; // Avoid multi input crash the fake chatbot
        CHAT_BOX_INPUT.value = "";
        autoScrolltoBottom();
        setTimeout( () => {otherMessages()}, 1000); // Simulate Server delay
    }
})

function displayText(text) {
    CHAT_BOX_UPPERGRID.insertAdjacentHTML('beforeend', text);
}

function autoScrolltoBottom() {
    CHAT_BOX_UPPERGRID.scrollTop = CHAT_BOX_UPPERGRID.scrollHeight - CHAT_BOX_UPPERGRID.clientHeight;
}

function otherMessages() {
    let text = `<div class="chat-box-other-messages"> 
                    I don't understand.
                </div>`;
    typingMessages();
    setTimeout( () => {
        displayText(text);
        autoScrolltoBottom();
        CHAT_BOX_INPUT.disabled = false; // Avoid multi input crash the fake chatbot
    }, 2100)     
}
    
function typingMessages() {
    let text = `<div class="typing-messages">
                    <i class="fa-solid fa-spinner fa-spin-pulse"></i>
                    <span><i> Ivan is typing... </i></span>
                </div>` ;
    displayText(text);
    autoScrolltoBottom();
    setTimeout( () => {CHAT_BOX_UPPERGRID.lastChild.remove()}, 2000); 
}