export default class Settings {
    static DEFAULT_COMPLEXITY = [
        { title: 'easy', value: 62 },
        { title: 'medium', value: 53, selected: false },
        { title: 'hard', value: 44, selected: true },
        { title: 'very-hard', value: 35 },
        { title: 'insane', value: 26 },
        { title: 'inhuman', value: 17 },
    ]

    getComplexity() {
        return this.complexityEl.value;
    }

    get complexity() {
        return this.complexityEl.value;
    }

    constructor(complexityOptions = Settings.DEFAULT_COMPLEXITY, submitHandler) {
        // ? this = {}
        // ? this.__proto__ = Settings.prototype;

        this.rootEl = document.querySelector('.game__settings');
        this.complexityEl = this.rootEl.elements.complexity;
        this.complexityOptions = complexityOptions;
        this.submitHandler = submitHandler;

        this.fillComplexityEl(); // ? this = this

        this.rootEl.addEventListener('submit', this.onSubmit.bind(this));

        // ? return this;
    }

    fillComplexityEl() {
        this.complexityEl.innerText = '';
        this.complexityEl.append(
            ...Object.values(this.complexityOptions)
                .map(({ title, value, selected = false }) => {
                    const optionEl = document.createElement('option');

                    optionEl.innerText = title;
                    optionEl.value = value;
                    optionEl.selected = selected;

                    return optionEl;
                })
        );
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.submitHandler) {
            this.submitHandler(this.complexityEl.value);
        }
    }
}
