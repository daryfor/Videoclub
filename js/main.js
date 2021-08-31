//FUNCION QUE GENERA EL HTML DINAMICO
let getMovieHtml = movie => {
    return `<div class="movie">
        <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" onclick ="getMovieDetailed(${movie.id})" alt="Imagen de la pelicula">
        <h4>${movie.title}</h4>
    </div>
    `
}

//FUNCION QUE GENERA EL HTML DINAMICO CON DETALLES DE LA PELICULA
let getMovieDetailedHtml = movie => {
    return `
        <div class="movieImage">
        <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" onclick ="getMovieDetailed(${movie.id})" alt="Imagen de la pelicula"></div>
        <div class="movieTitle"><h4>${movie.title}</h4></div>
        </br>
        <div class="details">
            <span><b>Título original:</b> ${movie.original_title}</span></br>
            <span><b>Idioma original:</b> ${movie.original_language}</span></br>
            <span><b>Popularidad:</b> ${movie.popularity}</span>
            <p><b>Descripcion:</b></br>${movie.overview}</p>
        </div>
    `
}

//FUNCION QUE RENDERIZA EL ARRAY DE PELICULAS
let renderMovies = movies => {
    document.querySelector('.peliculas').innerHTML = '';
    for(let movie of movies) {
        document.querySelector('.peliculas').innerHTML += getMovieHtml(movie);
    }
}

//FUNCION QUE DEVOLVERÁ EL ARRAY DE PELICULAS POPULARES
let getPopularMovies = () => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=9b87173a0264738f1aca5ecf47c73157&language=es-ES')
    .then(res=>res.json())
    .then(res=> {
        const pelis = res.results;
        renderMovies(pelis);
    })
    .catch(error=>console.error(error))
}

//FUNCION QUE DEVOLVERA EL ARRAY DE PELICULAS QUE LLEGARAN PROXIMAMENTE
let getUpcomingMovies = async() => {
    try {
        let res = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=9b87173a0264738f1aca5ecf47c73157&language=es-ES');
        let peliculas = res.data.results;
        renderMovies(peliculas);
    } catch (error) {
        console.error(error);
    }
}

//FUNCION QUE VA A DEVOLVER LOS DETALLES DE LA PELICULA
let getMovieDetailed = movie_id => {
    axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=9b87173a0264738f1aca5ecf47c73157&language=es-ES`)
    .then(res=> {
        let movie = res.data;
        //getMovieDetailedHtml(movie);
        document.querySelector('.peliculas').innerHTML = getMovieDetailedHtml(movie);
    })
    .catch(console.error)
}