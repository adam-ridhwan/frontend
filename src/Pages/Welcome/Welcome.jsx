import { useEffect, useState } from 'react';
import Login from '../../Authentication/Login/Login';
import Register from '../../Authentication/Register/Register';

import './Welcome.styles.css';
const Welcome = () => {
  const [logOrReg, setLogOrReg] = useState('login');

  useEffect(() => {
    console.log(logOrReg);
  }, [logOrReg]);

  return (
    <>
      <div className='background'>
        <span>
          <p className='title'>tasklane.</p>
        </span>
      </div>

      <div className='log-reg-alignment'>
        <div className='log-reg-container'>
          <div>
            <button onClick={() => setLogOrReg('login')}>
              <p>Login</p>
            </button>
            <button onClick={() => setLogOrReg('register')}>
              <p>Register</p>
            </button>
          </div>

          {logOrReg === 'login' ? <Login /> : <Register />}
        </div>
      </div>
    </>
  );
};

export default Welcome;
