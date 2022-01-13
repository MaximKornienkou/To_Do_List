import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, setTodolistAC, TodolistDomainType,
    todolistReducer
} from './todolists-reducer';
import {v1} from 'uuid';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType>

beforeEach(() => {
   todolistId1 = v1();
   todolistId2 = v1();

    startState = [
        {id: todolistId1, addedDate: "123", order: 1, title:"What to learn", filter: "all"},
        {id: todolistId2, addedDate: "1234", order: 2, title:"What to buy", filter: "all"},
    ]
});

test('correct todolist should be removed', () => {

    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {

    let newTodolistTitle = {id: "1",
        addedDate: "",
        order: 0,
        title: "New TodolistsList",
        filter: "all",
    };

    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("New TodolistsList");
    expect(endState[0].filter).toBe("all");
});
test('correct todolist should change its name', () => {

    let newTodolistTitle = "New TodolistsList";

    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId2, "New TodolistsList"));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
test('todolists should be set', () => {

   const action = setTodolistAC(startState);

    const endState = todolistReducer([], action);

    expect(endState.length).toBe(2);
});