import {appReducer, InitialStateType, setStatus} from "./app-reducer";

let startState: InitialStateType

beforeEach(() => {

    startState = {
        status: true,
        error: null
    }
});

test("status should be equal false", () => {

    const endState = appReducer(startState, setStatus(false));

    expect(endState.status).toBe(false);
});