/* eslint-disable no-unused-vars */
//? 1. Вывести в консоль числа от 1 до n, где n - это произвольное целое число большее 1.
//? 2. Вывести в консоль простые числа от 1 до n.
// 3. Вывести в консоль числа кратные k, в диапазоне от 1 до n. => in home (for)
//? 4. В первых трех задачах добавить пользователю возможность ввести значения переменных. => in home
// 5. Выводить в консоль простые числа от 1 до n до тех пор, пока пользователь не скажет хватить.

function consoleNdigit(n) {
    for (let i = 1; i <= n; i = i + 1) {
        console.log(i);
    }
}

// consoleNdigit(10);
// consoleNdigit(15);
// consoleNdigit(20);

function isSimple(n) {
    if (n <= 3) {
        return true;
    }

    // d = 2 ... n - 1
    // n % d === 0
    for (let d = 2; d < n; d+=1) {
        if (n % d === 0) {
            return false;
        }
    }

    return true;
}

// console.log( isSimple(1) === true );
// console.log( isSimple(2) === true );
// console.log( isSimple(3) === true );
// console.log( isSimple(4) === false );
// console.log( isSimple(5) === true );
// console.log( isSimple(6) === false );

function consoleNSimpledigit(n) {
    for (let i = 1; i <= n; i = i + 1) {
        if (isSimple(i)) {
            console.log(i);
        }
    }
}

// consoleNSimpledigit(100);

function consoleNKdigit(n, k) {
}

consoleNKdigit(10, 2); // 2, 4, 6, 8, 10
consoleNKdigit(10, 3); // 3, 6, 9
