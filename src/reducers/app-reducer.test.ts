import {appReducer, InitialStateType, setAppLoading, setError} from "./app-reducer";

let startState: InitialStateType

beforeEach(() => {

    startState = {
        loadingStatus: "idle",
        error: null
    }
});

test("status should be equal false", () => {

    const endState = appReducer(startState, setAppLoading("succeeded"));

    expect(endState.loadingStatus).toBe("succeeded");
});
test("error should be equal error", () => {

    const endState = appReducer(startState, setError("error"));

    expect(endState.error).toBe("error");
});