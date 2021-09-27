import EventSource from "./eventSource.js";

// Cell.prototype.__proto__ = EventSource.prototype

export class Cell extends EventSource {
    constructor(props) {
        super();

        this.props = props;

        this.createElement();
    }

    get isEditable() {
        return this.props.editable;
    }

    setKey(idx) {
        this.row = Math.floor(idx / 9);
        this.column = idx % 9;
        this.square = Math.floor(this.column / 3) + Math.floor(this.row / 3) * 3;
        this.squareKey = (this.row % 3)*3 + this.column % 3;
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
        this.rootEl.dataset.error = this.props.error;
        this.rootEl.innerText = this.props.value;

        return this.rootEl;
    }
}
