const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const  { findById, deleteById, createNewNote, validateNote } = require('../../lib/notes');
var notes = require('../../db/db');
const router = require('express').Router();

router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
    res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
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
    console.log(notes)
    const results = deleteById(req.params.id, notes);
    if (results) {
        res.json(results);
        console.log(notes, results)
    } else {
        res.send(404);
    }
});

module.exports = router;
