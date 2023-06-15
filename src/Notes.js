// eslint-disable-next-line import/no-extraneous-dependencies
import { useEffect, useState } from 'react';
import {
  deleteNote, getAllNotes, setNote, updateNote,
} from './fetchFacade';

export default function Notes() {
  const [noteList, setNoteList] = useState([]);
  const [noteElement, setNoteElement] = useState(noteList[0] || { id: -1, note: '' });
  if (noteElement.id === -1 && noteList.length !== 0) {
    setNoteElement(noteList[0]);
  }
  useEffect(() => {
    const dataFetch = async () => {
      getAllNotes.then((res) => setNoteList(res));
    };

    dataFetch();
  }, []);
  function handleChange(e) {
    setNoteElement({ ...noteElement, note: e.target.value });
  }

  function handleBlur() {
    if (noteElement.note === '') {
      // delete from state and from db if id > 0
      if (noteElement.id > 0) {
        const delNote = async () => {
          deleteNote(noteElement.id)
            .then(() => setNoteList(noteList.filter((el) => (el.id !== noteElement.id))));
        };
        delNote();
      }
    } else if (noteElement.id > 0) {
      updateNote(noteElement.id, noteElement)
        .then(() => setNoteList(noteList
          .map((el) => (el.id === noteElement.id ? noteElement : el))));
    } else if (noteElement.id === 0) {
      setNote(noteElement)
        .then((res) => setNoteList([...noteList, { id: res, note: noteElement.note }]));
    }
  }
  function handlePreviousButton(index) {
    setNoteElement(noteList[index - 1]);
  }
  function handleNextButton(index) {
    // eslint-disable-next-line no-unused-expressions
    setNoteElement(index < noteList.length - 1 ? noteList[index + 1] : { id: 0, note: '' });
  }

  function getIndex() {
    return noteList.findIndex((el) => el.id === noteElement.id);
  }

  return (
    <div className="NoteComponent">
      <div className="NoteComponentName">reminder</div>
      <button
        className="NoteButton"
        type="button"
        onClick={() => handlePreviousButton(getIndex())}
        disabled={getIndex() < 1}
      >
        previous
      </button>
      <button
        className="NoteButton"
        type="button"
        onClick={() => handleNextButton(getIndex())}
        disabled={getIndex() > noteList.length - 1}
      >
        next
      </button>
      <textarea
        className="Note"
        key={noteElement.id}
        value={noteElement.note}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}