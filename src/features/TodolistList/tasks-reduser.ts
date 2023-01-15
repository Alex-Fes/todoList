import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import {
  TaskPriority,
  TaskStatuses,
  TaskType,
  todolistsAPI,
  UpdateTaskModelType,
} from '../../api/todolists-api'
import { RequestStatusType, setAppStatusAC } from '../../app/app-reducer'
import { AppRootStateType } from '../../app/store'
import { handleNetworkAppError, handleServerAppError } from '../../utils/error-utils'

import { addTodolistTC, fetchTodolistTC, removeTodolistTC } from './todolist-reduser'

const initialState: TaskStateType = {}

//THUNKS======================================

export const fetchTasksTC = createAsyncThunk(
  'tasks/fetchTasks',
  async (todolistId: string, { dispatch }) => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    const response = await todolistsAPI.getTasks(todolistId)

    const tasks = response.data.items

    dispatch(setAppStatusAC({ status: 'succeeded' }))

    return { tasks, todolistId }
  }
)

export const removeTaskTC = createAsyncThunk(
  'tasks/removeTask',
  async (param: { taskId: string; todolistId: string }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
      thunkAPI.dispatch(
        changeTaskEntityStatusAC({
          taskId: param.taskId,
          status: 'loading',
          todolistId: param.todolistId,
        })
      )
      await todolistsAPI.deleteTask(param.todolistId, param.taskId)
      thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))

      return { taskId: param.taskId, todolistId: param.todolistId }
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      handleNetworkAppError(err, thunkAPI.dispatch)

      return thunkAPI.rejectWithValue(null)
    }
  }
)

export const addTaskTC = createAsyncThunk(
  'tasks/addTask',
  async (param: { title: string; todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      const response = await todolistsAPI.createTask(param.todolistId, param.title)

      if (response.data.resultCode === 0) {
        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))

        return { task: response.data.data.item }
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

export const updateTaskTC = createAsyncThunk(
  'tasks/updateTask ',
  async (
    param: {
      taskId: string
      model: UpdateDomainTaskModelType
      todolistId: string
    },
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as AppRootStateType

    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)

    if (!task) {
      //throw new Error('Task not found in the state');
      //console.warn('Task not found in the state')

      return thunkAPI.rejectWithValue('Task not found in the state')
    }
    const apiModel: UpdateDomainTaskModelType = {
      title: task.title,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      description: task.description,
      ...param.model,
    }

    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
    thunkAPI.dispatch(
      changeTaskEntityStatusAC({
        taskId: param.taskId,
        status: 'loading',
        todolistId: param.todolistId,
      })
    )

    try {
      const response = await todolistsAPI.updateTask(
        param.todolistId,
        param.taskId,
        <UpdateTaskModelType>apiModel
      )

      if (response.data.resultCode === 0) {
        //thunkAPI.dispatch(updateTaskAC({ taskId, model: domainModel, todolistId }))
        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
        thunkAPI.dispatch(
          changeTaskEntityStatusAC({
            taskId: param.taskId,
            status: 'succeeded',
            todolistId: param.todolistId,
          })
        )

        return { taskId: param.taskId, model: param.model, todolistId: param.todolistId }
      } else {
        handleServerAppError(response.data, thunkAPI.dispatch)
        thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))
        thunkAPI.dispatch(
          changeTaskEntityStatusAC({
            taskId: param.taskId,
            status: 'succeeded',
            todolistId: param.todolistId,
          })
        )

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
  name: 'tasks',
  initialState: initialState,
  reducers: {
    changeTaskEntityStatusAC(
      state,
      action: PayloadAction<{ taskId: string; status: RequestStatusType; todolistId: string }>
    ) {
      const task = state[action.payload.todolistId]
      const index = task.findIndex(t => t.id === action.payload.taskId)

      if (index > -1) task[index].entityTaskStatus = action.payload.status
    },
  },
  extraReducers: builder => {
    builder.addCase(addTodolistTC.fulfilled, (state, action) => {
      state[action.payload.todolist.id] = []
    })
    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
      delete state[action.payload.todolistId]
    })
    builder.addCase(fetchTodolistTC.fulfilled, (state, action) => {
      action.payload.todolists.forEach(tl => {
        state[tl.id] = []
      })
    })
    builder
      .addCase(fetchTasksTC.fulfilled, (state, action) => {
        if (action.payload) state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(fetchTasksTC.rejected, (state, action) => {})
    builder
      .addCase(removeTaskTC.fulfilled, (state, action) => {
        const task = state[action.payload.todolistId]
        const index = task.findIndex(t => t.id === action.payload.taskId)

        if (index > -1) task.splice(index, 1)
      })
      .addCase(removeTaskTC.rejected, (state, action) => {})
    builder
      .addCase(addTaskTC.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift(action.payload.task)
      })
      .addCase(addTaskTC.rejected, (state, action) => {})
    builder
      .addCase(updateTaskTC.fulfilled, (state, action) => {
        const task = state[action.payload.todolistId]
        const index = task.findIndex(t => t.id === action.payload.taskId)

        if (index > -1) task[index] = { ...task[index], ...action.payload.model }
      })
      .addCase(updateTaskTC.rejected, (state, action) => {})
  },
})

export const taskReducer = slice.reducer

//ACTIONS======================================

export const { changeTaskEntityStatusAC } = slice.actions

//TYPES======================================
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriority
  startDate?: string
  deadline?: string
}

export type TasksActionType = ReturnType<typeof changeTaskEntityStatusAC>

export type TaskStateType = {
  [key: string]: Array<TaskType>
}
