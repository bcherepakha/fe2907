export default class Counter {
    constructor() {
        this.rootEl = document.querySelector('.todo-count');

        const [itemsLeftEl, completedLeftEl] = Array.from(this.rootEl.querySelectorAll('strong'));

        this.itemsLeftEl = itemsLeftEl;
        this.completedLeftEl = completedLeftEl;
    }

    setValues(itemsLeft, completedLeft) {
        this.itemsLeftEl.innerText = itemsLeft;
        this.completedLeftEl.innerText = completedLeft;
    }
}
