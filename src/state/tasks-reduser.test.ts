import {TaskStateType} from "../App";
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, taskReduser} from "./tasks-reduser";
import {addTodolistAC, removeTodolistAC} from "./todolist-reduser";

test('correct task should be delete from correct array', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: "HTML", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: true},
            {id: '2', title: "Map", isDone: true},
            {id: '3', title: "Pen", isDone: false}
        ]
    }
    const action = removeTaskAC('2', 'todolistId2');
    const endState = taskReduser(startState, action);

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy();
    expect(endState['todolistId2'][0].id).toBe('1');
    expect(endState['todolistId2'][1].id).toBe('3');

})

test('correct task should be add from correct array', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: "HTML", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: true},
            {id: '2', title: "Map", isDone: true},
            {id: '3', title: "Pen", isDone: false}
        ]
    }
    const action = addTaskAC('CSS', 'todolistId1');
    const endState = taskReduser(startState, action);

    expect(endState['todolistId1'].length).toBe(4);
    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId1'][0].id).toBeDefined();
    expect(endState['todolistId1'][0].title).toBe('CSS');
    expect(endState['todolistId1'][0].isDone).toBe(false);

})

test('status of specified task should be changed', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: "HTML", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: true},
            {id: '2', title: "Map", isDone: true},
            {id: '3', title: "Pen", isDone: false}
        ]
    }
    const action = changeStatusAC('2', false, 'todolistId2');
    const endState = taskReduser(startState, action);

    expect(endState['todolistId1'][1].isDone).toBe(true);
    expect(endState['todolistId2'][1].isDone).toBe(false);
})

test('title of specified task should be changed', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: "HTML", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: true},
            {id: '2', title: "Map", isDone: true},
            {id: '3', title: "Pen", isDone: false}
        ]
    }
    const action = changeTaskTitleAC('2', 'Cards', 'todolistId2');
    const endState = taskReduser(startState, action);

    expect(endState['todolistId1'][1].title).toBe("JS");
    expect(endState['todolistId2'][1].title).toBe('Cards');
})

test('new property with new array should be add when new todolist is add', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: "HTML", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: true},
            {id: '2', title: "Map", isDone: true},
            {id: '3', title: "Pen", isDone: false}
        ]
    }
    const action = addTodolistAC('title no matter');
    const endState = taskReduser(startState, action);

    const keys = Object.keys(endState)// возвращает объект в виде строк всех ключей в ассоц массиве
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
    if(!newKey){
        throw Error('new key should be add')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])
})

test('property with todolistId should be delete', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: "HTML", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: "Book", isDone: true},
            {id: '2', title: "Map", isDone: true},
            {id: '3', title: "Pen", isDone: false}
        ]
    }
    const action = removeTodolistAC('todolistId2');
    const endState = taskReduser(startState, action);

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})
