import {v1} from "uuid";
import {filterValueType, TodolistType} from "../App";
import {
    AddTodolistAC, ChangeTodolistFilterAC,
    ChangeTodolistFilterActionType,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReduser
} from "./todolist-reduser";


test('correct todolist should be delete', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}];
    const endState = todolistsReduser(startState, RemoveTodolistAC(todolistId1));
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})

test('correct todolist should be add', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTodolistTitle = 'New Todolist';
    let startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}];
    const endState = todolistsReduser(startState, AddTodolistAC(newTodolistTitle));
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
})

test('correct todolist should change title', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTodolistTitle = 'New Todolist';
    let startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}];
    let action = ChangeTodolistTitleAC(todolistId2, newTodolistTitle)
    const endState = todolistsReduser(startState, action);
    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe(newTodolistTitle);
    expect(endState[0].title).toBe('What to learn');
})

test('correct filter of todolist should be change ', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newFilter: filterValueType = 'Completed';
    let startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}];
    let action: ChangeTodolistFilterActionType = ChangeTodolistFilterAC(todolistId2,newFilter)

    const endState = todolistsReduser(startState, action);
    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe(newFilter);
    expect(endState[0].filter).toBe('All');
})









