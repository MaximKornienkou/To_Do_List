import {todolistAPI, TodolistType} from "../api/todolistAPI";
import {AppThunk} from "../state/store";
import {RequestStatusType, setAppLoading} from "./app-reducer";

const initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state = initialState, action: TodolistActionTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.todolists.map((todolist) => ({...todolist, filter: "all", entityStatus: "idle"}));
        case "REMOVE-TODOLIST":
            return state.filter((todolist) => todolist.id !== action.todolistId);
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: 'all', entityStatus: "idle"}, ...state];
        case "CHANGE-TODOLIST-TITLE":
            return state.map((todolist) =>
                todolist.id === action.todolistId ? {...todolist, title: action.title} : todolist);
        case "CHANGE-TODOLIST-FILTER":
            return state.map((todolist) =>
                todolist.id === action.todolistId ? {...todolist, filter: action.filter} : todolist);
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map((todolist) =>
                todolist.id === action.todolistId ? {...todolist, entityStatus: action.status} : todolist);
        default:
            return state;
    }
}

// thunks
export const setTodolists = (): AppThunk => async dispatch => {
    dispatch(setAppLoading("loading"));
    try {
        const result = await todolistAPI.getTodolist();
        dispatch(setTodolistAC(result.data));
    } catch (error) {

    } finally {
        dispatch(setAppLoading("succeeded"));
    }
}

export const createTodolist = (title: string): AppThunk => async dispatch => {
    dispatch(setAppLoading("loading"));
    try {
        const result = await todolistAPI.createTodolist(title);
        dispatch(addTodolistAC(result.data.data.item));
    } catch (error) {

    } finally {
        dispatch(setAppLoading("succeeded"));
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => async dispatch => {
    dispatch(setAppLoading("loading"));
    try {
        await todolistAPI.updateTodolist({todolistId, title});
        dispatch(changeTodolistTitleAC(todolistId, title));
    } catch (error) {

    } finally {
        dispatch(setAppLoading("succeeded"));
    }
}

export const deleteTodolist = (todolistId: string): AppThunk => async dispatch => {
    dispatch(setAppLoading("loading"));
    dispatch(changeTodolistEntityStatusAC(todolistId, "loading"));
    try {
        await todolistAPI.deleteTodolist(todolistId);
        dispatch(removeTodolistAC(todolistId));
    } catch (error) {

    } finally {
        dispatch(setAppLoading("succeeded"));
    }
}

// actions
export const setTodolistAC = (todolists: Array<TodolistType>) =>
    ({type: "SET-TODOLISTS", todolists} as const);
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: "ADD-TODOLIST", todolist} as const);
export const removeTodolistAC = (todolistId: string) =>
    ({type: "REMOVE-TODOLIST", todolistId} as const);
export const changeTodolistTitleAC = (todolistId: string, title: string) =>
    ({type: "CHANGE-TODOLIST-TITLE", todolistId, title} as const);
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) =>
    ({type: "CHANGE-TODOLIST-FILTER", todolistId, filter} as const);
export const changeTodolistEntityStatusAC = (todolistId: string, status: RequestStatusType) =>
    ({type: "CHANGE-TODOLIST-ENTITY-STATUS", todolistId, status} as const);


// types
export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

export type TodolistActionTypes =
    | RemoveTodolistType
    | AddTodolistType
    | SetTodolistType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type SetTodolistType = ReturnType<typeof setTodolistAC>;
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistType = ReturnType<typeof addTodolistAC>;




