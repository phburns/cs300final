document.addEventListener('DOMContentLoaded', () => {
  let currentIndex = 0;

  // Define and populate the flashcards array
  let flashcards = Array.from(document.querySelectorAll('.flashcard-container'));

  console.log('flashcards:', flashcards); // Debug log

  function deleteFlashcard(event) {
      event.preventDefault();

      // Add confirmation dialog
      const confirmDelete = confirm('Are you sure you want to delete this flashcard?');
      if (!confirmDelete) {
        return;
      }

      console.log('currentIndex:', currentIndex); // Debug log

      // Check if flashcards is defined and it's an array
      if (!Array.isArray(flashcards)) {
          console.error('flashcards is not an array');
          return;
      }

      // Check if currentIndex is a valid index for the flashcards array
      if (currentIndex < 0 || currentIndex >= flashcards.length) {
          console.error('currentIndex is not a valid index for the flashcards array');
          return;
      }

      // Get the current flashcard
      let currentFlashcard = flashcards[currentIndex];

      // Get the deck ID and flashcard ID from the current flashcard
      let deckId = currentFlashcard.getAttribute('data-deck-id');
      let flashcardId = currentFlashcard.getAttribute('data-flashcard-id');

      console.log('Deleting flashcard', deckId, flashcardId);
      const url = `/decks/${deckId}/flashcards/${flashcardId}?_method=DELETE`;

      fetch(url, {
          method: 'POST',
      })
      .then(response => {
          if (!response.ok) {
              console.error('Response status:', response.status, response.statusText);
              throw new Error('Network response was not ok');
          }
          window.location.reload();
      })
      .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
      });
  }

  // Get the delete forms
  let deleteForms = Array.from(document.querySelectorAll('.delete-form'));

  // Add an event listener to each delete form
  deleteForms.forEach((deleteForm) => {
      deleteForm.addEventListener('submit', deleteFlashcard);
  });
});