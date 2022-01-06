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

export type TodolistType = {
    id: string;
    title: string;
    filter: TasksFiltersType;
}

export type TasksFiltersType = "All" | "Active" | "Completed";

export function App() {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    const addTodolist = useCallback((todolistTitle: string) => {
        const action = addTodolistAC(todolistTitle);
        dispatch(action);
    }, [dispatch]);

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID));
    }, [dispatch]);

    const changeTodolistTitle = useCallback((newValue: string, todolistID: string) => {
        dispatch(changeTodolistTitleAC(newValue, todolistID));
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

    const statusFilter = useCallback((filter: FilterValuesType, todolistID: string) => {
        dispatch(changeTodolistFilterAC(todolistID, filter));
    }, [dispatch]);

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map((todolist) => {

                let filteredTasks = tasks[todolist.id];

                return (
                    <Todolist
                        key={todolist.id}
                        todolistID={todolist.id}
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