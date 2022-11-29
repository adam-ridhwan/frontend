import { Link } from 'react-router-dom';

import Homepage from '../Home/Homepage';

import './Welcome.styles.css';
const Welcome = () => {
  const credentials = JSON.parse(localStorage.getItem('userData'));

  const EMAIL = credentials && credentials.email;

  return (
    <>
      {!EMAIL && <div>Welcome</div>}
      {!EMAIL && <Link to='register'>Register</Link>}
      {!EMAIL && <Link to='login'>Login</Link>}
      {EMAIL && <Homepage />}
    </>
  );
};

export default Welcome;
