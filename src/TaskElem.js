// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

export default function TaskElem({ currentTask, setCurrentTask, updateTaskList }) {
  function handleChange(e) {
    setCurrentTask({ ...currentTask, text: e.target.value });
  }
  function handleNameChange(e) {
    setCurrentTask({ ...currentTask, name: e.target.value });
    updateTaskList({ ...currentTask, name: e.target.value });
  }

  return (
    <div>
      <input
        value={currentTask.name || ''}
        onChange={handleNameChange}
        placeholder="Task name"
      />
      <textarea
        className="TaskElement"
        key={currentTask.id}
        value={currentTask.text}
        onChange={handleChange}
      />
      <button type="button">Done</button>
      <button type="button">Failed</button>
      <button type="button">Options</button>
      <button type="button">Clear</button>
    </div>
  );
}

const shape = {
  id: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
  isCompleted: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
};
TaskElem.propTypes = {
  currentTask: PropTypes.shape(shape),
  setCurrentTask: PropTypes.func,
  updateTaskList: PropTypes.func,
};

TaskElem.defaultProps = {
  currentTask: {},
  setCurrentTask: () => '',
  updateTaskList: () => '',
};
