import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { authAPI } from '../api/todolists-api'
import { setIsLoggedInAC } from '../features/Auth/auth-reduser'
import { handleNetworkAppError } from '../utils/error-utils'

//THUNK=====================================

export const initializeAppTC = createAsyncThunk(
  'app/initializeApp',
  async (param, { dispatch }) => {
    try {
      const response = await authAPI.me()

      if (response.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({ value: true }))
      } else {
        //handleServerAppError(response.data, dispatch)
      }

      //dispatch(setAppIsInitializedAC({ value: true }))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      handleNetworkAppError(err, dispatch)
    }
  }
)

//SLICE======================================
const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatusType,
    error: null as RequestErrorType,
    isInitialized: false,
  },
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
  },
  extraReducers: builder => {
    builder.addCase(initializeAppTC.fulfilled, (state, action) => {
      state.isInitialized = true
    })
  },
})

export const appReducer = slice.reducer

//ACTIONS=====================================
export const { setAppErrorAC, setAppStatusAC } = slice.actions

//TYPES=====================================
type SetAppErrorActionType = typeof setAppErrorAC
type SetAppStatusActionType = typeof setAppStatusAC

export type AppReducerActionsType =
  | ReturnType<SetAppErrorActionType>
  | ReturnType<SetAppStatusActionType>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestErrorType = string | null
