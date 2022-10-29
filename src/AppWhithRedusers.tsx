import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@material-ui/icons";
import {addTaskAC, updateTaskAC, changeTaskTitleAC, removeTaskAC, taskReduser} from "./state/tasks-reduser";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, filterValueType,
    removeTodolistAC,
    todolistsReduser
} from "./state/todolist-reduser";
import {TaskPriority, TaskStatuses, TaskType} from "./api/todolists-api";


export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedusers() {
    const removeTask = (taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId)
        dispatchToTasksReduser(action)
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC({
                id: "qwerty",
                todoListId: todolistId,
                startDate: '',
                order: 0,
                priority: 0,
                status: TaskStatuses.New,
                title: title,
                addedDate: '',
                deadline: '',
                description: ''
            }
        )
        dispatchToTasksReduser(action)
    }

    function changeStatus(taskId: string, status: TaskStatuses, todolistId: string) {

        dispatchToTasksReduser(updateTaskAC(taskId, {status}, todolistId))
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        // const action = changeTaskTitleAC(taskId, newTitle, todolistId)
        dispatchToTasksReduser(changeTaskTitleAC(taskId, newTitle, todolistId))
    }


    let todolistId1 = v1();
    let todolistId2 = v1();
    let [todolists, dispatchToTodolistReduser] = useReducer(todolistsReduser, [
        {
            id: todolistId1, title: 'What to learn', filter: 'All', addedDate: '',
            order: 0
        },
        {
            id: todolistId2, title: 'What to buy', filter: 'All', addedDate: '',
            order: 0
        }
    ])


    let [tasks1, dispatchToTasksReduser] = useReducer(taskReduser, {
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

    function addTodoList(title: string) {
        const action = addTodolistAC({
            id: v1(),
            addedDate: '',
            order: 0,
            title: title
        })
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

export default AppWithRedusers;
