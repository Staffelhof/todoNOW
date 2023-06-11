const express = require('express');
const fs = require('fs');
const path = require('path');
const CsvDB = require('csv-db');

const notesDB = new CsvDB('./server/notesDB.csv');
const tasksDB = new CsvDB('./server/tasksDB.csv');

// создание express приложения
const app = express();

// обслуживание статических ресурсов
app.get(/\.(js|css|map|ico|png)$/, express.static(path.resolve(__dirname, '../dist')));

app.use(express.json());

// get all notes
// curl http://localhost:9000/notes
app.get('/notes', (req, res) => {
  notesDB.get().then((notes) => {
    res.status(200).json(notes);
  });
});

// get note by id
// curl http://localhost:9000/note/{id}
app.get('/note/:id', (req, res) => {
  const noteId = req.params.id;
  notesDB.get(noteId).then((note) => {
    res.status(200).json(note);
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

/*
update note, patch request to http://localhost:9000/note/{id} with {"note": "Note new text"}
will return 404 if note not found
curl -X PATCH -H "Content-Type: application/json" -d '{"note":"Note new text"}' http://localhost:9000/note/{id}
*/
app.patch('/note/:id', (req, res) => {
  const noteId = req.params.id;
  const updatedNote = {
    id: noteId,
    note: req.body.note,
  };
  notesDB.get(noteId).then((note) => {
    if (note) {
      notesDB.update(updatedNote, noteId).then(() => {
        res.status(201).json({ note });
      }, (err) => {
        res.status(500).json({ error: err });
      });
    } else {
      res.status(404).json({ error: 'not found' });
    }
  }, (err) => {
    res.status(500).json({ error: err });
  });
});

/*
delete note by id, delete request to http://localhost:9000/note/{id}
will return 404 if note not found
curl -X DELETE http://localhost:9000/note/{id}
*/
app.delete('/note/:id', (req, res) => {
  const noteId = req.params.id;
  notesDB.get(noteId).then((note) => {
    if (note) {
      notesDB.delete(noteId).then(() => {
        res.status(200).json({ message: 'deleted' });
      }, (err) => {
        res.status(500).json({ error: err });
      });
    } else {
      res.status(404).json({ error: 'not found' });
    }
  }, (err) => {
    res.status(500).json({ error: err });
  });
});

// get all tasks
// curl http://localhost:9000/tasks
app.get('/tasks', (req, res) => {
  tasksDB.get().then((tasks) => {
    res.status(200).json(tasks);
  });
});

// get note by id
// curl http://localhost:9000/task/{id}
app.get('/task/:id', (req, res) => {
  const taskId = req.params.id;
  tasksDB.get(taskId).then((task) => {
    res.status(200).json(task);
  });
});

/*
new task - post request with properly constructed body, no validating so far
curl -X POST -H "Content-Type: application/json" -d '{"name":"Your task description","text":"task text","isCompleted":0, "startTime":"202306061200","endTime":"202307061200"}' http://localhost:9000/tasks
*/
app.post('/tasks', (req, res) => {
  // validate if fields are not empty "maybe later"
  const newTask = {
    name: req.body.name,
    text: req.body.text,
    isCompleted: req.body.isCompleted,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  };
  tasksDB.insert(newTask).then((task) => {
    res.status(201).json(task);
  }, (err) => {
    res.status(500).json({ error: err });
  });
});

/*
update task, patch request to http://localhost:9000/task/{id} with properly constructed body
will return 404 if task not found
curl -X PATCH -H "Content-Type: application/json" -d '{"name":"Your task description","text":"task text","isCompleted":0, "startTime":"202306061200","endTime":"202307061200"}' http://localhost:9000/task/{id}
*/
app.patch('/task/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = {
    id: taskId,
    name: req.body.name,
    text: req.body.text,
    isCompleted: req.body.isCompleted,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  };
  tasksDB.get(taskId).then((task) => {
    if (task) {
      tasksDB.update(updatedTask, taskId).then(() => {
        res.status(201).json({ message: 'task updated' });
      }, (err) => {
        res.status(500).json({ error: err });
      });
    } else {
      res.status(404).json({ error: 'not found' });
    }
  }, (err) => {
    res.status(500).json({ error: err });
  });
});

/*
delete task by id, delete request to http://localhost:9000/task/{id}
will return 404 if no such task
curl -X DELETE http://localhost:9000/task/{id}
*/
app.delete('/task/:id', (req, res) => {
  const taskId = req.params.id;
  tasksDB.get(taskId).then((task) => {
    if (task) {
      tasksDB.delete(taskId).then(() => {
        res.status(200).json({ message: 'deleted' });
      }, (err) => {
        res.status(500).json({ error: err });
      });
    } else {
      res.status(404).json({ error: 'not found' });
    }
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
