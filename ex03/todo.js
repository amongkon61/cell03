document.addEventListener("DOMContentLoaded", () => {
    const ftList = document.getElementById("ft_list");
    const newBtn = document.getElementById("new-btn");

    function loadTodos() {
        const todos = getCookies("todos");
        if (todos) {
            const todoArray = JSON.parse(todos);
            todoArray.reverse().forEach(todo => addTodo(todo, false));
        }
    }

    function addTodo(task, save = true) {
        if (!task.trim()) return; 

        const todoDiv = document.createElement("div");
        todoDiv.className = "todo-item";
        todoDiv.textContent = task;

        todoDiv.addEventListener("click", () => {
            if (confirm(`Do you want to remove: "${task}"?`)) {
                todoDiv.remove();
                saveTodos();
            }
        });

        ftList.prepend(todoDiv); 
        if (save) saveTodos(); 
    }

    function saveTodos() {
        const todoItems = Array.from(document.getElementsByClassName("todo-item"))
                               .map(item => item.textContent);
        document.cookie = `todos=${JSON.stringify(todoItems)}; path=/;`;
    }

    function getCookies(name) {
        const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
        return match ? match[2] : null;
    }

    newBtn.addEventListener("click", () => {
        const task = prompt("Enter a new To-Do:");
        if (task) addTodo(task);
    });

    loadTodos();
});
