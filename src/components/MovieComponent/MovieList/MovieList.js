import "./MovieList.css";
import React from 'react';

const MovieList = props => {
  return <div className='list_wrapper'>
    <input type="text" className='list_input'
      disabled={props.disabled}
      onBlur={props.postChanges}
      onChange={props.changeName}
      name={props.name}
      value={props.value}
    />
    <div className="list_buttons_wrapper">
    <div className='edit' onClick={props.edit}></div>
    <div className="del del_movie" onClick={props.click}></div>
    </div>

  </div>
}

export default React.memo(MovieList);