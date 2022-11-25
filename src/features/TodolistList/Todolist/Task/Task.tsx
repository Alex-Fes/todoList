import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../Components/EditebleSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/todolists-api";
import {RequestStatusType} from "../../../../app/app-reducer";


type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    task: TaskType
    todolistId: string
    entityTaskStatus: RequestStatusType
}
export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = useCallback(() => {
        props.removeTask(props.task.id, props.todolistId)
    }, [props.removeTask, props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.changeTaskStatus, props.task.id, props.todolistId]);

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.changeTaskTitle, props.task.id, props.todolistId]);

    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox
                onChange={onChangeHandler}
                checked={props.task.status === TaskStatuses.Completed}
                disabled={props.entityTaskStatus === 'loading'}
            />
            <EditableSpan title={props.task.title}
                          onChange={onChangeTitleHandler}
                          disabled={props.entityTaskStatus === 'loading'}
            />
            <IconButton aria-label="delete" onClick={onRemoveHandler}
                        disabled={props.entityTaskStatus === 'loading'}
            >
                <Delete/>
            </IconButton>
        </div>
    )
})