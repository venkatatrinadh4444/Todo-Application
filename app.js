let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveBtnEl = document.getElementById("saveBtn");

function getLocalStorage() {
  let localData = localStorage.getItem("todoList");
  let jsonParsedData = JSON.parse(localData);
  if (jsonParsedData === null) return [];
  else return jsonParsedData;
}

saveBtnEl.onclick = function () {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

let todoList = getLocalStorage();
let todosCount = todoList.length;

function onTodoStatusChange(checkboxId, labelId,todoId) {
  let checkboxElement = document.getElementById(checkboxId);
  let labelElement = document.getElementById(labelId);

  labelElement.classList.toggle("checked");
  
  let arrayIndexValue=todoList.findIndex(item=>{
    let todoIdValue='todo'+item.uniqueNo;
    if(todoIdValue===todoId)
      return true
    else
      return false
  });
  let todoItem=todoList[arrayIndexValue]
  if(todoItem.isTrue===false)
    todoItem.isTrue=true
  else
    todoItem.isTrue=false

}

function onDeleteTodo(todoId) {
  let todoElement = document.getElementById(todoId);
  let todoItemIndex = todoList.findIndex((item) => {
    let todoIdValue = "todo" + item.uniqueNo;
    if (todoIdValue === todoId) 
      return true;
    else 
      return false;
  });
  todoList.splice(todoItemIndex,1)
  todoItemsContainer.removeChild(todoElement);
}

function createAndAppendTodo(todo) {
  let todoId = "todo" + todo.uniqueNo;
  let checkboxId = "checkbox" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoElement.id = todoId;
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.onclick = function () {
    onTodoStatusChange(checkboxId, labelId,todoId);
  };
  inputElement.classList.add("checkbox-input");
  inputElement.checked=todo.isTrue;
  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.id = labelId;
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
  if(todo.isTrue===true){
    labelElement.classList.add('checked')
  }
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

  deleteIcon.onclick = function () {
    onDeleteTodo(todoId);
  };

  deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}

function onAddTodo() {
  let userInputElement = document.getElementById("todoUserInput");
  let userInputValue = userInputElement.value;

  if (userInputValue === "") {
    alert("Enter Valid Text");
    return;
  }

  todosCount = todosCount + 1;

  let newTodo = {
    text: userInputValue,
    uniqueNo: todosCount,
    isTrue:false
  };
  todoList.push(newTodo);
  createAndAppendTodo(newTodo);
  userInputElement.value = "";
}
console.log(todoList)
addTodoButton.onclick = function () {
  onAddTodo();
};
