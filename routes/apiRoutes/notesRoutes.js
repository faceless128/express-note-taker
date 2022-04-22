const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const  { findById, deleteById, createNewNote, validateNote } = require('../../lib/notes');
var notes = require('../../db/db');
const router = require('express').Router();

router.get('/notes', (req, res) => {
    // show all notes
    let results = notes;
    res.json(results);
});

router.get('/notes/:id', (req, res) => {
    // get notes via id
    const result = findById(req.params.id, notes);
    if (result) {
    res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/notes', (req, res) => {
    // set id with uuid module
    req.body.id = uuidv4();

    // if any data in req.body is incorrect, send 400 error back

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    // delete individual note
    const results = deleteById(req.params.id, notes);
    if (results) {
        res.json(results);
    } else {
        res.send(404);
    }
});

module.exports = router;
