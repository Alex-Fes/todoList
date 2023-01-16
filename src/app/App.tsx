import React, { useCallback, useEffect } from 'react'

import './App.css'
import { Menu } from '@material-ui/icons'
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from '@mui/material'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { ErrorSnackBar } from '../Components/ErrorSnackBar/ErrorSnackBar'
import { authSelectors } from '../features/Auth'
import { logoutTC } from '../features/Auth/auth-reduser'
import { Login } from '../features/Auth/Login'
import { TodolistsList } from '../features/TodolistList/TodolistList'

import { initializeAppTC } from './app-reducer'
import { useAppDispatch, useAppSelector } from './hooks/hooks'
import { selectIsInitialized, selectStatus } from './selectors'

function App() {
  const status = useAppSelector(selectStatus)
  const isInitialized = useAppSelector(selectIsInitialized)
  const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])
  const logoutHandler = useCallback(() => {
    dispatch(logoutTC())
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="App">
        <AppBar position={'static'}>
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
          <ErrorSnackBar />
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path={'/'} element={<TodolistsList />} />
            <Route path={'/login'} element={<Login />} />
            <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
            <Route path="*" element={<Navigate to={'/404'} />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  )
}

export default App
