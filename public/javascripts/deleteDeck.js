window.onload = function() {
  var deleteButtons = document.getElementsByClassName('delete-deck');

  for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', async function(e) { // Make the event handler async
      var deckId = e.target.getAttribute('data-deck-id'); // Get the ID of the deck to delete

      if (confirm('Are you sure you want to delete this deck?')) { // Ask the user to confirm
        try {
          const response = await fetch('/decks/' + deckId, { method: 'DELETE' }); // Wait for the delete request to complete
          if (!response.ok) {
            console.log('Error: ' + response.statusText);
          }
        } catch (err) {
          console.log('Fetch error: ' + err);
        } finally {
          // Only reload the page after the server has responded
          location.reload();
        }
      }
    });
  }
};