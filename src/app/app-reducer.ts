import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { authAPI } from '../api/todolists-api'
import { setIsLoggedInAC } from '../features/Login/auth-reduser'
import { handleNetworkAppError, handleServerAppError } from '../utils/error-utils'

import { AppThunkType } from './store'

const initialState = {
  status: 'loading' as RequestStatusType,
  error: null as RequestErrorType,
  isInitialized: false,
}

//SLICE======================================
const slice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setAppIsInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isInitialized = action.payload.value
    },
  },
})

export const appReducer = slice.reducer

//ACTIONS=====================================
export const { setAppErrorAC, setAppStatusAC, setAppIsInitializedAC } = slice.actions

//THUNK=====================================
export const initializeAppTC = (): AppThunkType => async dispatch => {
  try {
    const response = await authAPI.me()

    if (response.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({ value: true }))
    } else {
      handleServerAppError(response.data, dispatch)
    }
    dispatch(setAppIsInitializedAC({ value: true }))
  } catch (error) {
    const err = error as Error | AxiosError<{ error: string }>

    handleNetworkAppError(err, dispatch)
  }
}

//TYPES=====================================
type SetAppErrorActionType = typeof setAppErrorAC
type SetAppStatusActionType = typeof setAppStatusAC
type SetAppIsInitializedType = typeof setAppIsInitializedAC

export type AppReducerActionsType =
  | ReturnType<SetAppErrorActionType>
  | ReturnType<SetAppStatusActionType>
  | ReturnType<SetAppIsInitializedType>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestErrorType = string | null
export type InitialStateType = typeof initialState
