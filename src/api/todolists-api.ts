import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '3af1a50e-9363-4d90-80ea-b72e392fafcb'
    }
})


export const todolistsAPI = {
    getTodolists() {
        return instance.get('todo-lists')
    },
    createTodolist () {
       return  instance.post('todo-lists', {title: 'Alex todolist'})
    },
    updateTodolist () {
       return  instance.put('todo-lists/00646965-2d5b-402b-998d-db6815a9e64b', {title: 'Yo yo to mayo'})
    },
    deleteTodolist () {
       return  instance.delete('todo-lists/42081fe7-0396-4b52-846a-00ad8c8e4c92')
    }
}