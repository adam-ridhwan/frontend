import { useContext, useEffect } from 'react';
import { TodosContext } from '../Context/TodosContext';

const FetchTodos = () => {
  const credentials = JSON.parse(localStorage.getItem('userData'));
  const EMAIL = credentials.email;
  const PASSWORD = credentials.password;
  const { setTodos } = useContext(TodosContext);
  useEffect(() => {
    fetch(`http://localhost:4000/todos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${EMAIL}:${PASSWORD}`,
      },
    })
      .then(response => response.json())
      .then(todos => setTodos(todos));
  }, [EMAIL, PASSWORD, setTodos]);
};

export default FetchTodos;
