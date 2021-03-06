import React from "react";
import "./App.css";
import {TodolistsList} from "../components/TodolistsList/TodolistsList";
import {LoadingLine} from "../components/LoadingLine/LoadingLine";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {ErrorModal} from "../components/ErrorModal/ErrorModal";
import {RequestStatusType} from "../reducers/app-reducer";
import {Login} from "../components/Login/Login";
import {Route, Routes} from "react-router-dom";


export function App() {

    const isLoading = useSelector<AppRootStateType, RequestStatusType>(state => state.app.loadingStatus);
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error);

    return (
        <div className="App">
            {isLoading === "loading" && <LoadingLine/>}
            {error && <ErrorModal text={error}/>}
            <Routes>
                <Route path={""} element={<TodolistsList/>}/>
                <Route path={"login"} element={<Login/>}/>
            </Routes>
        </div>
    );
}