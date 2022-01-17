import React from "react";
import "./App.css";
import {TodolistsList} from "../components/TodolistsList/TodolistsList";
import {LoadingLine} from "../components/LoadingLine/LoadingLine";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {ErrorModal} from "../components/ErrorModal/ErrorModal";
import {RequestStatusType} from "../reducers/app-reducer";


export function App() {

const isLoading = useSelector<AppRootStateType, RequestStatusType>(state => state.app.loadingStatus);
const error = useSelector<AppRootStateType, string | null>(state => state.app.error);

    return (
        <div className="App">
            {isLoading === "loading" && <LoadingLine/>}
            {error && <ErrorModal text={error}/>}
            <TodolistsList/>
        </div>
    );
}