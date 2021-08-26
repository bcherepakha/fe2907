// В ваш подъезд вьехали новые жильцы, которые привезли с собой тараканов.
// Насекомые в поисках еды ползут по вентиляционной шахте.
// За час они поднимаются на 1м, но сразу после этого теряют равновесие и скатываются вниз на 0.5м
// Вопрос: сколько времени у вас есть на покупку ловушек для тараканов, если расстояние от вас до соседей 5м.

// (*) Напишите функцию, которая будет решать эту задачу в общем виде, для любых (speed, slowdown, mine),
// где mine - это высота шахты, speed - скорость таракана за час, slowdown - расстояние падения из-за усталости
function time4cockroach(mine, speed, slowdown) {
    let t = 0;
    let height = 0;

    do {
        t++;
        height += speed;

        // console.log('before down', { t, height });

        if (height < mine) {
            height -= slowdown;
        }

        // console.log('after down', { t, height });
    } while (height < mine);

    if (height > mine) {
        t -= (height-mine)/speed;
    }

    // console.log({ mine, speed, slowdown, height, t });

    return t;
}

console.log( time4cockroach(3, 1, .5) ); //? 5
console.log( time4cockroach(3.1, 1, .5) ); //? 5.6
console.log( time4cockroach(.3, 1, .5) ); //? .3
