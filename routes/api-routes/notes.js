const router = require('express').Router()
const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');
const { notes } = require('../../db/db.json')

router.get('/notes', (req, res) => {
    res.json(notes);
})

router.post('/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = notes.length + 1
    
    notes.push(newNote);

    const newObj = {
        'notes': notes,
        
    };

    fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(newObj), err => {
        if (err) {
            console.log(err);
        }
    });
    res.json(notes)

})


module.exports = router