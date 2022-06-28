import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type filterValueType = 'All' | 'Active' | 'Completed';
type TodolistType = {
    id: string
    title: string
    filter: filterValueType
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
        {id: todolistId1, title: 'What to learn', filter: 'Active'},
        {id: todolistId2, title: 'What to buy', filter: 'Completed'}
    ])
    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId);
        setTodolists(filteredTodolist);
        delete tasks1[todolistId];
        setTasks1({...tasks1})
    }

    let [tasks1, setTasks1] = useState({
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


    return (
        <div className="App">
            {
                todolists.map((tl) => {
                    let filteredTasks = tasks1[tl.id];
                    if (tl.filter === 'Completed') {
                        filteredTasks = filteredTasks.filter(el => el.isDone === true)
                    }
                    if (tl.filter === 'Active') {
                        filteredTasks = filteredTasks.filter(el => el.isDone === false)
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={filteredTasks}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }


        </div>
    );
}

export default App;
