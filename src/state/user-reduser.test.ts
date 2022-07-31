import {userReduser} from "./user-reduser";

test('userReduser  should increment only age', ()=>{
    const startState = { age: 36 , childrenCount: 0, name: 'Alex'};
    const endState = userReduser(startState, {type: 'INCREMENT-AGE'})
    expect(endState.age).toBe(37);
    expect(endState.childrenCount).toBe(0);
})

test ('userReduser should increment only childrenCount', ()=> {
    const startState = { age: 36 , childrenCount: 0, name: 'Alex'};
    const endState = userReduser(startState, {type: 'INCREMENT-CHILDREN-COUNT'})
    expect(endState.age).toBe(36);
    expect(endState.childrenCount).toBe(1);
})
test ('userReduser should increment only name', ()=> {
    const startState = { age: 36 , childrenCount: 0, name: 'Alex'};
    const newName = 'Aleksei'
    const endState = userReduser(startState, {type: 'CHANGE-NAME', newName: newName})
    expect(endState.age).toBe(36);
    expect(endState.childrenCount).toBe(0);
    expect(endState.name).toBe(newName);
})





