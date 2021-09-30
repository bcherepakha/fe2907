const figure = document.querySelector('.figure');

function moveFigure(figure, shiftX, shiftY) {
    return new Promise(function (resolve, reject) {
        figure.addEventListener('transitionend', resolve, {
            once: true
        });
        setTimeout(reject, 5000);

        let currentTransform = figure.style.transform;

        if (shiftX) {
            console.log('moveX', shiftX);
            currentTransform += ` translateX(${shiftX}px)`;
        }

        if (shiftY) {
            console.log('moveY', shiftY);
            currentTransform += ` translateY(${shiftY}px)`;
        }

        console.log({ currentTransform });

        figure.style.transform = currentTransform;
    });
}

moveFigure(figure, 200, 0)
    .then(() => moveFigure(figure, 'hello', 200))
    .then(() => moveFigure(figure, -200, 0), () => {
        console.log('error 2');

        return Promise.reject(8);
    })
    .then(() => moveFigure(figure, 0, -200))
    .catch((value) => console.log('error', value));
