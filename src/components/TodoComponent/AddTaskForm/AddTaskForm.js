import { React } from 'react';
import './AddTaskForm.css';

const AddTaskForm = props => {
    return (
        <form  onSubmit={props.submit}>
            <div className='addTaskForm'>
                <input placeholder='Add new task'
                    className="task_input"
                    name={props.name}
                    onChange={props.onChange}
                />
                <button className="task_add"
                >
                    Add
                </button>
            </div>
        </form>

    )
};

export default AddTaskForm;