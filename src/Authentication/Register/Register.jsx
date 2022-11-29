import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HandleErrors from '../Helper/HandleErrors';

import './Register.styles.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const registerUser = e => {
    e.preventDefault();
    fetch(`http://localhost:4000/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    })
      .then(HandleErrors)
      .then(() => {
        loginUser();
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const loginUser = e => {
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
      <div className='register-container'>
        <h2>Create an account</h2>
        <form onSubmit={registerUser} autoComplete='off'>
          <input
            type='text'
            placeholder='First Name'
            onChange={e => setFirstName(e.target.value)}
          />
          <br />
          <input
            type='text'
            placeholder='Last Name'
            onChange={e => setLastName(e.target.value)}
          />
          <br />
          <input
            type='text'
            placeholder='Email'
            onChange={e => setEmail(e.target.value)}
          />
          <br />
          <input
            type='password'
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}
          />
          <br />
          <button type='submit'>Register</button>
        </form>
      </div>
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </>
  );
};

export default Register;
