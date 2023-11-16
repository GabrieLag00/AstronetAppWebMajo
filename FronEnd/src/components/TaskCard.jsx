import '../components/styles/TaskCard.css'
import { useTasks } from '../context/TaskContext';
import { Link } from 'react-router-dom'


function TaskCard({task}){

    const { deleteTask } = useTasks()

    return (
        <div className="task-card-container">
        <h1 className="task-card-title">{task.title}</h1>
        <div className="task-card-buttons">
        <button onClick={() => deleteTask(task._id)}>Delete</button>
        <Link to={`/tasks/${task._id}`}>Edit</Link>
        </div>
        <p className="text-slate-300 task-card-description">{task.description}</p>
        <p className="task-card-date">
          {task.date &&
            new Date(task.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
        </p>
      </div>
    );
}
export default TaskCard;