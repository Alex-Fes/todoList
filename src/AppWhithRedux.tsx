import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reduser";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reduser";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type filterValueType = 'All' | 'Active' | 'Completed';
export type TodolistType = {
    id: string
    title: string
    filter: filterValueType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks1 = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const removeTask = (taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId)
        dispatch(action)
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId)
        dispatch(action)
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatch(changeStatusAC(taskId, isDone, todolistId))
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        // const action = changeTaskTitleAC(taskId, newTitle, todolistId)
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

    function addTodoList(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    let removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    function changeFilter(value: filterValueType, todolistId: string) {
        dispatch(changeTodolistFilterAC(value, todolistId))
    }

    function changeTodoListTitle(newTitle: string, id: string) {
        dispatch(changeTodolistTitleAC(newTitle, id))
    }

    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        News
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl) => {
                        let filteredTasks = tasks1[tl.id];
                        if (tl.filter === 'Completed') {
                            filteredTasks = filteredTasks.filter(el => el.isDone === true)
                        }
                        if (tl.filter === 'Active') {
                            filteredTasks = filteredTasks.filter(el => el.isDone === false)
                        }
                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={filteredTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTodoListTitle={changeTodoListTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
