import tasksAPI from './server.js';
import Task from './task.js';
import List from './list.js';
import Counter from './counter.js';
import Loader from './loader.js';
import AddTaskForm from './addTaskForm.js';
import Filter from './filter.js';

const list = new List();
const counter = new Counter();
const loader = new Loader();
const addTask = new AddTaskForm(onAddTask);
const filter = new Filter();
const tasksUpdateTime = 5000;
let tasks = [];

init();

console.log( filter );

async function init() {
    list.clear();
    list.addItem( loader );
    counter.setValues(0, 0);
    filter.addEventListener('change', onChangeFilter);

    const tasksData = await tasksAPI.getTasks();

    loader.remove();
    tasks = tasksData.map(createTask);
    list.setItems(tasks);
    counter.setValues(tasks.length, getCompletedCount( tasks ));

    setTimeout(updateTasks, tasksUpdateTime);
}

function isTaskHidden(task) {
    const { currentFilter } = filter;

    switch (currentFilter) {
        case '#/all':
            return false;
        case '#/active':
            return task.data.completed === true;
        case '#/completed':
            return task.data.completed === false;
    }

    return false;
}

function onChangeFilter() {
    tasks.forEach(task => {
        task.setHidden( isTaskHidden(task) );
    });
}

async function updateTasks() {
    const tasksData = await tasksAPI.getTasks();

    tasks = tasksData.map(taskData => {
        const task = tasks.find(t => t.data.id === taskData.id);

        if (!task) {
            return createTask(taskData);
        } else {
            if (!task.disabled && !task.edit) {
                task.changeData(taskData, false);
            }

            return task;
        }
    });

    list.setItems(tasks);
    counter.setValues(tasks.length, getCompletedCount( tasks ));

    setTimeout(updateTasks, tasksUpdateTime);
}

function getCompletedCount( tasks ) {
    return tasks.filter(task => task.data.completed).length;
}

function createTask( taskData ) {
    const task = new Task(taskData);

    task.setHidden( isTaskHidden(task) );

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
