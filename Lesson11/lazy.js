function make_lazy(fn, ...args) {
    const startSymbol = Symbol('lazy initial value');
    let result = startSymbol;

    return function() {
        if (result === startSymbol) {
            result = fn.apply(this, args);
        }

        return result;
    };
}

function add(a, b) {
    console.log('add', a, b);
    return a + b;
}

function mult(a, b, c) {
    console.log('mult', a, b);
    return a * b * c;
}

console.log('create lazy');

const lazy_add = make_lazy(add, 2, 3); // LE = { result }
const lazy_mult = make_lazy(mult, 1, 2, 3);

console.log('execute lazy');

console.log( lazy_add() ); //? 5
console.log( lazy_mult() ); //? 6

console.log( lazy_add() ); //? 5
console.log( lazy_mult() ); //? 6

console.log( lazy_add() ); //? 5
console.log( lazy_mult() ); //? 6

console.log( lazy_add() ); //? 5
console.log( lazy_mult() ); //? 6
