import React, { useCallback, useEffect } from 'react'

import { Grid, Paper } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { TaskStatuses } from '../../api/todolists-api'
import { setAppErrorAC } from '../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks'
import { AddItemForm } from '../../Components/AddItemForm/AddItemForm'
import { selectIsLoggedIn } from '../Auth/selectors'

import { addTaskTC, removeTaskTC, updateTaskTC } from './tasks-reduser'
import { Todolist } from './Todolist/Todolist'
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodolistTC,
  filterValueType,
  removeTodolistTC,
} from './todolist-reduser'

type TodolistsListPropsType = {}
export const TodolistsList: React.FC<TodolistsListPropsType> = () => {
  const dispatch = useAppDispatch()
  const todolists = useAppSelector(state => state.todolists)
  const tasks1 = useAppSelector(state => state.tasks)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(fetchTodolistTC())
  }, [])
  const removeTask = useCallback(
    (taskId: string, todolistId: string) => {
      dispatch(removeTaskTC({ taskId, todolistId }))
    },
    [dispatch]
  )
  const addTask = useCallback(
    (title: string, todolistId: string) => {
      dispatch(addTaskTC({ title, todolistId }))
    },
    [dispatch]
  )
  const changeStatus = useCallback(
    (taskId: string, status: TaskStatuses, todolistId: string) => {
      dispatch(updateTaskTC({ taskId, model: { status }, todolistId }))
    },
    [dispatch]
  )
  const changeTaskTitle = useCallback(
    (taskId: string, newTitle: string, todolistId: string) => {
      if (newTitle.length >= 100) {
        dispatch(setAppErrorAC({ error: 'Your Title must be shorter then 100 symbols' }))

        return
      }
      dispatch(updateTaskTC({ taskId, model: { title: newTitle }, todolistId }))
    },
    [dispatch]
  )
  const addTodoList = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title))
    },
    [dispatch]
  )
  const removeTodolist = useCallback(
    (todolistId: string) => {
      dispatch(removeTodolistTC(todolistId))
    },
    [dispatch]
  )
  const changeFilter = useCallback(
    (filter: filterValueType, todolistId: string) => {
      dispatch(changeTodolistFilterAC({ filter, todolistId }))
    },
    [dispatch]
  )
  const changeTodoListTitle = useCallback(
    (newTitle: string, id: string) => {
      if (newTitle.length >= 100) {
        dispatch(setAppErrorAC({ error: 'Your Title must be shorter then 100 symbols' }))
        dispatch(changeTodolistTitleTC({ title: newTitle, id }))

        return
      }
      dispatch(changeTodolistTitleTC({ title: newTitle, id }))
    },
    [dispatch]
  )

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <Grid container style={{ padding: '10px' }}>
        <AddItemForm addItem={addTodoList} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map(tl => {
          let filteredTasks = tasks1[tl.id]

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: '10px' }}>
                <Todolist
                  key={tl.id}
                  todolist={tl}
                  tasks={filteredTasks}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  changeTaskTitle={changeTaskTitle}
                  removeTodolist={removeTodolist}
                  changeTodoListTitle={changeTodoListTitle}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
