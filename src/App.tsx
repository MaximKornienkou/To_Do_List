import React, {useCallback} from "react";
import "./App.css";
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksStateType
} from "./reducers/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC,
    TodolistDomainType,
} from "./reducers/todolists-reducer";
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";
import {TaskPriority, TaskStatus} from "./api/todolistAPI";
import { v1 } from "uuid";

export function App() {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    const addTodolist = useCallback((todolistTitle: string) => {
        const action = addTodolistAC(todolistTitle);
        dispatch(action);
    }, [dispatch]);

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId));
    }, [dispatch]);

    const changeTodolistTitle = useCallback((newValue: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(newValue, todolistId));
    }, [dispatch]);

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId));
    }, [dispatch]);

    const addTask = useCallback((taskTitle: string, todolistId: string) => {
       const task = {id: v1(), title: taskTitle, status: TaskStatus.New, todolistId: todolistId, description: "",
           startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriority.Low}
        dispatch(addTaskAC(task));
    }, [dispatch]);

    const changeTaskTitle = useCallback((taskId: string, newValue: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, newValue, todolistId));
    },[dispatch]);

    const changeTaskStatus = useCallback((todolistId: string, status: TaskStatus, taskId: string) => {
        dispatch(changeTaskStatusAC(taskId, status, todolistId));
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