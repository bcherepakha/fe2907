/**
 * Напишите код, выполнив задание из каждого пункта отдельной строкой:

    1.  Создайте пустой объект user.
    2.  Добавьте свойство name со значением Alexander.
    3.  Добавьте свойство group со значением fe2907
    4.  Измените значение свойства name на Ilya.
    5.  Удалите свойство name из объекта.
    6.  Создайте копию обьекта user.
    7.  Проверьте, что созданный обьект не пустой.
    8.  Узнайте количество свойств в нем.
    9.  Измените в копии свойство name на Ivan.
    10. Сравните свойства этих двух обьектов и придумайте структуру данных для отображения их разницы.
*/

const user = {
    name: 'Alexander'
};

user.group = 'fe2907';

console.log( user );

user['name'] = 'Ilya';

console.log( user );

delete user['name'];

console.log( user );

const user2 = cloneObj(user);

console.log( user2 );
console.log( objLength(user2) );

user2.name = 'Ivan';

console.log( user );
console.log( user2 );
console.log( objLength(user2) );

console.log( objDiff(user, user2) );
console.log( objDiff(user2, user) );

function objDiff(obj1, obj2) {
    for (const key in obj1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    for (const key in obj2) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}

function cloneObj(obj) {
    const result = {};

    for (const key in obj) {
        result[key] = obj[key];
    }

    return result;
}

function objLength(obj) {
    let currentLength = 0;

    for (const key in obj) {
        currentLength++;
    }

    return currentLength;
}

const isExist = 'name' in user2;
