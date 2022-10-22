import React, {useEffect, useState} from "react";
import {todolistsAPI} from "../api/todolists-api";
import {number} from "prop-types";


export default {
    title: 'API'
}
// const settings = {
//     withCredentials: true
// }


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolists = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const createTodolist = () => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'title'} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTodolist}> Create todolist</button>
        </div>
    </div>
}

export const UpdateTodolists = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTodolist = () => {

        todolistsAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>

            <input placeholder={'title'} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={updateTodolist}> Update todolist</button>
        </div>
    </div>
}

export const DeleteTodolists = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodolist = () => {
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>

            <button onClick={deleteTodolist}> Delete todolist</button>
        </div>

    </div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasks = () => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data.items)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={getTasks}>Get tasks</button>
        </div>
    </div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}> Delete task</button>
        </div>
    </div>
}

export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTask = () => {

        const model = {
          title: title
      }
        todolistsAPI.updateTask(todolistId, taskId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <input placeholder={'title'} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={updateTask}> Update task</button>
        </div>
    </div>
}

export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTask = () => {
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'title'} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTask}> Create task</button>
        </div>
    </div>
}
















