function sum() {
    return this.a + this.b;
}

const obj = {
    a: 2,
    b: 5,
    sum
};

console.log( obj.sum() ); //? 7

const obj1 = {
    a: 3,
    b: 2,
    sum
};

console.log( obj1.sum() ); // 5

console.log( sum.call({ a: 2, b: 12 }) ); //? 14
console.log( sum.apply({ a: 3, b: 10 }) ); //? 13
console.log( obj.sum.call({ a: 12, b: 12 })); //? 24

const double = sum.bind({ a: 1, b: 1});

console.log( double() ); //? 2

obj.double = double;

console.log( obj.double() ); //? 2

const three = double.bind({ a: 1, b: 2});

console.log( three() ); //? 2
