import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterValueType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: filterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean)=> void
    filter: filterValueType
}


export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState <string | null>(null)
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }
    const addTAsk = () => {
        if (newTaskTitle.trim() !== '' && newTaskTitle.trim() !== 'censor') {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('');
        } else {
            setError('Title is required');
        }
    }
    const onAllClickHandler = () => props.changeFilter('All');
    const onActiveClickHandler = () => props.changeFilter('Active');
    const onCompletedClickHandler = () => props.changeFilter('Completed');

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input  className={error ? 'error' : ''} value={newTaskTitle} onChange={onNewTitleChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={addTAsk}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
        <ul>
            {props.tasks.map(el => {
               const onRemoveHandler = ()=> {props.removeTask(el.id)}
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(el.id, e.currentTarget.checked)}


                return (
                    <li key={el.id} className={el.isDone ? 'is-done' : ''}><input  type="checkbox" onChange={onChangeHandler} checked={el.isDone}/>

                        <span>{el.title}</span>
                        <button onClick={onRemoveHandler}>x</button>

                    </li>
                )
            })}
        </ul>
        <div>
            <button className={props.filter === 'All' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'Active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'Completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
