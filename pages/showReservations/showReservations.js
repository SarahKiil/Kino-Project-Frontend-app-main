import { API_URL } from "../../settings.js";

export async function initShowReservations() {
    try {
        const token = localStorage.getItem('token');
    
     
        const response = await fetch(`${API_URL}/reservations`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` , 
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const container = document.querySelector('.template');
        container.innerHTML = '';

        data.forEach(reservation => {
            const reservationDiv = document.createElement('div');
            reservationDiv.classList.add('reservation-card');

            reservationDiv.innerHTML = `
                <p>Email: ${reservation.customerEmail}</p>
                <p>Username: ${reservation.customerUsername}</p>
                <p>Theater ID: ${reservation.theaterId}</p>
                <p>Showing Date: ${reservation.showingDate}</p>
                <p>Total Price: ${reservation.totalPrice}</p>
            `;

            if (reservation.seats.length > 0) {
                const seatsDiv = document.createElement('div');
                seatsDiv.classList.add('reservation-seats');
                seatsDiv.innerHTML = '<p>Reserved Seats:</p>';

                reservation.seats.forEach(seat => {
                    const seatInfo = document.createElement('p');
                    seatInfo.textContent = `Seat Number: ${seat.seatNumber}`;
                    seatsDiv.appendChild(seatInfo);
                });

                reservationDiv.appendChild(seatsDiv);
            }

            container.appendChild(reservationDiv);
        });
    }
    catch (err) {
        console.error(err);
    }
}
