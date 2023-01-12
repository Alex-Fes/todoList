import React, { memo, useCallback, useEffect } from 'react'

import { Button } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { IconButton } from '@mui/material'

import { TaskStatuses, TaskType } from '../../../api/todolists-api'
import { useAppDispatch } from '../../../app/hooks/hooks'
import { AddItemForm } from '../../../Components/AddItemForm/AddItemForm'
import { EditableSpan } from '../../../Components/EditebleSpan/EditableSpan'
import { fetchTasksTC } from '../tasks-reduser'
import { filterValueType, TodolistDomainType } from '../todolist-reduser'

import { Task } from './Task/Task'

type PropsType = {
  todolist: TodolistDomainType
  tasks: Array<TaskType>
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (value: filterValueType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
  changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
  removeTodolist: (todolistId: string) => void
  changeTodoListTitle: (newTitle: string, id: string) => void
}

export const Todolist = memo(function (props: PropsType) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(props.todolist.id))
  }, [])

  const onAllClickHandler = useCallback(
    () => props.changeFilter('All', props.todolist.id),
    [props.changeFilter, props.todolist.id]
  )
  const onActiveClickHandler = useCallback(
    () => props.changeFilter('Active', props.todolist.id),
    [props.changeFilter, props.todolist.id]
  )
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter('Completed', props.todolist.id),
    [props.changeFilter, props.todolist.id]
  )
  const removeTodolistHandler = () => {
    props.removeTodolist(props.todolist.id)
  }

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.todolist.id)
    },
    [props.addTask, props.todolist.id]
  )
  const changeTodoListTitle = useCallback(
    (newTitle: string) => {
      props.changeTodoListTitle(newTitle, props.todolist.id)
    },
    [props.changeTodoListTitle, props.todolist.id]
  )

  let filteredTasks = props.tasks

  if (props.todolist.filter === 'Completed') {
    filteredTasks = props.tasks.filter(el => el.status === TaskStatuses.Completed)
  }
  if (props.todolist.filter === 'Active') {
    filteredTasks = props.tasks.filter(el => el.status === TaskStatuses.New)
  }

  return (
    <div>
      <h3>
        <EditableSpan
          title={props.todolist.title}
          onChange={changeTodoListTitle}
          disabled={props.todolist.entityStatus === 'loading'}
        />
        <IconButton
          aria-label="delete"
          onClick={removeTodolistHandler}
          disabled={props.todolist.entityStatus === 'loading'}
        >
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'} />
      <div>
        {filteredTasks.map(el => (
          <Task
            entityTaskStatus={el.entityTaskStatus}
            task={el}
            removeTask={props.removeTask}
            changeTaskStatus={props.changeTaskStatus}
            changeTaskTitle={props.changeTaskTitle}
            todolistId={props.todolist.id}
            key={el.id}
          />
        ))}
      </div>
      <div style={{ paddingTop: '10px' }}>
        <Button
          variant={props.todolist.filter === 'All' ? 'contained' : 'text'}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          color={'primary'}
          variant={props.todolist.filter === 'Active' ? 'contained' : 'text'}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          color={'secondary'}
          variant={props.todolist.filter === 'Completed' ? 'contained' : 'text'}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  )
})
