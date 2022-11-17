import {TaskStateType} from "../app/App";
import {addTaskAC, updateTaskAC, changeTaskTitleAC, removeTaskAC, setTasksAC, taskReduser} from "./tasks-reduser";
import {addTodolistAC, removeTodolistAC, setTodolistsAC, todolistId1} from "./todolist-reduser";
import {TaskPriority, TaskStatuses} from "../api/todolists-api";
import {v1} from "uuid";

const startState: TaskStateType = {
    'todolistId1': [
        {id: '1', title: "HTML", status: TaskStatuses.Completed, todoListId: 'todolistId1',
            startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
        {id: '2', title: "JS",  status: TaskStatuses.Completed, todoListId: 'todolistId1',
            startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
        {id: '3', title: "ReactJS",  status: TaskStatuses.New, todoListId: 'todolistId1',
            startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''}
    ],
    'todolistId2': [
        {id: '1', title: "Book",  status: TaskStatuses.Completed, todoListId: 'todolistId2',
            startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
        {id: '2', title: "Map", status: TaskStatuses.Completed, todoListId: 'todolistId2',
            startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
        {id: '3', title: "Pen", status: TaskStatuses.New, todoListId: 'todolistId2',
            startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''}
    ]
}



test('correct task should be delete from correct array', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: "HTML", status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '2', title: "JS",  status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '3', title: "ReactJS",  status: TaskStatuses.New, todoListId: 'todolistId1',
        startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''}
        ],
        'todolistId2': [
            {id: '1', title: "Book",  status: TaskStatuses.Completed, todoListId: 'todolistId2',
        startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '2', title: "Map", status: TaskStatuses.Completed, todoListId: 'todolistId2',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '3', title: "Pen", status: TaskStatuses.New, todoListId: 'todolistId2',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''}
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
    const startState: TaskStateType =  {
        'todolistId1': [
            {id: '1', title: "HTML", status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '2', title: "JS",  status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '3', title: "ReactJS",  status: TaskStatuses.New, todoListId: 'todolistId1',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''}
        ],
        'todolistId2': [
            {id: '1', title: "Book",  status: TaskStatuses.Completed, todoListId: 'todolistId2',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '2', title: "Map", status: TaskStatuses.Completed, todoListId: 'todolistId2',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '3', title: "Pen", status: TaskStatuses.New, todoListId: 'todolistId2',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''}
        ]
    }
    //const action = addTaskAC('CSS', 'todolistId1');

    const action = addTaskAC({
        id: "qwerty",
        todoListId: 'todolistId1',
        startDate: '',
        order: 0,
        priority: 0,
        status: TaskStatuses.New,
        title: 'CSS',
        addedDate: '',
        deadline: '',
        description: ''
    });


    const endState = taskReduser(startState, action);

    expect(endState['todolistId1'].length).toBe(4);
    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId1'][0].id).toBeDefined();
    expect(endState['todolistId1'][0].title).toBe('CSS');
    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.New);

})

test('status of specified task should be changed', () => {
    const startState: TaskStateType =  {
        'todolistId1': [
            {id: '1', title: "HTML", status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '2', title: "JS",  status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '3', title: "ReactJS",  status: TaskStatuses.New, todoListId: 'todolistId1',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''}
        ],
        'todolistId2': [
            {id: '1', title: "Book",  status: TaskStatuses.Completed, todoListId: 'todolistId2',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '2', title: "Map", status: TaskStatuses.Completed, todoListId: 'todolistId2',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '3', title: "Pen", status: TaskStatuses.New, todoListId: 'todolistId2',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''}
        ]
    }
    const action = updateTaskAC('2', {status: TaskStatuses.New}, 'todolistId2');
    const endState = taskReduser(startState, action);

    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
})

test('title of specified task should be changed', () => {
    const startState: TaskStateType =  {
        'todolistId1': [
            {id: '1', title: "HTML", status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '2', title: "JS",  status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '3', title: "ReactJS",  status: TaskStatuses.New, todoListId: 'todolistId1',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''}
        ],
        'todolistId2': [
            {id: '1', title: "Book",  status: TaskStatuses.Completed, todoListId: 'todolistId2',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '2', title: "Map", status: TaskStatuses.Completed, todoListId: 'todolistId2',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '3', title: "Pen", status: TaskStatuses.New, todoListId: 'todolistId2',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''}
        ]
    }
    const action = updateTaskAC('2', {title: 'Cards'}, 'todolistId2');
    const endState = taskReduser(startState, action);

    expect(endState['todolistId1'][1].title).toBe("JS");
    expect(endState['todolistId2'][1].title).toBe('Cards');
})

test('new property with new array should be add when new todolist is add', () => {
    const startState: TaskStateType =  {
        'todolistId1': [
            {id: '1', title: "HTML", status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '2', title: "JS",  status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '3', title: "ReactJS",  status: TaskStatuses.New, todoListId: 'todolistId1',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''}
        ],
        'todolistId2': [
            {id: '1', title: "Book",  status: TaskStatuses.Completed, todoListId: 'todolistId2',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '2', title: "Map", status: TaskStatuses.Completed, todoListId: 'todolistId2',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '3', title: "Pen", status: TaskStatuses.New, todoListId: 'todolistId2',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''}
        ]
    }
    const action = addTodolistAC({
        id: v1(),
        addedDate: '',
        order: 0,
        title: 'new todolist'
    });
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
  const startState: TaskStateType =  {
        'todolistId1': [
            {id: '1', title: "HTML", status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '2', title: "JS",  status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '3', title: "ReactJS",  status: TaskStatuses.New, todoListId: 'todolistId1',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''}
        ],
        'todolistId2': [
            {id: '1', title: "Book",  status: TaskStatuses.Completed, todoListId: 'todolistId2',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '2', title: "Map", status: TaskStatuses.Completed, todoListId: 'todolistId2',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''},
            {id: '3', title: "Pen", status: TaskStatuses.New, todoListId: 'todolistId2',
                startDate:'', deadline: '',addedDate:'',order: 0,priority: TaskPriority.Low, description:''}
        ]
    }
    const action = removeTodolistAC('todolistId2');
    const endState = taskReduser(startState, action);

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})

test('empty array should be added when we set todolists', () => {

    const action = setTodolistsAC([
        {id: 'todolistId1', title: 'What to learn', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy' , addedDate: '', order: 0}]);
    const endState = taskReduser({}, action);

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['todolistId2']).toStrictEqual([])
    expect(endState['todolistId1']).toStrictEqual([])
})

test('tasks should be added for todolist', () => {

    const action = setTasksAC(startState['todolistId1'], 'todolistId1');
    const endState = taskReduser({
        'todolistId2': [],
        'todolistId1': []
    }, action);



    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)

})



