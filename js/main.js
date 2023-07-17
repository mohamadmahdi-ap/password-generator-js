// dark Theme codes
var darkThemeButton = document.getElementById("toggle");
darkThemeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
})

//change length with buttons
function changeLength(i) {
    let length = document.getElementById("password-length");
    let l = (length.value > 32) ? 32 : ((length.value < 1) ? 0 : +length.value);
    if ((l != 32 || i != 1) && (l != 1 || i != -1)) {
        l = l + i;
    }
    length.value = l
}

//password generator
let password = "";
function generate() {
    password = "";
    let length = document.getElementById("password-length").value;
    //length have to be between 1 - 32
    if(length>32){
        length = document.getElementById("password-length").value = 32;
    }else if(length<1){
        length = document.getElementById("password-length").value = 1;
    }
    
    let upperCase = document.getElementById("uppercase").checked;
    let lowerCase = document.getElementById("lowercase").checked;
    let digits = document.getElementById("digits").checked;
    let symbol = document.getElementById("symbols").checked;

    if (lowerCase + upperCase + digits + symbol <= 0) {
        document.getElementById("password").innerHTML = "لطفا یک گزینه را انتخاب کنید!";
        password = "";
    } else {
        for (let i = 0; i < length; i++) {

            const r = generater(0, 3);
            if (lowerCase && r === 0) {
                password += generateRandomLowerCase();
            } else if (upperCase && r === 1) {
                password += generateRandomUpperCase();
            } else if (digits && r === 2) {
                password += generater(0, 9);
            } else if (symbol && r === 3) {
                password += generateRandomSymbol();
            } else {
                i--;
            }
        }
        document.getElementById("password").innerHTML = password;
        addToPasswords();
    }
}

function generateRandomLowerCase() {
    return String.fromCharCode(generater(97, 122));
}

function generateRandomUpperCase() {
    return String.fromCharCode(generater(65, 90));
}

function generater(min = 0, max = 1) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

function generateRandomSymbol() {
    const symbols = "~*@%#$^&!?'-=/,.{}()[]_+";
    return symbols[generater(0, symbols.length - 1)];
}

function copyPassword(){
    navigator.clipboard.writeText(password)
}

function addToPasswords(){
    document.getElementById("recent-password-text").style.display = "none";
    document.getElementById("delete-passwords").style.display = "block";
    let newPassword = document.createElement("p");
    newPassword.setAttribute("class" , "rp")
    newPassword.innerHTML = password;
    document.getElementById("recent-password").append(newPassword)
}

function deleteRecentPasswords(){
    document.getElementById("recent-password-text").style.display = "block";
    document.getElementById("delete-passwords").style.display = "none";
    let allPasswords = document.querySelectorAll(".rp");
    allPasswords.forEach((e)=>{
        e.remove()
    })
}

let options = document.querySelectorAll(".password-options div label div")

function checkOption(id){
    options[id].classList.toggle("checked")
}

function openMessageBox(){
    let messageBox = document.querySelector(".message")
    messageBox.classList.toggle("opened")
    
}