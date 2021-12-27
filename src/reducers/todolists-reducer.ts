import {TasksFiltersType, TodolistType} from "../App";
import {v1} from "uuid";


type ActionTypes =
    removeTodolistType
    | addTodolistType
    | changeTodolistTitleType
    | changeTodolistFilterType

export type removeTodolistType = {
    type: "REMOVE-TODOLIST";
    todolistId: string;
}
export type addTodolistType = {
    type: "ADD-TODOLIST";
    title: string;
    todolistId: string;
}
export type changeTodolistTitleType = {
    type: "CHANGE-TODOLIST-TITLE";
    todolistId: string;
    title: string;
}
export type changeTodolistFilterType = {
    type: "CHANGE-TODOLIST-FILTER";
    todolistId: string;
    filter: TasksFiltersType;
}

const initialState: Array<TodolistType> = []

export const todolistReducer = (state = initialState, action: ActionTypes): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter((todolist) => todolist.id !== action.todolistId);
        }
        case "ADD-TODOLIST": {
            return [...state, {id: action.todolistId, title: action.title, filter: "All"}];
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map((todolist) =>
                todolist.id === action.todolistId ? {...todolist, title: action.title} : todolist);
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map((todolist) =>
                todolist.id === action.todolistId ? {...todolist, filter: action.filter} : todolist)
        }
        default:
            return state;
    }
}

export const AddTodolistAC = (title: string): addTodolistType => {
    return {
        type: "ADD-TODOLIST",
        title,
        todolistId: v1(),
    }
}
export const RemoveTodolistAC = (todolistId: string): removeTodolistType => {
    return {
        type: "REMOVE-TODOLIST",
        todolistId,
    }
}
export const ChangeTodolistTitleAC = (title: string, todolistId: string): changeTodolistTitleType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        todolistId,
        title,
    }
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: TasksFiltersType): changeTodolistFilterType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        todolistId,
        filter,
    }
}