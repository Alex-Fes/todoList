import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import {
  TaskPriority,
  TaskStatuses,
  TaskType,
  todolistsAPI,
  UpdateTaskModelType,
} from '../../api/todolists-api'
import { RequestStatusType, setAppStatusAC } from '../../app/app-reducer'
import { AppActionsType, AppRootStateType, AppThunkType } from '../../app/store'
import { handleNetworkAppError, handleServerAppError } from '../../utils/error-utils'

import {
  addTodolistAC,
  AddTodolistActionType,
  removeTodolistAC,
  RemoveTodolistActionType,
  SetTodolistActionType,
  setTodolistsAC,
} from './todolist-reduser'

const initialState: TaskStateType = {}

const slice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>; todolistId: string }>) {
      state[action.payload.todolistId] = action.payload.tasks
    },
    addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    },
    updateTaskAC(
      state,
      action: PayloadAction<{
        taskId: string
        model: UpdateDomainTaskModelType
        todolistId: string
      }>
    ) {
      const task = state[action.payload.todolistId]
      const index = task.findIndex(t => t.id === action.payload.taskId)

      if (index > -1) task[index] = { ...task[index], ...action.payload.model }
    },
    changeTaskEntityStatusAC(
      state,
      action: PayloadAction<{ taskId: string; status: RequestStatusType; todolistId: string }>
    ) {
      const task = state[action.payload.todolistId]
      const index = task.findIndex(t => t.id === action.payload.taskId)

      if (index > -1) task[index].entityTaskStatus = action.payload.status
    },
    removeTaskAC(state, action: PayloadAction<{ taskId: string; todolistId: string }>) {
      const task = state[action.payload.todolistId]
      const index = task.findIndex(t => t.id === action.payload.taskId)

      if (index > -1) task.splice(index, 1)
    },
  },
  extraReducers: builder => {
    builder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todolist.id] = []
    })
    builder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.id]
    })
    builder.addCase(setTodolistsAC, (state, action) => {
      action.payload.todolists.forEach(tl => {
        state[tl.id] = []
      })
    })
  },
})

export const taskReducer = slice.reducer

//ACTIONS======================================

export const { removeTaskAC, addTaskAC, updateTaskAC, setTasksAC, changeTaskEntityStatusAC } =
  slice.actions

//THUNKS======================================
export const fetchTasksTC =
  (todolistId: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC({ status: 'loading' }))
      const response = await todolistsAPI.getTasks(todolistId)

      dispatch(setTasksAC({ tasks: response.data.items, todolistId }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      handleNetworkAppError(err, dispatch)
    }
  }

export const removeTaskTC =
  (taskId: string, todolistId: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC({ status: 'loading' }))
      dispatch(changeTaskEntityStatusAC({ taskId, status: 'loading', todolistId }))
      await todolistsAPI.deleteTask(todolistId, taskId)

      dispatch(removeTaskAC({ taskId, todolistId }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      handleNetworkAppError(err, dispatch)
    }
  }

export const addTaskTC =
  (title: string, todolistId: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC({ status: 'loading' }))
      const response = await todolistsAPI.createTask(todolistId, title)

      if (response.data.resultCode === 0) {
        dispatch(addTaskAC({ task: response.data.data.item }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      handleNetworkAppError(err, dispatch)
    }
  }

export const updateTaskTC =
  (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunkType =>
  async (dispatch: Dispatch<AppActionsType>, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)

    if (!task) {
      //throw new Error('Task not found in the state');
      console.warn('Task not found in the state')

      return
    }
    const apiModel: UpdateDomainTaskModelType = {
      title: task.title,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      description: task.description,
      ...domainModel,
    }

    try {
      dispatch(setAppStatusAC({ status: 'loading' }))
      dispatch(changeTaskEntityStatusAC({ taskId, status: 'loading', todolistId }))
      const response = await todolistsAPI.updateTask(
        todolistId,
        taskId,
        <UpdateTaskModelType>apiModel
      )

      if (response.data.resultCode === 0) {
        dispatch(updateTaskAC({ taskId, model: domainModel, todolistId }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
        dispatch(changeTaskEntityStatusAC({ taskId, status: 'succeeded', todolistId }))
      } else {
        handleServerAppError(response.data, dispatch)
        dispatch(setAppStatusAC({ status: 'succeeded' }))
        dispatch(changeTaskEntityStatusAC({ taskId, status: 'succeeded', todolistId }))
      }
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      handleNetworkAppError(err, dispatch)
    }
  }

//TYPES======================================
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriority
  startDate?: string
  deadline?: string
}

export type TasksActionType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistActionType
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof changeTaskEntityStatusAC>

export type TaskStateType = {
  [key: string]: Array<TaskType>
}
