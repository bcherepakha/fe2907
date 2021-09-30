const btn = document.querySelector('.send');

btn.addEventListener('click', () => {

    fetch('https://5d9969125641430014051850.mockapi.io/tasks')
        .then(
            (response) => {
                console.log(response);

                return response.json();
            },
            (error) => {
                console.log({ error });

                return undefined;
            })
        .then((text) => {
            console.log(text);
            // console.log(JSON.parse(text));
        }, (error) => {
            console.log({ error });

            // return Promise.reject('hello');
        });
});
