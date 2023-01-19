import React, { useCallback, useEffect } from 'react'

import { Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { AddItemForm, AddItemFormSubmitHelperType } from '../../Components/AddItemForm/AddItemForm'
import { useActions, useAppDispatch } from '../../utils/redux-utils'
import { AppRootStateType } from '../../utils/types'
import { appSelectors } from '../Application'
import { selectIsLoggedIn } from '../Auth/selectors'

import { TasksStateType } from './tasks-reduser'
import { Todolist } from './Todolist/Todolist'
import { TodolistDomainType } from './todolist-reduser'
import s from './TodolistList.module.css'

import { todolistsActions } from './index'

type PropsType = {
  demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    state => state.todolists
  )
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const appStatus = useSelector(appSelectors.selectStatus)

  const dispatch = useAppDispatch()

  const { fetchTodolistsTC } = useActions(todolistsActions)

  const addTodolistCallback = useCallback(
    async (title: string, helper: AddItemFormSubmitHelperType) => {
      let thunk = todolistsActions.addTodolistTC(title)
      const resultAction = await dispatch(thunk)

      if (todolistsActions.addTodolistTC.rejected.match(resultAction)) {
        if (resultAction.payload?.errors?.length) {
          const errorMessage = resultAction.payload?.errors[0]

          helper.setError(errorMessage)
        } else {
          helper.setError('Some error occured')
        }
      } else {
        helper.setTitle('')
      }
    },
    []
  )

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return
    }
    fetchTodolistsTC()
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className={s.mainContainer}>
      <div className={s.addItem}>
        <Grid container>
          <AddItemForm disabled={appStatus === 'loading'} addItem={addTodolistCallback} />
        </Grid>
      </div>
      <div className={s.allItem}>
        <Grid container spacing={3} style={{ flexWrap: 'nowrap', overflowX: 'scroll' }}>
          {todolists.map(tl => {
            let allTodolistTasks = tasks[tl.id]

            return (
              <Grid item key={tl.id}>
                <div style={{ width: '300px' }}>
                  <Todolist todolist={tl} tasks={allTodolistTasks} demo={demo} />
                </div>
              </Grid>
            )
          })}
        </Grid>
      </div>
    </div>
  )
}
