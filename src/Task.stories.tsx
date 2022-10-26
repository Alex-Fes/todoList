import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriority, TaskStatuses} from "./api/todolists-api";

export default {
    title: 'Task Component',
    component: Task
}
const changeTaskStatusCallback = action("Status changed")
const changeTaskTitleCallback = action("Title changed")
const removeTaskCallback = action("Task is remove")

export const TaskBaseExample = (props: any) => {
    return <>
        <Task
            task={{id: '1', status: TaskStatuses.Completed, title: 'CSS' , todoListId: 'todolistId1',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''}}
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            todolistId={'todolistId1'}
        />
        <Task
            task={{id: '2', status: TaskStatuses.New, title: 'JS', todoListId: 'todolistId1',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''}}
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            todolistId={'todolistId2'}
        />
    </>
}
