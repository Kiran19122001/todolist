let todoItemsContainer = document.getElementById("todoItemsContainer")

let addButton = document.getElementById("addButton")

let saveBtn = document.getElementById("saveBtn")

saveBtn.onclick = function () {
    
    localStorage.setItem("todoList", JSON.stringify(todoList))
    
}

function getTodoItemFromLs() {
    
    let getjsObjets = localStorage.getItem("todoList")
    let parseObjextsOfTodo=JSON.parse(getjsObjets)
    if (parseObjextsOfTodo === null) {
        return []
    }
    else {
        return parseObjextsOfTodo
    }
}
let todoList=getTodoItemFromLs()
    
    

// let todoList = [
//     {
//         text: "Learn HTML",
//         uiqueId:1
//     },
//     {
//         text: "Learn CSS",
//         uiqueId:2
//     },
//     {
//         text: "Learn JavaScript",
//         uiqueId:3
//     }
    

// ]





function strikeoutLine(checkboxId, labelId,todoId) {
    
    let checkboxEle = document.getElementById(checkboxId)
    let labelStrike = document.getElementById(labelId)
    // labelStrike.classList.toggle('checked-item')
    if (checkboxEle.checked === true) {
        labelStrike.classList.add("checked-item")
        // alert("Did you completed this task")
    }
    else {
        labelStrike.classList.remove("checked-item")
    }
    let index = todoList.findIndex(function (eachTodo) {
        let objectId = "todo"+eachTodo.uniqueId
        if (objectId === todoId) {
            return true
        }
        else {
            return false
        }
    })
    let todoObject = todoList[index]
    if (todoObject.isChecked === true) {
        todoObject.isChecked=false
    }
    else {
        todoObject.isChecked=true
    }
   

}
function removeTodo(todoId) {
    let removeId=document.getElementById(todoId)
    todoItemsContainer.removeChild(removeId)
    
    let indexOftodo = todoList.findIndex(function (todo) {
        let eachTodoId = "todo" + todo.uniqueId
        
        console.log(eachTodoId)
        if ( eachTodoId === todoId) {
            return true
        }
        else {
            return false
        }
    })
     todoList.splice(indexOftodo,1)
}
function createAndAppendTodo(todo) {
    let checkboxId="checkbox"+todo.uniqueId
    let labelId="label"+todo.uniqueId
    let todoId = "todo" + todo.uniqueId
    
    
    let listElem = document.createElement("li")
    listElem.classList.add("todo-item-container", "d-flex", "flex-row")
    listElem.id=todoId
    todoItemsContainer.appendChild(listElem)
    
    

    let inputEle = document.createElement("input")
    inputEle.type = "checkbox"
    inputEle.id = checkboxId
    inputEle.checked=todo.isChecked
    inputEle.classList.add("checkbox-input")
    listElem.appendChild(inputEle)

    inputEle.onclick = function() {
        strikeoutLine(checkboxId, labelId,todoId)
    }
    

    let labelDiv = document.createElement("div")
    labelDiv.classList.add("label-container","d-flex", "flex-Row")
    listElem.appendChild(labelDiv) 

    let labelELe = document.createElement("label")
    labelELe.setAttribute("for", checkboxId)
    labelELe.id=labelId
    labelELe.classList.add("checkbox-label")
    labelELe.textContent = todo.text
    if (inputEle.checked === true) {
        labelELe.classList.add("checked-item")
    }
    labelDiv.appendChild(labelELe)

    let deleteDiv = document.createElement("div")
    deleteDiv.classList.add("delete-icon-container")
    labelDiv.appendChild(deleteDiv)

    let deleteIcon = document.createElement("i")
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon")
    deleteIcon.id=todoId
    deleteDiv.appendChild(deleteIcon)

    deleteIcon.onclick = function () {
        removeTodo(todoId)
    }
}
let todosCount=todoList.length 
function addTOdoItems() {

    let inputElement=document.getElementById("todoUserInput")
    let inputText = inputElement.value 
    
    if (inputText === "") {
        alert("Enter  a valid input")
        return
    }
    todosCount = todosCount+1
    let newTodo = {
        text: inputText,
        uniqueId: todosCount,
        isChecked:false
    }
    todoList.push(newTodo)
    createAndAppendTodo(newTodo)
    inputElement.value=""
}

addButton.onclick = function () {
        addTOdoItems()
        
    }

for (let todo of todoList) {
    createAndAppendTodo(todo)
}

