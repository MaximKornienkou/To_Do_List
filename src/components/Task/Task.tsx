import React, {ChangeEvent, useCallback} from "react";
import style from "../Todolist/Todolist.module.css";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {TaskType} from "../../AppWithRedux";

export type TaskPropsType = {
    task: TaskType;
    changeTaskStatus: (isDone: boolean, taskId: string) => void;
    changeTaskTitle: (taskId: string, newValue: string) => void;
    removeTask: (taskId: string) => void;
}

export const Task = React.memo((props: TaskPropsType) => {
    console.log("Task")

    const onClickRemoveTask = useCallback(() => {
        props.removeTask(props.task.id)
    }, [props.removeTask, props.task.id]);
    const changeTaskStatus = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(event.currentTarget.checked, props.task.id);
    }, [props.changeTaskStatus, props.task.id]);
    const changeTaskTitle = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue);
    }, [props.changeTaskTitle, props.task.id]);

    return (
        <li key={props.task.id} className={props.task.isDone ? style.taskIsDone : ""}>
            <input type="checkbox"
                   onChange={changeTaskStatus}
                   checked={props.task.isDone}
            />
            <EditableSpan value={props.task.title} onChange={changeTaskTitle}/>
            <button onClick={onClickRemoveTask}>x</button>
        </li>
    )
})