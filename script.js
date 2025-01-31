const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

addTaskBtn.addEventListener('click', addTask);
clearCompletedBtn.addEventListener('click', clearCompletedTasks);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        fetch('/add_task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: taskText })
        })
        .then(response => response.json())
        .then(renderTasks);
        taskInput.value = '';
    }
}

function renderTasks(tasks) {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');

        li.appendChild(deleteBtn);

        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            completeTask(task);
        });
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTask(task);
        });
        taskList.appendChild(li);
    });
}

function deleteTask(task) {
    fetch('/delete_task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task })
    })
    .then(response => response.json())
    .then(renderTasks);
}

function completeTask(task) {
    fetch('/complete_task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task })
    })
    .then(response => response.json())
    .then(renderTasks);
}

function clearCompletedTasks() {
    fetch('/clear_completed', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(renderTasks);
}

window.onload = function() {
    fetch('/get_tasks')
        .then(response => response.json())
        .then(renderTasks);
};
