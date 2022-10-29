import {TaskStateType} from "../App";
import {addTodolistAC, TodolistDomainType, todolistsReduser} from "./todolist-reduser";
import {taskReduser} from "./tasks-reduser";


test('ids should be equals', ()=>{
    const startTaskState: TaskStateType = {};
    const startTodolistState: Array<TodolistDomainType> = [];

    const action = addTodolistAC({
        title: 'New Todolist',
        id: 'any id',
        order: 0,
        addedDate: ''
    });
    const endTaskState = taskReduser(startTaskState, action);
    const endTodolistState = todolistsReduser(startTodolistState, action);

    const keys = Object.keys(endTaskState);
    const idFromTask = keys[0];
    const idFromTodolist = endTodolistState[0].id;

    expect(idFromTask).toBe(action.todolist.id)
    expect(idFromTodolist).toBe(action.todolist.id)
})