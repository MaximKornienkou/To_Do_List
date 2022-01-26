import {AppStatusActionTypes, setAppError} from "../reducers/app-reducer";
import {ResponseType} from "../api/todolistAPI";
import { Dispatch } from "redux";
import axios from "axios";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppStatusActionTypes>) => {

    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]));
    } else {
        dispatch(setAppError("Network error"));
    }
}

export const handleServerNetworkError = (error: string, dispatch: Dispatch<AppStatusActionTypes>) => {

    if (axios.isAxiosError(error) && error.message) {
        dispatch(setAppError(error.message));
    } else {
        dispatch(setAppError("Network error"));
    }
}