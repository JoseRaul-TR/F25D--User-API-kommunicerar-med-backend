document.addEventListener('DOMContentLoaded', () => {
    let allUsers = [];

    // Fetches users from the API and initializes the application
    async function fetchAndDisplayUsers() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            allUsers = await response.json(); // Store fetched users
            setupSearchForm();
            setupRandomUserButton();
            setupShowAllUsersButton();
        } catch (error) {
            console.error('Error fetching users from API: ', error);
        }
    }

    // Sets up the search form functionality
    function setupSearchForm() {
        const searchForm = document.getElementById('search-form');
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent page reload
            const searchTerm = document.getElementById('search-input').value.toLowerCase(); // Get search term
            const foundUser = allUsers.find(user => 
                user.username.toLowerCase().includes(searchTerm) || user.id.toString() === searchTerm
            );
            displayUsers(foundUser ? [foundUser] : []); // Display found user or clear list
        });
    }

    // Sets up the random user button functionality
    function setupRandomUserButton() {
        document.getElementById('random-user-button').addEventListener('click', () => {
            const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
            displayUsers([randomUser]); // Display random user
        });
    }

    // Sets up the show all users button functionality
    function setupShowAllUsersButton() {
        const showAllButton = document.getElementById('show-all-users-button');
        showAllButton.addEventListener('click', () => {
            displayUsers(allUsers); // Display all users
        });
    }

    // Displays the provided users in the user list
    function displayUsers(users) {
        const userList = document.getElementById('user-list');
        userList.innerHTML = ''; // Clear existing content

        // Create and append the h2 element
        const h2 = document.createElement('h2');
        h2.textContent = 'Invånaredata';
        userList.appendChild(h2);

        // Create and append the user cards container
        const userCardsContainer = document.createElement('div')
        userCardsContainer.className = 'user-cards-container';
        userList.appendChild(userCardsContainer);

        users.forEach(user => userCardsContainer.appendChild(createUserCard(user)));
    }

    // Creates a user card element for display
    function createUserCard(user) {

        // Create a user-card for every user
        const card = document.createElement('div');
        card.classList.add('user-card');

        // Name
        const nameParagraph = document.createElement('p');
        nameParagraph.innerHTML = `<strong>Namn:</strong> ${user.name}`;
        card.appendChild(nameParagraph);

        // Username
        const usernameParagraph = document.createElement('p');
        usernameParagraph.innerHTML = `<strong>Användarnamn:</strong> ${user.username}`;
        card.appendChild(usernameParagraph);

        // Email
        const emailParagraph = document.createElement('p');
        emailParagraph.innerHTML = `<strong>E-post:</strong> ${user.email}`;
        card.appendChild(emailParagraph);

        // Details Button
        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Visa mer info';
        detailsButton.dataset.userId = user.id;
        card.appendChild(detailsButton);

        // Details Div
        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('user-details');
        detailsDiv.id = `details-${user.id}`;

        // City
        const cityParagraph = document.createElement('p');
        cityParagraph.innerHTML = `<strong>Stad:</strong> ${user.address.city}`;
        detailsDiv.appendChild(cityParagraph);

        // Phone
        const phoneParagraph = document.createElement('p');
        phoneParagraph.innerHTML = `<strong>Telefon:</strong> ${user.phone}`;
        detailsDiv.appendChild(phoneParagraph);

        // Company
        const companyParagraph = document.createElement('p');
        companyParagraph.innerHTML = `<strong>Företag:</strong> ${user.company.name}`;
        detailsDiv.appendChild(companyParagraph);

        card.appendChild(detailsDiv);

        detailsButton.addEventListener('click', () => {
            detailsDiv.style.display = detailsDiv.style.display === 'block' ? 'none' : 'block';
        });

        return card;
    }

    // Add current year to footer copyright
    function setCurrentYear() {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

    setCurrentYear(); // Call the function to set the year

    fetchAndDisplayUsers();
});