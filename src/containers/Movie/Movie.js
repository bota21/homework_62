import React, { useState, useEffect } from 'react';
import './Movie.css';
import MovieForm from '../../components/MovieComponent/MovieForm/MovieForm';
import MovieList from '../../components/MovieComponent/MovieList/MovieList';
import axios from 'axios';
import Spinner from '../../components/ModalWindow/Spinner/Spinner';

const Movie = () => {
  const [movies, setMovies] = useState([])
  const [newMovie, setNewMovie] = useState({ film: '' });
  const [loading, setloading] = useState(false);
  const [editMovie, setEditMovie] = useState(true);

  let onInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setNewMovie(prevState => {
      return { ...prevState, [name]: value }
    })
  }
  useEffect(async () => {
    let request = await axios.get('movie.json')
      .then(res => { return res.data })
      .catch(console.error);
    request = Object.keys(request).map(id => {
      let film = request[id];
      film.id = id;
      return request[id]
    })
    setMovies(request)
  }, [movies])

  let onSubmitForm = async (e) => {
    e.preventDefault();
    setloading(true)
    let moviepost = { ...newMovie }
    await axios.post('movie.json', moviepost)
      .then(res => console.log(res))
      .catch(console.error)
    setloading(false)
  }
  let removeItem = async (id) => {
    setloading(true);
    let index = movies.findIndex(i => i.id === id);
    let copyMovie = [...movies];
    await axios.delete('/movie/' + copyMovie[index].id + '.json')
      .then(res => console.log(res))
      .catch(console.error)
    setloading(false)
  }

  let postChanges = async (e, id) => {
    let index = movies.findIndex(i => i.id === id);
    let copyMovie = [...movies];
    let value = { film: e.target.value };
    setloading(true);
    await axios.patch('/movie/' + copyMovie[index].id + '.json', value)
      .then(res => console.log(res))
      .catch(console.error);
    setEditMovie(true);
    setloading(false)
  }
  let changeMovieName = async (e, id) => {
    let index = movies.findIndex(i => i.id === id);
    let copyMovie = [...movies];
    let value = { film: e.target.value };
    await axios.patch('/movie/' + copyMovie[index].id + '.json', value)
      .then(res => console.log(res))
      .catch(console.error)
  }

  let canEdit = () => {
    setEditMovie(false)
  }

  return (
    <div className="Movie">
      {loading ? <Spinner /> : null}
      <MovieForm
        change={onInputChange}
        name='film'
        submit={onSubmitForm}
      />
      <p className='title'>To watch list</p>
      {movies.map(item => {
        return <MovieList
          key={item.id}
          postChanges={(e) => postChanges(e, item.id)}
          name='film'
          changeName={(e) => changeMovieName(e, item.id)}
          value={item.film}
          click={() => removeItem(item.id)}
          disabled={editMovie}
          edit={canEdit}
        />
      })}
    </div>
  );
}

export default Movie;
