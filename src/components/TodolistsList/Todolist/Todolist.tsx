import React, {useCallback, useEffect} from "react";
import style from "./Todolist.module.css"
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import {AddItemForm} from "../../AddItemForm/AddItemForm";
import {Task} from "./Task/Task";
import {FilterValuesType, TodolistDomainType} from "../../../reducers/todolists-reducer";
import {TaskStatus, TaskType} from "../../../api/todolistAPI";
import {useDispatch} from "react-redux";
import {setTasks} from "../../../reducers/tasks-reducer";

export type TodolistPropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>;
    removeTask: (todolistId: string, taskId: string) => void;
    addTask: (todolistId: string, title: string) => void;
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatus) => void;
    statusFilter: (filter: FilterValuesType, todolistId: string) => void;
    removeTodolist: (todolistId: string) => void;
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
    changeTodolistTitle: (todolistId: string, title: string) => void;
}

export const Todolist = React.memo(({
                                        todolist, tasks, removeTask,
                                        addTask, changeTaskStatus, statusFilter,
                                        removeTodolist, changeTaskTitle, changeTodolistTitle
                                    }: TodolistPropsType) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTasks(todolist.id));
    }, [dispatch, todolist.id]);

    const onChangeTodolistTitle = useCallback((title: string) => {
        changeTodolistTitle(todolist.id, title);
    }, [changeTodolistTitle, todolist.id]);

    const onClickRemoveTodolist = useCallback(() => {
        removeTodolist(todolist.id)
    }, [removeTodolist, todolist.id]);

    const onClickAddTask = useCallback((title: string) => {
        addTask(todolist.id, title);
    }, [addTask, todolist.id]);

    const onClickStatusFilterAll = useCallback(() =>
        statusFilter("all", todolist.id), [statusFilter, todolist.id]);
    const onClickStatusFilterActive = useCallback(() =>
        statusFilter("active", todolist.id), [statusFilter, todolist.id]);
    const onClickStatusFilterCompleted = useCallback(() =>
        statusFilter("completed", todolist.id), [statusFilter, todolist.id]);

    let filteredTasks = tasks;

    if (todolist.filter === "active") {
        filteredTasks = filteredTasks.filter((task) => task.status === TaskStatus.New)
    }

    if (todolist.filter === "completed") {
        filteredTasks = filteredTasks.filter((task) => task.status === TaskStatus.Completed)
    }

    const onClickRemoveTask = useCallback((taskId) => {
        removeTask(todolist.id, taskId);
    }, [removeTask, todolist.id]);
    const onChangeTaskStatus = useCallback((taskId: string, status: TaskStatus) => {
        changeTaskStatus(todolist.id, taskId, status);
    }, [changeTaskStatus, todolist.id]);
    const onChangeTaskTitle = useCallback((taskId: string, title: string) => {
        changeTaskTitle(todolist.id, taskId, title);
    }, [changeTaskTitle, todolist.id]);

    return (
        <div className={style.tasksBody}>
            <div>
                <h3>
                    <EditableSpan value={todolist.title} onChange={onChangeTodolistTitle}/>
                    <button onClick={onClickRemoveTodolist}
                            disabled={todolist.entityStatus === "loading"}>Del
                    </button>
                </h3>
            </div>
            <div>
                <AddItemForm addItem={onClickAddTask} disabled={todolist.entityStatus === "loading"}/>
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
                        className={todolist.filter === "all" ? style.activeFilter : ""}>All
                </button>
                <button onClick={onClickStatusFilterActive}
                        className={todolist.filter === "active" ? style.activeFilter : ""}>Active
                </button>
                <button onClick={onClickStatusFilterCompleted}
                        className={todolist.filter === "completed" ? style.activeFilter : ""}>Completed
                </button>
            </div>
        </div>
    )
})