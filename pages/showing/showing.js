import { API_URL } from "../../settings.js";
import { handleHttpErrors, makeOptions } from "../../utils.js";

export function initShowing(match) {
    markedSeats.length=0;
    markedSeatsDbId.length=0;
    seatsSelected.innerHTML="";

    showingId = match.params.showingId;
    getShowing(match.params.showingId);

    document.getElementById("reserve-btn").addEventListener("click", goToReservation)
}


const markedSeatsDbId = [];
const markedSeats = []; // Array to store marked seat numbers
let showingId;

async function getShowing(showingId) {
    const apiUrl = `${API_URL}/showings/${showingId}/includeSeats`;
    const showing = await fetch(apiUrl).then(handleHttpErrors);

    console.log(showing);

    makeseats(showing);
}

function makeseats(showing) {
    let tableCreated = false; // Flag to track if the table has been created
    let seatsData = []; // Mock data for seats

    let ticketReservations = [];
    let movieTitle = showing.movieTitle;
    let salId = showing.theater.id;
    let showId = showingId;
    seatsData = showing.seats;



    seatsData[5].reservation = 'test'
    // Select the cinema-container div
    const cinemaSeats = document.querySelector('.cinema-container');

    cinemaSeats.innerHTML = '';


    // Create a table element only if it hasn't been created yet
    const table = document.createElement('table');
    tableCreated = true; // Set the flag to true after creating the table


    // Function to toggle seat status
    function toggleSeatStatus(seat, seatData) {
        if (seatData.isReserved === true) {
            // If the seat is reserved, do nothing
            return;
        }

        const cell = seat.parentElement; // Get the parent cell
        const seatNumber = seatData.seatNumber;
        const seatId = seatData.id;

        cell.classList.toggle('marked-cell');

        if (cell.classList.contains('marked-cell')) {
            markedSeatsDbId.push(seatId);
            markedSeats.push(seatNumber); // Add seat to the markedSeats array
        } else {
            const index = markedSeats.indexOf(seatNumber);
            if (index !== -1) {
                markedSeats.splice(index, 1); // Remove seat from the markedSeats array
            }
        }

        console.log('Sæder valgt:', markedSeats.map(seat => `seat ${seat}`).join(', '));

        document.getElementById("seatsSelected").innerHTML = 'Sæder valgt: <br>    ' + markedSeats.map(seat => `- ${seat}<br>`).join('');
    }
    const theaterRows = showing.theater.seatCount / showing.theater.rowLength
    // Loop to create rows and cells
    for (let i = 0; i < theaterRows; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < showing.theater.rowLength; j++) {
            const cell = document.createElement('td');
            const seat = document.createElement('img');
            const seatData = seatsData[i * showing.theater.rowLength + j];

            // Set the cinema seat image source
            seat.setAttribute('src', 'images/cinema-seat-svgrepo-com.svg');
            seat.classList.add('cinema-seat');

            if (seatData.isReserved === true) {
                seat.classList.add('reserved-seat');
            } else {
                // Add a click event listener to the seat
                seat.addEventListener('click', () => {
                    toggleSeatStatus(seat, seatData);
                });
            }

            // Append the seat to the cell and the cell to the row
            cell.appendChild(seat);
            row.appendChild(cell);
        }

        // Append the row to the table
        table.appendChild(row);
    }

    // Append the table to the cinema-container div
    cinemaSeats.appendChild(table);
    document.getElementById('movieTitle').innerText = `Filmtitel: ${movieTitle}`;
    document.getElementById('salId').innerText = `Sal: ${salId}`;
    document.getElementById('showId').innerText = `Forestillings ID: ${showId}`
}

function goToReservation() {
    const seatsSelected = markedSeats;


    console.log(seatsSelected);
    window.router.navigate(`reservation?seatsSelected=${seatsSelected}&showingId=${showingId}`)
}