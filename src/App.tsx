import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@material-ui/icons";

export type filterValueType = 'All' | 'Active' | 'Completed';
export type TodolistType = {
    id: string
    title: string
    filter: filterValueType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const removeTask = (taskId: string, todolistId: string) => {
        let task = tasks1[todolistId];
        let filteredTask = task.filter(el => el.id !== taskId);
        tasks1[todolistId] = filteredTask;
        setTasks1({...tasks1});
    }

    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let task = tasks1[todolistId];
        let newTasks = [newTask, ...task];
        tasks1[todolistId] = newTasks;
        setTasks1({...tasks1})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasks1[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks1({...tasks1});
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        // debugger
        let tasks = tasks1[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
            setTasks1({...tasks1});
        }
    }

    function changeFilter(value: filterValueType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }

    let todolistId1 = v1();
    let todolistId2 = v1();
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ])


    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId);
        setTodolists(filteredTodolist);
        delete tasks1[todolistId];
        setTasks1({...tasks1})
    }
    let [tasks1, setTasks1] = useState<TaskStateType>({
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
    function addtodoList(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            title: title,
            filter: 'All'
        };
        setTodolists([todolist, ...todolists])
        setTasks1({...tasks1, [todolist.id]: []})
    }
    function changeTodoListTitle(newTitle: string, id: string) {
        let todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists])
        }
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
                    <AddItemForm addItem={addtodoList}/>
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

export default App;
