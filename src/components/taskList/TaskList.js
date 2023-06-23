import PropTypes from 'prop-types';
import taskShape from '../../utility/shape';
import { deleteTask, updateTask } from '../../utility/fetchFacade';
import trash from '../../assets/images/trash.png';
import done from '../../assets/images/done.png';

export default function TaskList({
  tasklist, setTasklist, setCurrentTask, currentTask,
}) {
  const handleClick = (event, elemet) => {
    setCurrentTask(elemet);
  };
  const handleDeleteClick = (event, elemet) => {
    if (elemet.id === currentTask.id) {
      setCurrentTask(null);
    }
    deleteTask(elemet.id).then(setTasklist(tasklist.filter((el) => el.id !== elemet.id)));
  };
  const handleDoneClick = (event, elemet) => {
    const updatedTask = { ...elemet, isCompleted: elemet.isCompleted === '0' ? '1' : '0' };
    updateTask(elemet.id)
      .then(setTasklist(tasklist.map((el) => (el.id === updatedTask.id ? updatedTask : el))));
    if (elemet.id === currentTask.id) {
      setCurrentTask(updatedTask);
    }
  };
  function onKeyPressed() {
    //  no-op
  }
  return (
    <div className="task-list">
      <div className="task-list-title text-style">Task List</div>
      <div className="task-list-lines-block">
        {tasklist.map((el) => (
          <div className="wrapper">
            <div className="task-list-line">
              <button
                className="task-list-done-button"
                disabled={el.id < 1}
                type="button"
                onClick={(event) => handleDoneClick(event, el)}
              >
                {el.isCompleted !== '0'
                  ? <img className="task-list-button-image" src={done} alt="Done" />
                  : ''}
              </button>
              <div
                role="button"
                className={`task-line-text text-style ${el.id < 1 ? 'new-task' : ''} ${el.isCompleted !== '0' ? 'done-task' : ''}`}
                tabIndex={0}
                key={el.id}
                onClick={(event) => handleClick(event, el)}
                onKeyDown={onKeyPressed}
              >
                {el.name || 'Add new task'}
              </div>
              <button
                className="task-list-delete-button"
                type="button"
                disabled={el.id < 1}
                onClick={(event) => handleDeleteClick(event, el)}
              >
                {el.id < 1 ? '' : <img className="task-list-button-image" src={trash} alt="delete" />}
              </button>
            </div>
            <div><hr className="hr-line" /></div>
          </div>
        ))}
      </div>
    </div>

  );
}

TaskList.propTypes = {
  tasklist: PropTypes.arrayOf(PropTypes.shape(taskShape())),
  setTasklist: PropTypes.func,
  setCurrentTask: PropTypes.func,
  currentTask: PropTypes.shape(taskShape()),
};

TaskList.defaultProps = {
  tasklist: [],
  setTasklist: () => 'a',
  setCurrentTask: () => 'a',
  currentTask: {},
};
