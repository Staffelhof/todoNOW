const express = require('express');
const fs = require('fs');
const path = require('path');
const CsvDB = require('csv-db');

const notesDB = new CsvDB('./server/notesDB.csv');
// const tasksDB = new CsvDB('./server/tasksDB.csv');

// создание express приложения
const app = express();

// обслуживание статических ресурсов
app.get(/\.(js|css|map|ico|png)$/, express.static(path.resolve(__dirname, '../dist')));

app.use(express.json());

// get all notes
// curl http://localhost:9000/notes
app.get('/notes', (req, res) => {
  notesDB.get().then((notes) => {
    res.json(notes);
  });
});

// get note by id
// curl http://localhost:9000/note/{id}
app.get('/note/:id', (req, res) => {
  const noteId = req.params.id;
  notesDB.get(noteId).then((note) => {
    res.json(note);
  });
});

// new note, post request to http://localhost:9000/notes with {"note": "Note text"}
// curl -X POST -H "Content-Type: application/json" -d '{"note":"Your task description"}' http://localhost:9000/notes
app.post('/notes', (req, res) => {
  const newNote = {
    note: req.body.note,
  };
  notesDB.insert(newNote).then((note) => {
    res.status(201).json(note);
  }, (err) => {
    res.status(500).json({ error: err });
  });
});

// update note, patch request to http://localhost:9000/note/{id} with {"note": "Note new text"}
// will say it's okay even if note id is wrong.
// curl -X PATCH -H "Content-Type: application/json" -d '{"note":"Note new text"}' http://localhost:9000/note/{id}
app.patch('/note/:id', (req, res) => {
  const noteId = req.params.id;
  const updatedNote = {
    id: noteId,
    note: req.body.note,
  };
  notesDB.update(updatedNote, noteId).then((note) => {
    if (note > 0) { // this doesn't work :(
      res.json({ message: 'note updated' });
    } else {
      res.status(404).json({ error: 'not found' });
    }
  }, (err) => {
    res.status(500).json({ error: err });
  });
});

// delete note by id, delete request to http://localhost:9000/note/{id}
// curl -X DELETE http://localhost:9000/note/{id}
app.delete('/note/:id', (req, res) => {
  const noteId = req.params.id;
  notesDB.delete(noteId).then(() => {
    res.json({ message: 'deleted' });
  }, (err) => {
    res.status(500).json({ error: err });
  });
});

app.use('*', (req, res) => {
// читаем файл `index.html`
  const indexHTML = fs.readFileSync(path.resolve(__dirname, './index.html'), {
    encoding: 'utf8',
  });

  // устанавливаем заголовок и статус
  res.contentType('text/html');
  res.status(200);

  return res.send(indexHTML);
});

// запускаем сервер на порту 9000
app.listen('9000', () => {
  console.log('Express server started at <http://localhost:9000>');
});
