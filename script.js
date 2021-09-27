const getListFilms = document.querySelector('#listFilms');
console.log(getListFilms);
const radioButtonAllmovies = document.querySelector('#alle-films-button');
radioButtonAllmovies.checked = true;

const addMoviesToDOM = (films) => {
    const movieArray = films.map(film => {
        let listItem = document.createElement('li');
        let listLink = document.createElement('a');
        let listImage = document.createElement('img');
        listLink.href = `https://www.imdb.com/title/${film.imdbID}/`;
        listImage.src = film.Poster;
        listLink.appendChild(listImage);
        listItem.appendChild(listLink);        
        return listItem;
    })
    console.log(movieArray);
    movieArray.forEach(item => {
        getListFilms.appendChild(item);
    })
}

addMoviesToDOM(movies);

const searchField = document.querySelector('#search-films');

const removeListItems = () => {
    let getListItems = document.querySelectorAll('#listFilms li');
    Array.from(getListItems).forEach(item => {
        item.parentElement.removeChild(item)       
    })
}

const getAllMovies = () => {
    removeListItems();
    addMoviesToDOM(movies);
}

const getMovies2014 = () => {
    let movies2014 = [];
    movies.forEach(film => {
        if (film.Year >= 2014) {
            movies2014.push(film)
        } else {
            console.log('Before 2014');
        }        
    })
    console.log(movies2014);
    removeListItems();
    addMoviesToDOM(movies2014);
}

const getMoviesByTitle = partOfTitle => {
    let moviesByTitle = [];
    movies.forEach(film => {
        if (film.Title.includes(partOfTitle) === true) {
            moviesByTitle.push(film);
        } else {
            console.log('Deze titel hoort er niet bij');
        }
    })
    console.log(moviesByTitle);
    removeListItems();
    addMoviesToDOM(moviesByTitle);
}

const getMoviesBySearch = () => {
    let searchValue = searchField.value;
    console.log(searchValue);
    let moviesBySearch = [];
    movies.forEach(film => {
        if (film.Title.toLowerCase().includes(searchValue.toLowerCase()) === true | 
            film.Year.includes(searchValue) === true | 
            film.imdbID.toLowerCase().includes(searchValue.toLowerCase()) === true) {
            moviesBySearch.push(film);
        } else {
            console.log('Deze titel hoort er niet bij');
        }
    })
    console.log(moviesBySearch);
    removeListItems();
    addMoviesToDOM(moviesBySearch);
}

searchField.addEventListener('search', getMoviesBySearch);

const addEventListeners = () => {
    const radioButtons = document.querySelectorAll('.radio-button-list__item');
    console.log(radioButtons);
    const handleOnChangeEvent = event => {
        let changeEvent = event.target.value;
        console.log(changeEvent);
        switch (changeEvent){
            case '2014':
                getMovies2014();
                break;
            case 'alleFilms':
                getAllMovies();
                break;
            default:
                getMoviesByTitle(changeEvent);
                break;            
        }
    }
    Array.from(radioButtons).forEach(item => {
        item.addEventListener('change', handleOnChangeEvent);
    })
} 
addEventListeners();
