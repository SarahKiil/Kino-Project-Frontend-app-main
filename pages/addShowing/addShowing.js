import { API_URL } from "../../settings.js";
import { handleHttpErrors, makeOptions } from "../../utils.js";

export function initAddShowing() {

    let addshowingmessage = document.getElementById("addshowingmessage");

    document.querySelector("#film-input").innerHTML = "";
    document.querySelector("#theater-input").innerHTML = "";
   
    document.getElementById("ticketPrice-input").value="";
    document.getElementById("timeAndDate-input").value="";


    loadMovies();
    loadTheaters();

    const filmSelect = document.getElementById("film-input");
    const selectedOption = filmSelect; // Declare selectedOption outside the listener

    filmSelect.addEventListener("change", function () {
        if (selectedOption.value !== "") {
            inspectFilm();
            console.log("Inspectfilm");
        }
    });

    if (!isInitAddButton) {
        document.getElementById("add-showing-btn").addEventListener("click", async () => addShowing(event));
    }

    isInitAddButton = true;

    async function loadMovies() {
        try {
            const url = API_URL + "/films";
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Request failed');
            }

            const data = await response.json();
            const select = document.querySelector("#film-input");

            // Clear existing options except for the default option
            select.innerHTML = '';
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.style = 'font-style: italic;';
            defaultOption.text = 'Select Movie';
            select.appendChild(defaultOption);

            data.forEach(movie => {
                const option = document.createElement('option');
                option.value = movie.id;
                option.text = movie.title;
                select.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading movies:', error);
        }
    }

    async function loadTheaters() {
        try {
            const url = API_URL + "/theaters";
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error('Request failed')
            }
            const data = await response.json();
            const select = document.querySelector("#theater-input")

            // Clear existing options except for the default option
            select.innerHTML = '';
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.style = 'font-style: italic;';
            defaultOption.text = 'Select Theater';
            select.appendChild(defaultOption);

            data.forEach(theater => {
                const option = document.createElement('option')
                option.value = theater.id
                option.text = theater.id
                select.append(option)
            })

        } catch (error) {
            console.error('Error loading movies:', error);
        }
    }

    async function inspectFilm() {
        const filmId = document.getElementById("film-input").value;

        const url = API_URL + "/films/" + filmId;
        await fetch(url)
            .then(res => handleHttpErrors(res))
            .then(film => {
                const markUp = `
      <div class="movie-details" style="margin-left: auto; margin-right: auto;"><img src="${film.poster}">
      <ul>
        <li>Titel: ${film.title}</li>
        <li>Instruktør: ${film.director}</li>
        <li>Løbetid: ${film.runtime}</li>
        <li>Genre: ${film.genre}</li>
        <li>PG-Rating: ${film.rated}</li>
      </ul>
      <br>
      <p type="text">${film.plot}</å>
      </div>
  `;
                console.log(filmId)
                console.log(film)

                document.querySelector("#inspect-film").innerHTML = markUp
            })
    }

    async function addShowing(event) {
        event.preventDefault(); // Prevent default form submission behavior
        const showingFilm = document.getElementById("film-input").value;
        const showingTheater = document.getElementById("theater-input").value;
        const showingTicketPrice = document.getElementById("ticketPrice-input").value;
        const showingTimeAndDate = document.getElementById("timeAndDate-input").value.replace("T", " ") + ':00';

        const token = localStorage.getItem('token');

        console.log(showingTimeAndDate)

        const newShowing = {
            filmId: showingFilm,
            theaterId: showingTheater,
            ticketPrice: showingTicketPrice,
            timeAndDate: showingTimeAndDate
        }

        try {
            const newOpt = makeOptions("POST", newShowing, token);

            const response = await fetch(API_URL + "/showings", newOpt);

            if (response.ok) {
                addshowingmessage.textContent = "Added Showing!";
            } else {
                const errorData = await response.json();
                addshowingmessage.textContent = "Added Showing FAILED!";
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
}

let isInitAddButton = false;