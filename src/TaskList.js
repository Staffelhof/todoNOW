// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

export default function TaskList({ tasklist, setTasklist, setCurrentTask }) {
  const handleClick = (event, elemet) => {
    setTasklist(tasklist);
    setCurrentTask(elemet);
  };
  function onKeyPressed(e) {
    console.log(e.key);
  }
  return (
    <div>
      {console.log(tasklist)}
      {tasklist.map((el) => (
        <div className="TaskListElement">
          <button
            type="button"
          >
            {el.isCompleted !== '0' ? 'V' : ''}
          </button>
          <div
            role="button"
            placeholder="Add new task"
            tabIndex={0}
            key={el.id}
            onClick={(event) => handleClick(event, el)}
            onKeyDown={onKeyPressed}
          >
            {el.name || 'Add new task'}
          </div>
        </div>
      ))}
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
TaskList.propTypes = {
  tasklist: PropTypes.arrayOf(PropTypes.shape(shape)),
  setTasklist: PropTypes.func,
  setCurrentTask: PropTypes.func,
};

TaskList.defaultProps = {
  tasklist: [],
  setTasklist: () => 'a',
  setCurrentTask: () => 'a',
};
