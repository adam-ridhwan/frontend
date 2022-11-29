import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HandleErrors from '../Helper/HandleErrors';

import './Login.styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const loginUser = e => {
    e.preventDefault();
    fetch(`http://localhost:4000/login`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${email}:${password}`,
      },
    })
      .then(HandleErrors)
      .then(user => {
        localStorage.clear();
        localStorage.setItem('userData', JSON.stringify(user.user));
        navigate('/dashboard');
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <>
      <div className='login-container'>
        <h2>Login</h2>
        <form onSubmit={loginUser}>
          <input
            placeholder='Email'
            autoComplete='off'
            onChange={e => setEmail(e.target.value)}
          />
          <br />
          <input
            type='password'
            placeholder='Password'
            autoComplete='off'
            onChange={e => setPassword(e.target.value)}
          />
          <br />
          <button type='submit'>Login</button>
        </form>
      </div>
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </>
  );
};

export default Login;
