const fs = require("fs");
const path = require("path");

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0]
    return result;
}

function deleteById(id, notes) {
    const noteDel = notes.map(notes => notes.id).indexOf(id);
    notes.splice(noteDel, 1);
    console.log(notes);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notes, null, 2)
    );

    return notes;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );

    return note;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false
    }
    if (!note.text || typeof note.text !== 'string') {
        return false
    }
    console.log(note);
    return true;
}

module.exports = { findById, deleteById, createNewNote, validateNote } ;