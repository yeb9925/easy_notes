const router = require('expres').Router();
const MongoClient = require('mongodb').MongoClient;

const key = require('../config');

module.exports = router;

//get all notes
router.get('/', (req, res, next) => {
  const allNotes;
  MongoClient.connect(key, (err, db) => {
    allNotes = db.notes.find({});
    db.close();
  });
  res.json(allNotes);
});

//get all notes for the specific day
router.get('/:day', (req, res, next) => {
  const dayNotes,
        day = req.params.day;
  MongoClient.connect(key, (err, db) => {
    dayNotes = db.notes.find({ day });
    db.close();
  });
  res.json(dayNotes);
});

//get just one note
router.get('/:id', (req, res, next) => {
  const oneNote,
        _id = req.params.id;
  MongoClient.connect(key, (err, db) => {
    oneNote = db.notes.findOne({ _id });
    db.close();
  });
  res.json(oneNote);
});

//make a new note
router.post('/', (req, res, next) => {
  const topic = req.body.topic,
        date = req.body.date,
        content = req.body.content;

  MongoClient.connect(key, (err, db) => {
    db.notes.insert({ topic, date, content });
    db.close();
  });
});

//update an existing note
router.put('/:id', (req, rex, next) => {
  const _id = req.params.id,
        updates = req.body;
  MongoClient.connect(key, (err, db) => {
    db.notes.update(
      { _id }, //find by _id
      updates // update the note
    );
    db.close();
  });
});

//delete the existing note
router.delete('/:id', (req, res, next) => {
  const _id = req.params.id;
  MongoClient.connect(key, (err, db) => {
    db.notes.remove( { _id } );
    db.close();
  });
});


//error handling
router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

