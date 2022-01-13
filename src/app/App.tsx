import React from "react";
import "./App.css";
import {TodolistsList} from "../components/TodolistsList/TodolistsList";
import {LoadingLine} from "../components/LoadingLine/LoadingLine";


export function App() {

    return (
        <div className="App">
            <LoadingLine/>
            <TodolistsList/>
        </div>
    );
}