import {v1} from "uuid";
import {AddTodolistActionType, removeTodolistActionType, todolistId1, todolistId2} from "./todolist-reduser";
import {TaskPriority, TaskStatuses} from "../api/todolists-api";
import {TaskStateType} from "../App";


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
    status: TaskStatuses
    todolistId: string
}
type ActionType =
    removeTasksActionType
    | AddTasksActionType
    | ChangeTasksTitleActionType
    | ChangeStatusActionType
    | AddTodolistActionType
    | removeTodolistActionType;

const innitialState: TaskStateType = {}


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
            let newTask = {id: v1(), title: action.title, status: TaskStatuses.New, todoListId: action.todolistId,
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''};
            let task = state[action.todolistId];
            let newTasks = [newTask, ...task];
            copyState[action.todolistId] = newTasks;
            return copyState;
        }
        case 'CHANGE-TASKS-STATUS': {
            let tasks = state[action.todolistId];
            state[action.todolistId] = tasks.map(t => t.id === action.id ?
                {...t, status: action.status}
                : t);
            // let task = tasks.find(t => t.id === action.id);
            // if (task) {
            //     let newTask = {...task, isDone: action.isDone}
            //     //task.isDone = action.isDone
            // };
            //  copyState[action.todolistId] = [...tasks];
            return ({...state});
        }
        case 'CHANGE-TASKS-TITLE': {
            let tasks = state[action.todolistId];
            state[action.todolistId] = tasks.map(t => t.id === action.id ?
                {...t, title: action.title}
                : t);

            // let task = tasks.find(t => t.id === action.id);
            // if (task) {
            //     task.title = action.title
            // };
            // copyState[action.todolistId] = [...tasks];
            return ({...state});
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
export const changeStatusAC = (id: string, status: TaskStatuses, todolistId: string): ChangeStatusActionType => {
    return {type: 'CHANGE-TASKS-STATUS', id, status, todolistId}
}