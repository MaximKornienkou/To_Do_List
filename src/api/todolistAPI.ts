import axios from "axios";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "59351494-37f1-4114-8206-923aa7d46da6",
    },
});

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>("todo-lists");
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>("todo-lists", {title});
    },
    updateTodolist(params: {todolistId: string, title: string}) {
        return instance.put<ResponseType>(`todo-lists/${params.todolistId}`, {title: params.title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    createTask(params: {todolistId: string, title: string}) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${params.todolistId}/tasks`, {title: params.title});
    },
    updateTask(params: {todolistId: string, taskId: string, model: UpdateTaskModelType}) {
        return instance.put<ResponseType>(`todo-lists/${params.todolistId}/tasks/${params.taskId}`, {model: params.model});
    },
    deleteTask(params: {todolistId: string, taskId: string}) {
        return instance.delete<ResponseType>(`todo-lists/${params.todolistId}/tasks/${params.taskId}`);
    },

}

export type TodolistType = {
    id: string,
    addedDate: string,
    order: number,
    title: string,
}

type ResponseType<D = {}> = {
    resultCode: number,
    messages: Array<string>,
    fieldsErrors: Array<string>,
    data: D,
}

export enum TaskStatus {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriority {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export type TaskType = {
    description: string,
    title: string,
    status: TaskStatus,
    priority: TaskPriority,
    startDate: string,
    deadline: string,
    id: string,
    todolistId: string,
    order: number,
    addedDate: string,
}

type GetTasksResponse = {
    error: string | null,
    totalCount: number,
    items: TaskType[],
}

export type UpdateTaskModelType = {
    title: string,
    description: string,
    status: TaskStatus,
    priority: TaskPriority,
    startDate: string,
    deadline: string,
}
