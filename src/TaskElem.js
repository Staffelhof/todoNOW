import PropTypes from 'prop-types';
import { useRef } from 'react';
import taskShape from './shape';
import { putTask, updateTask, deleteTask } from './fetchFacade';
import done from './done.png';
import cross from './cross.png';
import dots from './dots.png';

const taskCreate = true;
const taskDelete = true;
export default function TaskElem({ currentTask, setCurrentTask, updateTaskList }) {
  const nameRef = useRef('');
  const textRef = useRef('');

  function changeHandler(obj) {
    setCurrentTask({ ...currentTask, ...obj });
    updateTaskList({ ...currentTask, ...obj }, !taskCreate, !taskDelete);
  }
  function handleTextChange(e) {
    changeHandler({ text: e.target.value });
  }
  function handleNameChange(e) {
    changeHandler({ name: e.target.value });
  }
  function handleNameBlur() {
    if (nameRef.current === currentTask.name) {
      return;
    }
    if (currentTask.id < 1) {
      const newTask = { ...currentTask, startTime: new Date().toISOString() };
      putTask(newTask)
        .then((res) => ({ ...newTask, id: `${res}` }))
        .then((res) => {
          setCurrentTask(res);
          return res;
        })
        .then((res) => updateTaskList(res, taskCreate, !taskDelete));
    } else {
      updateTask(currentTask.id, currentTask);
    }
  }

  function handleTextBlur() {
    if (textRef.current === currentTask.text) {
      return;
    }
    if (currentTask.id < 1 && currentTask.text !== '') {
      alert('Set name of the task first');
    } else {
      updateTask(currentTask.id, currentTask);
    }
  }
  function handleNameFocus() {
    nameRef.current = currentTask.name;
  }
  function handleTextFocus() {
    textRef.current = currentTask.text;
  }
  function handleDoneClick() {
    if (currentTask.id < 1) {
      alert("You can't complete task without name");
    }
    const status = currentTask.isCompleted === '0' ? '1' : '0';
    const updatedTask = { ...currentTask, isCompleted: status };
    updateTask(currentTask.id, updatedTask)
      .then(setCurrentTask(updatedTask))
      .then(updateTaskList(updatedTask, !taskCreate, !taskDelete));
  }
  function handleFailedClick() {
    alert('"Failure Is Not an Option" (c) NASA Flight Director Gene Kranz');
  }
  function handleOptionsClick() {
    alert('There are currently no power options available');
  }
  function handleDeleteClick() {
    if (currentTask.id < 1) {
      return;
    }
    const taskToDelete = currentTask;
    JSON.stringify(taskToDelete);
    deleteTask(currentTask.id)
      .then(updateTaskList(taskToDelete, !taskCreate, taskDelete));
  }

  return (
    <div className="TaskComponent">
      <input
        className="TaskTextElement task-name-title"
        value={currentTask.name || ''}
        onChange={handleNameChange}
        onBlur={handleNameBlur}
        onFocus={handleNameFocus}
        placeholder="Task name"
      />
      <textarea
        className="TaskTextElement task-description"
        key={currentTask.id}
        value={currentTask.text}
        disabled={currentTask.id < 1}
        onChange={handleTextChange}
        onFocus={handleTextFocus}
        onBlur={handleTextBlur}
      />
      <div className="ButtonBar">
        <button type="button" className="TaskComponentButton" disabled={currentTask.id < 1} onClick={handleDoneClick}>
          {currentTask.isCompleted !== '0'
            ? <img className="doneElementImage" src={done} alt="Done" />
            : ''}
        </button>
        <button
          type="button"
          className="TaskComponentButton"
          disabled={currentTask.id < 1}
          onClick={handleFailedClick}
        >
          <img className="crossElementImage" src={cross} alt="Done" />
        </button>
        <button
          type="button"
          className="TaskComponentButton"
          disabled={currentTask.id < 1}
          onClick={handleOptionsClick}
        >
          <img className="dotsElementImage" src={dots} alt="Done" />
        </button>
        <button
          type="button"
          className="TaskComponentDeleteButton"
          onClick={handleDeleteClick}
          disabled={currentTask.id < 1}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

TaskElem.propTypes = {
  currentTask: PropTypes.shape(taskShape()),
  setCurrentTask: PropTypes.func,
  updateTaskList: PropTypes.func,
};

TaskElem.defaultProps = {
  currentTask: {},
  setCurrentTask: () => '',
  updateTaskList: () => '',
};
