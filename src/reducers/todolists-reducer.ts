import {TasksFiltersType, TodolistType} from "../App";
import {v1} from "uuid";


type ActionTypes =
    RemoveTodolistType
    | AddTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType

export type RemoveTodolistType = ReturnType<typeof RemoveTodolistAC>;
export type AddTodolistType = ReturnType<typeof AddTodolistAC>;
export type ChangeTodolistTitleType = ReturnType<typeof ChangeTodolistTitleAC>;
export type ChangeTodolistFilterType = ReturnType<typeof ChangeTodolistFilterAC>;

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

export const AddTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        title,
        todolistId: v1(),
    } as const
}
export const RemoveTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        todolistId,
    } as const
}
export const ChangeTodolistTitleAC = (title: string, todolistId: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        todolistId,
        title,
    } as const
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: TasksFiltersType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        todolistId,
        filter,
    } as const
}