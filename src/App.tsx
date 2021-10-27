import React, {useReducer} from 'react';
import {v1} from 'uuid';
import './App.css';
import {Todolist} from './components/Todolist/Todolist';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from "./reducers/todolists-reducer";

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

export function App() {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolist, dispatchTodolist] = useReducer(todolistReducer, [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"},
    ]);

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
            [todolistId1]: [
                {id: v1(), title: "HTML", isDone: true},
                {id: v1(), title: "CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "React", isDone: false},
                {id: v1(), title: "Redux", isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: "Meat", isDone: true},
                {id: v1(), title: "Beer", isDone: true},
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Bread", isDone: false},
                {id: v1(), title: "Butter", isDone: false},
            ]
        }
    );

    const addTodolist = (todolistTitle: string) => {
        const action = AddTodolistAC(todolistTitle);
        dispatchTodolist(action);
        dispatchTasks(action);
    }

    const removeTodolist = (todolistID: string) => {
        dispatchTodolist(RemoveTodolistAC(todolistID));
        dispatchTasks(RemoveTodolistAC(todolistID));
    }

    const changeTodolistTitle = (newValue: string, todolistID: string) => {
        dispatchTodolist(ChangeTodolistTitleAC(newValue, todolistID));
    }

    const removeTask = (todolistID: string, taskID: string) => {
        dispatchTasks(removeTaskAC(todolistID, taskID));
    }

    const addTask = (taskTitle: string, todolistID: string) => {
        dispatchTasks(addTaskAC(taskTitle, todolistID));
    }

    const changeTaskTitle = (newValue: string, taskID: string, todolistID: string) => {
        dispatchTasks(changeTaskTitleAC(newValue, taskID, todolistID));
    }

    const changeTaskStatus = (todolistID: string, isDone: boolean, taskID: string) => {
        dispatchTasks(changeTaskStatusAC(taskID, isDone, todolistID));
    }

    const statusFilter = (filter: TasksFiltersType, todolistID: string) => {
        dispatchTodolist(ChangeTodolistFilterAC(todolistID, filter));
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolist.map((todolist) => {

                let filteredTasks = tasks[todolist.id];

                if (todolist.filter === "Active") {
                    filteredTasks = tasks[todolist.id].filter((task) => !task.isDone)
                }

                if (todolist.filter === "Completed") {
                    filteredTasks = tasks[todolist.id].filter((task) => task.isDone)
                }

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