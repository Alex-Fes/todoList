import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../Components/AddItemForm/AddItemForm";
import {EditebleSpan} from "../../../Components/EditebleSpan/EditebleSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {filterValueType, TodolistDomainType} from "../todolist-reduser";
import {fetchTasksTC} from "../tasks-reduser";
import {useAppDispatch} from "../../../app/hooks/hooks";


type PropsType = {
    todolist: TodolistDomainType
    // id: string
    // title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: filterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    //filter: filterValueType
    removeTodolist: (todolistId: string) => void
    changeTodoListTitle: (newTitle: string, id: string) => void
}

export const Todolist = React.memo(function (props: PropsType) {
    console.log('Task was called')

    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(fetchTasksTC(props.todolist.id))
    },[])


    const onAllClickHandler = useCallback(() =>
        props.changeFilter('All', props.todolist.id), [props.changeFilter, props.todolist.id]);
    const onActiveClickHandler = useCallback(() =>
        props.changeFilter('Active', props.todolist.id), [props.changeFilter, props.todolist.id]);
    const onCompletedClickHandler = useCallback(() =>
        props.changeFilter('Completed', props.todolist.id), [props.changeFilter, props.todolist.id]);

    const removeTodolist = () => {props.removeTodolist(props.todolist.id);};

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id);
    }, [props.addTask, props.todolist.id]);
    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.todolist.id);
    }, [props.changeTodoListTitle, props.todolist.id]);
    let filteredTasks = props.tasks
    if (props.todolist.filter === 'Completed') {
        filteredTasks = props.tasks.filter(el => el.status === TaskStatuses.Completed)
    }
    if (props.todolist.filter === 'Active') {
        filteredTasks = props.tasks.filter(el => el.status === TaskStatuses.New)
    }

    return <div>
        <h3><EditebleSpan title={props.todolist.title} onChange={changeTodoListTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
        <div>
            {filteredTasks.map(el => <Task
                    task={el}
                    removeTask={props.removeTask}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    todolistId={props.todolist.id}
                    key={el.id}
                />
            )}
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.todolist.filter === 'All' ? "contained" : "text"} onClick={onAllClickHandler}>All</Button>
            <Button color={"primary"} variant={props.todolist.filter === 'Active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={"secondary"} variant={props.todolist.filter === 'Completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})











