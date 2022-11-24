import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from "./todolist-reduser";
import {TaskPriority, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType, AppThunkType} from "../../app/store";
import {RequestStatusType, setAppStatusAC, setAppTaskStatusAC} from "../../app/app-reducer";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils";


const innitialState: TaskStateType = {}

export const taskReducer = (state: TaskStateType = innitialState, action: TasksActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASKS':
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)}
        case 'ADD-TASKS':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.id ? {...t, ...action.model} : t)}
        case "CHANGE-TASK-ENTITY-STATUS":
            return {...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.id ? {...t, entityTaskStatus: action.status} : t)}
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            let copyState = {...state};
            delete copyState[action.id];
            return copyState;
        case 'SET-TODOLISTS': {
            let copyState = {...state};
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState;
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state;
    }
}

//Actions
export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: 'REMOVE-TASKS',
    taskId,
    todolistId
} as const);
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASKS', task} as const);
export const updateTaskAC = (id: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', id, model, todolistId} as const);
export const changeTaskEntityStatusAC = (id: string, status: RequestStatusType, todolistId: string) =>
    ({type: 'CHANGE-TASK-ENTITY-STATUS', id, status, todolistId} as const);
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const);

//Thunks
export const fetchTasksTC = (todolistId: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => handleNetworkAppError(error, dispatch))
}

export const removeTaskTC = (taskId: string, todolistId: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(taskId, 'loading', todolistId))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => handleNetworkAppError(error, dispatch))
}

export const addTaskTC = (title: string, todolistId: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => handleNetworkAppError(error, dispatch))
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunkType =>
    (dispatch: Dispatch<AppActionsType>, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error('Task not found in the state');
            console.warn('Task not found in the state');
            return;
        }
        const apiModel: UpdateDomainTaskModelType = {
            title: task.title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            description: task.description,
            ...domainModel
        };
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTaskEntityStatusAC(taskId, 'loading', todolistId))
        todolistsAPI.updateTask(todolistId, taskId, <UpdateTaskModelType>apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(taskId, domainModel, todolistId))
                    dispatch(setAppStatusAC("succeeded"))
                    dispatch(changeTaskEntityStatusAC(taskId, 'succeeded', todolistId))
                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(setAppStatusAC("succeeded"))
                    dispatch(changeTaskEntityStatusAC(taskId, 'succeeded', todolistId))
                }
            })
            .catch(error => handleNetworkAppError(error, dispatch))
    }

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriority
    startDate?: string
    deadline?: string
}

export type TasksActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof changeTaskEntityStatusAC>;

export type TaskStateType = {
    [key: string]: Array<TaskType>
}





















