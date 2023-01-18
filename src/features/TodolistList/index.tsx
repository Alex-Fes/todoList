import { asyncActions as tasksAsyncActions, slice as tasksSlice } from './tasks-reduser'
import { asyncActions as todolistsAsyncActions, slice as todolistsSlice } from './todolist-reduser'
import { TodolistsList } from './TodolistList'

const todolistsActions = {
  ...todolistsAsyncActions,
  ...todolistsSlice.actions,
}
const tasksActions = {
  ...tasksAsyncActions,
  ...tasksSlice.actions,
}

const todolistsReducer = todolistsSlice.reducer
const tasksReducer = tasksSlice.reducer

export { tasksActions, todolistsActions, TodolistsList, todolistsReducer, tasksReducer }
