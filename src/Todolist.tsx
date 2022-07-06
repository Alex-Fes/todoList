import React, {ChangeEvent} from 'react';
import {filterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditebleSpan} from "./EditebleSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: filterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    filter: filterValueType
    removeTodolist: (todolistId: string) => void
    changeTodoListTitle: (newTitle: string, id: string) => void
}


export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter('All', props.id);
    const onActiveClickHandler = () => props.changeFilter('Active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('Completed', props.id);
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.id)
    }

    return <div>
        <h3><EditebleSpan title={props.title} onChange={changeTodoListTitle} />

            <button onClick={removeTodolist}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {props.tasks.map(el => {
                const onRemoveHandler = () => {
                    props.removeTask(el.id, props.id)
                }
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(el.id, e.currentTarget.checked, props.id)
                }
                const onChangeTitleHandler = (newValue: string) => {
                    // debugger
                    props.changeTaskTitle(el.id, newValue, props.id)
                }
                return (
                    <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={el.isDone}/>
                        <EditebleSpan title={el.title}
                                      onChange={onChangeTitleHandler}/>
                        <button onClick={onRemoveHandler}>x</button>
                    </li>
                )
            })}
        </ul>
        <div>
            <button className={props.filter === 'All' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'Active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'Completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}












