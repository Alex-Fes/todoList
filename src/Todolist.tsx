import React, {ChangeEvent} from 'react';
import {filterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditebleSpan} from "./EditebleSpan";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@material-ui/icons";
import {Button} from "@material-ui/core";

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
        <h3><EditebleSpan title={props.title} onChange={changeTodoListTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
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
                    <div key={el.id} className={el.isDone ? 'is-done' : ''}>
                        <Checkbox
                               onChange={onChangeHandler}
                               checked={el.isDone}/>
                        <EditebleSpan title={el.title}
                                      onChange={onChangeTitleHandler}/>
                        <IconButton aria-label="delete" onClick={onRemoveHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                )
            })}
        </div>
        <div>
            <Button variant={props.filter === 'All' ? "contained" : "text"} onClick={onAllClickHandler}>All</Button>
            <Button color={"primary"} variant={props.filter === 'Active' ? "contained" : "text"} onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={"secondary"} variant={props.filter === 'Completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}












