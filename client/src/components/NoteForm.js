import React, { useState, useEffect } from 'react';
import './NoteForm.css';

const NoteForm = ({ addNote, currentNote, updateNote }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (currentNote) {
            setTitle(currentNote.title);
            setContent(currentNote.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [currentNote]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (currentNote) {
            updateNote(currentNote._id, { title, content });
        } else {
            addNote({ title, content });
        }
        setTitle('');
        setContent('');
    };

    return (
        <div className="form-container">
            <form className="note-form" onSubmit={onSubmit}>
                <input
                    className="note-input"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    className="note-textarea"
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
                <button className="add-button" type="submit">
                    {currentNote ? 'Update Note' : 'Add Note'}
                </button>
            </form>
        </div>
    );
};

export default NoteForm;
