"use strict";
const BASE_URL = 'https://jsonplaceholder.typicode.com/';
const selectElm = document.querySelector('select');
const todosContainer = document.querySelector('.todos');
const getUsers = async () => {
    try {
        const res = await fetch(BASE_URL + 'users');
        const users = await res.json();
        for (const user of users) {
            const opt = document.createElement('option');
            opt.value = user.id.toString();
            opt.textContent = `${user.name} (${user.username})`;
            selectElm === null || selectElm === void 0 ? void 0 : selectElm.appendChild(opt);
        }
    }
    catch (err) {
        console.log(err);
    }
};
const getTodoByUser = async (e) => {
    try {
        const res = await fetch(`${BASE_URL}todos?userId=${e.target.value}`);
        const todos = await res.json();
        console.log(todos);
        if (!todos.length) {
            return;
        }
        todosContainer.innerHTML = '';
        for (const todo of todos) {
            const div = document.createElement('div');
            const titleElm = document.createElement('p');
            titleElm.textContent = `#00${todo.id}) ${todo.title}`;
            titleElm.addEventListener('click', () => {
                alert(`ToDo #${todo.id}: ${todo.completed ? "You're alreay done with" : 'Do you still have to'} ${todo.title}`);
            });
            div.appendChild(titleElm);
            todosContainer.appendChild(div);
        }
    }
    catch (err) {
        console.log(err);
    }
};
selectElm === null || selectElm === void 0 ? void 0 : selectElm.addEventListener('change', e => getTodoByUser(e));
getUsers();
