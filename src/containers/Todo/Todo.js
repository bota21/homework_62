import { useState } from 'react';
import './Todo.css';
import AddTaskForm from '../../components/TodoComponent/AddTaskForm/AddTaskForm';
import Task from '../../components/TodoComponent/Task/Task';
import axios from 'axios';
import { useEffect } from 'react';
import Spinner from '../../components/ModalWindow/Spinner/Spinner';

function Todo() {
  const [todo, setTodos] = useState([]);
  const [task, setTask] = useState({ text: '' });
  const [loading, setLoading] = useState(false);

  let currentTask = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTask(prevState => {
      return { ...prevState, [name]: value }
    })
  };
  let addTodo = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.post('todo.json', { ...task })
      .then(res => console.log(res))
      .catch(console.error);
    setLoading(false)
  };
  useEffect(async () => {
    let request = await axios.get('todo.json')
      .then(res => { return res.data })
    request = Object.keys(request).map(id => {
      let list = request[id];
      list.id = id;
      return request[id]
    })
    setTodos(request);
  }, [])

  let removeTask = async id => {
    const index = todo.findIndex(item => item.id === id);
    let copyTodo = [...todo];
    let request = await axios.delete('/todo/' + copyTodo[index].id + '.json')
      .then(res => console.log(res))
    .catch(console.error)
  };

  let newTask = todo.map(item => {
    return <Task key={item.id}
      text={item.text}
      onRemove={() => removeTask(item.id)} />
  });
  return (
    <div className="Todo">
      <AddTaskForm
        name='text'
        onChange={(e) => currentTask(e)}
        submit={(e) => addTodo(e, todo.id)}
      />
      {loading ? <Spinner /> : null}
      {newTask}
    </div>
  );
}

export default Todo;
