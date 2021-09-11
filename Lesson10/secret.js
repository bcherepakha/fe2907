'use strict';

function createSecretHolder(secret) {
    const secretHolder = {
        a: 1,
        b: 2,
    };

    Object.defineProperty(secretHolder, 'secret', {
        configurable: true,
        enumerable: false,

        // value: secret,
        // writable: false,

        get() {
            return this.a + this.b;
        },
        set(newValue) {
            this.a = newValue - this.b;
        }
    });

    for (const key in secretHolder) {
        console.log(key);
    }

    console.log( secretHolder );
    console.log( Object.keys(secretHolder) );
    console.log( Object.values(secretHolder) );
    console.log( Object.entries(secretHolder) );
    console.log('in', 'secret' in secretHolder );

    return secretHolder;
}

const obj = createSecretHolder(5); //? LE = { secret: 5, anonymObj: { getSecret: f, setSecret: f } }

console.log( obj.secret ); //? # returns 5
obj.secret = 2; //? undefined
console.log( obj.secret ); //? # returns 2
