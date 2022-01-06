import React, {ChangeEvent, useCallback} from "react";
import style from "../Todolist/Todolist.module.css";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {TaskStatus, TaskType} from "../../api/todolistAPI";

export type TaskPropsType = {
    task: TaskType;
    changeTaskStatus: (status: TaskStatus, taskId: string) => void;
    changeTaskTitle: (taskId: string, newValue: string) => void;
    removeTask: (taskId: string) => void;
}

export const Task = React.memo(({task, changeTaskStatus, changeTaskTitle, removeTask}: TaskPropsType) => {
    console.log("Task")
    console.log(task.id)

    const onClickRemoveTask = useCallback(() => {
        removeTask(task.id)
    }, [removeTask, task.id]);
    const onChangeStatusTask = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(event.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New, task.id);
    }, [changeTaskStatus, task.id]);
    const onChangeTaskTitle = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue);
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