import React, { useCallback, useEffect } from 'react'

import './App.css'
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ErrorSnackbar } from '../Components/ErrorSnackBar/ErrorSnackBar'
import { appActions } from '../features/Application'
import { selectIsInitialized, selectStatus } from '../features/Application/selectors'
import { authActions, authSelectors, Login } from '../features/Auth'
import { TodolistsList } from '../features/TodolistList'
import { useActions } from '../utils/redux-utils'

type PropsType = {
  demo?: boolean
}

export function App({ demo = false }: PropsType) {
  const status = useSelector(selectStatus)
  const isInitialized = useSelector(selectIsInitialized)
  const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)

  const { logout } = useActions(authActions)
  const { initializeApp } = useActions(appActions)

  useEffect(() => {
    if (!demo) {
      initializeApp()
    }
  }, [])

  const logoutHandler = useCallback(() => {
    logout()
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              Log out
            </Button>
          )}
        </Toolbar>
        {status === 'loading' && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <Routes>
          <Route path={'/'} element={<TodolistsList />} />
          <Route path={'/login'} element={<Login />} />
          <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
          <Route path="*" element={<Navigate to={'/404'} />} />
        </Routes>
        {/*<Route  path={'/'} render={() => <TodolistsList demo={demo} />} />*/}
        {/*<Route path={'/login'} render={() => <Login />} />*/}
      </Container>
    </div>
  )
}
