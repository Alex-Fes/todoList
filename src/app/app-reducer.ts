import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reduser";
import {AppThunkType} from "./store";
import {handleNetworkAppError, handleServerAppError} from "../utils/error-utils";

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as RequestErrorType,
    isInitialized: false
};

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-INITIALAIZED":
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
};

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
export const setAppIsInitializedAC = (value: boolean) => ({type: 'APP/SET-INITIALAIZED', value} as const);

//THUNK
export const initializeAppTC = ():AppThunkType => (dispatch) => {
    authAPI.me()
        .then(res=> {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(setAppIsInitializedAC(true))
        })
        .catch(error => handleNetworkAppError(error, dispatch))
}


//TYPES
type SetAppErrorActionType = typeof setAppErrorAC;
type SetAppStatusActionType = typeof setAppStatusAC;
type SetAppIsInitializedType = typeof setAppIsInitializedAC;

export type AppReducerActionsType =
      ReturnType<SetAppErrorActionType>
    | ReturnType<SetAppStatusActionType>
    | ReturnType<SetAppIsInitializedType>;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type RequestErrorType = string | null;
export type InitialStateType = typeof initialState;