const id = "500";
const API = `https://api.themoviedb.org/3`;
const imgPath =  `https://image.tmdb.org/t/p/w185/`;
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
    principalMovie(response.results[0])
  })
  .catch(err => console.error(err));


  function principalMovie(movie){

    let section = document.getElementById("principal-movie");
    let div = document.createElement("div");
    div.classList.add("container-principal-movie");
    
    //Probar estilo en linea para el background dinamico y con color negro encima
    div.innerHTML = `
        <h2>${movie.title}</h2>
        <img class="principal-movie" src="${backImg}${movie.backdrop_path}">  
        <div class="principal-movie__info">
           <p>${movie.overview}</p>
        </div>
    `
    section.appendChild(div);

  }

  function popularMoviesGrid(data){

    data.forEach(movie => {
     /*selecciona el elementro padre*/
      let parent = document.getElementById("popular-movies");
      /*crea un elemento a indexar o inyectar*/
      let div = document.createElement("div");
      div.classList.add("card");
      /*le agreo lo que inyecto*/
      div.innerHTML = `
      <div>
      <img src="${imgPath}${movie.poster_path}" alt="${movie.title}" />
      </div>
      `;
      /* agrego elemento hijo  al padre*/
      parent.appendChild(div);
    });
}


      
      