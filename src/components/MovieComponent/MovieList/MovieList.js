import "./MovieList.css";
import React from 'react';

const MovieList = props => {
  return <div className='list_wrapper'>
    <input type="text" className='list_input'
      onChange={props.changeName}
      name={props.name}
      value={props.value}
    />
    <span className="del del_movie" onClick={props.click}></span>
  </div>
}

export default React.memo(MovieList);