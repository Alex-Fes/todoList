import {v1} from "uuid";

import {
    addTodolistAC,
    changeTodolistFilterAC,
    ChangeTodolistFilterActionType,
    changeTodolistTitleAC,
    filterValueType,
    removeTodolistAC, setTodolistsAC,
    TodolistDomainType,
    todolistsReduser
} from "./todolist-reduser";
import {TodolistType} from "../api/todolists-api";


test('correct todolist should be delete', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let startState: Array<TodolistDomainType> = [
        {
            id: todolistId1, title: 'What to learn', filter: 'All', addedDate: '',
            order: 0
        },
        {
            id: todolistId2, title: 'What to buy', filter: 'All', addedDate: '',
            order: 0
        }];
    const endState = todolistsReduser(startState, removeTodolistAC(todolistId1));
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})

test('correct todolist should be add', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTodolistTitle: TodolistType = {
        title: 'New Todolist',
        id: 'any id',
        order: 0,
        addedDate: ''
    };
    let startState: Array<TodolistDomainType> = [
        {
            id: todolistId1, title: 'What to learn', filter: 'All', addedDate: '',
            order: 0
        },
        {
            id: todolistId2, title: 'What to buy', filter: 'All', addedDate: '',
            order: 0
        }];
    const endState = todolistsReduser(startState, addTodolistAC(newTodolistTitle));
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
})

test('correct todolist should change title', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTodolistTitle = 'New Todolist';
    let startState: Array<TodolistDomainType> = [
        {
            id: todolistId1, title: 'What to learn', filter: 'All', addedDate: '',
            order: 0
        },
        {
            id: todolistId2, title: 'What to buy', filter: 'All', addedDate: '',
            order: 0
        }];
    let action = changeTodolistTitleAC(newTodolistTitle, todolistId2)
    const endState = todolistsReduser(startState, action);
    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe(newTodolistTitle);
    expect(endState[0].title).toBe('What to learn');
})

test('correct filter of todolist should be change ', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newFilter: filterValueType = 'Completed';
    let startState: Array<TodolistDomainType> = [
        {
            id: todolistId1, title: 'What to learn', filter: 'All', addedDate: '',
            order: 0
        },
        {
            id: todolistId2, title: 'What to buy', filter: 'All', addedDate: '',
            order: 0
        }];
    let action: ChangeTodolistFilterActionType = changeTodolistFilterAC(newFilter, todolistId2)

    const endState = todolistsReduser(startState, action);
    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe(newFilter);
    expect(endState[0].filter).toBe('All');
})


test('todolists should be set to state ', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'All', addedDate: '', order: 0}];

    const action = setTodolistsAC(startState)

    const endState = todolistsReduser([], action);

    expect(endState.length).toBe(2);

})








