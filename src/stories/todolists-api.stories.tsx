import React, {useEffect, useState} from "react";
import axios from "axios";


export default {
    title: 'API'
}
const settings = {
    withCredentials: true
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '3af1a50e-9363-4d90-80ea-b72e392fafcb'
    }
})

export const GetTodolists = () => {
    const [state, setState] = useState(null)
    useEffect(() => {
        instance.get('todo-lists')
            .then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolists = () => {
    const [state, setState] = useState(null)
    useEffect(() => {
        instance.post('todo-lists', {title: 'Alex todolist'})
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolists = () => {
    const [state, setState] = useState(null)
    useEffect(() => {
        instance.put('todo-lists/00646965-2d5b-402b-998d-db6815a9e64b', {title: 'Yo yo to mayo'})
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolists = () => {
    const [state, setState] = useState(null)
    useEffect(() => {
        instance.delete('todo-lists/f16f10be-4e19-413b-8432-9b9ac3a51f24')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}