import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react'

import { IconButton, TextField } from '@material-ui/core'
import { AddBox } from '@material-ui/icons'
import { styled } from '@mui/material'

export type AddItemFormSubmitHelperType = {
  setError: (error: string) => void
  setTitle: (title: string) => void
}
type AddItemFormPropsType = {
  addItem: (title: string, helper: AddItemFormSubmitHelperType) => void
  disabled?: boolean
}

export const AddItemForm = memo(function ({ addItem, disabled = false }: AddItemFormPropsType) {
  let [title, setTitle] = useState('')
  let [error, setError] = useState<string | null>(null)

  const addItemHandler = async () => {
    if (title.trim() !== '') {
      addItem(title, { setError, setTitle })
    } else {
      setError('Title is required')
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.charCode === 13) {
      addItemHandler()
    }
  }

  const StyledTextField = styled(TextField, {
    name: 'StyledTextField',
    // variant: 'outlined',
    // disabled: disabled,
    // error: !!error,
    // value: title,
    // onChange: onChangeHandler,
    // onKeyPress: onKeyPressHandler,
    // label: 'Title',
    // helperText: error,
    // color: 'secondary',
  })({
    width: 300,
    '& .MuiInputBase-root': {
      width: 300,
      backgroundColor: 'grey',
    },
  })

  return (
    <div>
      <TextField
        variant="outlined"
        disabled={disabled}
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        label="Title"
        helperText={error}

        // sx={{
        //   width: { sm: 250, md: 350 },
        //   '& .MuiInputBase-root': {
        //     height: 100,
        //   },
        //   mb: 2,
        // }}

        // sx={{ width: 300 }}
      />
      {/*<StyledTextField variant="standard" placeholder="Enter your title" />*/}

      <IconButton
        color="primary"
        onClick={addItemHandler}
        disabled={disabled}
        style={{ marginLeft: '5px' }}
      >
        <AddBox />
      </IconButton>
    </div>
  )
})
