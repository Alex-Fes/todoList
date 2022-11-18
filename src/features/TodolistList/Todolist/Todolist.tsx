import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../Components/AddItemForm/AddItemForm";
import {EditebleSpan} from "../../../Components/EditebleSpan/EditebleSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {filterValueType} from "../todolist-reduser";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../tasks-reduser";


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: filterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    filter: filterValueType
    removeTodolist: (todolistId: string) => void
    changeTodoListTitle: (newTitle: string, id: string) => void
}

export const Todolist = React.memo(function (props: PropsType) {
    console.log('Task was called')

    const dispatch = useDispatch<any>();
    useEffect(()=>{
        dispatch(fetchTasksTC(props.id))
    },[])


    const onAllClickHandler = useCallback(() => props.changeFilter('All', props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter('Active', props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter('Completed', props.id), [props.changeFilter, props.id]);
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    };
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id]);
    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.id);
    }, [props.changeTodoListTitle, props.id]);

    let filteredTasks = props.tasks
    if (props.filter === 'Completed') {
        filteredTasks = props.tasks.filter(el => el.status === TaskStatuses.Completed)
    }
    if (props.filter === 'Active') {
        filteredTasks = props.tasks.filter(el => el.status === TaskStatuses.New)
    }

    return <div>
        <h3><EditebleSpan title={props.title} onChange={changeTodoListTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {filteredTasks.map(el => <Task
                    task={el}
                    removeTask={props.removeTask}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    todolistId={props.id}
                    key={el.id}
                />
            )}
        </div>
        <div>
            <Button variant={props.filter === 'All' ? "contained" : "text"} onClick={onAllClickHandler}>All</Button>
            <Button color={"primary"} variant={props.filter === 'Active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={"secondary"} variant={props.filter === 'Completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})











