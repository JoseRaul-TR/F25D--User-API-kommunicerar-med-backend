document.addEventListener('DOMContentLoaded', () => {
    
    let allUsers = [];
    const userList = document.getElementById('user-list');

    // Fetch user data from the API and initializes the application
    async function fetchAndDisplayUsers() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            allUsers = await response.json();
            setupSearchForm();
            setupRandomUserButton();
            setupShowAllUsersButton();
            setupClearButton();
            setCurrentYear();
        } catch (error) {
            console.error('Error fetching users from API: ', error);
        }
    }

    // Sets up the search form functionality
    function setupSearchForm() {
        const searchForm = document.getElementById('search-form');
        const searchInput = document.getElementById('search-input');
    
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const searchTerm = searchInput.value.toLowerCase().trim();
            userList.innerHTML = ''; // Clean previous search

            if (!searchTerm) { // Show a message if no search term is given
                displayNotFoundMessage("Vänligen ange ett sökord.");
                return;
            }
    
            // Search user even if username is not complete
            const foundUsers = allUsers.filter(user =>
                user.username.toLowerCase().includes(searchTerm) || user.id.toString() === searchTerm
            );
    
            foundUsers.length ? displayUsers(foundUsers) : displayNotFoundMessage("Invånare hittades inte.");
        });
    }

    // Function not found message
    function displayNotFoundMessage(message) {
        userList.innerHTML = `<p id="not-found-message">${message}</p>`;
    }

    // Function clear search button
    function setupClearButton() {
        const clearButton = document.getElementById('clear-search-button');

        clearButton.addEventListener('click', () => {
            document.getElementById('search-input').value = '';
            userList.innerHTML = '';
        });
    }

    // Sets up the random user button functionality
    function setupRandomUserButton() {
        document.getElementById('random-user-button').addEventListener('click', () => {
            displayUsers([allUsers[Math.floor(Math.random() * allUsers.length)]]);
        });
    }

    // Sets up the show all users button functionality
    function setupShowAllUsersButton() {
        document.getElementById('show-all-users-button').addEventListener('click', () => {
            displayUsers(allUsers);
        });
    }

    // Displays the provided users in the user list
    function displayUsers(users) {
        userList.innerHTML = `
            <h2>Invånaredata</h2>
            <div class="user-cards-container">
                ${users.map(createUserCard).join('')}
            </div>
        `;
    }

    // Creates a user card element for display
    function createUserCard(user) {
        return `
            <div class="user-card">
                <p><strong>Namn:</strong> ${user.name}</p>
                <p><strong>Användarnamn:</strong> ${user.username}</p>
                <p><strong>E-postadress:</strong> ${user.email}</p>
                <button class="details-button" data-user-id="${user.id}">Visa mer info</button>
                <div class="user-details" id="details-${user.id}">
                    <p><strong>Stad:</strong> ${user.address.city}</p>
                    <p><strong>Telefonnummer:</strong> ${user.phone}</p>
                    <p><strong>Företagsnamn:</strong> ${user.company.name}</p>
                </div>
            </div>
        `;
    }

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('details-button')) {
            const userId = event.target.dataset.userId;
            const detailsDiv = document.getElementById(`details-${userId}`);
            if (detailsDiv) {
                detailsDiv.classList.toggle('show');
            }
        }
    });

    // Sets the current year in the footer
    function setCurrentYear() {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

    fetchAndDisplayUsers();
});