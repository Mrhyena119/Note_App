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
      noteElement.textContent = noteText;

      noteElement.addEventListener('click', () => {
        noteElement.remove();
        saveNotes();
        updateNotesList();
      });

      notesContainer.appendChild(noteElement);
    });
    updateNotesList();
  }

  function saveNotes() {
    const notes = Array.from(notesContainer.children).map(note => note.textContent);
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  function updateNotesList() {
    clearNotesButton.style.display = notesContainer.children.length > 0 ? 'block' : 'none';
  }

  addNoteButton.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    if (noteText === '') {
      alert('Please write something in the note.');
      return;
    }

    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.textContent = noteText;

    noteElement.addEventListener('click', () => {
      noteElement.remove();
      saveNotes();
      updateNotesList();
    });

    notesContainer.appendChild(noteElement);
    noteInput.value = '';
    saveNotes();
    updateNotesList();
  });

  clearNotesButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all notes?')) {
      notesContainer.innerHTML = '';
      saveNotes();
      updateNotesList();
    }
  });

  loadNotes();
});