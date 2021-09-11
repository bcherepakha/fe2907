//? LE0 = { createShooters, shoters: [...] }
function createShooters(n) {
    const shooters = [];

    for (let i=0; i < n; i++) {
        shooters.push(
            function shooter() {
                return i;
            }
        );
    }

    return shooters;
}

// ? LE1 = { n: 10, shooters: [sh0, sh1] }
// ? LEC0 = { i: 0, shooter }
// ? LEC1 = { i: 1, shooter }
const shoters = createShooters(10);

console.log( 'shoters[8]', shoters[8]() ); // 10 sh8: LE2 = { }
