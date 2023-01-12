import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { authAPI, LoginParamsType } from '../../api/todolists-api'
import { setAppStatusAC } from '../../app/app-reducer'
import { AppThunkType } from '../../app/store'
import { handleNetworkAppError, handleServerAppError } from '../../utils/error-utils'

const initialState: InitialStateType = {
  isLoggedIn: false,
}

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    },
  },
})

export const authReducer = slice.reducer

//ACTIONS=====================================
export const { setIsLoggedInAC } = slice.actions

//THUNKS=====================================
export const loginTC =
  (data: LoginParamsType): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC({ status: 'loading' }))
      const response = await authAPI.login(data)

      if (response.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({ value: true }))
        dispatch(setAppStatusAC({ status: 'succeeded' }))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      handleNetworkAppError(err, dispatch)
    }
  }

export const logoutTC = (): AppThunkType => async dispatch => {
  try {
    dispatch(setAppStatusAC({ status: 'loading' }))
    const response = await authAPI.logout()

    if (response.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({ value: false }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } else {
      handleServerAppError(response.data, dispatch)
    }
  } catch (error) {
    const err = error as Error | AxiosError<{ error: string }>

    handleNetworkAppError(err, dispatch)
  }
}

// TYPES=====================================

export type LoginActionType = ReturnType<typeof setIsLoggedInAC>
type InitialStateType = {
  isLoggedIn: boolean
}
