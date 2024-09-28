(() => {
    let toDoListArray = [];

    const form = document.querySelector(".form");
    const input = form.querySelector(".form__input");
    const ul = document.querySelector(".toDoList");

    async function fetchTodos() {
        const response = await fetch('http://localhost:5000/todos');
        const todos = await response.json();
        todos.forEach(todo => {
            addItemToDOM(todo._id, todo.item);
            toDoListArray.push({ itemId: todo._id, toDoItem: todo.item });
        });
    }

    form.addEventListener('submit', async e => {
        e.preventDefault();
        let toDoItem = input.value;
        const response = await fetch('http://localhost:5000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item: toDoItem })
        });
        const newItem = await response.json();
        addItemToDOM(newItem._id, newItem.item);
        toDoListArray.push({ itemId: newItem._id, toDoItem: newItem.item });
        input.value = '';
    });

    ul.addEventListener('click', async e => {
        let id = e.target.getAttribute('data-id');
        if (!id) return;

        await fetch(`http://localhost:5000/todos/${id}`, {
            method: 'DELETE'
        });
        removeItemFromDOM(id);
        toDoListArray = toDoListArray.filter(item => item.itemId !== id);
    });

    function addItemToDOM(itemId, toDoItem) {
        const li = document.createElement('li');
        li.setAttribute("data-id", itemId);
        li.innerText = toDoItem;
        ul.appendChild(li);
    }

    function removeItemFromDOM(id) {
        const li = document.querySelector('[data-id="' + id + '"]');
        ul.removeChild(li);
    }

    fetchTodos();
})();
