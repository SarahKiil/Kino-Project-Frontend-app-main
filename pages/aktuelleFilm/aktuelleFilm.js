import { API_URL } from "../../settings.js";

export function initAktuelleFilm() {
    loadMovies();
}

async function loadMovies() {
    try {
        // Select the movie container div
        const movieContainer = document.getElementById("movie-container");
        movieContainer.innerHTML = '';
        // Fetch the JSON data from the API
        const url = API_URL + "/films";
        const response = await fetch(url);
        const data = await response.json();

        // Loop through the data and create movie cards
        data.forEach((movie) => {
            const card = document.createElement("card");
            card.className = "movie-card"; 

            // Create an img element for the movie poster
            const posterImg = document.createElement("img");
            posterImg.className = "movie-poster-img";
            posterImg.src = movie.poster;

            posterImg.addEventListener("click", () => {
                window.location.href = `#/find-film?filmId=${movie.id}`;
            });       

            // Create a span for the movie title
            const titleSpan = document.createElement("span");
            const maxLength = 30;
            titleSpan.className = "movie-title";
            titleSpan.textContent = movie.title;

            if (movie.title.length > maxLength) {
                titleSpan.textContent = movie.title.slice(0, maxLength) + "...";
            } else {
                titleSpan.textContent = movie.title;
            }

            // Create a div for the movie buttons container
            const btnsContainerDiv = document.createElement("div");
            btnsContainerDiv.className = "movie-btns-container";

            // Create "Read More" link
            const readMoreLink = document.createElement("a");
            //readMoreLink.setAttribute("data-navigo", "");
            readMoreLink.className = "read-more-btn";
            const readMoreSpan = document.createElement("span");
            readMoreSpan.textContent = "Læs Mere";
            readMoreLink.appendChild(readMoreSpan);

            // Create "Billeter" link
            const ticketsLink = document.createElement("a");

            ticketsLink.href = "find-film?filmId=" + movie.id;

            ticketsLink.className = "tickets-btn";
            //ticketsLink.setAttribute("data-navigo", "");
            const ticketsSpan = document.createElement("span");
            ticketsSpan.textContent = "Billeter";
            const ticketsImg = document.createElement("img");
            ticketsImg.className = "ticket-btn-icon";
            ticketsImg.src = "images/ticket-outline.svg";
            ticketsLink.appendChild(ticketsSpan);
            ticketsLink.appendChild(ticketsImg);
            ticketsLink.addEventListener("click", (e) => {
                e.preventDefault();
                window.router.navigate(e.currentTarget.getAttribute("href"));
            })

            // Append elements to the movie card
            btnsContainerDiv.appendChild(readMoreLink);
            btnsContainerDiv.appendChild(ticketsLink);
            card.appendChild(posterImg);
            card.appendChild(titleSpan);
            card.appendChild(btnsContainerDiv);

            // Append the movie card to the container
            movieContainer.appendChild(card);



            readMoreLink.addEventListener("click", () => {
                const modal = document.getElementById("myModal");
                modal.style.display = "block";
                const plotText = document.getElementById("plot-text");
                plotText.textContent = movie.plot;
            
                // Set the title inside the event listener
                const h1Element = document.querySelector(".modal-content-film h1");
                h1Element.textContent = movie.title;
            });
        });

        // Get the modal close button and add an event listener to close the modal
        const closeButton = document.getElementsByClassName("close")[0];
        closeButton.addEventListener("click", () => {
            closeModal();
        });
        function closeModal() {
            const modal = document.getElementById("myModal");
            modal.style.display = "none";
        }

        document.addEventListener("click", (event) => {
            const modal = document.getElementById("myModal");
            if (event.target === modal) {
                closeModal();
            }
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}



