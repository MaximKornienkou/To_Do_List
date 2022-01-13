import {todolistAPI, TodolistType} from "../api/todolistAPI";
import {AppThunk} from "../state/store";


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state = initialState, action: TodolistActionTypes): Array<TodolistDomainType> => {
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
            return [{...action.todolist, filter: 'all'}, ...state];
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

//thunks
export const setTodolists = (): AppThunk =>
    async dispatch => {
        try {
            const result = await todolistAPI.getTodolist();
            dispatch(setTodolistAC(result.data));
        } catch (error) {

        } finally {

        }
    }
export const createTodolist = (title: string): AppThunk =>
    async dispatch => {
        try {
            const result = await todolistAPI.createTodolist(title);
            dispatch(addTodolistAC(result.data.data.item));
        } catch (error) {

        } finally {

        }
    }
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk =>
    async dispatch => {
        try {
            await todolistAPI.updateTodolist({todolistId, title});
            dispatch(changeTodolistTitleAC(todolistId, title));
        } catch (error) {

        } finally {

        }
    }
export const deleteTodolist = (todolistId: string): AppThunk =>
    async dispatch => {
        try {
            await todolistAPI.deleteTodolist(todolistId);
            dispatch(removeTodolistAC(todolistId));
        } catch (error) {

        } finally {

        }
    }

//actions
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

export type TodolistActionTypes =
    | RemoveTodolistType
    | AddTodolistType
    | SetTodolistType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>;

export type SetTodolistType = ReturnType<typeof setTodolistAC>;
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistType = ReturnType<typeof addTodolistAC>;




