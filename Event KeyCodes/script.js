const code = document.getElementById("code") ;
const key = document.getElementById("key") ; 
const keycode = document.getElementById("keyCode")

window.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container")
})

document.addEventListener("keydown", (event) => {
    document.getElementById("startContent").style.display = "none"
    container.style.display = "flex"
    key.textContent =  event.key
    keycode.textContent =  event.keyCode  
    code.textContent =  event.code 
})