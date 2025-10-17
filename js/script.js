document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const clearAllBtn = document.getElementById("clearAllBtn");

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks();

  addTaskBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
  });

  clearAllBtn.addEventListener("click", () => {
    tasks = [];
    saveTasks();
    renderTasks();
  });

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;
    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }

  function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";
      li.innerHTML = `
        <span>${task.text}</span>
        <div>
          <button class="delete-btn">X</button>
        </div>
      `;
      li.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON") toggleTask(index);
      });
      li.querySelector(".delete-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        deleteTask(index);
      });
      taskList.appendChild(li);
    });
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});