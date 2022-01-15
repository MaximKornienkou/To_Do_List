import React from "react";
import "./App.css";
import {TodolistsList} from "../components/TodolistsList/TodolistsList";
import {LoadingLine} from "../components/LoadingLine/LoadingLine";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";


export function App() {

const isLoading = useSelector<AppRootStateType, string>(state => state.app.loadingStatus);

    return (
        <div className="App">
            {isLoading === "idle" && <LoadingLine/>}
            <TodolistsList/>
        </div>
    );
}