const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addBtn = document.getElementById("add-btn");

// Add Task Function
function addTask() {

    const task = inputBox.value.trim();

    if (task === "") {
        alert("You must write something!");
        return;
    }

    let li = document.createElement("li");

    li.textContent = task;

    let span = document.createElement("span");

    span.textContent = "\u00d7";

    li.appendChild(span);

    listContainer.appendChild(li);

    inputBox.value = "";

    saveData();

}

// Add button click event
addBtn.addEventListener("click", addTask);

// Enter key event
inputBox.addEventListener("keydown", function(e) {

    if (e.key === "Enter") {
        addTask();
    }

});

// Complete and Delete Task
listContainer.addEventListener("click", function(e) {

    if (e.target.tagName === "LI") {

        e.target.classList.toggle("checked");

        saveData();

    }

    else if (e.target.tagName === "SPAN") {

        e.target.parentElement.remove();

        saveData();

    }

});

// Save Tasks in Local Storage
function saveData() {

    const tasks = [];

    listContainer.querySelectorAll("li").forEach(li => {

        tasks.push({
            text: li.firstChild.textContent,
            checked: li.classList.contains("checked")
        });

    });

    localStorage.setItem("data", JSON.stringify(tasks));

}

// Display Saved Tasks
function showTask() {

    const savedData = localStorage.getItem("data");

    let tasks = [];

    try {
        tasks = JSON.parse(savedData || "[]");

        if (!Array.isArray(tasks)) {
            tasks = [];
        }

    } catch (error) {
        tasks = [];
    }

    listContainer.innerHTML = "";

    tasks.forEach(task => {

        if (typeof task.text !== "string") {
            return;
        }

        let li = document.createElement("li");

        li.textContent = task.text;

        if (task.checked) {
            li.classList.add("checked");
        }

        let span = document.createElement("span");

        span.textContent = "\u00d7";

        li.appendChild(span);

        listContainer.appendChild(li);

    });

}

// Load Saved Tasks
showTask();



