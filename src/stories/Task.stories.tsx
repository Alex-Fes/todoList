import { action } from '@storybook/addon-actions'

import { TaskPriority, TaskStatuses } from '../api/todolists-api'
import { Task } from '../features/TodolistList/Todolist/Task/Task'

export default {
  title: 'Task Component',
  component: Task,
}
const changeTaskStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Title changed')
const removeTaskCallback = action('Task is remove')

export const TaskBaseExample = () => {
  return (
    <>
      <Task
        task={{
          id: '1',
          status: TaskStatuses.Completed,
          title: 'CSS',
          todoListId: 'todolistId1',
          startDate: '',
          deadline: '',
          addedDate: '',
          order: 0,
          priority: TaskPriority.Low,
          description: '',
          entityTaskStatus: 'idle',
        }}
        removeTask={removeTaskCallback}
        changeTaskStatus={changeTaskStatusCallback}
        changeTaskTitle={changeTaskTitleCallback}
        todolistId={'todolistId1'}
        entityTaskStatus={'loading'}
      />
      <Task
        task={{
          id: '2',
          status: TaskStatuses.New,
          title: 'JS',
          todoListId: 'todolistId1',
          startDate: '',
          deadline: '',
          addedDate: '',
          order: 0,
          priority: TaskPriority.Low,
          description: '',
          entityTaskStatus: 'idle',
        }}
        removeTask={removeTaskCallback}
        changeTaskStatus={changeTaskStatusCallback}
        changeTaskTitle={changeTaskTitleCallback}
        todolistId={'todolistId2'}
        entityTaskStatus={'loading'}
      />
    </>
  )
}
