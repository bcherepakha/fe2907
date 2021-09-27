import EventSource from './eventSource.js';

export class Keyboard extends EventSource {
    constructor() {
        super();

        this.rootEl = document.querySelector('.game__keyboard');

        this.rootEl.addEventListener('submit', this.onSubmit.bind(this));
    }

    onSubmit(e) {
        e.preventDefault();
        const value = parseInt(e.submitter.innerText, 10);

        this.dispatch('click', value);
    }
}
