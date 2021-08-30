const currentDate = new Date(2021,7, 30, 5, 5, 5, 100);

console.dir( currentDate );

currentDate.setDate( 40 );

console.dir( currentDate );

console.dir( document );
console.dir( document.children[0] );
console.dir( document.querySelector('.cross') );
console.dir( document.querySelector('.cross__board-item') );
console.dir( document.querySelectorAll('.cross__board-item') );
console.dir( Array.from( document.querySelectorAll('.cross__board-item') )  );

const p1 = document.createElement('p');

p1.innerHTML = 'Hello! I am p1';
p1.className = 'hello one-more';

p1.classList.add('time');
p1.classList.remove('one-more');
p1.classList.toggle('time');

p1.style.color = 'red';
p1.style.marginRight = '20px';

p1.setAttribute('data-style', 'hello: world;');

console.log('dataset', p1.dataset );

p1.dataset.s = 'margin';
p1.dataset.mR = 'true';

console.log( p1.style );

console.log( p1.classList.contains('hello') );

console.log( p1.classList );

console.dir( p1 );
console.log( p1 );

document.body.append( p1 );
