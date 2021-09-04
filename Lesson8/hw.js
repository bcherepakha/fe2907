function getMissingElement(superImportantArray) {
    const sum = superImportantArray.reduce(
        function reducer(sum, el) {
            return sum + el;
        },
        0
    );

    return 45 - sum;
}

console.log( getMissingElement( [0,5,1,3,2,9,7,6,4] ) ); // 8
console.log( getMissingElement( [9,2,4,5,7,0,8,6,1] ) ); // 3

function isValidWalk(walk) {
    if (walk.length !== 10) {
        return false;
    }

    const shift = walk.reduce(
        function reducer(currentShift, direction) {
            switch (direction) {
            case 'n':
                currentShift.vertical++;
                break;
            case 'w':
                currentShift.horizontal++;
                break;
            case 's':
                currentShift.vertical--;
                break;
            default:
                currentShift.horizontal--;
                break;
            }

            return currentShift;
        },
        {
            horizontal: 0,
            vertical: 0
        }
    );



    return shift.vertical === 0 && shift.horizontal === 0;
}

//some test cases for you...
console.log( isValidWalk(['n','s','n','s','n','s','n','s','n','s']) === true );
console.log( isValidWalk(['w','e','w','e','w','e','w','e','w','e','w','e']) === false );
console.log( isValidWalk(['w']) === false );
console.log( isValidWalk(['n','n','n','s','n','s','n','s','n','s']) === false );

function getVillainName(birthday) {
    const month = birthday.getMonth(); //? 0 ... 11
    const MONTHES = [
        'The Evil',
        'The Vile',
        'The Cruel',
        'The Trashy',
        'The Despicable',
        'The Embarrassing',
        'The Disreputable',
        'The Atrocious',
        'The Twirling',
        'The Orange',
        'The Terrifying',
        'The Awkward',
    ];
    //? const daysDigits = month.getDate().toString().split('');
    //? const lastDigit = daysDigits[daysDigits.length - 1];
    const lastDigit = birthday.getDate() % 10;
    const DAYNAMES = [
        'Mustache',
        'Pickle',
        'Hood Ornament',
        'Raisin',
        'Recycling Bin',
        'Potato',
        'Tomato',
        'House Cat',
        'Teaspoon',
        'Laundry Basket',
    ];

    return `${MONTHES[month]} ${DAYNAMES[lastDigit]}`;
}

console.log( getVillainName(new Date('November 18')) === 'The Terrifying Teaspoon');
