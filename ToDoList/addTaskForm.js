export default class AddTaskForm {
    constructor(submitHandler) {
        this.rootEl = document.querySelector('.header');
        this.inputEl = this.rootEl.querySelector('.new-todo');
        this.completedEl = this.rootEl.querySelector('.complete-all');
        this.submitBtn = this.rootEl.querySelector('.submit');
        this.submitHandler = submitHandler;

        this.rootEl.addEventListener('submit', this.onSubmit.bind(this));
    }

    setDisabled( disabled ) {
        this.inputEl.disabled = disabled;
        this.submitBtn.disabled = disabled;

        if (disabled) {
            this.rootEl.classList.add('disabled');
        } else {
            this.rootEl.classList.remove('disabled');
        }
    }

    clear() {
        this.inputEl.value = '';
    }

    onSubmit(e) {
        e.preventDefault();
        const task = {
            text: this.inputEl.value,
            completed: this.completedEl.checked
        };

        if (this.submitHandler) {
            this.submitHandler(task);
        }
    }
}
