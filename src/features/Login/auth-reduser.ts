import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { authAPI, FieldErrorType, LoginParamsType } from '../../api/todolists-api'
import { setAppStatusAC } from '../../app/app-reducer'
import { handleNetworkAppError, handleServerAppError } from '../../utils/error-utils'

//THUNKS=====================================

export const loginTC = createAsyncThunk<
  { isLoggedIn: boolean },
  LoginParamsType,
  {
    rejectValue: { errors: Array<string>; fieldsErrors?: Array<FieldErrorType> }
  }
>('auth/login', async (param, thunkAPI) => {
  try {
    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
    const response = await authAPI.login(param)

    if (response.data.resultCode === 0) {
      //thunkAPI.dispatch(setIsLoggedInAC({ value: true }))
      thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))

      return { isLoggedIn: true }
    } else {
      handleServerAppError(response.data, thunkAPI.dispatch)

      return thunkAPI.rejectWithValue({
        errors: response.data.messages,
        fieldsErrors: response.data.fieldsErrors,
      })
    }
  } catch (error) {
    const err = error as Error | AxiosError<{ error: string }>

    handleNetworkAppError(err, thunkAPI.dispatch)

    return thunkAPI.rejectWithValue({ errors: [err.message], fieldsErrors: undefined })
  }
})

export const logoutTC = createAsyncThunk('auth/logout', async (params, thunkAPI) => {
  try {
    thunkAPI.dispatch(setAppStatusAC({ status: 'loading' }))
    const response = await authAPI.logout()

    if (response.data.resultCode === 0) {
      //thunkAPI.dispatch(setIsLoggedInAC({ value: false }))
      thunkAPI.dispatch(setAppStatusAC({ status: 'succeeded' }))

      return
    } else {
      handleServerAppError(response.data, thunkAPI.dispatch)

      return thunkAPI.rejectWithValue({})
    }
  } catch (error) {
    const err = error as Error | AxiosError<{ error: string }>

    handleNetworkAppError(err, thunkAPI.dispatch)

    return thunkAPI.rejectWithValue({})
  }
})

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    },
  },
  extraReducers: builder => {
    builder.addCase(loginTC.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    })
    builder.addCase(logoutTC.fulfilled, (state, action) => {
      state.isLoggedIn = false
    })
  },
})

export const authReducer = slice.reducer

//ACTIONS=====================================
export const { setIsLoggedInAC } = slice.actions

// TYPES=====================================

export type LoginActionType = ReturnType<typeof setIsLoggedInAC>
