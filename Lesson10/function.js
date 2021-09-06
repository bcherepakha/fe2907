//? GLE: { makeCounter: f, counter1: LE1.counter, counter2: LE2.counter }
const counter1 = makeCounter(); //? LE1 = { count: 2, counter: f, counter.reset }
const counter2 = makeCounter(); //? LE2 = { count: 0, counter: f, counter.reset }

console.log( 'counter1', counter1() );
console.log( 'counter1', counter1() );
console.log( 'counter1', counter1() );

counter1.reset();

console.log( 'counter1', counter1() );
console.log( 'counter1', counter1() );

console.log( 'counter2', counter2() );

function makeCounter() {
    let count = 0;

    function counter() {
        count++;

        return count;
    }

    counter.reset = function () {
        count = 0;
    };

    counter.setValue = function (value) {
        count = value;
    };

    counter.getValue = function () {
        return count;
    };

    return counter;
}
