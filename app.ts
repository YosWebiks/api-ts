const BASE_URL: string = 'https://jsonplaceholder.typicode.com/'
const selectElm: HTMLSelectElement | null = document.querySelector('select')
const todosContainer: HTMLDivElement = document.querySelector('.todos')!

const getUsers = async (): Promise<void> => {
    try {
        const res: Response = await fetch(BASE_URL + 'users')
        const users: User[] = await res.json()
        for (const user of users) {
            const opt: HTMLOptionElement = document.createElement('option')
            opt.value = user.id.toString()
            opt.textContent = `${user.name} (${user.username})`
            selectElm?.appendChild(opt)
        }
    } catch (err) {
        console.log(err)
    }
}

const getTodoByUser = async (e: InputEvent): Promise<void> => {
    try {
        const res = await fetch(`${BASE_URL}todos?userId=${(e.target as HTMLSelectElement).value}`)
        const todos: ToDo[] = await res.json()
        console.log(todos)
        if (!todos.length) {
            return
        }
        todosContainer.innerHTML = ''
        for (const todo of todos) {
            const div: HTMLDivElement = document.createElement('div')
            const titleElm: HTMLParagraphElement = document.createElement('p')
            titleElm.textContent = `#00${todo.id}) ${todo.title}`
            titleElm.addEventListener('click', () => {
                alert(`ToDo #${todo.id}: ${todo.completed ? "You're alreay done with" : 'Do you still have to'} ${todo.title}`)
            })
            div.appendChild(titleElm)
            todosContainer.appendChild(div)
        }
    } catch (err) {
        console.log(err)
    }
}

selectElm?.addEventListener('change', e => getTodoByUser(e as InputEvent))

getUsers()

interface ToDo {
    completed: boolean
    id: number
    userId: number
    title: string
}

interface User {
    id: number
    name: string
    username: string
    email: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
        geo: {
            lat: string
            lng: string
        }
    }
    phone: string
}
