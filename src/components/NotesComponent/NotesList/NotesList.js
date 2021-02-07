import './NotesList.css';
import React from 'react';

const NotesList = props => {
    return (
        <div className='NotesList'>
            <textarea type='text' className="text_list"
            // <input type='text' className="text_list"
                value={props.value}
                name={props.name}
                // disabled={props.disabled}
                onChange={props.ChangeNote}
                // onBlur={props.blur}
           >
            </textarea>
            <div className="noteList_wrapper">
                {/* <div className='edit' onClick={props.edit}></div> */}
                <div className='del' onClick={props.delete}></div>
            </div>
        </div>
    )
}

export default React.memo(NotesList);