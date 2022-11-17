import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TodolistActionType, todolistsReduser} from "./todolist-reduser";
import {taskReduser, TasksActionType} from "./tasks-reduser";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {appReducer} from "../app/app-reducer";


export type AppRootStateType = ReturnType<typeof RootReducer>

//all types of Action for all App
export type AppActionsType = TodolistActionType | TasksActionType;

//type for thunk
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

const RootReducer = combineReducers({
    todolists: todolistsReduser,
    tasks: taskReduser,
    app: appReducer
})

export const store = createStore(RootReducer, applyMiddleware(thunkMiddleware))


// // @ts-ignore
// window.store = store;