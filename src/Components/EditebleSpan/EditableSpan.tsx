import React, { ChangeEvent, memo, useState } from 'react'

import { TextField } from '@mui/material'

type EditableSpanPropsType = {
  title: string
  onChange: (newValue: string) => void
  disabled: boolean
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {
  console.log('EditableSpan was called')

  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState(props.title)

  const activateEditMode = () => {
    if (!props.disabled) {
      setEditMode(true)
      setTitle(props.title)
    }
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

  return editMode ? (
    <TextField
      variant="standard"
      value={title}
      onBlur={activateViewMode}
      onChange={onChangeTitleHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  )
})
