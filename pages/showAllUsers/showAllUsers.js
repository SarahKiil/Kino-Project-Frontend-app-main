import { API_URL } from "../../settings.js";

export async function initShowAllUsers() {
    try {
        // Get the token from wherever you stored it (e.g., localStorage)
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token not found. Please log in.');
            return;
        }

        const url = API_URL + "/users";
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Get a reference to the table body
        const tableBody = document.querySelector('tbody');

        // Function to clear the table
        function clearTable() {
            while (tableBody.firstChild) {
                tableBody.removeChild(tableBody.firstChild);
            }
        }

        // Function to add rows to the table
        function addRowsToTable(data) {
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.created}</td>
                    <td>${user.edited}</td>
                `;
                tableBody.appendChild(row);
            });
        }

        // Initial population of table
        clearTable();
        addRowsToTable(data);

        // Sorting
        let sortOrder = 1;

        function sortByHeader(data, header) {
            const sortedData = data.sort(
                (a, b) => (a[header] - b[header]) * sortOrder
            );
            sortOrder *= -1;
            clearTable();
            addRowsToTable(sortedData);
        }

        function sortByUsername(data) {
            event.stopPropagation();
            const sortedData = data.sort(
                (a, b) => a.username.localeCompare(b.username) * sortOrder
            );
            sortOrder *= -1;
            clearTable();
            addRowsToTable(sortedData);
        }

        function sortByEmail(data) {
            event.stopPropagation();
            const sortedData = data.sort(
                (a, b) => a.email.localeCompare(b.email) * sortOrder
            );
            sortOrder *= -1;
            clearTable();
            addRowsToTable(sortedData);
        }

        // Event listeners for sorting
        document.getElementById("username").addEventListener("click", () => {
            sortByUsername(data);
        });

        document.getElementById("email").addEventListener("click", () => {
            sortByEmail(data);
        });

        document.getElementById("headers").addEventListener("click", () => {
            const header = event.target.id.split("-")[1];
            sortByHeader(data, header);
        });

        // Get references to the search input and button
        const searchInput = document.querySelector('input[type="search-input"]');
        const searchButton = document.getElementById('search-btn');

        // Event listener
        searchButton.addEventListener('click', () => {
            // Get the search query from the input field
            const searchQuery = searchInput.value.toLowerCase();

            // Filter the data based on the search query
            const filteredData = data.filter(user => {
                return (
                    user.username.toLowerCase().includes(searchQuery) ||
                    user.email.toLowerCase().includes(searchQuery)
                );
            });

            // Clear the table and populate it with the filtered results
            clearTable();
            addRowsToTable(filteredData);
        });

        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}