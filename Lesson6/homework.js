// Transportation on vacation
//? 1 day = $40
//? > 7 day -= $50
//? > 3 day -= $20

function rentalCarCost(d) {
    let totalPrice = d * 40;

    if (d >= 7) {
        return totalPrice - 50;
    }

    if (d >= 3) {
        return totalPrice - 20;
    }

    return totalPrice;
}

function lovefunc(flower1, flower2){
    // return (flower1 % 2 + flower2 % 2) === 1;
    function isEven(d) {
        return d % 2 === 0;
    }

    return isEven(flower1) && !isEven(flower2)
        || !isEven(flower1) && isEven(flower2);
}

console.log(lovefunc(1,4) === true);
console.log(lovefunc(2,2) === false);
console.log(lovefunc(0,1) === true);
console.log(lovefunc(0,0) === false);
