## Databases

both DB are csv based - meaning there are no data types

### notesDB.csv

two field:

* iterated int `id`
* string `note`

### tasksDB.csv

fields:

* iterated int `id`;
* string `name`
* string `text`;
* string indicating boolean state `isCompleted`, 1/0 is suggested;
* datetime in string (conversion done in client app) `startTime`, `endTime`

### how to use

##### get all notes/tasks

`GET` request to `http://localhost:9000/{notes/tasks}`
This will return all notes/tasks

#### get note/task by ID

`GET` request to `http://localhost:9000/{note/task}/{id}`
This will specific note/task or return 404 if note/task not found

#### new note

`PUT` request to `http://localhost:9000/notes` with JSON body `{"note": "Your task description"}`
This will add new note and return its ID

#### new task

`PUT` request to `http://localhost:9000/tasks` with JSON body

``` json
{
  "name": "Your task description",
  "text": "task text",
  "isCompleted": 0,
  "startTime": "202306061200",
  "endTime": "202307061200"
}
```

This will add new task and return its ID. Fields values are not being validated.

#### update note

`PATCH` request to `http://localhost:9000/note/{id}` with JSON body `{"note": "Your task description"}`
This will update specific note or return 404 if note not found

#### update task

`PATCH` request to `http://localhost:9000/task/{id}` with JSON body

``` json
{
  "name": "Your task description",
  "text": "task text",
  "isCompleted": 1,
  "startTime": "202306061200",
  "endTime": "202307061200"
}
```

This will update specific task or return 404 if note not found

#### delete note/task

`DELETE` request to `http://localhost:9000/{note\task}\{id}`
This will delete specific note/task or return 404 is note/task not found