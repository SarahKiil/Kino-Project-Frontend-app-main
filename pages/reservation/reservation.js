import { API_URL } from "../../settings.js";
import { handleHttpErrors, makeOptions } from "../../utils.js";

let username;
let showingId;
let seats = [];
let theaterId;
let reservationId;
let totalPrice
let title;
let email;
let isPrinting = false;
let dateTime;

export function initReservation(match) {
    username = localStorage.username;
    showingId = match.params.showingId;
    showingId = parseInt(match.params.showingId, 10);

    seats = match.params.seatsSelected;
    seats = seats.split(',').map(str => parseInt(str, 10));

    let reservationData = {
        username: username,
        showingId: showingId,
        seatIds: seats
    };



    addReservation(reservationData)
        .then(data => {
            reservationId = data; // Assuming data is already an integer
            console.log('Reservation created with ID:', reservationId);
            console.log("This happens first")
            // Now that the first fetch is complete, you can run another fetch here
            displayTicket(reservationId);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        window.addEventListener('afterprint', function () {
            console.log('afterprint event triggered');
            isPrinting = false;
        });    

        print();


}
function print(){

    document.querySelector("#print-btn").addEventListener("click", function () {
        if (!isPrinting) {
            isPrinting = true;
            window.print();
        }
    });

}

  const url = API_URL + "/reservations";

  function addReservation(reservationData) {
    const token = localStorage.getItem('token'); // Replace 'yourAuthTokenKey' with the key you used to store the token in localStorage

    if (!token) {
        throw new Error('Authentication token not found in localStorage');
    }

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Add the token to the headers
        },
        body: JSON.stringify(reservationData)
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Assuming the response is actually JSON
        } else {
            throw new Error('Network response was not ok');
        }
    });
}


function displayTicket(reservationId) {
    const url = API_URL +"/reservations/id/"+ reservationId;
    
  
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        title = data.title;
        seats = data.seats;
        showingId = data.showingId;
        reservationId = data.reservationId; 
        theaterId = data.theaterId;
        totalPrice = data.totalPrice
        dateTime = data.showingDate;

        document.querySelector("#reservation-id").innerText = `Reservations-ID: ${reservationId}`;
        document.querySelector("#text").innerText = `Kære ${username}, tak fordi du valgte at se din film hos KinoXP`;
        document.querySelector("#title").innerText = `Filmtitel: ${title}`;
        document.querySelector("#date-time").innerText = `Tidspunkt: ${dateTime}`
        document.querySelector("#theater-id").innerText = `Sal: ${theaterId}`;
        document.querySelector("#total-price").innerText = `Billetpris: ${totalPrice} kr.`;
        document.querySelector("#showing-id").innerText = `Forestillings-ID: ${showingId}`;
        if (Array.isArray(seats)) {
            const seatNumbers = seats.map(seat => seat.seatNumber);
            document.querySelector("#seats").innerText = `Sæde(r): ${seatNumbers.join(', ')}`;
          } else {
            document.querySelector("#seats").innerText = `Sæder: Ingen angivet`;
          }



      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
