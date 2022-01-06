import {AddTodolistType, RemoveTodolistType, SetTodolistType} from "./todolists-reducer";
import {TaskStatus, TaskType} from "../api/todolistAPI";

export type ActionTypes = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistType
    | RemoveTodolistType
    | SetTodolistType

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state, [action.todolistId]: state[action.todolistId].filter
                ((task) => task.id !== action.taskId)
            }
        }
        case "ADD-TASK": {
            return {...state, [action.task.todolistId]: [action.task, ...state[action.task.todolistId]]}
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
            let {[action.todolistId]: [], ...copyState} = {...state};
            return copyState;
        }
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach(todolist => {
                copyState[todolist.id] = []
            })
            return copyState
        }
        default:
            return state;
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        todolistId,
        taskId,
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