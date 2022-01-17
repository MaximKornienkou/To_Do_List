import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import style from "../TodolistsList/Todolist/Todolist.module.css";

export type AddItemFormTypes = {
    addItem: (title: string) => void;
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormTypes) => {

    const [title, setTitle] = useState("");
    const [error, setError] = useState("")

    const onClickAddItem = () => {
        if (title.trim()) {
            addItem(title);
            setTitle("");
        } else {
            setError("invalid title")
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        setError("");
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onClickAddItem();
        }
    }

    return (
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? style.error : ""}
                disabled={disabled}
            />
            <button onClick={onClickAddItem} disabled={disabled}>+</button>
            {error && <div className={style.errorMessage}>{error}</div>}
        </div>
    )
})