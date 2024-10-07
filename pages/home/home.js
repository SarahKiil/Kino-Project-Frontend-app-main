import { API_URL } from "../../settings.js";
import {
  handleHttpErrors,
  makeOptions,
  renderHtml,
  loadHtml,
} from "../../utils.js";
import { initAktuelleFilm } from "../aktuelleFilm/aktuelleFilm.js";

export function initHome() {
  showMovies();
  //fetchAndDisplayMovies();
  fetchAndDiscplayMovies2();
}

async function showMovies() {
  const templateAktuelleFilm = await loadHtml(
    "./pages/aktuelleFilm/aktuelleFilm.html"
  );
  renderHtml(templateAktuelleFilm, "active-movies");
  initAktuelleFilm();
}

async function fetchAndDisplayMovies() {
  const response = await fetch(API_URL + "/films");
  const movies = await response.json();
  const banner = document.getElementById("banner");

  // Clear the banner before generating new posters
  banner.innerHTML = "";

  movies.forEach((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie-poster", "max-w-xs"); // Apply the movie poster style and set max width to 445 pixels

    const poster = document.createElement("img");
    poster.src = movie.poster;
    poster.alt = movie.title;
    movieDiv.appendChild(poster);

    banner.appendChild(movieDiv);
  });
}

async function fetchAndDiscplayMovies2() {
  const response = await fetch(API_URL + "/films");
  const movies = await response.json();

  const bannerContainer = document.querySelector("#banner2");
  const bannerItems = document.querySelector(".banner-items");
  const items = [];
  let currentItemIndex = 0;

  bannerItems.innerHTML = "";

  const itemWidth = bannerContainer.clientWidth;

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * movies.length);
    items.push(movies[randomIndex]);
    movies.splice(randomIndex,1)
  }
 
  
  items.forEach((item) => {
    
    const bannerItem = document.createElement("div");
    bannerItem.classList.add("banner-item");

    const bannerPosterLink = document.createElement("a");
    bannerPosterLink.href = "#/find-film?filmId=" + item.id;
    const bannerPoster = document.createElement("img");
    bannerPoster.src = item.poster;
    bannerPoster.alt = item.title;
    bannerPoster.classList.add("banner-item-poster");
    bannerPosterLink.appendChild(bannerPoster);

    const bannerItemDiv = document.createElement("div");
    bannerItemDiv.classList.add("banner-item-div");
    const bannerHeader = document.createElement("h1");
    bannerHeader.classList.add("banner-item-header");
    bannerHeader.textContent = item.title;
    const bannerText = document.createElement("p");
    bannerText.classList.add("banner-item-description");
    bannerText.textContent = item.plot;

    bannerItemDiv.appendChild(bannerHeader);
    bannerItemDiv.appendChild(bannerText);

    bannerItem.appendChild(bannerPosterLink);
    bannerItem.appendChild(bannerItemDiv);
    bannerItems.appendChild(bannerItem);
  })
console.log(items)

  
}
