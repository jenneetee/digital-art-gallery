// Artwork functions
function loadArtworks() {
    const artworks = [
        { title: "Art Piece 1", description: "Description of artwork 1", price: 100 },
        { title: "Art Piece 2", description: "Description of artwork 2", price: 200 }
    ];

    const artworkContainer = document.getElementById('artwork-list');
    artworks.forEach(art => {
        const artDiv = document.createElement('div');
        artDiv.innerHTML = `
            <h3>${art.title}</h3>
            <p>${art.description}</p>
            <p>Price: $${art.price}</p>
            <button onclick="buyArtwork('${art.title}', ${art.price})">Buy Now</button>
        `;
        artworkContainer.appendChild(artDiv);
    });
}

// Function to redirect to payment page with artwork details
function buyArtwork(title, price) {
    const url = `payment.html?title=${encodeURIComponent(title)}&price=${price}`;
    window.location.href = url;  // Redirect to payment page with artwork details
}

// Load content on page load
window.onload = function() {
    loadArtworks();
};
