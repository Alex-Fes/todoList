import React, {useEffect, useState} from "react";
import {instance, todolistsAPI} from "../api/todolists-api";


export default {
    title: 'API'
}
// const settings = {
//     withCredentials: true
// }


export const GetTodolists = () => {
    const [state, setState] = useState(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolists = () => {
    const [state, setState] = useState(null)
    useEffect(() => {
        todolistsAPI.createTodolist()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolists = () => {
    const [state, setState] = useState(null)
    useEffect(() => {
        todolistsAPI.updateTodolist()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolists = () => {
    const [state, setState] = useState(null)
    useEffect(() => {
       todolistsAPI.deleteTodolist()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}