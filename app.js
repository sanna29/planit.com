document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('priorityInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const taskList = document.getElementById('taskList');
    const searchInput = document.getElementById('searchInput');

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addTask(taskInput.value, priorityInput.value, dueDateInput.value);
        taskInput.value = '';
        dueDateInput.value = '';
    });

    searchInput.addEventListener('input', function() {
        filterTasks(searchInput.value);
    });

    function addTask(name, priority, dueDate) {
        const tasks = getTasks();
        const newTask = { name, priority, dueDate, completed: false };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    function renderTasks() {
        taskList.innerHTML = '';
        const tasks = getTasks();
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `priority-${task.priority.toLowerCase()} ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                ${task.name} - ${task.priority} - Due: ${task.dueDate}
                <div>
                    <button class="complete">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="delete">Delete</button>
                </div>
            `;
            li.querySelector('.complete').addEventListener('click', function() {
                toggleCompleteTask(index);
            });
            li.querySelector('.delete').addEventListener('click', function() {
                deleteTask(index);
            });
            taskList.appendChild(li);
        });
    }

    function toggleCompleteTask(index) {
        const tasks = getTasks();
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function deleteTask(index) {
        const tasks = getTasks();
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function filterTasks(query) {
        const tasks = getTasks();
        const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(query.toLowerCase()));
        taskList.innerHTML = '';
        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `priority-${task.priority.toLowerCase()} ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                ${task.name} - ${task.priority} - Due: ${task.dueDate}
                <div>
                    <button class="complete">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="delete">Delete</button>
                </div>
            `;
            li.querySelector('.complete').addEventListener('click', function() {
                toggleCompleteTask(index);
            });
            li.querySelector('.delete').addEventListener('click', function() {
                deleteTask(index);
            });
            taskList.appendChild(li);
        });
    }

    renderTasks();
});
