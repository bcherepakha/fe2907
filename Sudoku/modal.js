export class Modal {
    constructor(props) {
        this.props = props;

        this.createElement();
        document.body.append( this.rootEl );
    }

    remove() {
        this.rootEl.remove();
    }

    onAction(settings, e) {
        e.preventDefault();

        if (settings.action(settings)) {
            this.remove();
        }
    }

    createElement() {
        const rootEl = document.createElement('div');
        const bodyEl = document.createElement('div');
        const textEl = document.createElement('p');

        rootEl.className = 'modal';
        bodyEl.className = 'modal__body';
        textEl.innerText = this.props.text;

        rootEl.append(bodyEl);
        bodyEl.append(textEl);

        if (Array.isArray(this.props.actions)) {
            const actionsEl = document.createElement('div');

            bodyEl.append( actionsEl );

            actionsEl.className = 'modal__actions';

            actionsEl.append(
                ...this.props.actions.map(actionSettings => {
                    const btn = document.createElement('button');

                    btn.className = 'modal__action';
                    btn.innerText = actionSettings.text;

                    if (actionSettings.type) {
                        btn.classList.add(`modal__action--${actionSettings.type}`);
                    }

                    if (actionSettings.action) {
                        btn.addEventListener('click', this.onAction.bind(this, actionSettings));
                    }

                    return btn;
                })
            );
        }

        this.rootEl = rootEl;
    }
}
