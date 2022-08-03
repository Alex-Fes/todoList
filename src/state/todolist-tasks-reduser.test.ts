import {TaskStateType, TodolistType} from "../App";
import {addTodolistAC, todolistsReduser} from "./todolist-reduser";
import {taskReduser} from "./tasks-reduser";

test('ids should be equals', ()=>{
    const startTaskState: TaskStateType = {};
    const startTodolistState: Array<TodolistType> = [];

    const action = addTodolistAC('new todolist');
    const endTaskState = taskReduser(startTaskState, action);
    const endTodolistState = todolistsReduser(startTodolistState, action);

    const keys = Object.keys(endTaskState);
    const idFromTask = keys[0];
    const idFromTodolist = endTodolistState[0].id;

    expect(idFromTask).toBe(action.todolistId)
    expect(idFromTodolist).toBe(action.todolistId)
})