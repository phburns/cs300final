document.addEventListener('DOMContentLoaded', () => {
  let flashcards = Array.from(document.querySelectorAll('.flashcard-container'));
  let editForms = Array.from(document.querySelectorAll('.edit-form'));
  let deleteButtons = Array.from(document.querySelectorAll('.delete-form'));
  let currentIndex = 0;

  function showFlashcard(index) {
    flashcards.forEach((flashcard, i) => {
      flashcard.style.display = i === index ? 'block' : 'none';
      editForms[i].style.display = i === index ? 'block' : 'none';
      deleteButtons[i].style.display = i === index ? 'block' : 'none';
  
      let prevButton = flashcard.querySelector('.prev-button');
      let nextButton = flashcard.querySelector('.next-button');
  
      if (prevButton) {
        prevButton.style.display = i !== 0 ? 'block' : 'none';
        console.log('Previous button display:', prevButton.style.display); // Add a console log
      }
  
      if (nextButton) {
        nextButton.style.display = i !== flashcards.length - 1 ? 'block' : 'none';
      }
    });
  }

  flashcards.forEach((flashcard, i) => {
    let prevButton = flashcard.querySelector('.prev-button');
    let nextButton = flashcard.querySelector('.next-button');

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
          flashcards[currentIndex].querySelector('.front').classList.add("out");
          setTimeout(() => {
            flashcards[currentIndex].querySelector('.front').classList.remove("out");
            currentIndex--;
            showFlashcard(currentIndex);
          }, 300);
        }
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        if (currentIndex < flashcards.length - 1) {
          flashcards[currentIndex].querySelector('.front').classList.add("out");
          setTimeout(() => {
            flashcards[currentIndex].querySelector('.front').classList.remove("out");
            currentIndex++;
            showFlashcard(currentIndex);
          }, 300);
        }
      });
    }
  });

  // Initial call to show the first flashcard
  showFlashcard(currentIndex);
});