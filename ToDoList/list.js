export default class List {
    constructor() {
        this.rootEl = document.querySelector('.todo-list');
    }

    clear() {
        this.rootEl.innerText = '';
    }

    addItem( task ) {
        this.rootEl.append( task.render() );
    }

    setItems( tasks ) {
        this.clear();
        this.rootEl.append( ...tasks.map(task => task.render()) );
    }
}
