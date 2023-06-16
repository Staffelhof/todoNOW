import './App.css';
import { useEffect, useState } from 'react';
import Notes from './Notes';
import TaskList from './TaskList';
import TaskElem from './TaskElem';
import {
  getAllTasks,
} from './fetchFacade';

// eslint-disable-next-line max-len

function App() {
  const [taskList, setTaskList] = useState([]);
  const [currentTask, setCurrentTask] = useState({});

  useEffect(() => {
    const dataFetch = async () => {
      getAllTasks.then((res) => setTaskList([...res, {
        id: '-1', name: '', text: '', isCompleted: '0',
      }]));
    };

    dataFetch();
  }, []);

  return (
    <div>
      <title>
        TO-DO NOW
      </title>
      <TaskList
        tasklist={taskList}
        setTasklist={(list) => setTaskList(list)}
        setCurrentTask={(task) => setCurrentTask(task)}
      />
      <TaskElem
        currentTask={currentTask}
        setCurrentTask={(task) => setCurrentTask(task)}
        updateTaskList={(task) => {
          const changedList = taskList.map((el) => (el.id === task.id ? task : el));
          setTaskList(changedList);
        }}
      />
      <Notes />
    </div>
  );
}

export default App;
