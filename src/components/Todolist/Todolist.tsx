import React, {useCallback} from "react";
import style from "./Todolist.module.css"
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Task} from "../Task/Task";
import {FilterValuesType} from "../../reducers/todolists-reducer";
import {TaskStatus, TaskType} from "../../api/todolistAPI";

export type TodolistPropsType = {
    todolistTitle: string;
    todolistID: string;
    tasks: Array<TaskType>;
    removeTask: (todolistID: string, taskID: string) => void;
    addTask: (taskTitle: string, todolistID: string) => void;
    changeTaskStatus: (todolistID: string, isDone: boolean, taskID: string) => void;
    statusFilter: (filter: FilterValuesType, todolistID: string) => void;
    tasksFilter: FilterValuesType;
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
        statusFilter("all", todolistID), [statusFilter, todolistID]);
    const onClickStatusFilterActive = useCallback(() =>
        statusFilter("active", todolistID), [statusFilter, todolistID]);
    const onClickStatusFilterCompleted = useCallback(() =>
        statusFilter("completed", todolistID), [statusFilter, todolistID]);

    let filteredTasks = tasks;

    if (tasksFilter === "active") {
        filteredTasks = filteredTasks.filter((task) => task.status=== TaskStatus.New)
    }

    if (tasksFilter === "completed") {
        filteredTasks = filteredTasks.filter((task) => task.status === TaskStatus.Completed)
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
                        className={tasksFilter === "all" ? style.activeFilter : ""}>All
                </button>
                <button onClick={onClickStatusFilterActive}
                        className={tasksFilter === "active" ? style.activeFilter : ""}>Active
                </button>
                <button onClick={onClickStatusFilterCompleted}
                        className={tasksFilter === "completed" ? style.activeFilter : ""}>Completed
                </button>
            </div>
        </div>
    )
})