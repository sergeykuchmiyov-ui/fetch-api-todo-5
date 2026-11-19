const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Завантажуємо задачі з сервера
async function loadTasks() {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();

    taskList.innerHTML = '';

tasks.forEach(task => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task.title;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Видалити';

    deleteButton.addEventListener('click', () => {
        deleteTask(task.id);
    });

    li.appendChild(span);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
    });
}

// Видаляємо задачу
async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
    });

    loadTasks();
}

// Додаємо нову задачу
taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = taskInput.value;

    await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
    });

    taskInput.value = '';

    loadTasks();
});

loadTasks();