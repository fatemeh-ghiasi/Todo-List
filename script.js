//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoItem = document.querySelector(".todo li");
const todoList = document.querySelector(".todolist");
const todoContent = document.querySelector("#todo-content");
const filterSelect = document.querySelector(".filter-todos");

//event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", actionTodo);
filterSelect.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getLocalTodos);
//functions
function addTodo(e) {
  e.preventDefault();
  // todoContent.textContent = todoInput.value;
  // var todoElement = todoItem.cloneNode(true);
  // todoList.appendChild(todoElement);
  // todoInput.textContent = "";
  // var todoElement = todoItem.cloneNode(true);
  const todoElement = document.createElement("li");
  todoElement.setAttribute("id", `${todoInput.value}`);
  todoElement.innerHTML = `
            <span class="text">${todoInput.value}</span>
            <div class="actions">
              <svg class="check" width="25" height="25" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1472 930v318q0 119-84.5 203.5T1184 1536H352q-119 0-203.5-84.5T64 1248V416q0-119 84.5-203.5T352 128h832q63 0 117 25 15 7 18 23 3 17-9 29l-49 49q-10 10-23 10-3 0-9-2-23-6-45-6H352q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113V994q0-13 9-22l64-64q10-10 23-10 6 0 12 3 20 8 20 29zm231-489-814 814q-24 24-57 24t-57-24L345 825q-24-24-24-57t24-57l110-110q24-24 57-24t57 24l263 263 647-647q24-24 57-24t57 24l110 110q24 24 24 57t-24 57z" fill="#287fc7" class="fill-000000"></path></svg>
              <svg class="remove" viewBox="0 0 32 32" width="25" height="25" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M6 12v15c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3V12H6zm6 13a1 1 0 0 1-2 0v-9a1 1 0 0 1 2 0v9zm5 0a1 1 0 0 1-2 0v-9a1 1 0 0 1 2 0v9zm5 0a1 1 0 0 1-2 0v-9a1 1 0 0 1 2 0v9zM27 6h-6V5c0-1.654-1.346-3-3-3h-4c-1.654 0-3 1.346-3 3v1H5c-1.103 0-2 .897-2 2v1a1 1 0 0 0 1 1h24a1 1 0 0 0 1-1V8c0-1.103-.897-2-2-2zM13 5c0-.551.449-1 1-1h4c.551 0 1 .449 1 1v1h-6V5z" fill="#e83c3c" class="fill-000000"></path></svg>
            </div>
          `;

  todoList.appendChild(todoElement);
  saveLocalTodos(todoInput.value);
  todoInput.value = "";
}

function actionTodo(e) {
  const item = e.target;
  if (e.target.classList[0] === "remove") {
    const todo = item.parentElement.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  } else if (e.target.classList[0] === "check") {
    const todo = item.parentElement.parentElement;
    todo.classList.add("checked");
  }
}

function filterTodo(e) {
  console.log(e.target.value);
  console.log(todoList.childNodes);
  const todos = [...todoList.childNodes];
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function getLocalTodos() {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.forEach((todo) => {
    const todoElement = document.createElement("li");
    todoElement.innerHTML = `
            <span class="text">${todo}</span>
            <div class="actions">
              <svg class="check" width="25" height="25" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1472 930v318q0 119-84.5 203.5T1184 1536H352q-119 0-203.5-84.5T64 1248V416q0-119 84.5-203.5T352 128h832q63 0 117 25 15 7 18 23 3 17-9 29l-49 49q-10 10-23 10-3 0-9-2-23-6-45-6H352q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113V994q0-13 9-22l64-64q10-10 23-10 6 0 12 3 20 8 20 29zm231-489-814 814q-24 24-57 24t-57-24L345 825q-24-24-24-57t24-57l110-110q24-24 57-24t57 24l263 263 647-647q24-24 57-24t57 24l110 110q24 24 24 57t-24 57z" fill="#287fc7" class="fill-000000"></path></svg>
              <svg class="remove" viewBox="0 0 32 32" width="25" height="25" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M6 12v15c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3V12H6zm6 13a1 1 0 0 1-2 0v-9a1 1 0 0 1 2 0v9zm5 0a1 1 0 0 1-2 0v-9a1 1 0 0 1 2 0v9zm5 0a1 1 0 0 1-2 0v-9a1 1 0 0 1 2 0v9zM27 6h-6V5c0-1.654-1.346-3-3-3h-4c-1.654 0-3 1.346-3 3v1H5c-1.103 0-2 .897-2 2v1a1 1 0 0 0 1 1h24a1 1 0 0 0 1-1V8c0-1.103-.897-2-2-2zM13 5c0-.551.449-1 1-1h4c.551 0 1 .449 1 1v1h-6V5z" fill="#e83c3c" class="fill-000000"></path></svg>
            </div>
          `;

    todoList.appendChild(todoElement);
  });
}

function removeLocalTodos(todo) {
  console.log(todo.children[0].innerText);
  let savedStorage = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const filterStorage = savedStorage.filter((t) => {
    if (t !== todo.children[0].innerText) {
      return t;
    }
  });
  localStorage.setItem("todos", JSON.stringify(filterStorage));
}
