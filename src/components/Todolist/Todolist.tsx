import React, {ChangeEvent, useCallback} from "react";
import style from "./Todolist.module.css"
import {TasksFiltersType, TaskType} from "../../App";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Task} from "../Task/Task";

export type TodolistPropsType = {
    todolistTitle: string;
    todolistID: string;
    tasks: Array<TaskType>;
    removeTask: (todolistID: string, taskID: string) => void;
    addTask: (taskTitle: string, todolistID: string) => void;
    changeTaskStatus: (todolistID: string, isDone: boolean, taskID: string) => void;
    statusFilter: (filter: TasksFiltersType, todolistID: string) => void;
    tasksFilter: TasksFiltersType;
    removeTodolist: (todolistID: string) => void;
    changeTaskTitle: (taskID: string, newValue: string, todolistID: string) => void;
    changeTodolistTitle: (newValue: string, todolistID: string) => void;
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    const changeTodolistTitle = useCallback((newValue: string) => {
        props.changeTodolistTitle(newValue, props.todolistID);
    }, [props.changeTodolistTitle, props.todolistID]);

    const onClickRemoveTodolist = useCallback(() => {
        props.removeTodolist(props.todolistID)
    }, [props.removeTodolist, props.todolistID]);

    const onClickAddTask = useCallback((taskTitle: string) => {
        props.addTask(taskTitle, props.todolistID);
    }, [props.addTask, props.todolistID]);

    const onClickStatusFilterAll = useCallback(() =>
        props.statusFilter("All", props.todolistID), [props.statusFilter, props.todolistID]);
    const onClickStatusFilterActive = useCallback(() =>
        props.statusFilter("Active", props.todolistID), [props.statusFilter, props.todolistID]);
    const onClickStatusFilterCompleted = useCallback(() =>
        props.statusFilter("Completed", props.todolistID), [props.statusFilter, props.todolistID]);

    let filteredTasks = props.tasks;

    if (props.tasksFilter === "Active") {
        filteredTasks = filteredTasks.filter((task) => !task.isDone)
    }

    if (props.tasksFilter === "Completed") {
        filteredTasks = filteredTasks.filter((task) => task.isDone)
    }

    const removeTask = useCallback((taskId) => {
        props.removeTask(props.todolistID, taskId);
    }, [props.removeTask, props.todolistID]);
    const changeTaskStatus = useCallback((isDone: boolean, taskID: string) => {
        props.changeTaskStatus(props.todolistID, isDone, taskID);
    }, [props.changeTaskStatus, props.todolistID])
    const changeTaskTitle = useCallback((taskId: string, newValue: string) => {
        props.changeTaskTitle(taskId, newValue, props.todolistID);
    }, [props.changeTaskTitle, props.todolistID])

    return (
        <div className={style.tasksBody}>
            <div>
                <h3>
                    <EditableSpan value={props.todolistTitle} onChange={changeTodolistTitle}/>
                    <button onClick={onClickRemoveTodolist}>x</button>
                </h3>
            </div>
            <div>
                <AddItemForm addItem={onClickAddTask}/>
            </div>

            <ul className={style.tasks}>
                {filteredTasks.map((task) => {

                    return (
                        <Task
                            key={task.id}
                            task={task}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                            removeTask={removeTask}

                        />
                    )
                })}
            </ul>
            <div>
                <button onClick={onClickStatusFilterAll}
                        className={props.tasksFilter === "All" ? style.activeFilter : ""}>All
                </button>
                <button onClick={onClickStatusFilterActive}
                        className={props.tasksFilter === "Active" ? style.activeFilter : ""}>Active
                </button>
                <button onClick={onClickStatusFilterCompleted}
                        className={props.tasksFilter === "Completed" ? style.activeFilter : ""}>Completed
                </button>
            </div>
        </div>
    )
})