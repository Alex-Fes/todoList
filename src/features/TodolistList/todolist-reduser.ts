import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { todolistsAPI, TodolistType } from '../../api/todolists-api'
import { RequestStatusType, setAppStatusAC } from '../../app/app-reducer'
import { AppThunkType } from '../../app/store'
import { handleNetworkAppError, handleServerAppError } from '../../utils/error-utils'

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
  name: 'todolists',
  initialState: initialState,
  reducers: {
    addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
      state.unshift({ ...action.payload.todolist, filter: 'All', entityStatus: 'idle' })
    },
    removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)

      if (index > -1) {
        state.splice(index, 1)
      }
    },
    changeTodolistTitleAC(state, action: PayloadAction<{ title: string; id: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)

      state[index].title = action.payload.title
    },
    changeTodolistFilterAC(
      state,
      action: PayloadAction<{ filter: filterValueType; todolistId: string }>
    ) {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId)

      state[index].filter = action.payload.filter
    },
    changeTodolistEntityStatusAC(
      state,
      action: PayloadAction<{ id: string; status: RequestStatusType }>
    ) {
      const index = state.findIndex(tl => tl.id === action.payload.id)

      state[index].entityStatus = action.payload.status
    },
    setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
      return action.payload.todolists.map(tl => ({ ...tl, filter: 'All', entityStatus: 'idle' }))
    },
  },
})

export const todolistsReducer = slice.reducer

//ACTIONS======================================

export const {
  removeTodolistAC,
  setTodolistsAC,
  addTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  changeTodolistEntityStatusAC,
} = slice.actions

//THUNKS======================================
export const fetchTodolistTC = (): AppThunkType => async dispatch => {
  try {
    dispatch(setAppStatusAC({ status: 'loading' }))
    const response = await todolistsAPI.getTodolists()

    dispatch(setTodolistsAC({ todolists: response.data }))
    dispatch(setAppStatusAC({ status: 'succeeded' }))
  } catch (error) {
    const err = error as Error | AxiosError<{ error: string }>

    handleNetworkAppError(err, dispatch)
  }
}

export const removeTodolistTC =
  (todolistId: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC({ status: 'loading' }))
      dispatch(changeTodolistEntityStatusAC({ id: todolistId, status: 'loading' }))
      await todolistsAPI.deleteTodolist(todolistId)

      dispatch(removeTodolistAC({ id: todolistId }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      handleNetworkAppError(err, dispatch)
    }
  }

export const addTodolistTC =
  (title: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC({ status: 'loading' }))
      const response = await todolistsAPI.createTodolist(title)

      if (response.data.resultCode === 0) {
        dispatch(addTodolistAC({ todolist: response.data.data.item }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      handleNetworkAppError(err, dispatch)
    }
  }

export const changeTodolistTitleTC =
  (title: string, id: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC({ status: 'loading' }))
      dispatch(changeTodolistEntityStatusAC({ id, status: 'loading' }))
      const response = await todolistsAPI.updateTodolist(id, title)

      if (response.data.resultCode === 0) {
        dispatch(changeTodolistTitleAC({ title, id }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
        dispatch(changeTodolistEntityStatusAC({ id, status: 'succeeded' }))
      } else {
        handleServerAppError(response.data, dispatch)
        dispatch(setAppStatusAC({ status: 'succeeded' }))
        dispatch(changeTodolistEntityStatusAC({ id, status: 'succeeded' }))
      }
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      handleNetworkAppError(err, dispatch)
    }
  }

//TYPES======================================
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>
export type TodolistActionType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof changeTodolistEntityStatusAC>
  | SetTodolistActionType

export type filterValueType = 'All' | 'Active' | 'Completed'
export type TodolistDomainType = TodolistType & {
  filter: filterValueType
  entityStatus: RequestStatusType
}
