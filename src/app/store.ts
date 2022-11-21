import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TodolistActionType, todolistsReduser} from "../features/TodolistList/todolist-reduser";
import {taskReduser, TasksActionType} from "../features/TodolistList/tasks-reduser";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer} from "./app-reducer";



const RootReducer = combineReducers({
    todolists: todolistsReduser,
    tasks: taskReduser,
    app: appReducer
})

export const store = createStore(RootReducer, applyMiddleware(thunkMiddleware))

//types
export type AppRootStateType = ReturnType<typeof store.getState>

//all types of Action for all App
export type AppActionsType = TodolistActionType | TasksActionType;

//type for thunk
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

//type for dispatch
//export type AppDispatchType = typeof store.dispatch
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

// // @ts-ignore
// window.store = store;