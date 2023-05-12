const id = "500";
const API_LINK = `https://api.themoviedb.org/3`;
const IMG_LINK =  `https://image.tmdb.org/t/p/w185/`;
const IMG_BACK_LINK = "https://image.tmdb.org/t/p/original/"
const SEARCH_INPUT = document.getElementById("search-movie-input");
const SEARCH_MOVIE_LIST = document.getElementById("search-movie-list");

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
    console.log(response.results)
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
    movieDiv.setAttribute("id", "search-movie-item");

    movieDiv.innerHTML = `
      <div class="search-movie-poster">
        <img src="${IMG_LINK}${movie.poster_path}" alt="Movie title" >
      </div>
      <div class="search-movie-info">
        <h4>${movie.title ? movie.title : "No disponible"}</h4>
      <span>${releaseDate ? releaseDate : "No date"}</span>
      </div>
    `
    SEARCH_MOVIE_LIST.appendChild(movieDiv);
  })

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


      
      