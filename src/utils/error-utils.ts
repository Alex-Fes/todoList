import { ResponseType } from '../api/todolists-api'
import { setAppErrorAC, setAppStatusAC } from '../app/app-reducer'
import { AppDispatchType } from '../app/store'

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: AppDispatchType) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC({ error: data.messages[0] }))
  } else {
    dispatch(setAppErrorAC({ error: 'Some error occurred' }))
  }
  dispatch(setAppStatusAC({ status: 'failed' }))
}

export const handleNetworkAppError = (error: { message: string }, dispatch: AppDispatchType) => {
  dispatch(
    setAppErrorAC(error.message ? { error: error.message } : { error: 'Some error occurred' })
  )
  dispatch(setAppStatusAC({ status: 'failed' }))
}

export const checkLengthTitle = (title: string, dispatch: AppDispatchType) => {
  if (title.length >= 100) {
    return dispatch(setAppErrorAC({ error: 'Your title must be short then 100 symbols' }))
  }
}
