import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './GlobalTopbar.styles.css';

const GlobalTopBar = () => {
  const navigate = useNavigate();

  const credentials = JSON.parse(localStorage.getItem('userData'));
  const FIRSTNAME = credentials.firstName;
  const firstLetterOfName = FIRSTNAME.charAt(0);

  const [isAvatarDrpdwnOpen, setIsAvatarDrpdwnOpen] = useState();
  const avatarRef = useRef();

  useEffect(() => {
    const sortBtnHandler = event => {
      if (!avatarRef.current.contains(event.target)) {
        setIsAvatarDrpdwnOpen(false);
      }
    };
    document.addEventListener('mousedown', sortBtnHandler);
    return () => {
      document.removeEventListener('mousedown', sortBtnHandler);
    };
  });

  useEffect(() => {
    const avatarDrpdwn = avatarRef.current;

    isAvatarDrpdwnOpen
      ? avatarDrpdwn.classList.add('active')
      : avatarDrpdwn.classList.remove('active');
  }, [isAvatarDrpdwnOpen]);

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <div className='background'>
        <span>
          <p className='title'>tasklane.</p>
        </span>

        <div ref={avatarRef} className='avatar-container'>
          <span
            className='avatar'
            onClick={() =>
              setIsAvatarDrpdwnOpen(isAvatarDrpdwnOpen => !isAvatarDrpdwnOpen)
            }
          >
            <p className='initials'>{firstLetterOfName}</p>
          </span>

          <div className='avatar-drpdwn'>
            <button onClick={logout}>
              <span>{logoutIcon}</span>
              <p>Logout</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalTopBar;

const logoutIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width='20px'
    height='20px'
    style={{
      fill: 'rgb(204,96,81)',
    }}
  >
    <path d='M12.59,13l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H3a1,1,0,0,0,0,2ZM12,2A10,10,0,0,0,3,7.55a1,1,0,0,0,1.8.9A8,8,0,1,1,12,20a7.93,7.93,0,0,1-7.16-4.45,1,1,0,0,0-1.8.9A10,10,0,1,0,12,2Z' />
  </svg>
);
