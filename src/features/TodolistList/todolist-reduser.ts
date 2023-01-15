import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { todolistsAPI, TodolistType } from '../../api/todolists-api'
import { RequestStatusType, setAppStatusAC } from '../../app/app-reducer'
import { handleNetworkAppError, handleServerAppError } from '../../utils/error-utils'

//THUNKS======================================
export const fetchTodolistTC = createAsyncThunk(
  'todolists/fetchTodolist',
  async (param, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatusAC({ status: 'loading' }))
      const response = await todolistsAPI.getTodolists()

      //dispatch(setTodolistsAC({ todolists: response.data }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))

      return { todolists: response.data }
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      handleNetworkAppError(err, dispatch)

      return rejectWithValue(null)
    }
  }
)

export const removeTodolistTC = createAsyncThunk(
  'todolists/removeTodolist',
  async (todolistId: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
      thunkAPI.dispatch(changeTodolistEntityStatusAC({ id: todolistId, status: 'loading' }))
      await todolistsAPI.deleteTodolist(todolistId)

      // dispatch(removeTodolistAC({ id: todolistId }))
      thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))

      return { todolistId }
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      handleNetworkAppError(err, thunkAPI.dispatch)

      return thunkAPI.rejectWithValue(null)
    }
  }
)

export const addTodolistTC = createAsyncThunk(
  'todolists/addTodolist',
  async (title: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
      const response = await todolistsAPI.createTodolist(title)

      if (response.data.resultCode === 0) {
        //thunkAPI.dispatch(addTodolistAC({ todolist: response.data.data.item }))
        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))

        return { todolist: response.data.data.item }
      } else {
        handleServerAppError(response.data, thunkAPI.dispatch)

        return thunkAPI.rejectWithValue(null)
      }
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      handleNetworkAppError(err, thunkAPI.dispatch)

      return thunkAPI.rejectWithValue(null)
    }
  }
)

export const changeTodolistTitleTC = createAsyncThunk(
  'todolists/changeTodolistTitle',
  async (param: { title: string; id: string }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
      thunkAPI.dispatch(changeTodolistEntityStatusAC({ id: param.id, status: 'loading' }))
      const response = await todolistsAPI.updateTodolist(param.id, param.title)

      if (response.data.resultCode === 0) {
        //thunkAPI.dispatch(changeTodolistTitleAC({ title, id }))
        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
        thunkAPI.dispatch(changeTodolistEntityStatusAC({ id: param.id, status: 'succeeded' }))

        return { title: param.title, id: param.id }
      } else {
        handleServerAppError(response.data, thunkAPI.dispatch)
        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
        thunkAPI.dispatch(changeTodolistEntityStatusAC({ id: param.id, status: 'succeeded' }))

        return thunkAPI.rejectWithValue(null)
      }
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      handleNetworkAppError(err, thunkAPI.dispatch)

      return thunkAPI.rejectWithValue(null)
    }
  }
)

const slice = createSlice({
  name: 'todolists',
  initialState: [] as Array<TodolistDomainType>,
  reducers: {
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
  },
  extraReducers: builder => {
    builder.addCase(fetchTodolistTC.fulfilled, (state, action) => {
      if (action.payload?.todolists.length) {
        return action.payload.todolists.map(tl => ({
          ...tl,
          filter: 'All',
          entityStatus: 'idle',
        }))
      }
    })
    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId)

      if (index > -1) {
        state.splice(index, 1)
      }
    })
    builder.addCase(addTodolistTC.fulfilled, (state, action) => {
      state.unshift({ ...action.payload.todolist, filter: 'All', entityStatus: 'idle' })
    })
    builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)

      state[index].title = action.payload.title
    })
  },
})

export const todolistsReducer = slice.reducer

//ACTIONS======================================

export const {
  // removeTodolistAC,
  // // setTodolistsAC,
  // addTodolistAC,
  //changeTodolistTitleAC,
  changeTodolistFilterAC,
  changeTodolistEntityStatusAC,
} = slice.actions

//TYPES======================================

export type TodolistActionType =
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof changeTodolistEntityStatusAC>

export type filterValueType = 'All' | 'Active' | 'Completed'
export type TodolistDomainType = TodolistType & {
  filter: filterValueType
  entityStatus: RequestStatusType
}
