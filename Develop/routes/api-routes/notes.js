const router = require('express').Router()
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { notes } = require('../../db/notes.json')

router.get('/notes', (req, res) => {
    res.json(notes);
})

router.post('/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();

    notes.push(newNote);

    const newObj = {
        'notes': notes
    };

    fs.writeFile(path.join(__dirname, '../../db/notes.json'), JSON.stringify(newObj), err => {
        if (err) {
            console.log(err);
        }
    });
    res.json(notes)

})


module.exports = router