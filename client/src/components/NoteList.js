import React from 'react';
import './NoteList.css';

const NoteList = ({ notes, deleteNote, editNote }) => {
    return (
        <div>
            {notes.map(note => (
                <div className="note-container" key={note._id}>
                    <h2 className="note-title">{note.title}</h2>
                    <p className="note-content">{note.content}</p>
                    <button className="delete-button" onClick={() => deleteNote(note._id)}>Delete</button>
                    <button className="edit-button" onClick={() => editNote(note)}>Edit</button>
                </div>
            ))}
        </div>
    );
};

export default NoteList;
