fetch('/decks')
  .then(response => response.json())
  .then(decks => {
    var deckContainer = document.getElementById('deckContainer');
    deckContainer.innerHTML = ''; // Clear the container
  
    decks.forEach(deck => {
      var deckElement = document.createElement('div');
      deckElement.textContent = deck.name;
  
      // Create delete button
      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete-deck';
      deleteButton.dataset.deckId = deck._id;
  
      // Add event listener to delete button
      deleteButton.addEventListener('click', function(e) {
        var deckId = e.target.getAttribute('data-deck-id'); // Get the ID of the deck to delete
  
        if (confirm('Are you sure you want to delete this deck?')) { // Ask the user to confirm
          fetch('/decks/' + deckId, { method: 'DELETE' }) // Send a delete request
            .then(function(response) {
              if (response.ok) {
                location.reload(); // Reload the page on success
              } else {
                console.log('Error: ' + response.statusText);
              }
            });
        }
      });

      // Append the deck element and delete button to the container
      deckContainer.appendChild(deckElement);
      deckContainer.appendChild(deleteButton);
    });
  })
  .catch(error => console.error('Error:', error));