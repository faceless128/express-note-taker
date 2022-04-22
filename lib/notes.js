const fs = require("fs");
const path = require("path");

function findById(id, notesArray) {
    // show notes via id
    const result = notesArray.filter(note => note.id === id)[0]
    return result;
}

function deleteById(id, notes) {
    // delete note via id
    const noteDel = notes.map(notes => notes.id).indexOf(id);
    notes.splice(noteDel, 1);

    // writes notes to db after deleting a note
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notes, null, 2)
    );

    return notes;
}

function createNewNote(body, notesArray) {
    // creates new note
    const note = body;
    notesArray.push(note);

    // writes notes to db after adding a note
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );

    return note;
}

function validateNote(note) {
    // makes sure note has valid data
    if (!note.title || typeof note.title !== 'string') {
        return false
    }
    if (!note.text || typeof note.text !== 'string') {
        return false
    }
    return true;
}

module.exports = { findById, deleteById, createNewNote, validateNote } ;