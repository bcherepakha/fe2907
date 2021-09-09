function Slider(selector, loop = false, effect = 'fade') {
    // this = {}
    // this.__proto__ = Slider.prototype

    this.rootEl = document.querySelector(selector);
    this.props = {
        loop,
        selector,
        effect
    };

    this.rootEl.classList.add(effect);

    this.bodyEl = this.rootEl.querySelector('.slider__body');

    this.currentSlideIndex = 0;
    this.slides = Array.from(this.rootEl.querySelectorAll('.slider__slide'));

    this.rootEl.addEventListener('dragstart', e => e.preventDefault());

    this.prevBtn = this.rootEl.querySelector('.slider__prev');

    if (this.prevBtn) {
        this.prevBtn.addEventListener('click', this.prevSlide.bind(this));
    }

    this.nextBtn = this.rootEl.querySelector('.slider__next');

    if (this.nextBtn) {
        this.nextBtn.addEventListener('click', this.nextSlide.bind(this));
    }

    this._layerX = null;

    this.bodyEl.addEventListener('mouseup', this.mouseUp.bind(this));
    this.bodyEl.addEventListener('mousedown', this.mouseDown.bind(this));

    // return this;
}

Slider.prototype.mouseDown = function (e) {
    this._layerX = e.layerX;
};

Slider.prototype.mouseUp = function (e) {
    if (this._layerX) {
        const diff = e.layerX - this._layerX;

        if (diff > 0) {
            this.nextSlide();
        } else if (diff < 0) {
            this.prevSlide();
        }

        this._layerX = null;
    }
};

Slider.prototype.nextSlide = function () {
    if (this.props.loop) {
        this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
    } else {
        this.currentSlideIndex = Math.min(this.currentSlideIndex + 1, this.slides.length - 1);
    }

    this.render();
};

Slider.prototype.prevSlide = function () {
    if (this.props.loop) {
        this.currentSlideIndex = (this.slides.length + this.currentSlideIndex - 1) % this.slides.length;
    } else {
        this.currentSlideIndex = Math.max(0, this.currentSlideIndex - 1);
    }

    this.render();
};

Slider.prototype.renderFade = function () {
    const currentSlide = this.rootEl.querySelector('.slider__current');

    if (currentSlide) {
        currentSlide.classList.remove('slider__current');
    }

    const newSlide = this.slides[this.currentSlideIndex];

    if (newSlide) {
        newSlide.classList.add('slider__current');
    }
};

Slider.prototype.renderSlide = function () {
    this.bodyEl.style.transform = `translateX(${-this.currentSlideIndex*100}%)`;
};

Slider.prototype.render = function () {
    switch (this.props.effect) {
    case 'slide':
        return this.renderSlide();
    default:
        return this.renderFade();
    }
};

const slider1 = new Slider('.slider.fade', true, 'fade');
const slider2 = new Slider('.slider.slide', false, 'slide');

console.log({ slider1, slider2 });

slider1.nextSlide(); // this = slider1;
