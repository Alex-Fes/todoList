const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as RequestErrorType
};

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
};


export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);


type SetErrorActionType = typeof setErrorAC;
type SetStatusActionType = typeof setStatusAC;
export type AppReducerActionsType = ReturnType<SetErrorActionType> | ReturnType<SetStatusActionType>;
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type RequestErrorType = string | null;
export type InitialStateType = typeof initialState;