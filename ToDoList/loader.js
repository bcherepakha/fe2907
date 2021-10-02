export default class Loader {
    constructor() {
        this.createElement();
    }

    createElement() {
        this.rootEl = document.createElement('li');
        this.rootEl.innerText = 'Loading...';
    }

    remove() {
        this.rootEl.remove();
    }

    render() {
        return this.rootEl;
    }
}
