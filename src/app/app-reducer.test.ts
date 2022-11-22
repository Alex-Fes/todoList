import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC, setAppTaskStatusAC} from "./app-reducer";

let startState : InitialStateType

beforeEach(()=>{
    startState = {
        error: null,
        status: 'idle',
        taskStatus: 'idle'
    }
})


test('correct error message should be set', () => {

    const endState = appReducer(startState, setAppErrorAC("some error"));

    expect(endState.error).toBe("some error");
})
test('correct status should be set', () => {

    const endState = appReducer(startState, setAppStatusAC("loading"));

    expect(endState.status).toBe("loading");
})

test('correct taskStatus should be set', () => {

    const endState = appReducer(startState, setAppTaskStatusAC("loading"));

    expect(endState.taskStatus).toBe("loading");
})






