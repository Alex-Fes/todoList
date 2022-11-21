import React, {useState} from 'react';
import '../app/App.css';
import {Todolist} from '../features/TodolistList/Todolist/Todolist';
import {v1} from "uuid";
import {AddItemForm} from "../Components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@material-ui/icons";
import {TaskPriority, TaskStatuses, TaskType} from "../api/todolists-api";
import {filterValueType, TodolistDomainType} from "../features/TodolistList/todolist-reduser";


export type TaskStateType = {
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
        let newTask = {
            id: v1(), title: title, status: TaskStatuses.New, todoListId: todolistId,
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''
        }
        let task = tasks1[todolistId];
        let newTasks = [newTask, ...task];
        tasks1[todolistId] = newTasks;
        setTasks1({...tasks1})
    }

    function changeStatus(taskId: string, status: TaskStatuses, todolistId: string) {
        let tasks = tasks1[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.status = status;
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


    let todolistId1 = v1();
    let todolistId2 = v1();
    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {
            id: todolistId1, title: 'What to learn', filter: 'All', addedDate: '',
            order: 0, entityStatus: 'idle'
        },
        {
            id: todolistId2, title: 'What to buy', filter: 'All', addedDate: '',
            order: 0, entityStatus: 'idle'
        }
    ])


    let [tasks1, setTasks1] = useState<TaskStateType>({
        [todolistId1]: [
            {
                id: v1(), title: "HTML", status: TaskStatuses.Completed, todoListId: todolistId1,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistId1,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''
            },
            {
                id: v1(), title: "ReactJS", status: TaskStatuses.Completed, todoListId: todolistId1,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''
            },
            {
                id: v1(), title: "Redux", status: TaskStatuses.Completed, todoListId: todolistId1,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''
            },
            {
                id: v1(), title: "CSS", status: TaskStatuses.Completed, todoListId: todolistId1,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''
            }
        ],
        [todolistId2]: [
            {
                id: v1(), title: "Book", status: TaskStatuses.Completed, todoListId: todolistId2,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''
            },
            {
                id: v1(), title: "Map", status: TaskStatuses.Completed, todoListId: todolistId2,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''
            },
            {
                id: v1(), title: "Pen", status: TaskStatuses.Completed, todoListId: todolistId2,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: ''
            }
        ]
    })

    function addtodoList(title: string) {
        let todolist: TodolistDomainType = {
            addedDate: '',
            order: 0,
            id: v1(),
            title: title,
            filter: 'All',
            entityStatus: 'idle'
        };
        setTodolists([todolist, ...todolists])
        setTasks1({...tasks1, [todolist.id]: []})
    }

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId);
        setTodolists(filteredTodolist);
        delete tasks1[todolistId];
        setTasks1({...tasks1})
    }

    function changeFilter(value: filterValueType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
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
                <LinearProgress />
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addtodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl) => {
                        let filteredTasks = tasks1[tl.id];
                        if (tl.filter === 'Completed') {
                            filteredTasks = filteredTasks.filter(el => el.status === TaskStatuses.Completed)
                        }
                        if (tl.filter === 'Active') {
                            filteredTasks = filteredTasks.filter(el => el.status === TaskStatuses.New)
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
