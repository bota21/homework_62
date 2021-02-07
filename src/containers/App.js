import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import './App.css';
import Movie from './Movie/Movie';
import Todo from './Todo/Todo';
import Notes from './Notes/Notes';

const App = () => {
  return (    
    <div className="App">
      <BrowserRouter>
      <header className="header">
        <NavLink to='/todo' className='header_link'>Todo</NavLink>
        <NavLink to='/movie' className='header_link'>Movie</NavLink>
        <NavLink to='/notes' className='header_link'>Notes</NavLink>
        </header>
        <Switch>
          <Route path='/movie' component={Movie} />
          <Route path='/todo' component={Todo} />
          <Route path='/notes' component={Notes} />
        </Switch>
      </BrowserRouter>
      </div>
  );
}

export default App;
