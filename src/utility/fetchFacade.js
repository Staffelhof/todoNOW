import {
  deleteByTypeAndId, getAll, getByTypeAndId, setByType, updateByTypeAndId,
} from './fetchUtility';

export const getAllTasks = getAll('tasks');
export const getAllNotes = getAll('notes');
export const getTask = (id) => getByTypeAndId('task', id);
export const getNote = (id) => getByTypeAndId('note', id);
export const putTask = (obj) => setByType('tasks', obj, 'POST');
export const putNote = (obj) => setByType('notes', obj, 'POST');
export const updateTask = (id, obj) => updateByTypeAndId('task', id, obj, 'PUT');
export const updateNote = (id, obj) => updateByTypeAndId('note', id, obj, 'PUT');
export const deleteTask = (id) => deleteByTypeAndId('task', id);
export const deleteNote = (id) => deleteByTypeAndId('note', id);
