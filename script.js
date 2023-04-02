NODE_ENV=developpement node index.js
const api_key = "b1bb009f89a909c0ae0b65bc17104e0e";
const imageURL = "https://image.tmdb.org/t/p/w500";
const api_url = `https://api.themoviedb.org/3/movie/666?api_key=${api_key}&append_to_response=videos&include_adult=false`;
const api_url_pop = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;


const movies = document.querySelector(".movies");
const data1 = document.getElementById("data1");
var form = document.querySelector("form"); // selection de l evenement
var filmdetail = document.getElementById('filmdetail');

// Kechat@2023
// search film
//  fonction searchTitle
  let searchTitle = async query => {
  // console.log("------", query);
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`;
        let results = await fetch(url);
        let data = await results.json();
      return data.results; // retourn resultat chercher par titre
  };
form.addEventListener("submit", async e => {
    e.preventDefault();
    const title = document.getElementById("inputFilm").value;
    let films = await searchTitle(title);
    // MAP films
    let filmsElement = "";
      films.forEach(film => {
    // console.log(film);
        const {id,title, original_language, original_title, popularity, poster_path} = film;
        const movie = `<li><img src="https://image.tmdb.org/t/p/w500/${poster_path}">
        <h2>${title}</h2><a  src=" https://image.tmdb.org/t/p/w500${poster_path}">
        <p> <a class="btn btn-success" href="detail.html" role="button">détails</a></p></li>`;
    // console.log(adult, id, title, original_language);
        data1.innerHTML += `<p>film : ${title} : titre original  ${original_title} : 
        langue originale : ${original_language}</p>`;
        if (poster_path == null) { return };
      return (filmsElement += movie);
  });
    //console.log(filmsElement);
  movies.innerHTML = filmsElement;
});


// afficher les  films 

async function showFilms() {
  const response = await fetch(api_url_pop)
  const data = await response.json();
  //console.log(data)
  getData(data)
}
async function getData({page, results, total_pages, total_results}) {
  let filmsElement = "";
  results.forEach(film => {
    //console.log(film)
    const { id, title, release_date, popularity, poster_path, vote_average } = film;
    
    const movie = `<li data-id=${id}><img src="https://image.tmdb.org/t/p/w500${poster_path}">
        <h2>${title}</h2>
        <span style="color: red"> vote average : ${vote_average}</span>
        <h5 style="color:green">release date : ${release_date}</h5>
        <p> <a class="btn btn-success" href="detail.html" role="button">détails</a></p></li>`
    return filmsElement += movie;

  });
  movies.innerHTML = filmsElement;
  
  
  
  let films = [...movies.querySelectorAll('li[data-id]')]
  films.forEach(async film => {
    film.addEventListener('click', async () => {
      //console.log(film.dataset.id)
      
      const response = await fetch(`https://api.themoviedb.org/3/movie/${film.dataset.id}?api_key=${api_key}&append_to_response=videos&include_adult=false`);
      const data = await response.json();

      //console.log(data);
      
    /*
      const {title, release_date, popularity, vote_average} = film
      const movie = `<h2>Title : ${title}</h2>
      <h4>Release date : ${release_date} </h4>
      <h4>Popularity : ${popularity}</h4> `
      */

    })
    
  })
}
showFilms()

