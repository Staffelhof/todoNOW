const express = require('express');

const fs = require('fs');

const path = require('path');
const CsvDB = require('csv-db');

const notesDB = new CsvDB('./server/notesDB.csv');
const tasksDB = new CsvDB('./server/tasksDB.csv');

// создание express приложения
const app = express();
app.use(express.json());

// helper functions start
function getItems(db, res) {
  db.get()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

function getItem(itemId, db, res) {
  db.get(itemId)
    .then((item) => {
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json({ error: 'not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

function insertItem(item, db, res) {
  db.insert(item)
    .then((insertedItem) => {
      res.status(201).json(insertedItem);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

function updateItem(itemId, updatedItem, db, res) {
  db.get(itemId)
    .then((item) => {
      if (item) {
        db.update(updatedItem, itemId)
          .then(() => {
            res.status(201).json({ message: 'item updated' });
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      } else {
        res.status(404).json({ error: 'not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

function deleteItem(itemId, db, res) {
  db.get(itemId)
    .then((item) => {
      if (item) {
        db.delete(itemId)
          .then(() => {
            res.status(200).json({ message: 'deleted' });
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      } else {
        res.status(404).json({ error: 'not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
// helper functions end

// get all notes
// curl http://localhost:9000/notes
app.get('/notes', (req, res) => {
  getItems(notesDB, res);
});

// get note by id
// curl http://localhost:9000/note/{id}
app.get('/note/:id', (req, res) => {
  const noteId = req.params.id;
  getItem(noteId, notesDB, res);
});

// new note, post request to http://localhost:9000/notes with {"note": "Note text"}
// curl -X POST -H "Content-Type: application/json" -d '{"note":"Your task description"}' http://localhost:9000/notes
app.post('/notes', (req, res) => {
  const newNote = {
    note: req.body.note,
  };
  insertItem(newNote, notesDB, res);
});

/*
update note, put request to http://localhost:9000/note/{id} with {"note": "Note new text"}
will return 404 if note not found
curl -X PUT -H "Content-Type: application/json" -d '{"note":"Note new text"}' http://localhost:9000/note/{id}
*/
app.put('/note/:id', (req, res) => {
  const noteId = req.params.id;
  const updatedNote = {
    id: noteId,
    note: req.body.note,
  };
  updateItem(noteId, updatedNote, notesDB, res);
});

/*
delete note by id, delete request to http://localhost:9000/note/{id}
will return 404 if note not found
curl -X DELETE http://localhost:9000/note/{id}
*/
app.delete('/note/:id', (req, res) => {
  const noteId = req.params.id;
  deleteItem(noteId, notesDB, res);
});

// get all tasks
// curl http://localhost:9000/tasks
app.get('/tasks', (req, res) => {
  getItems(tasksDB, res);
});

// get note by id
// curl http://localhost:9000/task/{id}
app.get('/task/:id', (req, res) => {
  const taskId = req.params.id;
  getItem(taskId, tasksDB, res);
});

/*
new task - post request with properly constructed body, no validating so far
curl -X POST -H "Content-Type: application/json" -d '{"name":"Your task description","text":"task text","isCompleted":0, "startTime":"202306061200","endTime":"202307061200"}' http://localhost:9000/tasks
*/
app.post('/tasks', (req, res) => {
  const newTask = {
    name: req.body.name,
    text: req.body.text,
    isCompleted: req.body.isCompleted,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  };
  insertItem(newTask, tasksDB, res);
});

/*
update task, put request to http://localhost:9000/task/{id} with properly constructed body
will return 404 if task not found
curl -X PUT -H "Content-Type: application/json" -d '{"name":"Your task description","text":"task text","isCompleted":0, "startTime":"202306061200","endTime":"202307061200"}' http://localhost:9000/task/{id}
*/
app.put('/task/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = {
    id: taskId,
    name: req.body.name,
    text: req.body.text,
    isCompleted: req.body.isCompleted,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  };
  updateItem(taskId, updatedTask, tasksDB, res);
});

/*
delete task by id, delete request to http://localhost:9000/task/{id}
will return 404 if no such task
curl -X DELETE http://localhost:9000/task/{id}
*/
app.delete('/task/:id', (req, res) => {
  const taskId = req.params.id;
  deleteItem(taskId, tasksDB, res);
});

// обслуживание статических ресурсов
app.get(/\.(js|css|map|ico|png)$/, express.static(path.resolve(__dirname, '../dist')));

app.use('*', (req, res) => {
// читаем файл `index.html`
  const indexHTML = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), {
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
