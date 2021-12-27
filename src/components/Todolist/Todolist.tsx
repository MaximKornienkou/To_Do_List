import React, {useCallback} from "react";
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

export const Todolist = React.memo(({
                                        todolistTitle, todolistID, tasks, removeTask,
                                        addTask, changeTaskStatus, statusFilter, tasksFilter,
                                        removeTodolist, changeTaskTitle, changeTodolistTitle
                                    }: TodolistPropsType) => {

    const onChangeTodolistTitle = useCallback((newValue: string) => {
        changeTodolistTitle(newValue, todolistID);
    }, [changeTodolistTitle, todolistID]);

    const onClickRemoveTodolist = useCallback(() => {
        removeTodolist(todolistID)
    }, [removeTodolist, todolistID]);

    const onClickAddTask = useCallback((taskTitle: string) => {
        addTask(taskTitle, todolistID);
    }, [addTask, todolistID]);

    const onClickStatusFilterAll = useCallback(() =>
        statusFilter("All", todolistID), [statusFilter, todolistID]);
    const onClickStatusFilterActive = useCallback(() =>
        statusFilter("Active", todolistID), [statusFilter, todolistID]);
    const onClickStatusFilterCompleted = useCallback(() =>
        statusFilter("Completed", todolistID), [statusFilter, todolistID]);

    let filteredTasks = tasks;

    if (tasksFilter === "Active") {
        filteredTasks = filteredTasks.filter((task) => !task.isDone)
    }

    if (tasksFilter === "Completed") {
        filteredTasks = filteredTasks.filter((task) => task.isDone)
    }

    const onClickRemoveTask = useCallback((taskId) => {
        removeTask(todolistID, taskId);
    }, [removeTask, todolistID]);
    const onChangeTaskStatus = useCallback((isDone: boolean, taskID: string) => {
        changeTaskStatus(todolistID, isDone, taskID);
    }, [changeTaskStatus, todolistID]);
    const onChangeTaskTitle = useCallback((taskId: string, newValue: string) => {
        changeTaskTitle(taskId, newValue, todolistID);
    }, [changeTaskTitle, todolistID]);

    return (
        <div className={style.tasksBody}>
            <div>
                <h3>
                    <EditableSpan value={todolistTitle} onChange={onChangeTodolistTitle}/>
                    <button onClick={onClickRemoveTodolist}>Del</button>
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
                            changeTaskStatus={onChangeTaskStatus}
                            changeTaskTitle={onChangeTaskTitle}
                            removeTask={onClickRemoveTask}
                        />
                    )
                })}
            </ul>
            <div>
                <button onClick={onClickStatusFilterAll}
                        className={tasksFilter === "All" ? style.activeFilter : ""}>All
                </button>
                <button onClick={onClickStatusFilterActive}
                        className={tasksFilter === "Active" ? style.activeFilter : ""}>Active
                </button>
                <button onClick={onClickStatusFilterCompleted}
                        className={tasksFilter === "Completed" ? style.activeFilter : ""}>Completed
                </button>
            </div>
        </div>
    )
})