export class Cell {
    constructor(props) {
        this.props = props;

        this.events = {};

        this.createElement();
    }

    addEventListener(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(callback);
    }

    removeEventListener(eventName, callback) {
        if (!this.events[eventName]) {
            return ;
        }

        this.events[eventName] = this.events[eventName].filter(fn => fn !== callback);
    }

    dispatch(eventName) {
        if (!this.events[eventName]) {
            return ;
        }

        const event = {
            target: this
        };

        this.events[eventName].forEach(callback => callback(event));
    }

    setKey(idx) {
        this.row = Math.floor(idx / 9);
        this.column = idx % 9;
        this.square = Math.floor(this.column / 3) + Math.floor(this.row / 3) * 3;
    }

    setProps(newProps) {
        this.props = {
            ...this.props,
            ...newProps,
        };

        this.render();
    }

    createElement() {
        const rootEl = document.createElement('div');

        rootEl.className = 'game__board-cell';
        rootEl.innerText = this.props.value;

        rootEl.dataset.editable = this.props.editable;

        if (this.props.editable) {
            rootEl.setAttribute('tabindex', 0);

            rootEl.addEventListener('focus', this.onClick.bind(this));
        }

        rootEl.addEventListener('click', this.onClick.bind(this));

        this.rootEl = rootEl;
    }

    onClick() {
        this.dispatch('activate');
    }

    render() {
        this.rootEl.dataset.activeCell = this.props.active;
        this.rootEl.dataset.activeRange = this.props.inRange;

        return this.rootEl;
    }
}
