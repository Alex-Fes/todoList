import { v1 } from 'uuid'

import { TodolistType } from '../../api/todolists-api'
import { RequestStatusType } from '../../app/app-reducer'

import {
  addTodolistAC,
  changeTodolistEntityStatusAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  filterValueType,
  removeTodolistAC,
  setTodolistsAC,
  TodolistActionType,
  TodolistDomainType,
  todolistsReducer,
} from './todolist-reduser'

let todolistId1 = v1()
let todolistId2 = v1()

const initialGlobalState: Array<TodolistDomainType> = [
  {
    id: todolistId1,
    title: 'What to learn',
    filter: 'All',
    addedDate: '',
    order: 0,
    entityStatus: 'idle',
  },
  {
    id: todolistId2,
    title: 'What to buy',
    filter: 'All',
    addedDate: '',
    order: 0,
    entityStatus: 'idle',
  },
]

// type initialStateType = ReturnType<typeof initialState>

test('correct todolist should be delete', () => {
  const endState = todolistsReducer(initialGlobalState, removeTodolistAC({ id: todolistId1 }))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be add', () => {
  let newTodolistTitle: TodolistType = {
    title: 'New Task',
    id: 'any id',
    order: 0,
    addedDate: '',
  }
  const endState = todolistsReducer(
    initialGlobalState,
    addTodolistAC({ todolist: newTodolistTitle })
  )

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodolistTitle.title)
})

test('correct todolist should change title', () => {
  let newTodolistTitle = 'New Task'
  let action = changeTodolistTitleAC({ title: newTodolistTitle, id: todolistId2 })
  const endState = todolistsReducer(initialGlobalState, action)

  expect(endState.length).toBe(2)
  expect(endState[1].title).toBe(newTodolistTitle)
  expect(endState[0].title).toBe('What to learn')
})

test('correct filter of todolist should be change ', () => {
  let newFilter: filterValueType = 'Completed'

  let action: TodolistActionType = changeTodolistFilterAC({
    filter: newFilter,
    todolistId: todolistId2,
  })

  const endState = todolistsReducer(initialGlobalState, action)

  expect(endState.length).toBe(2)
  expect(endState[1].filter).toBe(newFilter)
  expect(endState[0].filter).toBe('All')
})

test('todolists should be set to state ', () => {
  const action = setTodolistsAC({ todolists: initialGlobalState })

  const endState = todolistsReducer([], action)

  expect(endState.length).toBe(2)
})

test('correct entity status of todolist should be change ', () => {
  let newStatus: RequestStatusType = 'loading'

  let action: TodolistActionType = changeTodolistEntityStatusAC({
    id: todolistId2,
    status: newStatus,
  })

  const endState = todolistsReducer(initialGlobalState, action)

  expect(endState[0].entityStatus).toBe('idle')
  expect(endState[1].entityStatus).toBe('loading')
})
