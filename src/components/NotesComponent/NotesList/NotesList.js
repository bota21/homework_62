import './NotesList.css';
import React from 'react';

const NotesList = props => {
    return (
        <div className='NotesList'>
            <textarea className="text_list"
                name={props.name}
                disabled={props.disabled}
                onBlur={props.blur}
            >
                {props.value}
            </textarea>
            <div className="noteList_wrapper">
                <div className='edit' onClick={props.edit}></div>
                <div className='del' onClick={props.delete}></div>
            </div>
        </div>
    )
}

export default NotesList