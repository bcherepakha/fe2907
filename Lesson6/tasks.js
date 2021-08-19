'use strict';
// 1. Проверить является ли число круглым
// 2. Получить у пользователя два числа и узнать остаток от деления первого на второе
// 3. Получить у пользователя строку и узнать ее длину
// 4. Получить у пользователя два числа и назвать наибольшее
// 5. Получить у пользователя число и сказать входит ли оно в диаппазон от 30 до 50
// 6. Для доступа на сайт нужно ввести логин и пароль.
//    На сайте зарегистрировано четыре пользователя с паролями.
//    Получите у пользователя логин и пароль и скажите имеет ли он доступ на сайт

function isRound(a) {
    return a % 10 === 0;
}

console.log( isRound );
console.log( isRound(10) );
console.log( isRound(12) );

function mod(a, b) {
    return a % b;
}

console.log( mod(6, 4) );

function getStrLength(s) {
    return s.length;
}

console.log( getStrLength('hello') );

function getMax(a, b) {
    if (a > b) {
        // true
        return a;
    } else {
        // false
        return b;
    }
}

console.log( getMax(10, 12) );
console.log( getMax(10, 8) );
console.log( getMax(10, 10.0) );

//? && (AND, boolean *)
//? true && true === true
//? true && false === false
//? false && true === false
//? false && false === false

//? || (OR, boolean +)
//? true || true === true
//? true || false === true
//? false || true === true
//? false || false === false

function isBetween(value, startRange, endRange) {
    // const startRange = Math.min(firstRangeBorder, secondRangeBorder);
    // const endRange = Math.max(firstRangeBorder, secondRangeBorder);

    // return value >= startRange && value <= endRange;

    //? >=  11
    //? &&  6
    //? ||  5
    console.log('start calc');

    return value >= startRange && value <= endRange
        || value >= endRange && value <= startRange;

    // return moreOrEqual(value, startRange) && moreOrEqual(value, endRange)
    //     || moreOrEqual(value, endRange) && moreOrEqual(value, startRange);
}

// function moreOrEqual(a, b) {
//     console.log('moreOrEqual', a, b);

//     return a >= b;
// }

console.log(isBetween(10, 5, 15));
console.log(isBetween(2, 5, 15));
console.log(isBetween(18, 5, 15));

//? 0 или NaN ==> false
//? не (0 или NaN) ==> true
//? '' ==> false
//? не '' ===> true
console.log( 5 && '' ); // ''
console.log( isBetween(-10, -5, -15) );
console.log( isBetween(-10, -15, -5) ); //? true
