//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoItem = document.querySelector(".todo li");
const todoList = document.querySelector(".todolist");
const todoContent = document.querySelector("#todo-content");
const filterSelect = document.querySelector(".filter-todos");
const showTask = document.querySelector(".showNewTask");
const section = document.querySelector(".todo-section");
const form = document.querySelector(".formPopup");
const backdrop = document.querySelector(".overlay");
const closeBtn = document.querySelector(".close");
const emptyTask = document.querySelector(".empty");

//event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", actionTodo);
filterSelect.addEventListener("click", filterTodo);
showTask.addEventListener("click", showNewTask);
backdrop.addEventListener("click", showNewTask);
closeBtn.addEventListener("click", showNewTask);
document.addEventListener("DOMContentLoaded", getLocalTodos);

//functions

//call function to show number of tasks after reload
taskCounter();

//click on add button
function addTodo(e) {
  e.preventDefault();

  //This is another way:
  // todoContent.textContent = todoInput.value;
  // var todoElement = todoItem.cloneNode(true);
  // todoList.appendChild(todoElement);
  // todoInput.textContent = "";
  // var todoElement = todoItem.cloneNode(true);

  const todoElement = document.createElement("li");
  todoElement.setAttribute("id", `${todoInput.value}`);
  todoElement.innerHTML = `
            <span class="check"> <svg class="check-icon" width="59px" height="42px" viewBox="0 0 59 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                <path d="M4.5,20.5 L21.0302753,37.0302753 L54.5,4.5" id="line" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" sketch:type="MSShapeGroup"></path>
              </g>
            </svg></span>
            <span class="text">${todoInput.value}</span>
            <div class="actions"><svg class='remove' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:#030303;}.cls-2{fill:none;}</style></defs><title/><g data-name="Layer 2" id="Layer_2"><g data-name="Layer 4" id="Layer_4"><path class="cls-1" d="M26,8H20.94V7A2.94,2.94,0,0,0,18,4.06H14A2.94,2.94,0,0,0,11.06,7V8H6a1,1,0,0,0,0,2H7.06V25A2.94,2.94,0,0,0,10,27.94H22A2.94,2.94,0,0,0,24.94,25V10H26a1,1,0,0,0,0-2ZM12.94,8V7A1.07,1.07,0,0,1,14,5.94h4A1.07,1.07,0,0,1,19.06,7V8H12.94ZM23.06,25A1.07,1.07,0,0,1,22,26.06H10A1.07,1.07,0,0,1,8.94,25V10H23.06Z"/><path class="cls-1" d="M18,21.49a1,1,0,0,0,1-1v-4a1,1,0,0,0-2,0v4A1,1,0,0,0,18,21.49Z"/><path class="cls-1" d="M14,21.49a1,1,0,0,0,1-1v-4a1,1,0,0,0-2,0v4A1,1,0,0,0,14,21.49Z"/><rect class="cls-2" height="32" width="32"/></g></g></svg>
            </div>
          `;
  todoList.appendChild(todoElement);
  saveLocalTodos(todoInput.value);
  taskCounter();
  showNewTask();
  todoInput.value = "";
}

//click on recycle bin or check icon
function actionTodo(e) {
  const item = e.target;
  if (e.target.classList[0] === "remove") {
    const todo = item.parentElement.parentElement;
    removeLocalTodos(todo);
    todo.remove();
    taskCounter();
  } else if (e.target.classList[0] === "check") {
    const todo = item.parentElement;
    todo.classList.toggle("checked");
  }
}

//filter with select box
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

//add to localStorage after add an item
function saveLocalTodos(todo) {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

//add localStorage value to DOM
function getLocalTodos() {
  let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  savedTodos.forEach((todo) => {
    const todoElement = document.createElement("li");
    todoElement.innerHTML = `
            <span class="check"> <svg class="check-icon" width="59px" height="42px" viewBox="0 0 59 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                <path d="M4.5,20.5 L21.0302753,37.0302753 L54.5,4.5" id="line" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" sketch:type="MSShapeGroup"></path>
              </g>
            </svg></span>
            <span class="text">${todo}</span>
            <div class="actions">
              <svg class='remove' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:#030303;}.cls-2{fill:none;}</style></defs><title/><g data-name="Layer 2" id="Layer_2"><g data-name="Layer 4" id="Layer_4"><path class="cls-1" d="M26,8H20.94V7A2.94,2.94,0,0,0,18,4.06H14A2.94,2.94,0,0,0,11.06,7V8H6a1,1,0,0,0,0,2H7.06V25A2.94,2.94,0,0,0,10,27.94H22A2.94,2.94,0,0,0,24.94,25V10H26a1,1,0,0,0,0-2ZM12.94,8V7A1.07,1.07,0,0,1,14,5.94h4A1.07,1.07,0,0,1,19.06,7V8H12.94ZM23.06,25A1.07,1.07,0,0,1,22,26.06H10A1.07,1.07,0,0,1,8.94,25V10H23.06Z"/><path class="cls-1" d="M18,21.49a1,1,0,0,0,1-1v-4a1,1,0,0,0-2,0v4A1,1,0,0,0,18,21.49Z"/><path class="cls-1" d="M14,21.49a1,1,0,0,0,1-1v-4a1,1,0,0,0-2,0v4A1,1,0,0,0,14,21.49Z"/><rect class="cls-2" height="32" width="32"/></g></g></svg>
            </div>
          `;

    todoList.appendChild(todoElement);
  });
}

// remove item from DOM and localStorage
function removeLocalTodos(todo) {
  taskCounter();
  let savedStorage = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const filterStorage = savedStorage.filter((t) => {
    if (t !== todo.innerText) {
      return t;
    }
  });

  localStorage.setItem("todos", JSON.stringify(filterStorage));
}

// count the tasks
function taskCounter() {
  let savedTodos = localStorage.getItem("todos");
  let storageLength = JSON.parse(savedTodos);
  if (localStorage.length === 0 || storageLength.length === 0) {
    emptyTask.innerText = "Your todo list is empty";
    document.querySelector("#total").innerText = "0 Task";
  } else {
    emptyTask.innerText = "";
    let total = JSON.parse(savedTodos).length;
    if (total > 0) {
      document.querySelector("#total").innerText =
        total > 1 ? `${total} Tasks` : `${total} Task`;
    }
  }
}

//Day Of Today: Sunday 6th March
var objToday = new Date(),
  weekday = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ),
  dayOfWeek = weekday[objToday.getDay()],
  domEnder = (function () {
    var a = objToday;
    if (/1/.test(parseInt((a + "").charAt(0)))) return "th";
    a = parseInt((a + "").charAt(1));
    return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th";
  })(),
  dayOfMonth =
    today + (objToday.getDate() < 10)
      ? "0" + objToday.getDate() + domEnder
      : objToday.getDate() + domEnder,
  months = new Array(
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ),
  curMonth = months[objToday.getMonth()],
  curYear = objToday.getFullYear();
var today = dayOfWeek + " " + dayOfMonth + " " + curMonth;
document.querySelector(".dayOfWeek").innerText = dayOfWeek;
document.querySelector(".dayOfMonth").innerText = dayOfMonth;
document.querySelector(".curMonth").innerText = curMonth;

//show popups
function showNewTask() {
  if (section.classList.contains("showTasks")) {
    section.classList.remove("showTasks");
    form.classList.add("showForm");
  } else {
    section.classList.add("showTasks");
    form.classList.remove("showForm");
  }
}
