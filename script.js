document.addEventListener('DOMContentLoaded', () => {
  const noteInput = document.getElementById('note-input');
  const addNoteButton = document.getElementById('add-note');
  const notesContainer = document.getElementById('notes-container');
  const clearNotesButton = document.getElementById('clear-notes');

  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notesContainer.innerHTML = '';
    notes.forEach(noteText => {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
      noteElement.innerHTML = noteText.replace(/\n/g, '<br>'); // Convert newlines to <br> for display

      const deleteIcon = document.createElement('div');
      deleteIcon.classList.add('delete-icon');
      deleteIcon.addEventListener('click', () => {
        noteElement.remove();
        saveNotes();
        updateNotesList();
      });

      noteElement.appendChild(deleteIcon);

      noteElement.addEventListener('click', () => {
        noteElement.classList.toggle('completed');
        saveNotes();
      });

      notesContainer.appendChild(noteElement);
    });
    updateNotesList();
  }

  function saveNotes() {
    const notes = Array.from(notesContainer.children).map(note => note.innerHTML.replace(/<div[^>]*>.*<\/div>/, '').trim());
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  function updateNotesList() {
    if (notesContainer.children.length > 0) {
      clearNotesButton.style.display = 'block';
    } else {
      clearNotesButton.style.display = 'none';
    }
  }

  addNoteButton.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    if (noteText === '') {
      alert('Please write something in the note.');
      return;
    }

    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.innerHTML = noteText.replace(/\n/g, '<br>'); // Convert newlines to <br> for display

    const deleteIcon = document.createElement('div');
    deleteIcon.classList.add('delete-icon');
    deleteIcon.innerHTML = '❌';
    deleteIcon.addEventListener('click', () => {
      noteElement.remove();
      saveNotes();
      updateNotesList();
    });

    noteElement.appendChild(deleteIcon);

    noteElement.addEventListener('click', () => {
      noteElement.classList.toggle('completed');
      saveNotes();
    });

    notesContainer.appendChild(noteElement);
    noteInput.value = '';
    saveNotes();
    updateNotesList();
  });

  // Listen for Enter key press
  noteInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form from submitting
      addNoteButton.click(); // Trigger the add note button click
    }
  });

  clearNotesButton.addEventListener('click', () => {
    notesContainer.innerHTML = '';
    saveNotes();
    updateNotesList();
  });

  loadNotes();
});