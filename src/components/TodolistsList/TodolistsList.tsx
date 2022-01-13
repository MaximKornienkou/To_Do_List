import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    createTodolist,
    deleteTodolist, FilterValuesType,
    setTodolists,
    TodolistDomainType
} from "../../reducers/todolists-reducer";
import {createTask, deleteTask, TasksStateType, updateTask} from "../../reducers/tasks-reducer";
import React, {useCallback, useEffect} from "react";
import {TaskStatus} from "../../api/todolistAPI";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

export const TodolistsList = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTodolists());
    }, [dispatch]);

    const addTodolist = useCallback((todolistTitle: string) => {
        dispatch(createTodolist(todolistTitle));
    }, [dispatch]);

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolist(todolistId));
    }, [dispatch]);

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title));
    }, [dispatch]);

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(deleteTask(todolistId, taskId));
    }, [dispatch]);

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(createTask(todolistId, title));
    }, [dispatch]);

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTask(todolistId, taskId, {title}));
    }, [dispatch]);

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatus) => {
        dispatch(updateTask(todolistId, taskId, {status}));
    }, [dispatch]);

    const statusFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, filter));
    }, [dispatch]);

    return (
        <>
            <div style={{padding: "10px", marginTop: "50px"}}>
                <AddItemForm addItem={addTodolist}/>
            </div>
            {todolists.map((todolist) => {

                let todolistsTasks = tasks[todolist.id];

                return (
                    <Todolist
                        key={todolist.id}
                        todolistId={todolist.id}
                        todolistTitle={todolist.title}
                        tasks={todolistsTasks}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        statusFilter={statusFilter}
                        tasksFilter={todolist.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                )
            })
            }
        </>
    )
}