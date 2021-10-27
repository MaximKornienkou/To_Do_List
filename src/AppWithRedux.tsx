import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './components/Todolist/Todolist';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC,} from "./reducers/tasks-reducer";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
} from "./reducers/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import { AppRootStateType } from './state/store';

export type TodolistType = {
    id: string;
    title: string;
    filter: TasksFiltersType;
}
export type TasksType = {
    [key: string]: Array<TaskType>
}
export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
export type TasksFiltersType = "All" | "Active" | "Completed";

export function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>((state) => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksType>((state) => state.tasks);
    const dispatch = useDispatch();

    const addTodolist = useCallback((todolistTitle: string) => {
        const action = AddTodolistAC(todolistTitle);
        dispatch(action);
    }, [dispatch]);

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(RemoveTodolistAC(todolistID));
    }, [dispatch]);

    const changeTodolistTitle = useCallback((newValue: string, todolistID: string) => {
        dispatch(ChangeTodolistTitleAC(newValue, todolistID));
    }, [dispatch]);

    const removeTask = useCallback((todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID));
    }, [dispatch]);

    const addTask = useCallback((taskTitle: string, todolistID: string) => {
        dispatch(addTaskAC(taskTitle, todolistID));
    }, [dispatch]);

    const changeTaskTitle = useCallback((taskID: string, newValue: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(taskID, newValue, todolistID));
    },[dispatch]);

    const changeTaskStatus = useCallback((todolistID: string, isDone: boolean, taskID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todolistID));
    }, [dispatch]);

    const statusFilter = useCallback((filter: TasksFiltersType, todolistID: string) => {
        dispatch(ChangeTodolistFilterAC(todolistID, filter));
    }, [dispatch]);

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todoLists.map((todoList) => {

                return (
                    <Todolist
                        key={todoList.id}
                        todolistID={todoList.id}
                        todolistTitle={todoList.title}
                        tasks={tasks[todoList.id]}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        statusFilter={statusFilter}
                        tasksFilter={todoList.filter}
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