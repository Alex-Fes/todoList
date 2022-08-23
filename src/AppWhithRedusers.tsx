import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, taskReduser} from "./state/tasks-reduser";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReduser
} from "./state/todolist-reduser";

export type filterValueType = 'All' | 'Active' | 'Completed';
export type TodolistType = {
    id: string
    title: string
    filter: filterValueType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedusers() {
    const removeTask = (taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId)
        dispatchToTasksReduser(action)
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId)
        dispatchToTasksReduser(action)
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {

        dispatchToTasksReduser(changeStatusAC(taskId, isDone, todolistId))
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        // const action = changeTaskTitleAC(taskId, newTitle, todolistId)
        dispatchToTasksReduser(changeTaskTitleAC(taskId, newTitle, todolistId))
    }


    let todolistId1 = v1();
    let todolistId2 = v1();
    let [todolists, dispatchToTodolistReduser] = useReducer(todolistsReduser, [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ])


    let [tasks1, dispatchToTasksReduser] = useReducer(taskReduser, {
        [todolistId1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "CSS", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Map", isDone: true},
            {id: v1(), title: "Pen", isDone: false}
        ]
    })

    function addTodoList(title: string) {
        const action = addTodolistAC(title)
        dispatchToTasksReduser(action)
        dispatchToTodolistReduser(action)
    }

    let removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTasksReduser(action)
        dispatchToTodolistReduser(action)
    }

    function changeFilter(value: filterValueType, todolistId: string) {
        dispatchToTodolistReduser(changeTodolistFilterAC(value, todolistId))
    }

    function changeTodoListTitle(newTitle: string, id: string) {
        dispatchToTodolistReduser(changeTodolistTitleAC(newTitle, id))
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

export default AppWithRedusers;
