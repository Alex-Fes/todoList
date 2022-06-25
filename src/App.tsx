import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type filterValueType = 'All'|'Active'|'Completed';


function App() {

    let [tasks1, setTasks] = useState([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "CSS", isDone: false}
    ])

    const removeTask = (taskId: string) => {
        let filteredTasks = tasks1.filter(el => el.id !== taskId)
        setTasks(filteredTasks);
    }

    let [filterValue, setFilterValue] = useState<filterValueType>('All')

    function changeFilter(value: filterValueType) {
        setFilterValue(value)
    }
    let filteredTasks = tasks1;
    if (filterValue === 'Completed') {
        filteredTasks = tasks1.filter(el => el.isDone === true)
    }
    if (filterValue === 'Active') {
        filteredTasks = tasks1.filter(el => el.isDone === false)
    }
    function addTask (title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks1]
        setTasks(newTasks)
    }
    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks1.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        let copy = [...tasks1]
        setTasks(copy);

    }



    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filterValue}
            />
            <Todolist title="What to learn"
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filterValue}
            />
        </div>
    );
}

export default App;
