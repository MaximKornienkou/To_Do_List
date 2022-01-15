import {TaskActionTypes, tasksReducer} from "../reducers/tasks-reducer";
import {TodolistActionTypes, todolistReducer} from "../reducers/todolists-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {appReducer, AppStatusActionTypes} from "../reducers/app-reducer";

const rootReducer = combineReducers( {
    tasks: tasksReducer,
    todolists: todolistReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = TodolistActionTypes | TaskActionTypes | AppStatusActionTypes

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
