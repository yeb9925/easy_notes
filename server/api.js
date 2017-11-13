const router = require('express').Router();
const mongo = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');

const key = require('../config');

module.exports = router;

//get all notes
router.get('/', (req, res, next) => {
  let allNotes = [];
  mongo.connect(key, (err, db) => {
    const cursor = db.collection('notes').find({});
    cursor.forEach(note => allNotes.push(note), 
    () => {    
      db.close();
      res.json(allNotes);
    });
  });
});

//get all notes for the specific day
router.get('/:date', (req, res, next) => {
  let dayNotes = [],
      date = req.params.date;
  mongo.connect(key, (err, db) => {
    cursor = db.collection('notes').find({ date });
    cursor.forEach(note => dayNotes.push(note), 
      () => {    
        db.close();
        res.json(dayNotes);
      });
    });
});

//get just one note
router.get('/one/:id', (req, res, next) => {
  let oneNote,
      _id = ObjectId(req.params.id);

  mongo.connect(key, (err, db) => {
    cursor = db.collection('notes').find({ _id });
    cursor.forEach(note => oneNote = note,
      () => {
        db.close();
        res.json(oneNote);
      }
    );
  });
});

//make a new note
router.post('/', (req, res, next) => {
  const topic = req.body.topic,
        date = req.body.date,
        content = req.body.content;

  mongo.connect(key, (err, db) => {
    db.collection('notes').insertOne({ topic, date, content });
    db.close();
  });
  res.sendStatus(201);
});

//update an existing note
router.put('/:id', (req, res, next) => {
  const _id = ObjectId(req.params.id),
        updates = req.body;
  mongo.connect(key, (err, db) => {
    db.collection('notes').update(
      { _id }, //find by _id
      updates // update the note
    );
    db.close();
  });
  res.sendStatus(200);
});

//delete the existing note
router.delete('/:id', (req, res, next) => {
  const _id = ObjectId(req.params.id);
  mongo.connect(key, (err, db) => {
    db.collection('notes').remove( { _id } );
    db.close();
  });
  res.sendStatus(200);
});


//error handling
router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

