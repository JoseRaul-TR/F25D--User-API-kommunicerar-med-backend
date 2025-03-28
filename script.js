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
            setCurrentYear();
        } catch (error) {
            console.error('Error fetching users from API: ', error);
        }
    }

    // Sets up the search form functionality
    function setupSearchForm() {
        document.getElementById('search-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const searchTerm = document.getElementById('search-input').value.toLowerCase();
            const foundUser = allUsers.find(user => 
                user.username.toLowerCase().includes(searchTerm) || user.id.toString() === searchTerm
            );
            displayUsers(foundUser ? [foundUser] : []);
            removeNotFoundMessage();
            if (!foundUser) {
                alert('Invånare hittades inte.');
            }
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
            <p><strong>E-post:</strong> ${user.email}</p>
            <button class="details-button" data-user-id="${user.id}">Visa mer info</button>
            <div class="user-details" id="details-${user.id}">
                <p><strong>Stad:</strong> ${user.address.city}</p>
                <p><strong>Telefon:</strong> ${user.phone}</p>
                <p><strong>Företag:</strong> ${user.company.name}</p>
            </div>
        </div>
    `;
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('details-button')) {
        const userId = event.target.dataset.userId;
        const detailsDiv = document.getElementById(`details-${userId}`);
        if (detailsDiv) {
            detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
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

/* Notes: 
    - Keep working in button more-details to hide content on second click */