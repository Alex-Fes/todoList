import {combineReducers, createStore} from "redux";
import {todolistsReduser} from "./todolist-reduser";
import {taskReduser} from "./tasks-reduser";

export type AppRootStateType = ReturnType<typeof RootReduser>

const RootReduser = combineReducers({
    todolists: todolistsReduser,
    tasks: taskReduser
})

export const store = createStore(RootReduser)


// @ts-ignore
window.store = store;