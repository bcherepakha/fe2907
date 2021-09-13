function Timer(props) {
    //? this = {}
    //? this.__proto__ = Timer.prototype;

    this.props = props;
    this.state = {
        start: null,
        diff: 0,
    };

    this._intervalID = null;

    this.createContent();

    if (this.props.draggable) {
        this.props.rootEl.draggable = true;

        this.props.rootEl.addEventListener('dragstart', this.dragStart.bind(this));
        this.props.rootEl.addEventListener('dragend', this.dragEnd.bind(this));
    }

    this.render();

    //? return this;
}

//? Timer.prototype = { constructor: Timer, __proto__: Object.protoype }
//? Timer.__proto__ = Function.prototype

Timer.prototype.createContent = function () {
    const wrapper = document.createElement('div');
    const valueEl = document.createElement('span');
    const startBtn = document.createElement('button');
    const pauseBtn = document.createElement('button');
    const resetBtn = document.createElement('button');

    wrapper.className = 'timer';
    valueEl.className = 'timer__value';
    startBtn.className = 'timer__button';
    pauseBtn.className = 'timer__button';
    resetBtn.className = 'timer__button';
    // startBtn.setAttribute('data-action', 'start');
    startBtn.dataset.action = 'start';
    startBtn.innerText = 'start';
    pauseBtn.dataset.action = 'pause';
    pauseBtn.innerText = 'pause';
    resetBtn.dataset.action = 'reset';
    resetBtn.innerText = 'reset';
    valueEl.innerText = '00:00';

    wrapper.append(valueEl, startBtn, pauseBtn, resetBtn);

    startBtn.addEventListener('click', this.start.bind(this));
    resetBtn.addEventListener('click', this.reset.bind(this));
    pauseBtn.addEventListener('click', this.pause.bind(this));

    this.props.rootEl.append(wrapper);
    this.elements = {
        value: valueEl
    };
};

Timer.prototype.dragStart = function () {
    this.dragged = true;
};

Timer.prototype.dragEnd = function () {
    this.dragged = false;
};

Timer.prototype.start = function () {
    this.state.start = Date.now();
    this.render();

    this.startInterval();
};

Timer.prototype.startInterval = function () {
    this._intervalID = setInterval(this.render.bind(this), 1000);
};

Timer.prototype.stopInterval = function () {
    if (this._intervalID) {
        clearInterval(this._intervalID);
        this._intervalID = null;
    }
};

Timer.prototype.reset = function () {
    this.state.start = null;
    this.state.diff = 0;
    this.render();
    this.stopInterval();
};

Timer.prototype.pause = function () {
    this.state.diff = this.getCurrentTimeDiff();
    this.state.start = null;
    this.stopInterval();
    this.render();
};

Timer.prototype.getCurrentTimeDiff = function () {
    if (this.state.start === null) {
        return this.state.diff;
    }

    return this.state.diff + Date.now() - this.state.start;
};

Timer.prototype.getCurrentValue = function () {
    const diff = Math.round(this.getCurrentTimeDiff() / 1000);
    const ss = diff % 60;
    const mm = Math.floor(diff / 60);

    return `${this.toTimeDigits(mm)}:${this.toTimeDigits(ss)}`;
};

Timer.prototype.toTimeDigits = function (num) {
    return num.toString().padStart(2, '0');
};

Timer.prototype.render = function () {
    this.elements.value.innerText = this.getCurrentValue();

    if (this.props.draggable) {
        this.props.rootEl.style.top = `${this.state.top}px`;
        this.props.rootEl.style.left = `${this.state.left}px`;
    }
};

const timers = [
    new Timer({
        rootEl: document.querySelector('.firstTimer'),
        draggable: true,
    }),

    new Timer({
        rootEl: document.querySelector('.secondTimer')
    }),

    new Timer({
        rootEl: document.querySelector('.thirdTimer')
    }),
];

const containers = Array.from(document.querySelectorAll('.container'));

containers.forEach(function (container) {
    container.addEventListener('dragover', onDragOver);
    container.addEventListener('dragenter', onEvent);
    container.addEventListener('dragleave', onEvent);
    container.addEventListener('drop', onDrop);
});

function onDrop() {
    const draggedTimer = timers.find(t => t.dragged);

    if (draggedTimer) {
        this.append(draggedTimer.props.rootEl);
    }

    containers.forEach(c => {
        c.classList.remove('dragover');
        c.dataset.enters = 0;
    });
}

function onEvent(e) {
    if (e.type === 'dragenter') {
        console.log('dragenter');
        if (this.dataset.enters) {
            this.dataset.enters = parseInt(this.dataset.enters) + 1;
        } else {
            this.dataset.enters = 1;
        }

        if (parseInt(this.dataset.enters) > 0) {
            this.classList.add('dragover');
        }
    }

    if (e.type === 'dragleave') {
        console.log('dragleave');
        if (this.dataset.enters) {
            this.dataset.enters = parseInt(this.dataset.enters) - 1;
        } else {
            this.dataset.enters = 0;
        }

        if (parseInt(this.dataset.enters) <= 0) {
            this.classList.remove('dragover');
        }
    }
}

function onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
}

function throtle(callback, time) {
    let lastCall = 0;
    let lastTimeout = null;

    return function() {
        const currentTime = Date.now();

        if (lastCall + time < currentTime) {
            lastCall = currentTime;

            return callback.apply(this, arguments);
        } else {
            if (lastTimeout) {
                clearTimeout(lastTimeout);
            }

            lastTimeout = setTimeout(() => callback.apply(this, arguments), time);
        }
    };
}
