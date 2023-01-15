import { v1 } from 'uuid'

import { TaskPriority, TaskStatuses, TaskType } from '../../api/todolists-api'

import {
  addTaskTC,
  fetchTasksTC,
  removeTaskTC,
  taskReducer,
  TaskStateType,
  updateTaskTC,
} from './tasks-reduser'
import { addTodolistTC, fetchTodolistTC, removeTodolistTC } from './todolist-reduser'

const startState: TaskStateType = {
  todolistId1: [
    {
      id: '1',
      title: 'HTML',
      status: TaskStatuses.Completed,
      todoListId: 'todolistId1',
      startDate: '',
      deadline: '',
      addedDate: '',
      order: 0,
      priority: TaskPriority.Low,
      description: '',
      entityTaskStatus: 'idle',
    },
    {
      id: '2',
      title: 'JS',
      status: TaskStatuses.Completed,
      todoListId: 'todolistId1',
      startDate: '',
      deadline: '',
      addedDate: '',
      order: 0,
      priority: TaskPriority.Low,
      description: '',
      entityTaskStatus: 'idle',
    },
    {
      id: '3',
      title: 'ReactJS',
      status: TaskStatuses.New,
      todoListId: 'todolistId1',
      startDate: '',
      deadline: '',
      addedDate: '',
      order: 0,
      priority: TaskPriority.Low,
      description: '',
      entityTaskStatus: 'idle',
    },
  ],
  todolistId2: [
    {
      id: '1',
      title: 'Book',
      status: TaskStatuses.Completed,
      todoListId: 'todolistId2',
      startDate: '',
      deadline: '',
      addedDate: '',
      order: 0,
      priority: TaskPriority.Low,
      description: '',
      entityTaskStatus: 'idle',
    },
    {
      id: '2',
      title: 'Map',
      status: TaskStatuses.Completed,
      todoListId: 'todolistId2',
      startDate: '',
      deadline: '',
      addedDate: '',
      order: 0,
      priority: TaskPriority.Low,
      description: '',
      entityTaskStatus: 'idle',
    },
    {
      id: '3',
      title: 'Pen',
      status: TaskStatuses.New,
      todoListId: 'todolistId2',
      startDate: '',
      deadline: '',
      addedDate: '',
      order: 0,
      priority: TaskPriority.Low,
      description: '',
      entityTaskStatus: 'idle',
    },
  ],
}

test('correct task should be delete from correct array', () => {
  const removeTask = {
    taskId: '2',
    todolistId: 'todolistId2',
  }
  const action = removeTaskTC.fulfilled(removeTask, 'requestId', removeTask)
  const endState = taskReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(2)
  expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy()
  expect(endState['todolistId2'][0].id).toBe('1')
  expect(endState['todolistId2'][1].id).toBe('3')
})

test('correct task should be add from correct array', () => {
  const task: TaskType = {
    id: 'id exist',
    todoListId: 'todolistId1',
    startDate: '',
    order: 0,
    priority: 0,
    status: TaskStatuses.New,
    title: 'CSS',
    addedDate: '',
    deadline: '',
    description: '',
    entityTaskStatus: 'idle',
  }

  const action = addTaskTC.fulfilled({ task: task }, 'requestId', {
    title: task.title,
    todolistId: task.todoListId,
  })

  const endState = taskReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(4)
  expect(endState['todolistId2'].length).toBe(3)
  expect(endState['todolistId1'][0].id).toBeDefined()
  expect(endState['todolistId1'][0].title).toBe('CSS')
  expect(endState['todolistId1'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
  let updateModel = {
    taskId: '2',
    model: { status: TaskStatuses.New },
    todolistId: 'todolistId2',
  }

  const action = updateTaskTC.fulfilled(updateModel, 'requestId', updateModel)
  const endState = taskReducer(startState, action)

  expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {
  let updateModel = { taskId: '2', model: { title: 'Cards' }, todolistId: 'todolistId2' }

  const action = updateTaskTC.fulfilled(updateModel, 'requestId', updateModel)
  const endState = taskReducer(startState, action)

  expect(endState['todolistId1'][1].title).toBe('JS')
  expect(endState['todolistId2'][1].title).toBe('Cards')
})

test('new property with new array should be add when new todolist is add', () => {
  const payload = {
    todolist: {
      id: v1(),
      addedDate: '',
      order: 0,
      title: 'new todolist',
    },
  }
  const action = addTodolistTC.fulfilled(payload, 'requestId', payload.todolist.title)
  const endState = taskReducer(startState, action)

  const keys = Object.keys(endState) // возвращает объект в виде строк всех ключей в ассоц массиве
  const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')

  if (!newKey) {
    throw Error('new key should be add')
  }
  expect(keys.length).toBe(3)
  expect(endState[newKey]).toStrictEqual([])
})

test('property with todolistId should be delete', () => {
  const action = removeTodolistTC.fulfilled(
    { todolistId: 'todolistId2' },
    'requestId',
    'todolistId2'
  )
  const endState = taskReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).toBeUndefined()
})

test('empty array should be added when we set todolists', () => {
  const payload = {
    todolists: [
      { id: 'todolistId1', title: 'What to learn', addedDate: '', order: 0 },
      { id: 'todolistId2', title: 'What to buy', addedDate: '', order: 0 },
    ],
  }
  const action = fetchTodolistTC.fulfilled(payload, 'requestId')
  const endState = taskReducer({}, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState['todolistId2']).toStrictEqual([])
  expect(endState['todolistId1']).toStrictEqual([])
})

test('tasks should be added for todolist', () => {
  //const action = setTasksAC({ tasks: startState['todolistId1'], todolistId: 'todolistId1' })
  const action = fetchTasksTC.fulfilled(
    { tasks: startState['todolistId1'], todolistId: 'todolistId1' },
    '',
    'todolistId1'
  )
  const endState = taskReducer(
    {
      todolistId2: [],
      todolistId1: [],
    },
    action
  )

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(0)
})
