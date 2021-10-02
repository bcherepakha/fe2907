import tasksAPI from './server.js';
import Task from './task.js';
import List from './list.js';
import Counter from './counter.js';
import Loader from './loader.js';
import AddTaskForm from './addTaskForm.js';

const list = new List();
const counter = new Counter();
const loader = new Loader();
const addTask = new AddTaskForm(onAddTask);
let tasks = [];

init();

function init() {
    list.clear();
    list.addItem( loader );
    counter.setValues(0, 0);

    tasksAPI.getTasks()
        .then(tasksData => {
            loader.remove();
            tasks = tasksData.map(createTask);
            list.setItems(tasks);
            counter.setValues(tasks.length, getCompletedCount( tasks ));
        });
}

function getCompletedCount( tasks ) {
    return tasks.filter(task => task.data.completed).length;
}

function createTask( taskData ) {
    const task = new Task(taskData);

    task.addEventListener('change', onChangeTask);
    task.addEventListener('destroy', onDestroy);

    return task;
}

function onChangeTask(e) {
    const task = e.target;
    const newData = task.data;

    task.setDisabled(true);

    tasksAPI.setTaskData(newData)
        .then((data) => {
            task.changeData(data, false);
            updateCounter();
            task.setDisabled(false);
        });
}

function onDestroy(e) {
    const task = e.target;
    const taskID = task.data.id;

    task.setDisabled(true);
    tasksAPI.deleteTask(taskID)
        .then(() => {
            task.rootEl.remove();
            tasks = tasks.filter(task => task.data.id !== taskID);
            updateCounter();
        });
}

function updateCounter() {
    counter.setValues(tasks.length, getCompletedCount( tasks ));
}

function onAddTask(taskData) {
    addTask.setDisabled(true);
    tasksAPI.createTask(taskData)
        .then(taskData => {
            addTask.setDisabled(false);
            addTask.clear();
            const task = createTask(taskData);

            tasks.push(task);
            list.addItem(task);
            updateCounter();
        });
}
