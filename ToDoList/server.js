class TasksServer {
    constructor() {
        this.baseURL = 'https://5d9969125641430014051850.mockapi.io/tasks';
    }

    async getTasks() {
        await this.wait();
        const response = await fetch(this.baseURL);

        return response.json();
    }

    wait() {
        return new Promise(resolve => {
            setTimeout(resolve, Math.random()*10000);
        });
    }

    async setTaskData( taskData ) {
        try {
            await this.wait();
            const response = fetch(`${this.baseURL}/${taskData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(taskData)
                });

            return response.json();
        } catch (ex) {
            console.log(ex);

            return ex;
        }
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
