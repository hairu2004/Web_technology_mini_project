import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async (note) => {
    try {
      const response = await axios.post('http://localhost:5000/notes', note);
      setNotes([...notes, response.data]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const editNote = (note) => {
    setCurrentNote(note);
  };

  const updateNote = async (id, updatedNote) => {
    try {
      const response = await axios.put(`http://localhost:5000/notes/${id}`, updatedNote);
      setNotes(notes.map(note => (note._id === id ? response.data : note)));
      setCurrentNote(null);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Note Taking App</h1>
      <NoteForm addNote={addNote} currentNote={currentNote} updateNote={updateNote} />
      <NoteList notes={notes} deleteNote={deleteNote} editNote={editNote} />
    </div>
  );
};

export default App;
