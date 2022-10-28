import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReduser} from "./todolist-reduser";
import {taskReduser} from "./tasks-reduser";
import thunkMiddleware from "redux-thunk";

export type AppRootStateType = ReturnType<typeof RootReduser>

const RootReduser = combineReducers({
    todolists: todolistsReduser,
    tasks: taskReduser
})

export const store = createStore(RootReduser, applyMiddleware(thunkMiddleware))


// @ts-ignore
window.store = store;