const code = document.getElementById("code") ;
const key = document.getElementById("key") ; 
const keycode = document.getElementById("keyCode")

document.addEventListener("keydown" , (event)=>{
    key.textContent =  event.key
    keycode.textContent =  event.keyCode  
    code.textContent =  event.code 
})