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
    }
    catch (err) {
    }
};
selectElm === null || selectElm === void 0 ? void 0 : selectElm.addEventListener('change', e => getTodoByUser(e));
getUsers();
