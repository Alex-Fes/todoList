import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {Add, PostAdd} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null)
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            props.addItem(newTaskTitle);
            setNewTaskTitle('')
        }
    }
    const addTask = () => {

        if (newTaskTitle.trim() !== '' && newTaskTitle.trim() !== 'censor') {

            props.addItem(newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Title is required');
        }
    }

    return <div>

        <TextField variant="outlined"
                   label={'Type value'}
                   error={!!error}
                   helperText={error}
                   value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}/>

        <IconButton onClick={addTask}  color={"primary"}>
            <PostAdd />
        </IconButton>

    </div>
}