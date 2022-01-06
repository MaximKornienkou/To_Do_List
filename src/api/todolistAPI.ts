import axios, {AxiosResponse} from "axios";


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
        return instance.post<AxiosResponse<CreateTodolistResponseType>>("todo-lists", {title});
    },

}

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {
        item: TodolistType
    }
}
