document.addEventListener('DOMContentLoaded', () => {
  let currentIndex = 0;

  // Define and populate the flashcards array
  let flashcards = Array.from(document.querySelectorAll('.flashcard-container'));

  console.log('flashcards:', flashcards); // Debug log

  function editFlashcard(event) {
      event.preventDefault();

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

      // Get the new question and answer from the form
      let newQuestion = event.target.querySelector('input[name="question"]').value;
      let newAnswer = event.target.querySelector('input[name="answer"]').value;

      console.log('Editing flashcard', deckId, flashcardId, newQuestion, newAnswer);
      const url = `/decks/${deckId}/flashcards/${flashcardId}?_method=PUT`;

      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              question: newQuestion,
              answer: newAnswer,
          }),
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

  // Get the edit forms
  let editForms = Array.from(document.querySelectorAll('.edit-form'));

  // Add an event listener to each edit form
  editForms.forEach((editForm) => {
      editForm.addEventListener('submit', editFlashcard);
  });
});