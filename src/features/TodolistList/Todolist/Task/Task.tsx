import React, { ChangeEvent, memo, useCallback } from 'react'

import { Checkbox, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

import { TaskStatuses, TaskType } from '../../../../api/types'
import { EditableSpan } from '../../../../Components/EditebleSpan/EditableSpan'
import { useActions } from '../../../../utils/redux-utils'
import { tasksActions } from '../../index'

type TaskPropsType = {
  task: TaskType
  todolistId: string
}

export const Task = memo((props: TaskPropsType) => {
  const { updateTask, removeTask } = useActions(tasksActions)

  const onClickHandler = useCallback(
    () => removeTask({ taskId: props.task.id, todolistId: props.todolistId }),
    [props.task.id, props.todolistId]
  )

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      updateTask({
        taskId: props.task.id,
        model: { status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New },
        todolistId: props.todolistId,
      })
    },
    [props.task.id, props.todolistId]
  )

  const onTitleChangeHandler = useCallback(
    (newValue: string) => {
      updateTask({
        taskId: props.task.id,
        model: { title: newValue },
        todolistId: props.todolistId,
      })
    },
    [props.task.id, props.todolistId]
  )

  return (
    <div
      key={props.task.id}
      className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}
      style={{ position: 'relative' }}
    >
      <Checkbox
        checked={props.task.status === TaskStatuses.Completed}
        color="primary"
        onChange={onChangeHandler}
        disabled={props.task.entityTaskStatus === 'loading'}
      />

      <EditableSpan
        disabled={props.task.entityTaskStatus === 'loading'}
        value={props.task.title}
        onChange={onTitleChangeHandler}
      />
      <IconButton
        size={'small'}
        onClick={onClickHandler}
        style={{ position: 'absolute', top: '5px', right: '2px' }}
        disabled={props.task.entityTaskStatus === 'loading'}
      >
        <Delete fontSize={'small'} />
      </IconButton>
    </div>
  )
})
