import {TasksType} from "../App";
import {v1} from "uuid";
import {addTodolistType, removeTodolistType} from "./todolists-reducer";

export type ActionTypes = RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTaskTitleActionType |
    addTodolistType |
    removeTodolistType

export type RemoveTaskActionType = {
    type: "REMOVE-TASK";
    todolistId: string;
    taskId: string;
}
export type AddTaskActionType = {
    type: "ADD-TASK";
    title: string;
    todolistId: string;
}
export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS";
    todolistId: string;
    filter: boolean;
    taskId: string;
}
export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE";
    taskId: string;
    title: string;
    todolistId: string;
}

const initialState: TasksType = {}

export const tasksReducer = (state = initialState, action: ActionTypes): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter
            ((task) => task.id !== action.taskId)}
        }
        case "ADD-TASK": {
            return {...state, [action.todolistId]:
                    [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {...state, [action.todolistId]: state[action.todolistId].map
            ((task) => task.id === action.taskId ? {...task, isDone: action.filter} : task)}
        }
        case "CHANGE-TASK-TITLE": {
            return {...state, [action.todolistId]:state[action.todolistId].map
                ((task) => task.id === action.taskId ? {...task, title: action.title} : task)}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolistId]:[]};
        }
        case "REMOVE-TODOLIST": {
            let {[action.todolistId]: [], ...copyState} = {...state};
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {
        type: "REMOVE-TASK",
        todolistId,
        taskId,
    }
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {
        type: "ADD-TASK",
        title,
        todolistId,
    }
}
export const changeTaskStatusAC = (taskId: string, filter: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {
        type: "CHANGE-TASK-STATUS",
        todolistId,
        filter,
        taskId,
    }
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskId,
        title,
        todolistId,
    }
}