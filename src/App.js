import './css/App.css';
import { useEffect, useState } from 'react';
import Notes from './components/notes/Notes';
import TaskList from './components/taskList/TaskList';
import TaskElem from './components/taskElement/TaskElem';
import palm1 from './assets/images/palm-branch1.png';
import palm2 from './assets/images/palm-branch2.png';
import {
  getAllTasks,
} from './utility/fetchFacade';

const emptyTask = {
  id: 0, name: '', text: '', isCompleted: 0,
};

const normalize = (obj) => ({
  ...obj,
  id: parseInt(obj.id, 10),
  isCompleted: parseInt(obj.isCompleted, 10),
});

function App() {
  const [taskList, setTaskList] = useState([]);
  const [currentTask, setCurrentTask] = useState(emptyTask);

  useEffect(() => {
    const dataFetch = async () => {
      getAllTasks
        .then((res) => res.map((el) => normalize(el)))
        .then((res) => setTaskList([...res, emptyTask]));
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
        updateTaskList={(task, isNew = false) => {
          const taskId = isNew ? 0 : task.id;
          const changedList = taskList.map((el) => (el.id === taskId ? task : el));
          if (isNew) {
            changedList.push(emptyTask);
          }
          setTaskList(changedList);
        }}
      />
      <Notes />
      <img className="palm-branch1" src={palm1} alt="palm1" />
      <img className="palm-branch2" src={palm2} alt="palm2" />
    </div>
  );
}

export default App;
