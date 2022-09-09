import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

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
            task={{id: '1', isDone: true, title: 'CSS'}}
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            todolistId={'todolistId1'}
        />
        <Task
            task={{id: '2', isDone: false, title: 'JS'}}
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            todolistId={'todolistId2'}
        />
    </>
}
