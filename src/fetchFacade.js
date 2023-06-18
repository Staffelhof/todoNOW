import {
  deleteByTypeAndId, getAll, getByTypeAndId, setByTypeAndId, updateByTypeAndId,
} from './fetchUtility';

export const getAllTasks = getAll('tasks');
export const getAllNotes = getAll('notes');
export const getTask = (id) => getByTypeAndId('task', id);
export const getNote = (id) => getByTypeAndId('note', id);
export const putTask = (obj) => setByTypeAndId('tasks', obj);
export const putNote = (obj) => setByTypeAndId('notes', obj);
export const updateTask = (id, obj) => updateByTypeAndId('task', id, obj);
export const updateNote = (id, obj) => updateByTypeAndId('note', id, obj);
export const deleteTask = (id) => deleteByTypeAndId('task', id);
export const deleteNote = (id) => deleteByTypeAndId('note', id);
