## Databases

both DB are csv based - meaning there are no data types

### notesDB.csv
two field:
* iterated int `id`
* string `note`

### tasksDB.csv
fields:
* inerated int `id`;
* string `name`
* string `text`;
* boolean (1/0) `completed`;
* datetime in string (conversion done in client app) `startTime`, `endTime`