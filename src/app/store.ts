import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { authReducer, LoginActionType } from '../features/Auth/auth-reduser'
import { taskReducer, TasksActionType } from '../features/TodolistList/tasks-reduser'
import { TodolistActionType, todolistsReducer } from '../features/TodolistList/todolist-reduser'

import { appReducer, AppReducerActionsType } from './app-reducer'

const RootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: taskReducer,
  app: appReducer,
  auth: authReducer,
})

//export const store = createStore(RootReducer, applyMiddleware(thunkMiddleware))

export const store = configureStore({
  reducer: RootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})

//types
export type AppRootStateType = ReturnType<typeof store.getState>

//all types of Action for all App
export type AppActionsType =
  | TodolistActionType
  | TasksActionType
  | AppReducerActionsType
  | LoginActionType

//type for thunk
export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionsType
>

//type for dispatch
//export type AppDispatchType = typeof store.dispatch
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

// // @ts-ignore
// window.store = store;
