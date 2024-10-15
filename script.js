// Artwork functions
function loadArtworks() {
    const artworks = [
        { title: "Art Piece 1", description: "Description of artwork 1" },
        { title: "Art Piece 2", description: "Description of artwork 2" }
    ];

    const artworkContainer = document.getElementById('artwork-list');
    artworks.forEach(art => {
        const artDiv = document.createElement('div');
        artDiv.innerHTML = `<h3>${art.title}</h3><p>${art.description}</p>`;
        artworkContainer.appendChild(artDiv);
    });
}

// Exhibition functions
function loadExhibitions() {
    const exhibitions = [
        { title: "Exhibition 1", description: "Description of exhibition 1" },
        { title: "Exhibition 2", description: "Description of exhibition 2" }
    ];

    const exhibitionContainer = document.getElementById('exhibition-list');
    exhibitions.forEach(exhibit => {
        const exhibitDiv = document.createElement('div');
        exhibitDiv.innerHTML = `<h3>${exhibit.title}</h3><p>${exhibit.description}</p>`;
        exhibitionContainer.appendChild(exhibitDiv);
    });
}

// Comment functions
function loadComments() {
    const comments = [
        { user: "User1", comment: "Beautiful artwork!" },
        { user: "User2", comment: "Amazing details." }
    ];

    const commentContainer = document.getElementById('comment-list');
    comments.forEach(com => {
        const comDiv = document.createElement('div');
        comDiv.innerHTML = `<strong>${com.user}</strong><p>${com.comment}</p>`;
        commentContainer.appendChild(comDiv);
    });
}

// Payment
function processPayment() {
    const date = document.getElementById('payment-date').value;
    const amount = document.getElementById('payment-amount').value;
    if (date && amount) {
        alert("Payment processed!");
    } else {
        alert("Please enter valid payment details.");
    }
}

// Support Ticket
function submitTicket() {
    const ticketText = document.getElementById('support-ticket').value;
    if (ticketText) {
        alert("Support ticket submitted!");
    } else {
        alert("Please enter details for your support ticket.");
    }
}

// Login
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email && password) {
        document.getElementById('login-message').innerText = "Logged in successfully!";
    } else {
        document.getElementById('login-message').innerText = "Please provide valid credentials.";
    }
}

// Logout
function logout() {
    alert("Logged out successfully!");
}

// Load content on page load
window.onload = function() {
    loadArtworks();
    loadExhibitions();
    loadComments();
};
