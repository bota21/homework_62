import React from 'react';
import './MovieForm.css';

const MovieForm = props => {
    return <form onSubmit={props.submit}>
        <div className="form_wrapper">
            <input type="text"
                name={props.name}
                onChange={props.change}
                // value={props.value}
                placeholder='Add new movie'
            />
            <button>Add</button>
        </div>
    </form>
}

export default MovieForm;