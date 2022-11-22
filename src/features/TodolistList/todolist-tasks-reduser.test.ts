
import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolist-reduser";
import {taskReducer, TaskStateType} from "./tasks-reduser";


test('ids should be equals', ()=>{
    const startTaskState: TaskStateType = {};
    const startTodolistState: Array<TodolistDomainType> = [];

    const action = addTodolistAC({
        title: 'New Task',
        id: 'any id',
        order: 0,
        addedDate: ''
    });
    const endTaskState = taskReducer(startTaskState, action);
    const endTodolistState = todolistsReducer(startTodolistState, action);

    const keys = Object.keys(endTaskState);
    const idFromTask = keys[0];
    const idFromTodolist = endTodolistState[0].id;

    expect(idFromTask).toBe(action.todolist.id)
    expect(idFromTodolist).toBe(action.todolist.id)
})