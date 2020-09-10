//Variables
const form = document.querySelector('#formulario');
const listTweets = document.querySelector('#listado')
const contentError = document.querySelector('#messages');
let tweets = [];

//Eventos
eventListeners();

function eventListeners() {
    form.addEventListener('submit', addTweet);

    //Cuando carga el DOM
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('Tweets')) || [];
        displayTweets();
    });
};

//Funciones
function addTweet(event) {
    event.preventDefault();

    //Acceder al textarea del formulario para almacenar lo que escriban en el 
    const tweet = document.querySelector('#tweet').value;

    //Validación mensaje de error
    if (tweet === "" || tweet === " ") {
        displayError('Error!! No hay ningún tweet para almacenar')
        return
    };

    //Crear un objeto para almacenar el tweet con un id con la funcion Date.now que hace referencia a la fecha en milisegundos en que se invoca
    const tweetObj = {
        id: Date.now(),
        tweet
    };

    //Añadir los tweets a un array
    tweets = [...tweets, tweetObj];

    //Mostrar los tweets en la pestaña mis tweets

    displayTweets();

    //Limpiar formulario
    form.reset();
};

function displayError(error) {
    let existError = contentError.hasChildNodes();

    if (!existError) {
        const msg = document.createElement('p');
        msg.textContent = error;
        msg.classList.add('alert');
        msg.classList.add('alert-danger');

        contentError.appendChild(msg);

        //Remover el error con setTimeOut

        setTimeout(() => {
            msg.remove()
        }, 3000);
    };
};

function displayTweets() {
    cleanList();

    if (tweets.length > 0) {
        tweets.forEach(tweetObj => {
            //Crear un boton para eliminación
            const btnDelete = document.createElement('i');
            btnDelete.classList.add('fa');
            btnDelete.classList.add('fa-times');
            btnDelete.classList.add('btn_delete');

            //Crear funcionalidad para eliminar tweet
            btnDelete.onclick = () => {
                deleteTweet(tweetObj.id);
            };

            const li = document.createElement('li');
            li.innerHTML = tweetObj.tweet;
            li.appendChild(btnDelete);
            listTweets.appendChild(li);
        });
    };

    syncStorage();
};

function syncStorage() {
    localStorage.setItem('Tweets', JSON.stringify(tweets));
};

function cleanList() {
    while (listTweets.firstChild) {
        listTweets.removeChild(listTweets.firstChild);
    }
};

function deleteTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    displayTweets();
};