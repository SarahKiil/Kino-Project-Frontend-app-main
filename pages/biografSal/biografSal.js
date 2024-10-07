

export function initBiografSal() {




    let tableCreated = false; // Flag to track if the table has been created
    let seatsData = []; // Mock data for seats

    let ticketReservations = [];
    let movieTitle = 'Paw Patrol';
    let salId = 1;
    let showId = 15;

// Mock data for seats
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 12; j++) {
            const seatNumber = i * 12 + j + 1;
            const isReserved = Math.random() < 0.3; // Simulate 30% of seats being reserved
            const showId = Math.floor(Math.random() * 5) + 1; // Simulate random show IDs
            seatsData.push({seatNumber, isReserved, showId});
        }
    }

    // Select the cinema-container div
    const cinemaSeats = document.querySelector('.cinema-container');

    cinemaSeats.innerHTML = '';


    // Create a table element only if it hasn't been created yet
        const table = document.createElement('table');
        tableCreated = true; // Set the flag to true after creating the table

        const markedSeats = []; // Array to store marked seat numbers

        // Function to toggle seat status
        function toggleSeatStatus(seat, seatData) {
            if (seatData.isReserved) {
                // If the seat is reserved, do nothing
                return;
            }

            const cell = seat.parentElement; // Get the parent cell
            const seatNumber = seatData.seatNumber;

            cell.classList.toggle('marked-cell');

            if (cell.classList.contains('marked-cell')) {
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

        // Loop to create rows and cells
        for (let i = 0; i < 20; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < 12; j++) {
                const cell = document.createElement('td');
                const seat = document.createElement('img');
                const seatData = seatsData[i * 12 + j];

                // Set the cinema seat image source
                seat.setAttribute('src', '../../images/cinema-seat-svgrepo-com.svg');
                seat.classList.add('cinema-seat');

                if (seatData.isReserved) {
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
        document.getElementById('movieTitle').innerText=`Filmtitel: ${movieTitle}`;
        document.getElementById('salId').innerText=`Sal: ${salId}`;
        document.getElementById('showId').innerText=`Forestillings ID: ${showId}`
}
