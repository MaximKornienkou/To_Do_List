import React, {ChangeEvent, useState} from "react";

export type EditableSpanPropsType = {
    value: string;
    onChange: (newValue: string) => void;
}

export function EditableSpan(props: EditableSpanPropsType) {

    const [title, setTitle] = useState(props.value);
    const [editMode, setEditMode] = useState(false);

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }

    const activateViewMode = () => {
        if (title) {
            props.onChange(title);
        } else {
            setTitle(props.value);
        }
        setEditMode(false);
    }

    return (
        editMode ? <input value={title}
                          onChange={changeTitle}
                          autoFocus
                          onBlur={activateViewMode}
            /> :
            <span onDoubleClick={activateEditMode}>{props.value}</span>
    )
}