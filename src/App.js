import './App.css';
import { useEffect, useState } from 'react';
import Notes from './Notes';
import TaskList from './TaskList';
import TaskElem from './TaskElem';
import {
  getAllTasks,
} from './fetchFacade';

const emptyTask = {
  id: '-1', name: '', text: '', isCompleted: '0',
};

function App() {
  const [taskList, setTaskList] = useState([]);
  const [currentTask, setCurrentTask] = useState(emptyTask);

  useEffect(() => {
    const dataFetch = async () => {
      getAllTasks.then((res) => setTaskList([...res, emptyTask]));
    };

    dataFetch();
  }, []);

  return (
    <div className="main">
      <div className="to-do">To-Do</div>
      <div className="now">Now</div>
      <TaskList
        tasklist={taskList}
        setTasklist={(list) => setTaskList(list)}
        setCurrentTask={(task) => setCurrentTask(task || emptyTask)}
        currentTask={currentTask}
      />
      <TaskElem
        currentTask={currentTask}
        setCurrentTask={(task) => setCurrentTask(task)}
        updateTaskList={(task, isNew, isDelete) => {
          const taskId = isNew ? '-1' : task.id;
          const changedList = isDelete
            ? taskList.filter((el) => el.id !== task.id)
            : taskList.map((el) => (el.id === taskId ? task : el));
          setTaskList(changedList);
          if (isNew) {
            setTaskList([...changedList, emptyTask]);
          } if (isDelete) {
            setCurrentTask(emptyTask);
          }
        }}
      />
      <Notes />
    </div>
  );
}

export default App;
