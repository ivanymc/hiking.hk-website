let textFont = document.getElementById("textHeadContainer");
let fontRange = document.getElementById("fontRange");


function changeFontSizeSm() {
    textFont.style.fontSize = "14px";   
    fontRange.value = 14;
};

function changeFontSizeMd() {
    textFont.style.fontSize = "17px";
    fontRange.value = 17;
};

function changeFontSizeLg() {
    textFont.style.fontSize = "26px";
    fontRange.value = 26;
};

function changeFontSizeRange() {
    textFont.style.fontSize = fontRange.value+"px";
    
};

/* 
14px, 17px, 26px according to 0.875, 1.063, 1.625 rem 
*/