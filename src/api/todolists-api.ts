import axios from 'axios'

import { RequestStatusType } from '../app/app-reducer'

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    'API-KEY': '3af1a50e-9363-4d90-80ea-b72e392fafcb',
  },
})

//api
export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists')
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', { title: title })
  },
  updateTodolist(id: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${id}`, { title: title })
  },
  deleteTodolist(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`)
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {
      title: title,
    })
  },
}

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{ userId?: number }>>('auth/login', data)
  },
  logout() {
    return instance.delete<ResponseType<{ userId?: number }>>('auth/login')
  },
  me() {
    return instance.get<ResponseType<{ Id: number; email: string; login: string }>>('auth/me')
  },
}

//types
export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
export type FieldErrorType = { field: string; error: string }

export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors?: Array<FieldErrorType>
  data: D
}

export enum TaskStatuses {
  New,
  InProgress,
  Completed,
  Draft,
}

export enum TaskPriority {
  Low,
  Middle,
  Hi,
  Urgently,
  Later,
}

export type TaskType = {
  description: string
  title: string
  //completed: boolean
  status: TaskStatuses
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
  entityTaskStatus: RequestStatusType
}
export type UpdateTaskModelType = {
  title: string
  description: string
  //completed: boolean
  status: TaskStatuses
  priority: TaskPriority
  startDate: string
  deadline: string
}
type GetTasksResponseType = {
  error: string | null
  totalCount: number
  items: Array<TaskType>
}
