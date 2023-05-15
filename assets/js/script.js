const id = "500";
const API_LINK = `https://api.themoviedb.org/3`;
const IMG_LINK =  `https://image.tmdb.org/t/p/w185/`;
const IMG_BACK_LINK = "https://image.tmdb.org/t/p/original/"
const SEARCH_INPUT = document.getElementById("search-movie-input");
const SEARCH_MOVIE_LIST = document.getElementById("search-movie-list");
const MOVIE_SELECTED = document.getElementById("movie-selected")

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWRiODJiNDkyNzZlYTA5NmRhMzA4NDZmODA0OTc2MiIsInN1YiI6IjY0NTY3MmM3MWI3MGFlMDBlMmFhODI1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QZPhamiPtpoHFHzr93lDab3DL8hQSp8YPOW8PpKSArQ'
  }
};

function findMovies() {
  let inputValue = SEARCH_INPUT.value;

  if(inputValue.length > 0) {
    console.log("input value:", inputValue)
    SEARCH_INPUT.classList.add("input-list");
    SEARCH_MOVIE_LIST.classList.remove("hide-movie-list");
    loadMovies(inputValue);
  } else {
    SEARCH_INPUT.classList.remove("input-list");
    SEARCH_MOVIE_LIST.classList.add("hide-movie-list");
  }

}

function loadMovies(title) {
  
  fetch(`${API_LINK}/search//movie?query=${title}&include_adult=false&language=en-US&page=1`, options)
  .then(response => response.json())
  .then(response => {
    displayMovieList(response.results);
    console.log("loadMovies",response.results)
  })
  .catch(err => console.error(err));
}

function displayMovieList(data){
  console.log("dataaaaaaa", data)
  SEARCH_MOVIE_LIST.innerHTML = "";

  data.forEach(movie => {
    let releaseDate  = movie.release_date.slice(0,4);
    let movieDiv = document.createElement("div");

    movieDiv.classList.add("search-movie-item");
    movieDiv.dataset.id = movie.id;
    // movieDiv.setAttribute("id", "search-movie-item");

    movieDiv.innerHTML = `
      <div class="search-movie-poster">
        <img src="${IMG_LINK}${movie.poster_path}" alt="Movie title" >
      </div>
      <div class="search-movie-info">
        <h4>${movie.title ? movie.title : "Not available"}</h4>
      <span>${releaseDate ? releaseDate : "No available"}</span>
      </div>
    `
    SEARCH_MOVIE_LIST.appendChild(movieDiv);

  })

  laoadMovieSelected();

}

function laoadMovieSelected() {
  const moviesList = SEARCH_MOVIE_LIST.querySelectorAll(".search-movie-item")

  moviesList.forEach(movie => {
    movie.addEventListener("click", () => {
      SEARCH_MOVIE_LIST.classList.add("hide-movie-list");
      SEARCH_INPUT.classList.remove("input-list");
      SEARCH_INPUT.value = "";

      fetch(`https://api.themoviedb.org/3/movie/${movie.dataset.id}?language=en-US`, options)
      .then(response => response.json())
      .then(response => {
        console.log("loadmovieselected", response);
        displayMovieSelected(response);
      })
      .catch(err => console.error(err));

    })
  })

}

function displayMovieSelected(movieDetails) {
  console.log(movieDetails);
  let releaseDate  = movieDetails.release_date.slice(0,4);
  let rating = movieDetails.vote_average ? movieDetails.vote_average.toString().slice(0,3) : "-";


  MOVIE_SELECTED.style.backgroundImage = `
  linear-gradient(0deg, rgba(28,31,37,0.7) 0%, 
  rgba(0,0,0,0.7) 100%),url(${IMG_BACK_LINK}${movieDetails.backdrop_path}), url("./assets/img/background-default.jpg")`;

  MOVIE_SELECTED.innerHTML = `
  <div class="movie-title-container">
  <h2>${movieDetails.title}</h2>
</div>
<!--content---------------------------------->
<div class="banner-container">

  <div class="movie-poster">
    <img src="${IMG_LINK}${movieDetails.poster_path}" alt="Movie poster" >
  </div>

  <!--more--about--movie------------------------->
  <div class="more-about-movie">
    <div>
    <div class="info">
      <p>Rating: </p><span>${rating}</span>
      <p>Year: </p><span> ${releaseDate}</span>
      <p>Duration: </p><span> ${movieDetails.runtime != 0 ? movieDetails.runtime : "-"}</span>
      <p>Language: </p><span> ${movieDetails.spoken_languages[0] ? movieDetails.spoken_languages[0].english_name : movieDetails.original_language}</span>
      <span class="quality">Full HD</span>
    </div>
    <div class="movie-details">
      <h4>Description:</h4>
      <p>${movieDetails.overview ? movieDetails.overview : "-"}</p>
    </div>
  </div>
    <!--more-about-movie-bottom-=====================================-->
    <div class="more-about-movie-bottom">
      <!--category------------------->
      <div class="category">
        <h4>Category:</h4>
        <p>${movieDetails.genres[0] ? movieDetails.genres[0].name : ""}</p>
        <p>${movieDetails.genres[1] ? movieDetails.genres[1].name : ""}</p>
        <p>${movieDetails.genres[2] ? movieDetails.genres[2].name : ""}</p>
      </div>
      <!--trailer-btn---------------->
      <a href="#" class="watch-btn">Watch trailer</a>
    </div>
  </div>
</div>
  
  `
}

//   function firstMovie(movie){

//     // Select parent element
//     let section = document.getElementById("principal-movie");
//     // Creates child element
//     let div = document.createElement("div");

//     //Movie background
//     section.style.backgroundImage = `radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 80%),url(${IMG_BACK_LINK}${movie.backdrop_path})`;

//     // Add class to child element 
//     div.classList.add("container-principal-movie");
  
//     // Html inyection in parent element
//     div.innerHTML = `
//         <h2>${movie.title}</h2>
//         <div>
//            <p>${movie.overview}</p>
//            <button>More info..</button>
//         </div>
        
//     `
//     section.appendChild(div);
//   }

//   function popularMoviesGrid(data){
//     let cont = 0;
//     data.forEach(movie => {
//       // Agarro la primer movie y la uso como principal
//       if(cont == 0) {

//        firstMovie(movie);
//         // Este if para que no muestre la ultima movie (estetica)
//       } else if (cont !== (data.length-1)) {
//          // Select parent element
//          let parent = document.getElementById("popular-movies");
//         // Creates child element
//          let div = document.createElement("div");
//          // Add class to child element 
//          div.classList.add("card");
//          // Html inyection in parent element
//          div.innerHTML = `
//          <div>
//          <a href="movie.html"><img src="${IMG_LINK}${movie.poster_path}" alt="${movie.title}" /> </a>
//          </div>
//          `;
//          /* agrego elemento hijo  al padre*/
//          parent.appendChild(div);
         
//         }
//         cont++;
//     });
// }


      
      