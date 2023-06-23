import PropTypes from 'prop-types';
import { useRef } from 'react';
import taskShape from '../../utility/shape';
import { putTask, updateTask } from '../../utility/fetchFacade';

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

  return (
    <div className="task-component">
      <input
        className="task-component-text task-component-title text-style"
        value={currentTask.name || ''}
        onChange={handleNameChange}
        onBlur={handleNameBlur}
        onFocus={handleNameFocus}
        placeholder="Start typing to create new task"
        maxLength="30"
      />
      <textarea
        className="task-component-text task-component-description text-style"
        key={currentTask.id}
        value={currentTask.text}
        disabled={currentTask.id < 1}
        onChange={handleTextChange}
        onFocus={handleTextFocus}
        onBlur={handleTextBlur}
      />
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
