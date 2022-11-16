import {AddTodolistActionType, removeTodolistActionType, SetTodolistsActionType} from "./todolist-reduser";
import {TaskPriority, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {TaskStateType} from "../App";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType} from "./store";


type removeTasksActionType = {
    type: 'REMOVE-TASKS'
    todolistId: string
    taskId: string
}
type AddTasksActionType = {
    type: 'ADD-TASKS'
    task: TaskType
}
type ChangeTasksTitleActionType = {
    type: 'CHANGE-TASKS-TITLE'
    title: string
    id: string
    todolistId: string
}
export type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    id: string
    model: UpdateDomainTaskModelType
    todolistId: string
}
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

export type TasksActionType =
    removeTasksActionType
    | AddTasksActionType
    | ChangeTasksTitleActionType
    | UpdateTaskActionType
    | AddTodolistActionType
    | removeTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType;

const innitialState: TaskStateType = {}


export const taskReduser = (state: TaskStateType = innitialState, action: AppActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASKS': {
            let copyState = {...state}
            let task = state[action.todolistId];
            let filteredTask = task.filter(el => el.id !== action.taskId);
            copyState[action.todolistId] = filteredTask;
            return copyState;
        }
        case 'ADD-TASKS': {
            let copyState = {...state};
            let newTask = action.task;
            let tasks = copyState[newTask.todoListId];
            let newTasks = [newTask, ...tasks];
            copyState[newTask.todoListId] = newTasks;
            return copyState;
        }
        case 'UPDATE-TASK': {
            let tasks = state[action.todolistId];
            state[action.todolistId] = tasks.map(t => t.id === action.id ?
                {...t, ...action.model}
                : t);
            // let task = tasks.find(t => t.id === action.id);
            // if (task) {
            //     let newTask = {...task, isDone: action.isDone}
            //     //task.isDone = action.isDone
            // };
            //  copyState[action.todolistId] = [...tasks];
            return ({...state});
        }
        case 'CHANGE-TASKS-TITLE': {
            let tasks = state[action.todolistId];
            state[action.todolistId] = tasks.map(t => t.id === action.id ?
                {...t, title: action.title}
                : t);

            // let task = tasks.find(t => t.id === action.id);
            // if (task) {
            //     task.title = action.title
            // };
            // copyState[action.todolistId] = [...tasks];
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            let copyState = {...state};
            copyState[action.todolist.id] = [];
            return copyState;
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOLISTS': {
            let copyState = {...state};
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState;
        }
        case 'SET-TASKS': {
            let copyState = {...state};
            copyState[action.todolistId] = action.tasks
            return copyState;
        }
        default:
            return state;
    }
}
export const removeTaskAC = (taskId: string, todolistId: string): removeTasksActionType => {
    return {type: 'REMOVE-TASKS', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTasksActionType => {
    return {type: 'ADD-TASKS', task}
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTasksTitleActionType => {
    return {type: 'CHANGE-TASKS-TITLE', id, title, todolistId}
}
export const updateTaskAC = (id: string, model: UpdateDomainTaskModelType, todolistId: string): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', id, model, todolistId}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistsAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}

export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => dispatch(removeTaskAC(taskId, todolistId)))
    }
}

export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistsAPI.createTask(todolistId, title)
            .then(res =>
                dispatch(addTaskAC(res.data.data.item)))
    }
}

// export const changeStatusTaskTC = (taskId: string, status: TaskStatuses, todolistId: string) => {
//     return (dispatch: Dispatch, getState: () => AppRootStateType) => {
//         const state = getState();
//         const task = state.tasks[todolistId].find(t => t.id === taskId)
//         if (!task) {
//             //throw new Error('Task not found in the state');
//             console.warn('Task not found in the state');
//             return;
//         }
//         const model: UpdateTaskModelType = {
//             title: task.title,
//             status: status,
//             priority: task.priority,
//             startDate: task.startDate,
//             deadline: task.deadline,
//             description:  task.description
//         }
//         todolistsAPI.updateTask(todolistId, taskId, model)
//             .then(res => dispatch(changeStatusAC(taskId,status, todolistId)))
//     }
// }

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriority
    startDate?: string
    deadline?: string
}


export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {
    return (dispatch: Dispatch<AppActionsType>, getState: () => AppRootStateType) => {
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
        todolistsAPI.updateTask(todolistId, taskId, <UpdateTaskModelType>apiModel)
            .then(res => dispatch(updateTaskAC(taskId, domainModel, todolistId)))
    }
}
























