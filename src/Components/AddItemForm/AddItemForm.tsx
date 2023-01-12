import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react'

import { PostAdd } from '@material-ui/icons'
import { IconButton, TextField } from '@mui/material'

type AddItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = memo(function ({ addItem, disabled = false }: AddItemFormPropsType) {
  console.log('AddItemForm was called')

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.charCode === 13) {
      addItem(newTaskTitle)
      setNewTaskTitle('')
    }
  }
  const addTask = () => {
    if (newTaskTitle.trim() !== '' && newTaskTitle.trim() !== 'censor') {
      addItem(newTaskTitle.trim())
      setNewTaskTitle('')
    } else {
      setError('Title is required')
    }
  }

  return (
    <div>
      <TextField
        variant="outlined"
        disabled={disabled}
        label={'Type value'}
        error={!!error}
        helperText={error}
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyPress={onKeyPressHandler}
      />
      <IconButton onClick={addTask} color={'primary'} disabled={disabled}>
        <PostAdd />
      </IconButton>
    </div>
  )
})
