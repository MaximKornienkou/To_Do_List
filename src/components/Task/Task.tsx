import React, {ChangeEvent, useCallback} from "react";
import style from "../Todolist/Todolist.module.css";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {TaskStatus, TaskType} from "../../api/todolistAPI";

export type TaskPropsType = {
    task: TaskType;
    changeTaskStatus: (taskId: string, status: TaskStatus) => void;
    changeTaskTitle: (taskId: string, title: string) => void;
    removeTask: (taskId: string) => void;
}

export const Task = React.memo(({task, changeTaskStatus, changeTaskTitle, removeTask}: TaskPropsType) => {

    const onClickRemoveTask = useCallback(() => {
        removeTask(task.id)
    }, [removeTask, task.id]);
    const onChangeStatusTask = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id,event.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New);
    }, [changeTaskStatus, task.id]);
    const onChangeTaskTitle = useCallback((title: string) => {
        changeTaskTitle(task.id, title);
    }, [changeTaskTitle, task.id]);

    return (
        <li key={task.id} className={task.status === TaskStatus.Completed ? style.taskIsDone : ""}>
            <input type="checkbox"
                   onChange={onChangeStatusTask}
                   checked={task.status === TaskStatus.Completed}
            />
            <EditableSpan value={task.title} onChange={onChangeTaskTitle}/>
            <button onClick={onClickRemoveTask}>x</button>
        </li>
    )
})