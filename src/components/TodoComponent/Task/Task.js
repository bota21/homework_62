import { React } from 'react';
import './Task.css';

const Task = props => {
    return (
        <div className='task_wrapper'>
        <h5 className="task_text">{props.text}</h5>
        <div className="del" onClick={props.onRemove}></div>
        </div>
        )
    };
    export default Task;
    