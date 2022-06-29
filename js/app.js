const taskInput = document.querySelector('.input-div input');
let status = document.querySelectorAll('.items-statuses span');
let clearAll = document.querySelector(".clear-btn")
let taskBox = document.querySelector('.task-box');
let moon = document.querySelector('#icon-moon');
let sun = document.querySelector("#icon-sun");


function show() {
    let backgroundColor = "hsl(0, 0%, 98%)";
    document.querySelector(".input-div").style.backgroundColor = backgroundColor;
    document.querySelector(".todo-items-wrapper").style.backgroundColor = backgroundColor;
    document.querySelector("#todo").style.backgroundColor = backgroundColor;
    document.querySelector("body").style.backgroundColor = backgroundColor;
    document.querySelector(".clear-btn").style.backgroundColor = backgroundColor;
    sun.style.display = 'none';
    moon.style.display = 'block';
}

sun.addEventListener("click", show);

function hide() {
    let backgroundColor = 'hsl(235, 24%, 19%)';
    document.querySelector(".input-div").style.backgroundColor = backgroundColor;
    document.querySelector(".todo-items-wrapper").style.backgroundColor = backgroundColor;
    document.querySelector("#todo").style.backgroundColor = backgroundColor;
    document.querySelector("body").style.backgroundColor = backgroundColor;
    document.querySelector(".clear-btn").style.backgroundColor = backgroundColor;
    moon.style.display = 'none';
    sun.style.display = 'block';
}

moon.addEventListener("click", hide)



// getting localstorage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));


status.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.all").classList.remove("all");
        btn.classList.add("all");
        showTodo(btn.id);
    })
})

 function showTodo(status) {
    let li = '';
    if(todos) {
    todos.forEach((todo, id) => {
        // if todo status is completed, set the isCompleted value to checked
        let isCompleted = todo.status == "completed" ? "checked" : "";
        if(status == todo.status || status == 'all') {
            li += `<li class="todo-items">
        <label for="${id}">
          <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
          <div class="todo-text ${isCompleted}">
            <p>${todo.name}</p>
          </div>
        </label>
        <div class="settings">
          <img class="icon-cross" onclick="deleteTask(${id})" src="./resources/images/icon-cross.svg" alt="icon-cross">
        </div>
      </li>` ;
        }
    });
    // if li is empty, insert the value of the span 
    taskBox.innerHTML = li || `<span style="display: flex; justify-content: center; align-items: center; height: 8vh; color: hsl(234, 39%, 85%);">You don't have any tasks</span>`;
}
}
showTodo("all");

function deleteTask(deleteId) {
    // removing deleted tasks from todo/array
     todos.splice(deleteId, 1);
     localStorage.setItem("todo-list", JSON.stringify(todos));
     showTodo("all");
}

clearAll.addEventListener("click", () => {
    // removing all tasks from todo/array
    todos.splice(0, todos.length);
     localStorage.setItem("todo-list", JSON.stringify(todos));
     showTodo("all");
})

function updateStatus(selectedTask) {
    // getting paragraphs that contains task's name
   let taskName = selectedTask.parentElement.lastElementChild;
   if(selectedTask.checked) {
    taskName.classList.add("checked");
    // updating the status of selected task to completed
    todos[selectedTask.id].status = "completed";
   } else {
    taskName.classList.remove("checked");
    // updating the status of selected task to active
    todos[selectedTask.id].status = "active";
   }
   localStorage.setItem("todo-list", JSON.stringify(todos));
}


 taskInput.addEventListener('keyup', e => {
    let userTask = taskInput.value.trim();
    if (e.key == 'Enter' && userTask) {
        if (!todos) { // if todos isn't exist, pass an empty array to todos
            todos = [];
        }
        taskInput.value = '';
        let taskInfo = {
                name: userTask,
                status: "active"
            };
        todos.push(taskInfo); // adding new task to todos
        showTodo("all");
    }
 })