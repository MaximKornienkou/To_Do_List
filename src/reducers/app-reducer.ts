export type InitialStateType = {
    status: boolean,
    error: string | null
}

const initialState: InitialStateType = {
    status: true,
    error: null
}

export const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state;
    }
}

export const setStatus = (status: boolean) => ({type: "APP/SET-STATUS", status} as const);
export const setError = (error: string) => ({type: "APP/SET-ERROR", error} as const);

type ActionTypes = ReturnType<typeof setStatus> | ReturnType<typeof setError>