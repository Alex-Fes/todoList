import React, {useCallback, useEffect} from "react";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistTC,
    filterValueType,
    removeTodolistTC
} from "./todolist-reduser";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./tasks-reduser";
import {TaskStatuses} from "../../api/todolists-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {useAppDispatch, useAppSelector} from "../../app/hooks/hooks";

type TodolistsListPropsType = {}
export const TodolistsList: React.FC<TodolistsListPropsType> = () => {
    const dispatch = useAppDispatch();
    const todolists = useAppSelector(state => state.todolists);
    const tasks1 = useAppSelector(state => state.tasks);

    useEffect(() => {
        dispatch(fetchTodolistTC())
    }, [])
    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskTC(taskId, todolistId))
    }, [dispatch]);
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(title, todolistId));
    }, [dispatch]);
    const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(taskId, {status}, todolistId));
    }, [dispatch]);
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        dispatch(updateTaskTC(taskId, {title: newTitle}, todolistId));
    }, [dispatch]);
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch]);
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId));
    }, [dispatch]);
    const changeFilter = useCallback((value: filterValueType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(value, todolistId));
    }, [dispatch]);
    const changeTodoListTitle = useCallback((newTitle: string, id: string) => {
        dispatch(changeTodolistTitleTC(newTitle, id));
    }, [dispatch]);

    return (<>
        <Grid container style={{padding: '10px'}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
            {todolists.map((tl) => {
                let filteredTasks = tasks1[tl.id];
                return <Grid item>
                    <Paper style={{padding: '10px'}}>
                        <Todolist
                            key={tl.id}
                            todolist={tl}
                            tasks={filteredTasks}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            changeTaskTitle={changeTaskTitle}
                            removeTodolist={removeTodolist}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    </Paper>
                </Grid>
            })
            }
        </Grid>
    </>)
}