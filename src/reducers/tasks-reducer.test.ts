import {
    addTaskAC,
    removeTaskAC, setTasksAC,
    tasksReducer,
    TasksStateType, updateTaskAC
} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC, setTodolistAC, TodolistDomainType, todolistReducer} from "./todolists-reducer";
import {TaskPriority, TaskStatus} from "../api/todolistAPI";

let startState: TasksStateType;

beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", status: TaskStatus.New, todoListId: "todolistId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriority.Low},
            {id: "2", title: "JS", status: TaskStatus.Completed, todoListId: "todolistId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriority.Low},
            {id: "3", title: "React", status: TaskStatus.New, todoListId: "todolistId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriority.Low}
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: TaskStatus.New, todoListId: "todolistId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriority.Low},
            {id: "2", title: "milk", status: TaskStatus.Completed, todoListId: "todolistId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriority.Low},
            {id: "3", title: "tea", status: TaskStatus.New, todoListId: "todolistId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriority.Low}
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("todolistId2", "2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", status: TaskStatus.New, todoListId: "todolistId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriority.Low},
            {id: "2", title: "JS", status: TaskStatus.Completed, todoListId: "todolistId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriority.Low},
            {id: "3", title: "React", status: TaskStatus.New, todoListId: "todolistId1", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriority.Low}
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: TaskStatus.New, todoListId: "todolistId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriority.Low},
            {id: "3", title: "tea", status: TaskStatus.New, todoListId: "todolistId2", description: "",
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriority.Low}
        ]
    });

});
test('correct task should be added to correct array', () => {

    const action = addTaskAC({id: "3", title: "juice", status: TaskStatus.New, todoListId: "todolistId2", description: "",
        startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriority.Low});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].status).toBe(TaskStatus.New);
});
test('status of specified task should be changed', () => {

    const action = updateTaskAC("todolistId2", "2", {status: TaskStatus.New});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatus.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatus.Completed);
});
test('title of specified task should be changed', () => {

    const action = updateTaskAC("todolistId2", "2", {title: "beer"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("beer");
    expect(endState["todolistId1"][1].title).toBe("JS");
});
test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({id: "1",
        addedDate: "",
        order: 0,
        title: "New TodolistsList",
    });

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistState: Array<TodolistDomainType> = [];

    let newTodolistTitle = {id: "1",
        addedDate: "",
        order: 0,
        title: "New TodolistsList",
        filter: "all",
    };
    const action = addTodolistAC(newTodolistTitle);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistState = todolistReducer(startTodolistState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolist = endTodolistState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolist).toBe(action.todolist.id);
});
test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
test('empty array should be added when we set todolists', () => {

    const action = setTodolistAC([
        {id: "1", title: "title1", order: 3, addedDate: ""},
        {id: "2", title: "title2", order: 4, addedDate: ""},
    ])

    const endState = tasksReducer({}, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState["1"]).toStrictEqual([]);
    expect(endState["2"]).toStrictEqual([]);
});
test('tasks should be added to todolist', () => {

    const action = setTasksAC("todolistId1", startState["todolistId1"]);

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": [],
    }, action);

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);
});