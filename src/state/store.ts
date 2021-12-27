import {tasksReducer} from "../reducers/tasks-reducer";
import {todolistReducer} from "../reducers/todolists-reducer";
import {combineReducers, createStore} from "redux";

const rootReducer = combineReducers( {
    tasks: tasksReducer,
    todolists: todolistReducer
})

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>
