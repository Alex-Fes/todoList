import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodolistActionType, todolistsReduser} from "./todolist-reduser";
import {taskReduser, TasksActionType} from "./tasks-reduser";
import thunkMiddleware from "redux-thunk";

export type AppRootStateType = ReturnType<typeof RootReduser>


//all types of Action for all App
export type AppActionsType = TodolistActionType | TasksActionType;



const RootReduser = combineReducers({
    todolists: todolistsReduser,
    tasks: taskReduser
})

export const store = createStore(RootReduser, applyMiddleware(thunkMiddleware))


// @ts-ignore
window.store = store;