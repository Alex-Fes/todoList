import {Provider} from "react-redux";
import {AppRootStateType, store} from "../app/store";
import {TaskPriority, TaskStatuses} from "../api/todolists-api";
import {v1} from "uuid";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {todolistsReducer} from "../features/TodolistList/todolist-reduser";
import {taskReducer} from "../features/TodolistList/tasks-reduser";
import {appReducer} from "../app/app-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: taskReducer,
    app: appReducer
})

let todolistId1 = v1();
let todolistId2 = v1();
const initialGlobalState: AppRootStateType = {
    todolists: [
        {
            id: todolistId1, title: 'What to learn', filter: 'All', addedDate: '',
            order: 0, entityStatus: 'idle'
        },
        {
            id: todolistId2, title: 'What to buy', filter: 'All', addedDate: '',
            order: 0, entityStatus: 'idle'
        }],
    tasks: {
        ['todolistId1']: [
            {
                id: '1', title: "HTML", status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: '', entityTaskStatus: 'idle'
            },
            {
                id: '2', title: "JS", status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: '', entityTaskStatus: 'idle'
            },
            {
                id: '3', title: "ReactJS", status: TaskStatuses.New, todoListId: 'todolistId1',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: '', entityTaskStatus: 'idle'
            }
        ],
        ['todolistId2']: [
            {
                id: '1', title: "Book", status: TaskStatuses.Completed, todoListId: 'todolistId2',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: '', entityTaskStatus: 'idle'
            },
            {
                id: '2', title: "Map", status: TaskStatuses.Completed, todoListId: 'todolistId2',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: '', entityTaskStatus: 'idle'
            },
            {
                id: '3', title: "Pen", status: TaskStatuses.New, todoListId: 'todolistId2',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriority.Low, description: '', entityTaskStatus: 'idle'
            }
        ]
    },
    app: {
        error: null,
        status: 'idle',
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunkMiddleware))




export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={store}>{story()}</Provider>
}