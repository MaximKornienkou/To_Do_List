import {AddTodolistType, RemoveTodolistType, SetTodolistType} from "./todolists-reducer";
import {TaskStatus, TaskType, todolistAPI} from "../api/todolistAPI";
import {AppThunk} from "../state/store";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TaskActionTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state, [action.todolistId]: state[action.todolistId].filter
                ((task) => task.id !== action.taskId)
            }
        }
        case "ADD-TASK": {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map
                ((task) => task.id === action.taskId ? {...task, status: action.status} : task)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map
                ((task) => task.id === action.taskId ? {...task, title: action.title} : task)
            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolistId]: []};
        }
        case "REMOVE-TODOLIST": {
            let {[action.todolistId]: [], ...stateCopy} = {...state};
            return stateCopy;
        }
        case "SET-TASKS": {
            return {...state, [action.todolistId]: action.tasks}
        }
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

export const setTasks = (todolistId: string): AppThunk => async dispatch => {
    try {
        const result = await todolistAPI.getTasks(todolistId);
        dispatch(setTasksAC(todolistId, result.data.items));
    } catch (error) {

    } finally {

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
    try {
        const result = await todolistAPI.createTask({todoListId, title});
        dispatch(addTaskAC(result.data.data.item));
    } catch (error) {

    } finally {

    }
}

export type TaskActionTypes = RemoveTaskActionType
    | SetTasksActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistType
    | RemoveTodolistType
    | SetTodolistType

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type SetTasksActionType = ReturnType<typeof setTasksAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        todolistId,
        taskId,
    } as const
}
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {
        type: "SET-TASKS",
        todolistId,
        tasks,
    } as const
}
export const addTaskAC = (task: TaskType) => {
    return {
        type: "ADD-TASK",
        task,
    } as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatus, todolistId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        todolistId,
        status,
        taskId,
    } as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskId,
        title,
        todolistId,
    } as const
}