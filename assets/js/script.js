const id = "500";
const API = `https://api.themoviedb.org/3`;
const imgCard =  `https://image.tmdb.org/t/p/w185/`;
const backImg = "https://image.tmdb.org/t/p/original/"

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWRiODJiNDkyNzZlYTA5NmRhMzA4NDZmODA0OTc2MiIsInN1YiI6IjY0NTY3MmM3MWI3MGFlMDBlMmFhODI1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QZPhamiPtpoHFHzr93lDab3DL8hQSp8YPOW8PpKSArQ'
    }
  };

// Fetch de popular movies
fetch(`${API}/movie/popular?language=en-US&page=1`, options)
  .then(response => response.json())
  .then(response => {
    console.log("popular movies", response)
    popularMoviesGrid(response.results);
  })
  .catch(err => console.error(err));


  function firstMovie(movie){

    // Select parent element
    let section = document.getElementById("principal-movie");
    // Creates child element
    let div = document.createElement("div");

    //Movie background
    section.style.backgroundImage = `radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 80%),url(${backImg}${movie.backdrop_path})`;
    // Add class to child element 
    div.classList.add("container-principal-movie");
  
    // Html inyection in parent element
    div.innerHTML = `
        <h2>${movie.title}</h2>
        <div>
           <p>${movie.overview}</p>
           <button>More info..</button>
        </div>
        
    `
    section.appendChild(div);

  }

  function popularMoviesGrid(data){
    let cont = 0;
    data.forEach(movie => {
      
      if(cont == 0) {

       firstMovie(movie);

      } else {
         // Select parent element
         let parent = document.getElementById("popular-movies");
        // Creates child element
         let div = document.createElement("div");
         // Add class to child element 
         div.classList.add("card");
         // Html inyection in parent element
         div.innerHTML = `
         <div>
         <img src="${imgCard}${movie.poster_path}" alt="${movie.title}" />
         </div>
         `;
         /* agrego elemento hijo  al padre*/
         parent.appendChild(div);
         
        }
        cont++;
    });
}


      
      