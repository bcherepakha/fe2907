function hello(a, b, c) {
    // this, arguments
    console.log(this);
    console.log({ a, b, c});
    console.log(arguments);
}

hello(1, 2, 3); //? this - undefined | global (window)

const a = {
    name: 'a'
};

a.hello = hello;

a.hello(3, 2, 1); //? this = a;

const b = {
    name: 'b',
    hello
};

a.b = b;

a.b.hello(2, 3, 1); //? this = a.b = b

hello.call('hello world!', 1, true, null); //? this = 'hello world!'
hello.apply('context', ['p1', 'p2', 'p3']); //? this = 'context'

const hello2 = hello.bind('binded context', 'a', 'b');

hello2('c'); //? this = 'binded context'
a.hello2 = hello2;

a.hello2(); //? this = 'binded context'

const hello3 = a.hello;

hello3(); //? this = undefined | global (window)

function call(calback) {
    calback(); //? this = undefined | global (window)
}

call(a.hello); // LE = { calback: hello }

const sliderPrototype = {
    slidesLength: 200,
    nextSlide,
    prevSlide,
    __proto__: Object.prototype
};

const slider1 = {
    name: 'slider1',
    curentSlide: 8,
    slides: [],
    __proto__: sliderPrototype
};

const slider2 = {
    name: 'slider2',
    curentSlide: 4,
    slides: [],
    __proto__: sliderPrototype
};

function nextSlide() {
    this.curentSlide++;
}

function prevSlide() {
    this.curentSlide--;
}

slider1.nextSlide(); //? this = slider1
slider2.prevSlide(); //? this = slider2

const slidesLength = slider1.slidesLength; // 200

slider1.slidesLength = 15;

console.log( slider2.slidesLength ); //? 200

function createSlider(selector) {
    //? this = {}
    //? this.__proto__ = createSlider.prototype

    this.curentSlide = 0;
    this.selector = selector;

    //? return this;
}

//? createSlider.prototype = { constructor: createSlider }
createSlider.prototype.nextSlide = nextSlide;
createSlider.prototype.prevSlide = prevSlide;

const slider3 = new createSlider('.slider.fade');
const slider4 = new createSlider('.slider.slide');

createSlider.prototype.slidesLength = 100;

createSlider.prototype = sliderPrototype;

const slider5 = new createSlider('.slider.fade');
const slider6 = new createSlider('.slider.slide');

slider3.prevSlide(); //? this = slider3
slider4.nextSlide(); //? this = slider4

if (!Array.prototype.map) {
    Array.prototype.map = function () {};
}

function bind(context, ...args1) {
    const fn = this;

    return function bindedFn(...args2) {
        return fn.apply(context, [...args1, ...args2]);
    };
}
