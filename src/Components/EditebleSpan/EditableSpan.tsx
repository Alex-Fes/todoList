import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";
import {useAppSelector} from "../../app/hooks/hooks";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType)=> {

    console.log('EditableSpan was called')

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    };
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title);
    };
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
        setTitle(e.currentTarget.value);

    return editMode
        ? <TextField
            variant="standard"
            value={title}
            onBlur={activateViewMode}
            onChange={onChangeTitleHandler}
            autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
})