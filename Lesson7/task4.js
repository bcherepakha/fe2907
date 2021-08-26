/**
 * Дан обьект с баллами за задание
*/
const grade = {
    Anton: getRandomBall(0, 90),
    Maksym: 90,
    Vladyslav: getRandomBall(),
    Oleksii: getRandomBall(40),
    Vadim: getRandomBall(40, 70),
    Andrey: getRandomBall(15, 80)
};

function getRandomBall(min = 0, max = 100) {
    return Math.round( min + Math.random() * (max - min) );
}

console.log(grade);

/** Требуется:
 1. Указать имя учащегося с максимальным количеством баллов
 2. Указать максимальный балл.
 3. Указать средний балл.
 4. Указать учащегося с баллом ближайшим к среднему.
 5. Перечислить учащихся с баллом ниже среднего.
 6. Перечислить учащихся занявших первые три места в порядке убывания рейтинга.
*/

function getLeader(grade) {
    // let leaderMax = -Infinity;
    // let leaderName = '';

    // for (const userName in grade) {
    //     if (grade[userName] > leaderMax) {
    //         leaderMax = grade[userName];
    //         leaderName = userName;
    //     }
    // }

    // return leaderName;

    // array of Names
    return Object.keys(grade)
        .reduce(
            function (leaderName, userName) {
                //? !'' => !false => true
                //? !'Maksym' => !true => false
                if (!leaderName || grade[userName] >  grade[leaderName]) {
                    return userName;
                }

                return leaderName;
            },
            ''
        );
}

console.log( getLeader(grade) );

function getCurrentMax(grade) {
    return Math.max(...Object.values(grade));
}

console.log( getCurrentMax(grade) );

function getCurrentAverage(grade) {
    const values = Object.values(grade);

    return values
        .reduce(
            function (sum, el) { return sum + el; },
            0
        ) / values.length;
}

console.log( getCurrentAverage(grade) );
