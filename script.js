document.addEventListener('DOMContentLoaded', () => {
    let allUsers = [];

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            allUsers = users;
            displayUsers(users);

            const searchForm = document.getElementById('search-form');
            searchForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const searchInput = document.getElementById('search-input');
                const searchTerm = searchInput.value.toLowerCase();
                const filteredUsers = users.filter(user => {
                    return user.username.toLowerCase().includes(searchTerm) || user.id.toString().includes(searchTerm);
                });
                displayUsers(filteredUsers);
            });

            const randomUserButton = document.getElementById('random-user-button');
            randomUserButton.addEventListener('click', () => {
                const randomIndex = Math.floor(Math.random() * allUsers.length);
                const randomUser = allUsers[randomIndex];
                displayUsers([randomUser]);
            });
        });
});

function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    users.forEach(user => {
        const userCard = createUserCard(user);
        userList.appendChild(userCard);
    });
}

function createUserCard(user) {
    const card = document.createElement('div');
    card.classList.add('user-card');

    const nameParagraph = document.createElement('p');
    nameParagraph.innerHTML = `<strong>Namn:</strong> ${user.name}`;
    card.appendChild(nameParagraph);

    const usernameParagraph = document.createElement('p');
    usernameParagraph.innerHTML = `<strong>Användarnamn:</strong> ${user.username}`;
    card.appendChild(usernameParagraph);

    const emailParagraph = document.createElement('p');
    emailParagraph.innerHTML = `<strong>E-post:</strong> ${user.email}`;
    card.appendChild(emailParagraph);

    const detailsButton = document.createElement('button');
    detailsButton.textContent = 'Visa mer information';
    detailsButton.dataset.userId = user.id;
    card.appendChild(detailsButton);

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('user-details');
    detailsDiv.id = `details-${user.id}`;

    const cityParagraph = document.createElement('p');
    cityParagraph.innerHTML = `<strong>Stad:</strong> ${user.address.city}`;
    detailsDiv.appendChild(cityParagraph);

    const phoneParagraph = document.createElement('p');
    phoneParagraph.innerHTML = `<strong>Telefon:</strong> ${user.phone}`;
    detailsDiv.appendChild(phoneParagraph);

    const companyParagraph = document.createElement('p');
    companyParagraph.innerHTML = `<strong>Företag:</strong> ${user.company.name}`;
    detailsDiv.appendChild(companyParagraph);

    card.appendChild(detailsDiv);

    detailsButton.addEventListener('click', () => {
        const details = card.querySelector(`#details-${user.id}`);
        details.style.display = details.style.display === 'block' ? 'none' : 'block';
    });

    return card;
}