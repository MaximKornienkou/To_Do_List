import React from 'react';
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

    const addTodolist = (todolistTitle: string) => {
        const action = AddTodolistAC(todolistTitle);
        dispatch(action);
    }

    const removeTodolist = (todolistID: string) => {
        dispatch(RemoveTodolistAC(todolistID));
    }

    const changeTodolistTitle = (newValue: string, todolistID: string) => {
        dispatch(ChangeTodolistTitleAC(newValue, todolistID));
    }

    const removeTask = (todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID));
    }

    const addTask = (taskTitle: string, todolistID: string) => {
        dispatch(addTaskAC(taskTitle, todolistID));
    }

    const changeTaskTitle = (newValue: string, taskID: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(newValue, taskID, todolistID));
    }

    const changeTaskStatus = (todolistID: string, isDone: boolean, taskID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todolistID));
    }

    const statusFilter = (filter: TasksFiltersType, todolistID: string) => {
        dispatch(ChangeTodolistFilterAC(todolistID, filter));
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todoLists.map((todoList) => {

                let filteredTasks = tasks[todoList.id];

                if (todoList.filter === "Active") {
                    filteredTasks = tasks[todoList.id].filter((task) => !task.isDone)
                }

                if (todoList.filter === "Completed") {
                    filteredTasks = tasks[todoList.id].filter((task) => task.isDone)
                }

                return (
                    <Todolist
                        key={todoList.id}
                        todolistID={todoList.id}
                        todolistTitle={todoList.title}
                        tasks={filteredTasks}
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