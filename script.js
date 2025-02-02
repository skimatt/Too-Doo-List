const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const taskItem = createTaskElement(taskText);
    taskList.appendChild(taskItem);

    saveTask(taskText);
    taskInput.value = "";
}

function createTaskElement(text) {
    const li = document.createElement("li");
    li.textContent = text;

    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        updateTaskStatus(text);
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.classList.add("action-btn", "edit-btn");
    editBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        editTask(li, text);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("action-btn", "delete-btn");
    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        taskList.removeChild(li);
        removeTask(text);
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    return li;
}

function editTask(taskElement, oldText) {
    const newText = prompt("Edit tugas:", oldText);
    if (newText && newText.trim() !== "") {
        taskElement.childNodes[0].nodeValue = newText.trim();
        updateTaskText(oldText, newText.trim());
    }
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: task, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
        const taskItem = createTaskElement(task.text);
        if (task.completed) taskItem.classList.add("completed");
        taskList.appendChild(taskItem);
    });
}

function updateTaskStatus(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map((task) => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskText(oldText, newText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map((task) => {
        if (task.text === oldText) {
            task.text = newText;
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}