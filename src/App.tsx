import React, {useCallback, useEffect} from "react";
import "./App.css";
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {createTask, deleteTask, TasksStateType, updateTask} from "./reducers/tasks-reducer";
import {
    changeTodolistFilterAC, changeTodolistTitleTC, createTodolist,
    deleteTodolist, FilterValuesType, setTodolists, TodolistDomainType,
} from "./reducers/todolists-reducer";
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";
import {TaskStatus} from "./api/todolistAPI";


export function App() {

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
    },[dispatch]);

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatus) => {
        dispatch(updateTask(todolistId, taskId, {status}));
    }, [dispatch]);

    const statusFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, filter));
    }, [dispatch]);

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map((todolist) => {

                let filteredTasks = tasks[todolist.id];

                return (
                    <Todolist
                        key={todolist.id}
                        todolistId={todolist.id}
                        todolistTitle={todolist.title}
                        tasks={filteredTasks}
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
        </div>
    );
}