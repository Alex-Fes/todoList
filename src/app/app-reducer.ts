const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as RequestErrorType,
    taskStatus: 'loading' as RequestStatusType
};

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-TASK-STATUS":
            return {...state, taskStatus: action.status}
        default:
            return {...state}
    }
};


export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
export const setAppTaskStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-TASK-STATUS', status} as const);


type SetAppErrorActionType = typeof setAppErrorAC;
type SetAppStatusActionType = typeof setAppStatusAC;
type SetAppTaskStatusActionType = typeof setAppTaskStatusAC;
export type AppReducerActionsType =
    ReturnType<SetAppErrorActionType>
    | ReturnType<SetAppStatusActionType>
    | ReturnType<SetAppTaskStatusActionType>;
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type RequestErrorType = string | null;
export type InitialStateType = typeof initialState;