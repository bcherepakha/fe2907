console.log('tasks');

const a = 12.2;
const b = 13.1;

console.log( typeof a );
console.log( parseFloat((a + b).toFixed(5)) );
console.log( a - b );
console.log( a * b );
console.log( a / b );
console.log( a % b );
console.log( Math.pow(a, b) );

const s = 'str\'ing\\';
// eslint-disable-next-line quotes
const s1 = "some";

console.log( s1 + ' ' + s, typeof s );
console.log( `${s1} ${s} is template`);
console.log( '12' );

const b1 = true;
const b2 = false;

console.log( b1, typeof b1);
console.log( b2, typeof b2);

const empty = null;

console.log( typeof empty ); // object

let t;  // undefined

console.log( typeof t );

const bigInt = 123456789123456789123456789n;

console.log(bigInt + '');
console.log(bigInt / 10n);

console.log( '12' + 8  );
console.log(  8 + '12' );

function show(a) {
    console.log(a);
}

show(5);
show(8);
