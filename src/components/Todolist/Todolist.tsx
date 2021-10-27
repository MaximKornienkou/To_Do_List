import React, {ChangeEvent} from "react";
import style from "./Todolist.module.css"
import {TasksFiltersType, TaskType} from "../../App";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {AddItemForm} from "../AddItemForm/AddItemForm";

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
    changeTaskTitle: (newValue: string, taskID: string, todolistID: string) => void;
    changeTodolistTitle: (newValue: string, todolistID: string) => void;
}

export function Todolist(props: TodolistPropsType) {

    const changeTodolistTitle = (newValue: string) => {
        props.changeTodolistTitle(newValue, props.todolistID);
    }
    const onClickRemoveTodolist = () => {
        props.removeTodolist(props.todolistID)
    }

    const onClickAddTask = (taskTitle: string) => {
            props.addTask(taskTitle, props.todolistID);
        }

    const onClickStatusFilterAll = () => props.statusFilter("All", props.todolistID)
    const onClickStatusFilterActive = () => props.statusFilter("Active", props.todolistID)
    const onClickStatusFilterCompleted = () => props.statusFilter("Completed", props.todolistID)

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
                {props.tasks.map((task) => {
                    const onClickRemoveTask = () => {
                        props.removeTask(props.todolistID, task.id)
                    }
                    const taskStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, event.currentTarget.checked, task.id)
                    }
                    const changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(newTitle, task.id, props.todolistID);
                    }

                    return (
                        <li key={task.id} className={task.isDone ? style.taskIsDone : ""}>
                            <input type="checkbox"
                                   onChange={taskStatusChange}
                                   checked={task.isDone}
                            />
                            <EditableSpan value={task.title} onChange={changeTaskTitle}/>
                            <button onClick={onClickRemoveTask}>x</button>
                        </li>
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
}