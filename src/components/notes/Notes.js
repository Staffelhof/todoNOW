import { useEffect, useRef, useState } from 'react';
import {
  deleteNote, getAllNotes, putNote, updateNote,
} from '../../utility/fetchFacade';

export default function Notes() {
  const elem = useRef('');
  const [noteList, setNoteList] = useState([]);
  const [noteElement, setNoteElement] = useState(noteList[0] || { id: -1, note: '' });
  function changeRef(note) {
    elem.current = note;
  }
  if (noteElement.id === -1 && noteList.length !== 0) {
    setNoteElement(noteList[0]);
    changeRef(noteList[0].note);
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
    } else if (noteElement.id > 0 && elem.current !== noteElement.note) {
      updateNote(noteElement.id, noteElement)
        .then(() => changeRef(noteElement.note))
        .then(() => setNoteList(noteList
          .map((el) => (el.id === noteElement.id ? noteElement : el))));
    } else if (noteElement.id === 0) {
      putNote(noteElement)
        .then(() => changeRef(noteElement.note))
        .then((res) => setNoteList([...noteList, { id: res, note: noteElement.note }]));
    }
  }
  function handlePreviousButton(index) {
    const noteListElement = noteList[index - 1];
    setNoteElement(noteListElement);
    changeRef(noteListElement.note);
  }
  function handleNextButton(index) {
    const noteListElement = index < noteList.length - 1 ? noteList[index + 1] : { id: 0, note: '' };
    setNoteElement(noteListElement);
    changeRef(noteListElement.note);
  }

  function getIndex() {
    return noteList.findIndex((el) => el.id === noteElement.id);
  }

  return (
    <div className="note-component">
      <button
        className="note-component-nav-button"
        type="button"
        onClick={() => handlePreviousButton(getIndex())}
        disabled={getIndex() < 1}
      >
        &lt;
      </button>
      <div className="note-component-name text-style">Reminder</div>
      <button
        className="note-component-nav-button"
        type="button"
        onClick={() => handleNextButton(getIndex())}
        disabled={getIndex() > noteList.length - 1}
      >
        &gt;
      </button>
      <textarea
        className="note-component-text text-style"
        key={noteElement.id}
        value={noteElement.note}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}
