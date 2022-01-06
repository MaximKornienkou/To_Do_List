import {v1} from "uuid";
import { TodolistType } from "../api/todolistAPI";


type ActionTypes =
    RemoveTodolistType
    | AddTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType
    | SetTodolistType

export type SetTodolistType = ReturnType<typeof setTodolistAC>;
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>;

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state = initialState, action: ActionTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            return action.todolists.map((todolist) => {
                return {...todolist, filter: "all"}
            });
        }
        case "REMOVE-TODOLIST": {
            return state.filter((todolist) => todolist.id !== action.todolistId);
        }
        case "ADD-TODOLIST": {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state];
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map((todolist) =>
                todolist.id === action.todolistId ? {...todolist, title: action.title} : todolist);
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map((todolist) =>
                todolist.id === action.todolistId ? {...todolist, filter: action.filter} : todolist);
        }
        default:
            return state;
    }
}

export const setTodolistAC = (todolists: Array<TodolistType>) => {
    return {
        type: "SET-TODOLISTS",
        todolists,
    } as const
}
export const addTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        title,
        todolistId: v1(),
    } as const
}
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        todolistId,
    } as const
}
export const changeTodolistTitleAC = (title: string, todolistId: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        todolistId,
        title,
    } as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        todolistId,
        filter,
    } as const
}