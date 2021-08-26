//?             0         1         2          3
const arr = ['apple', 'orange', 'banana', 'penapple'];

console.log( arr[2] ); //? banana
console.log( arr.length ); //? 4

// arr[arr.length] = 'cocoa';
arr.push('cocoa');

console.log( arr );

arr[1] = 'meat';

console.log( arr );

arr[900] = 'fish';

console.log( arr.length );
console.log( arr );

arr.length = 5;

console.log( arr );
