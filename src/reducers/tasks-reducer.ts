import {AddTodolistType, RemoveTodolistType, SetTodolistType} from "./todolists-reducer";
import {TaskPriority, TaskStatus, TaskType, todolistAPI, UpdateTaskModelType} from "../api/todolistAPI";
import {AppRootStateType, AppThunk} from "../state/store";
import {setAppLoading} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import axios from "axios";


const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TaskActionTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .filter((task) => task.id !== action.taskId)
            }
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case "UPDATE-TASK":
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map((task) => task.id === action.taskId ? {...task, ...action.model} : task)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST":
            const stateCopy = {...state};
            delete stateCopy[action.todolistId];
            return stateCopy;
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach(todolist => {
                stateCopy[todolist.id] = []
            })
            return stateCopy
        }
        default:
            return state;
    }
}

// thunks
export const setTasks = (todolistId: string): AppThunk => async dispatch => {
    dispatch(setAppLoading("loading"));
    try {
        const result = await todolistAPI.getTasks(todolistId);
        dispatch(setTasksAC(todolistId, result.data.items));
    } catch (error) {

    } finally {
        dispatch(setAppLoading("succeeded"));
    }
}

export const deleteTask = (todolistId: string, taskId: string): AppThunk => async dispatch => {
    try {
        await todolistAPI.deleteTask({todolistId, taskId});
        dispatch(removeTaskAC(todolistId, taskId));
    } catch (error) {

    } finally {

    }
}

export const createTask = (todoListId: string, title: string): AppThunk => async dispatch => {
    dispatch(setAppLoading("loading"));
    try {
        const result = await todolistAPI.createTask({todoListId, title});
        if (result.data.resultCode === 0) {
            dispatch(addTaskAC(result.data.data.item));
        } else {
            handleServerAppError(result.data, dispatch);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error.message, dispatch);
        }
    } finally {
        dispatch(setAppLoading("succeeded"));
    }
}

export const updateTask = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {

        const task = getState().tasks[todolistId].find((task) => task.id === taskId);

        if (!task) {
            throw new Error("sorry task not found");
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        dispatch(setAppLoading("loading"));
        try {
            const result = await todolistAPI.updateTask(todolistId, taskId, apiModel);
            if (result.data.resultCode === 0) {
                dispatch(updateTaskAC(todolistId, taskId, domainModel));
            } else {
                handleServerAppError(result.data, dispatch);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                handleServerNetworkError(error.message, dispatch);
            }
        } finally {
            dispatch(setAppLoading("succeeded"));
        }
    }

// actions
export const removeTaskAC = (todolistId: string, taskId: string) =>
    ({type: "REMOVE-TASK", todolistId, taskId} as const);
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) =>
    ({type: "SET-TASKS", todolistId, tasks} as const);
export const addTaskAC = (task: TaskType) =>
    ({type: "ADD-TASK", task} as const);
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
    ({type: "UPDATE-TASK", todolistId, taskId, model} as const);

// types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type TaskActionTypes =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistType
    | RemoveTodolistType
    | SetTodolistType;

export type UpdateDomainTaskModelType = {
    title?: string,
    description?: string,
    status?: TaskStatus,
    priority?: TaskPriority,
    startDate?: string,
    deadline?: string,
}