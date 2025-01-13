const todoContainer = document.getElementById("todos") ;
const todoInput = document.getElementById("todoInput") ;
const btn = document.getElementById("btn")

const todosArray = []
function renderTodo(){
    todoContainer.innerHTML = ""  ; 
    todosArray.forEach((todo , index ) => {
        const p =  document.createElement("p") ; 
        p.textContent = todo.text ;
        if(todo.completed){
            p.classList.add("complete" ) ; 
        }
       
        todoContainer.appendChild(p)
    })

    const todosList = document.querySelectorAll("p")
    todosList.forEach((todo , index ) => {
        todo.addEventListener("mousedown" , (event)=>{
            if(event.button === 0) {
                handleUpdate(index)
            }
            if(event.button === 2){
                handleDelete(index)
            }
        })
    })
}
function handleUpdate(id){
    todosArray[id].completed = !todosArray[id].completed
    renderTodo()
}
function handleDelete(id){
    todosArray.splice(id , 1 )
    renderTodo()
}

todoInput.addEventListener("keydown" , (event)=>{
    if(todoInput.value !== ""){
        if(event.key === "Enter"){
            todosArray.push({text : todoInput.value , completed : false })
            todoInput.value = "" ; 
            renderTodo()
        } 
    }
    
})

