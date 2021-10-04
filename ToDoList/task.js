import EventSource from './eventSource.js';

const dbClickTime = 500;

export default class Task extends EventSource {
    constructor(data) {
        super();
        this.data = data;
        this._lastClick = 0;

        this.createElements();
    }

    createElements() {
        const rootEl = document.createElement('li');
        const viewEl = document.createElement('div');
        const editEl = document.createElement('form');
        const completeEl = document.createElement('input');
        const taskTextEl = document.createElement('span');
        const destroyBtn = document.createElement('button');
        const editInput = document.createElement('input');
        const submitBtn = document.createElement('button');

        editInput.className = 'edit';
        submitBtn.className = 'visually-hidden';
        submitBtn.type = 'submit';
        submitBtn.innerText = 'Изменить';

        viewEl.className = 'view';

        completeEl.className = 'toggle';
        completeEl.type = 'checkbox';
        destroyBtn.className = 'destroy';

        editEl.append(editInput, submitBtn);
        viewEl.append(completeEl, taskTextEl, destroyBtn);
        rootEl.append(viewEl, editEl);

        completeEl.addEventListener('change', this.toggleCompleted.bind(this));
        destroyBtn.addEventListener('click', this.destroy.bind(this));
        taskTextEl.addEventListener('click', this.onClick.bind(this));
        editEl.addEventListener('submit', this.onSubmit.bind(this));

        this.completeEl = completeEl;
        this.destroyBtn = destroyBtn;
        this.taskTextEl = taskTextEl;
        this.editInput = editInput;
        this.editEl = editEl;
        this.rootEl = rootEl;
    }

    changeData( newData, riseEvent = true ) {
        this.data = newData;
        this.render();

        if (riseEvent) {
            this.dispatch('change');
        }
    }

    setHidden( hidden ) {
        this.hidden = hidden;
        this.render();
    }

    setDisabled( disabled ) {
        this.disabled = disabled;
        this.render();
    }

    setEditMode( edit ) {
        this.edit = edit;
        this.render();
    }

    toggleCompleted() {
        const completed = this.completeEl.checked;
        const newData = {
            ...this.data,
            completed
        }

        this.changeData( newData );
    }

    destroy() {
        this.dispatch('destroy');
    }

    onClick() {
        const { _lastClick } = this;
        const _currentClick = Date.now();

        if (_currentClick - _lastClick < dbClickTime) {
            this.setEditMode(true);
            this._lastClick = 0;
        } else {
            this._lastClick = _currentClick;
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const text = this.editInput.value;
        const newData = {
            ...this.data,
            text
        }

        this.setEditMode(false);
        this.changeData( newData );
    }

    render() {
        if (this.edit) {
            this.rootEl.classList.add('editing');
        } else {
            this.rootEl.classList.remove('editing');
        }

        if (this.data.completed) {
            this.rootEl.classList.add('completed');
        } else {
            this.rootEl.classList.remove('completed');
        }

        this.completeEl.checked = this.data.completed;
        this.taskTextEl.innerText = this.data.text;
        this.editInput.value = this.data.text;

        if (this.disabled) {
            this.rootEl.classList.add('disabled');
        } else {
            this.rootEl.classList.remove('disabled');
        }

        this.completeEl.disabled = this.disabled;
        this.destroyBtn.disabled = this.disabled;
        this.editEl.disabled = this.disabled;

        this.rootEl.hidden = this.hidden;

        return this.rootEl;
    }
}
