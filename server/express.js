const express = require('express');
const fs = require('fs');
const path = require('path');
const csvDB = require('csv-db');

const notesDB = new csvDB('./server/tasksDB.csv')


// создание express приложения
const app = express();

// обслуживание статических ресурсов
app.get(/\.(js|css|map|ico|png)$/, express.static(path.resolve(__dirname, '../dist')));

app.use(express.json())

// get notes, altogether or by id
// http://localhost:9000/notes
app.get('/notes', (req, res) => {
  notesDB.get().then((notes) => {
    res.json(notes);
   })
});

// http://localhost:9000/note/id
app.get('/note/:id', (req, res) => {
  const noteId = req.params.id;
  notesDB.get(noteId).then((note) => {
    res.json(note);
  })
})

// new note, post request to http://localhost:9000/notes with {"note": "Note text"}
// curl -X POST -H "Content-Type: application/json" -d '{"text":"Your task description"}' http://localhost:9000/notes
app.post('/notes', (req, res) => {
  const newNote = {
    text: req.body.note
  }
  notesDB.insert(newNote).then((note) => {
    res.status(201).json(newNote);
  }, (err) => {
    res.status(500).json({error: "Failed to add note"})
  })
  })


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
