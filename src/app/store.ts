import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TodolistActionType, todolistsReduser} from "../features/TodolistList/todolist-reduser";
import {taskReduser, TasksActionType} from "../features/TodolistList/tasks-reduser";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {appReducer} from "./app-reducer";



const RootReducer = combineReducers({
    todolists: todolistsReduser,
    tasks: taskReduser,
    app: appReducer
})

export const store = createStore(RootReducer, applyMiddleware(thunkMiddleware))

//types
export type AppRootStateType = ReturnType<typeof RootReducer>

//all types of Action for all App
export type AppActionsType = TodolistActionType | TasksActionType;

//type for thunk
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

//type for dispatch
export type AppDispatch = typeof store.dispatch

// // @ts-ignore
// window.store = store;