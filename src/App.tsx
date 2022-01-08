import React, {useCallback, useEffect} from "react";
import "./App.css";
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {
    changeTaskStatusAC,
    changeTaskTitleAC, createTask, deleteTask,
    TasksStateType
} from "./reducers/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, setTodolists,
    TodolistDomainType,
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
        dispatch(addTodolistAC(todolistTitle));
    }, [dispatch]);

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId));
    }, [dispatch]);

    const changeTodolistTitle = useCallback((newValue: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(newValue, todolistId));
    }, [dispatch]);

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(deleteTask(todolistId, taskId));
    }, [dispatch]);

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(createTask(todolistId, title));
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