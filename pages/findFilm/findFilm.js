import { API_URL } from "../../settings.js";

export async function initFindFilm(match) {
    getFilmInfo(match.params.filmId);
    fetchAndDisplayShowings(match.params.filmId);
    console.log(match.params);
}

async function getFilmInfo(filmId) {
    const apiUrl = API_URL + "/films/" + filmId;
    try {
        const response = await fetch(apiUrl, {});
        const data = await response.json();

        // Update DOM elements with film data
        document.querySelector('.film-title').textContent = data.title;
        document.querySelector('.film-year').textContent = `Year: ${data.year}`;
        document.querySelector('.film-rated').textContent = `Rated: ${data.rated}`;
        document.querySelector('.film-released').textContent = `Released: ${data.released}`;
        document.querySelector('.film-runtime').textContent = `Runtime: ${data.runtime}`;
        document.querySelector('.film-genre').textContent = `Genre: ${data.genre}`;
        document.querySelector('.film-director').textContent = `Director: ${data.director}`;
        document.querySelector('.film-writer').textContent = `Writer: ${data.writer}`;
        document.querySelector('.film-actors').textContent = `Actors: ${data.actors}`;
        document.querySelector('.film-plot').textContent = `Plot: ${data.plot}`;
        document.querySelector('.film-poster').src = data.poster;
        document.querySelector('.film-metascore').textContent = `Metascore: ${data.metascore}`;
        document.querySelector('.film-imdb-rating').textContent = `IMDb Rating: ${data.imdbRating}`;

        // You can add more logic for 'showings' and 'ongoing' if needed.
    } catch (error) {
        console.error('Error fetching film data:', error);
    }
}

async function fetchAndDisplayShowings(movieId) {
    try {
        // Construct the API URL
        const apiUrl = API_URL + "/showings/findAllByFilmId/" + movieId;

        // Get the "showing" element where you want to append the data
        const showingElement = document.getElementById("showing");

        // Make an HTTP GET request to the API
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();

        // Clear the "showing" element
        showingElement.innerHTML = '';

        // Iterate through the showings and create HTML elements
        data.forEach((showing) => {
            const showIdParagraph = document.createElement("p");
            showIdParagraph.textContent = `Show ID: ${showing.id}`;

            const timeAndDateParagraph = document.createElement("p");
            timeAndDateParagraph.textContent = `Time and Date: ${showing.timeAndDate}`;

            const ticketPriceParagraph = document.createElement("p");
            ticketPriceParagraph.textContent = `Ticket Price: $${showing.ticketPrice}`;

            const theaterIdParagraph = document.createElement("p");
            theaterIdParagraph.textContent = `Theater ID: ${showing.theater.id}`;


            const showingDiv = document.createElement("div");
            showingDiv.addEventListener("click", () => showingInfo(showing.id));
            showingDiv.setAttribute("id", showing.id)
            showingDiv.appendChild(showIdParagraph);
            showingDiv.appendChild(timeAndDateParagraph);
            showingDiv.appendChild(ticketPriceParagraph);
            showingDiv.appendChild(theaterIdParagraph);

            showingDiv.classList.add("show")
            // Append the created div to the "showing" element
            showingElement.appendChild(showingDiv);
        });
        
    } catch (error) {
        console.error("Error fetching showings:", error);
    }
}

function showingInfo(showingId) {
    console.log(showingId)
    console.log("showingInfo")
    window.router.navigate("showing?showingId=" + showingId)
}

