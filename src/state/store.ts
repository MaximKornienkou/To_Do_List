import {TaskActionTypes, tasksReducer} from "../reducers/tasks-reducer";
import {TodolistActionTypes, todolistReducer} from "../reducers/todolists-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";

const rootReducer = combineReducers( {
    tasks: tasksReducer,
    todolists: todolistReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = TodolistActionTypes | TaskActionTypes

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
