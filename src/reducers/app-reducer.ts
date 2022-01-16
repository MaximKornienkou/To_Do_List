type RequestStatusType = "idle" | "loading" | "succeeded";

export type InitialStateType = {
    loadingStatus: RequestStatusType
    error: string | null
}

const initialState: InitialStateType = {
    loadingStatus: "idle",
    error: null
}

export const appReducer = (state = initialState, action: AppStatusActionTypes): InitialStateType => {
    switch (action.type) {
        case "APP/SET-LOADING-STATUS":
            return {...state, loadingStatus: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state;
    }
}

export const setAppLoading = (status: RequestStatusType) => ({type: "APP/SET-LOADING-STATUS", status} as const);
export const setError = (error: string) => ({type: "APP/SET-ERROR", error} as const);

export type AppStatusActionTypes = ReturnType<typeof setAppLoading> | ReturnType<typeof setError>