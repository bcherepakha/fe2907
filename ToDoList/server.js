class TasksServer {
    constructor() {
        this.baseURL = 'https://5d9969125641430014051850.mockapi.io/tasks';
    }

    getTasks() {
        return this.wait()
            .then(() => fetch(this.baseURL))
            .then(response => response.json());
    }

    wait() {
        return new Promise(resolve => {
            setTimeout(resolve, Math.random()*10000);
        });
    }

    setTaskData( taskData ) {
        return this.wait()
            .then(() => fetch(`${this.baseURL}/${taskData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            }))
            .then(response => response.json());
    }

    createTask( taskData ) {
        return this.wait()
            .then(() => fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            }))
            .then(response => response.json());
    }

    deleteTask( taskID ) {
        return fetch(`${this.baseURL}/${taskID}`, {
            method: 'DELETE'
        });
    }
}

export default new TasksServer();
