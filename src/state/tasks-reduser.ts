import {filterValueType, TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, removeTodolistActionType, todolistId1, todolistId2} from "./todolist-reduser";

type removeTasksActionType = {
    type: 'REMOVE-TASKS'
    todolistId: string
    taskId: string
}
type AddTasksActionType = {
    type: 'ADD-TASKS'
    title: string
    todolistId: string
}
type ChangeTasksTitleActionType = {
    type: 'CHANGE-TASKS-TITLE'
    title: string
    id: string
    todolistId: string
}
export type ChangeStatusActionType = {
    type: 'CHANGE-TASKS-STATUS'
    id: string
    isDone: boolean
    todolistId: string
}
type ActionType =
    removeTasksActionType
    | AddTasksActionType
    | ChangeTasksTitleActionType
    | ChangeStatusActionType
    | AddTodolistActionType
    | removeTodolistActionType;

const innitialState: TaskStateType = {
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
}

export const taskReduser = (state: TaskStateType = innitialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASKS': {
            let copyState = {...state}
            let task = state[action.todolistId];
            let filteredTask = task.filter(el => el.id !== action.taskId);
            copyState[action.todolistId] = filteredTask;
            return copyState;
        }
        case 'ADD-TASKS': {
            let copyState = {...state};
            let newTask = {id: v1(), title: action.title, isDone: false};
            let task = state[action.todolistId];
            let newTasks = [newTask, ...task];
            copyState[action.todolistId] = newTasks;
            return copyState;
        }
        case 'CHANGE-TASKS-STATUS': {
            let copyState = {...state};
            let tasks = state[action.todolistId];
            let task = tasks.find(t => t.id === action.id);
            if (task) {
                task.isDone = action.isDone
            }
            ;
            // copyState[action.todolistId] = tasks;
            return copyState;
        }
        case 'CHANGE-TASKS-TITLE': {
            let copyState = {...state}
            let tasks = state[action.todolistId];
            let task = tasks.find(t => t.id === action.id);
            if (task) {
                task.title = action.title
            }
            ;
            //copyState[action.todolistId] = tasks;
            return copyState;
        }
        case 'ADD-TODOLIST': {
            let copyState = {...state};
            copyState[action.todolistId] = [];
            return copyState;
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}
export const removeTaskAC = (taskId: string, todolistId: string): removeTasksActionType => {
    return {type: 'REMOVE-TASKS', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTasksActionType => {
    return {type: 'ADD-TASKS', title, todolistId}
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTasksTitleActionType => {
    return {type: 'CHANGE-TASKS-TITLE', id, title, todolistId}
}
export const changeStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeStatusActionType => {
    return {type: 'CHANGE-TASKS-STATUS', id, isDone, todolistId}
}