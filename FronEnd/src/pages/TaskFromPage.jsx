
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TaskContext';

function TaskFromPage() {

    const {register, handleSubmit} = useForm()
    const {createTask} = useTasks()
    const navigate = useNavigate();


    const onSubmit = handleSubmit((data) => {
        createTask(data);
        navigate('/tasks')
    });


    return (
        <div className='custom-container'>
        <form onSubmit={onSubmit}>
          <input 
            type="text" 
            placeholder='Title' 
            {...register('title')}
            className='custom-input'
            autoFocus
          />
          <textarea 
            rows="3" 
            placeholder='Description'
            {...register("description")}
            className='custom-textarea'
          >
          </textarea>
          <button className='custom-button'>
            Save
          </button>
        </form>
      </div>
      )
}

export default TaskFromPage;