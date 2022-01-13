import React, {useCallback, useEffect} from "react";
import style from "./Todolist.module.css"
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import {AddItemForm} from "../../AddItemForm/AddItemForm";
import {Task} from "./Task/Task";
import {FilterValuesType} from "../../../reducers/todolists-reducer";
import {TaskStatus, TaskType} from "../../../api/todolistAPI";
import {useDispatch} from "react-redux";
import {setTasks} from "../../../reducers/tasks-reducer";

export type TodolistPropsType = {
    todolistTitle: string;
    todolistId: string;
    tasks: Array<TaskType>;
    removeTask: (todolistId: string, taskId: string) => void;
    addTask: (todolistId: string, title: string) => void;
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatus) => void;
    statusFilter: (filter: FilterValuesType, todolistId: string) => void;
    tasksFilter: FilterValuesType;
    removeTodolist: (todolistId: string) => void;
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
    changeTodolistTitle: (todolistId: string, title: string) => void;
}

export const Todolist = React.memo(({
                                        todolistTitle, todolistId, tasks, removeTask,
                                        addTask, changeTaskStatus, statusFilter, tasksFilter,
                                        removeTodolist, changeTaskTitle, changeTodolistTitle
                                    }: TodolistPropsType) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTasks(todolistId));
    }, [dispatch, todolistId]);

    const onChangeTodolistTitle = useCallback((title: string) => {
        changeTodolistTitle(todolistId, title);
    }, [changeTodolistTitle, todolistId]);

    const onClickRemoveTodolist = useCallback(() => {
        removeTodolist(todolistId)
    }, [removeTodolist, todolistId]);

    const onClickAddTask = useCallback((title: string) => {
        addTask(todolistId, title);
    }, [addTask, todolistId]);

    const onClickStatusFilterAll = useCallback(() =>
        statusFilter("all", todolistId), [statusFilter, todolistId]);
    const onClickStatusFilterActive = useCallback(() =>
        statusFilter("active", todolistId), [statusFilter, todolistId]);
    const onClickStatusFilterCompleted = useCallback(() =>
        statusFilter("completed", todolistId), [statusFilter, todolistId]);

    let filteredTasks = tasks;

    if (tasksFilter === "active") {
        filteredTasks = filteredTasks.filter((task) => task.status=== TaskStatus.New)
    }

    if (tasksFilter === "completed") {
        filteredTasks = filteredTasks.filter((task) => task.status === TaskStatus.Completed)
    }

    const onClickRemoveTask = useCallback((taskId) => {
        removeTask(todolistId, taskId);
    }, [removeTask, todolistId]);
    const onChangeTaskStatus = useCallback((taskId: string, status: TaskStatus) => {
        changeTaskStatus(todolistId, taskId, status);
    }, [changeTaskStatus, todolistId]);
    const onChangeTaskTitle = useCallback((taskId: string, title: string) => {
        changeTaskTitle(todolistId, taskId, title);
    }, [changeTaskTitle, todolistId]);

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