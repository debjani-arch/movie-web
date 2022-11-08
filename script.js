const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
const upcomming = 'https://api.themoviedb.org/3/movie/upcoming?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US&page=1'

const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c'
const image_path = `https://image.tmdb.org/t/p/w1280`

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const prev = document.getElementById('prev')
const current = document.getElementById('current')
const next = document.getElementById('next')

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lasturl = '';
var totalPages = 100;

// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    lasturl = url;
    const res = await fetch(url)
    const data = await res.json()
    currentPage = data.page;
    nextPage = currentPage + 1;
    prevPage = currentPage - 1;
    totalPages = data.total_pages;

    current.innerHTML = currentPage;

    if (currentPage <= 1) {
        prev.classList.add('disabled');
        next.classList.remove('disabled');
    } else if (currentPage >= totalPages) {
        prev.classList.remove('disabled');
        next.classList.add('disabled');
    } else {
        prev.classList.remove('disabled');
        next.classList.remove('disabled');
    }

    main.scrollIntoView({ behavior: 'smooth' });

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { id, title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
            <h3>Overview</h3>
            ${overview}
            <br>
            <button class="moreDetails" id="${id}">
            Details
            </button>
           </div>
           `
        // document.getElementById(id), addEventListener('click', () => {
        //     openNav()
        // })
        main.appendChild(movieEl)
    })

}

function openNav() {
    document.getElementById("myNav").style.width = "100%";
}


function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

//----------------Rating section-----------------
function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}
//----------------Rating section ends---------------

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})

prev.addEventListener('click', () => {
    if (prevPage > 0) {
        pageCall(prevPage);
    }
})

next.addEventListener('click', () => {
    if (nextPage <= totalPages) {
        pageCall(nextPage);
    }
})

function pageCall(page) {
    let urlSplit = lasturl.split('?');
    let querryParams = urlSplit[1].split('&');
    let key = querryParams[querryParams.length - 1].split('=');
    if (key[0] != 'page') {
        let url = lasturl + '&page=' + page
        getMovies(url);
    } else {
        key[1] = page.toString();
        let a = key.join('=');
        querryParams[querryParams.length - 1] = a;
        let b = querryParams.join('&');
        let url = urlSplit[0] + '?' + b;
        getMovies(url);
    }
}
const videoCards = [...document.querySelectorAll(`.video-card`)];

videoCards.forEach((item) => {
  item.addEventListener("mouseover", () => {
    let video = item.children[1];
    video.play();
  });
  item.addEventListener("mouselrave", () => {
    let video = item.children[1];
    video.pause();
  });
});