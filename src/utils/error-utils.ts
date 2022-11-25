import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {AppDispatchType} from "../app/store";
import {useAppDispatch} from "../app/hooks/hooks";



export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: AppDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC("failed"))
}

export const handleNetworkAppError = (error: {message: string}, dispatch: AppDispatchType) => {
    dispatch(setAppErrorAC(error.message? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC("failed"))
}

export const checkLengthTitle = (title: string, dispatch: AppDispatchType) => {
    if (title.length >= 100) {
       return dispatch(setAppErrorAC('Your title must be short then 100 symbols'))
    }
}