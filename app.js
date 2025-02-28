document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const li = document.createElement('li');
        li.innerHTML = `${taskInput.value} <button class="delete">Delete</button>`;
        taskList.appendChild(li);

        li.querySelector('.delete').addEventListener('click', function() {
            taskList.removeChild(li);
        });

        taskInput.value = '';
    }
});
