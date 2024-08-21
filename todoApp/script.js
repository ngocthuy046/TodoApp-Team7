document.addEventListener("DOMContentLoaded", function () {
    let todos = [];

    const taskNameInput = document.getElementById("task-name");
    const createButton = document.getElementById("create-task");
    const cancelButton = document.getElementById("cancel-all-change");
    const todoList = document.getElementById("todo-list");

    const filter = document.getElementById("filter");
    const filterValueIsAll = 'all'
    const filterValueIsDone = 'done'
    const filterValueIsUndone = 'undone'


    createButton.addEventListener("click", addTask);
    cancelButton.addEventListener("click", cancelAllChange);
    filter.addEventListener("change", renderTodoList);

    function addTask() {
        const taskName = taskNameInput.value.trim();
        if (taskName === '') {
            return 'Please input a task'
        } else {
            todos.push(
                {
                    name: taskName,
                    done: false
                }
            )
        }
        taskNameInput.value = "";
        renderTodoList()
    }

    function cancelAllChange() {
        taskNameInput.value = "";
        currentEditingIndex = null;
        createButton.textContent = addTaskLabel;
    }

    function editTask(index) {
        const editItem = document.querySelector(`.taskName-${index}`)
        const editingValue = editItem.innerHTML
        const inputElement = document.createElement('input')
        inputElement.value = editingValue
        editItem.replaceWith(inputElement)
        inputElement.focus()
        inputElement.addEventListener("blur", () => {
            const updateValue = inputElement.value.trim()
            if (updateValue) {
                todos[index].name = updateValue
                renderTodoList()
            }
        })
    }


    function deleteTask(index) {
        todos.splice(index, 1);
        renderTodoList();
    }

    function toggleTask(index) {
        const selectedTodo = todos[index];
        todos.splice(index, 1);
        selectedTodo.done = !selectedTodo.done;
        todos.push(selectedTodo);
        renderTodoList();
    }
    function getFilteredTodo() {
        const filteredTask = document.getElementById('filter');
        const filterValueOfTask = filteredTask.value;

        if (filterValueOfTask === filterValueIsAll) {
            return todos;
        } else if (filterValueOfTask === filterValueIsDone) {
            return todos.filter(todo => todo.done);
        } else {
            return todos.filter(todo => !todo.done);
        }
    }

    function renderTodoList() {
        const filterValueOfTask = filter.value;
        getFilteredTodo();
        todoList.innerHTML = "";
        todos.forEach((todo, index) => {
            if (
                filterValueOfTask === filterValueIsAll ||
                (filterValueOfTask === filterValueIsDone && todo.done) ||
                (filterValueOfTask === filterValueIsUndone && !todo.done)
            ) {
                const li = document.createElement("li");
                li.className = todo.done ? "done" : "";
                li.innerHTML = `
            <input type="checkbox" class="check-box" onclick="toggleTask(${index})" ${todo.done ? "checked" : ""
                    }>
            <span class="taskName-${index}">${todo.name}</span>
            <div>
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </div>
          `;
                todoList.appendChild(li);
            }
        });
    }

    window.editTask = editTask;
    window.deleteTask = deleteTask;
    window.toggleTask = toggleTask;

    renderTodoList();
});