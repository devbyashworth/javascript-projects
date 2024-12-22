let tasks = [];

const addTasks = () => {
    const taskInput = document.querySelector(".task-input");
    const taskName = taskInput.value;

    console.log("Add new task");

    if(taskName.trim() !== "") {
        const task = {
            id : Date.now(),
            name : taskName,
            completed : false,
        };
        tasks.push(task);
    }
    console.log(tasks);
    renderTasks();
    taskInput.value = '';
}

const taskInput = document.querySelector(".task-input");
taskInput.addEventListener("keypress", (evt) => {
    if(evt.key === "Enter") {
        addTasks();
    }
});

const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks()
}

const markCompleted = (id) => {
    tasks = tasks.map(task => {
        if(task.id === id){
            task.completed = !task.completed;
        }
        return task;
    });
    updateCompleteTask(id);
}

const updateCompleteTask = (id) => {
    const taskElement = document.getElementById(id);
    if(taskElement){
        const task = tasks.find(task => task.id === id);
        if(task.completed){
            taskElement.classList.add("completed");
        }else{
            taskElement.classList.remove("completed");
        }
    }
}

const renderTasks = () => {
    const taskList = document.querySelector(".todo-app__list");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const listItem = document.createElement("li");
        listItem.setAttribute("id", task.id);
        listItem.classList.add("task", task.completed ? "completed" : "not");

        const taskContainer = document.createElement("div");
        taskContainer.classList.add("container");
        taskContainer.addEventListener("click", () => markCompleted(task.id));

        const taskCircle = document.createElement("div");
        taskCircle.classList.add("circle");

        const taskName = document.createElement("span");
        taskName.textContent = task.name;

        const deleteButton = document.createElement("i");
        deleteButton.classList.add("bx", "bx", "class-icon");
        deleteButton.addEventListener("click", () => deleteTask(task.id));

        taskContainer.appendChild(taskCircle);
        taskContainer.appendChild(taskName);

        listItem.appendChild(taskContainer);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });
}

renderTasks()


