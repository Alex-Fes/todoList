import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditebleSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditebleSpan(props: EditebleSpanPropsType) {

    let [editMode, setEditmode] = useState(false);
    let [title, setTitle] = useState('')

    const activateEditMode = () => {
        // debugger
        setEditmode(true)
        setTitle(props.title)
    };
    const activateViewMode = () => {
        setEditmode(false)
        props.onChange(title);
    };
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    return editMode
        ? <TextField
            variant="standard"
            value={title}
            onBlur={activateViewMode}
            onChange={onChangeTitleHandler}
            autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}