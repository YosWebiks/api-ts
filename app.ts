const BASE_URL: string = 'https://jsonplaceholder.typicode.com/'
const selectElm: HTMLSelectElement | null = document.querySelector('select')
const todosContainer: HTMLDivElement = document.querySelector('.todos')!
const tdInputElm: HTMLInputElement = document.querySelector('.add input')!
const addTdBtnElm: HTMLButtonElement = document.querySelector('.add button')!

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

addTdBtnElm.addEventListener('click', async (e: Event): Promise<void> => {
    try {

        const res: Response = await fetch(BASE_URL + 'todos', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: tdInputElm.value,
                userId: selectElm?.value,
                comleted: false
            })

        })
        const data: ToDo = await res.json()
        console.log(data)
        alert(`Todo #${data.id} was added successfully`)
    } catch (err) {
        alert(`Couldn't proccess your to do`)
    }

})

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




interface ReternOfAFunc {
    success: boolean
    data?: ToDo[]
    message: string
}


function GoralHaGrah(): ReternOfAFunc {
    if (Math.random() > 0.4) {
        return {
            success: true,
            message:"success",
            data:[]
        }
    } else {
        return {
            success: false,
            message:"failure"
        }
    }
}