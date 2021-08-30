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
