const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as RequestErrorType,

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


export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);


type SetAppErrorActionType = typeof setAppErrorAC;
type SetAppStatusActionType = typeof setAppStatusAC;

export type AppReducerActionsType =
    ReturnType<SetAppErrorActionType>
    | ReturnType<SetAppStatusActionType>;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type RequestErrorType = string | null;
export type InitialStateType = typeof initialState;