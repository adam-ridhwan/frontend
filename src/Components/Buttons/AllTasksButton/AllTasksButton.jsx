import { useContext, useEffect, useRef, useState } from 'react';
import './AllTasksButton.styles.css';

import { TodosContext } from '../../../Context/TodosContext';

const ALLTASKS = 'All tasks';
const COMPLETEDTASKS = 'Completed tasks';
const INCOMPLETETASKS = 'Incomplete tasks';

const AllTasksButton = () => {
  const { filter, setFilter } = useContext(TodosContext);
  const [isTasksDrpdwnOpen, setIsTasksDrpdwnOpen] = useState(false);
  const [isDrpdwnBtnHovered, setIsDrpdwnBtnHovered] = useState(false);
  const allTasksBtnRef = useRef();

  const handleIcon = () => {
    if (filter === ALLTASKS) return filterIcon;
    if (filter === COMPLETEDTASKS) return checkedBox;
    if (filter === INCOMPLETETASKS) return uncheckedBox;
  };

  const handleText = () => {
    if (filter === ALLTASKS) return 'Filter';
    if (filter === COMPLETEDTASKS) return COMPLETEDTASKS;
    if (filter === INCOMPLETETASKS) return INCOMPLETETASKS;
  };

  // check to see if mouse is clicked outside of All Tasks button
  useEffect(() => {
    const allTasksBtnHandler = event => {
      if (!allTasksBtnRef.current.contains(event.target)) {
        setIsTasksDrpdwnOpen(false);
      }
    };
    document.addEventListener('mousedown', allTasksBtnHandler);
    return () => {
      document.removeEventListener('mousedown', allTasksBtnHandler);
    };
  });

  // open or close dropdown
  useEffect(() => {
    const allTaskDrpdwn = allTasksBtnRef.current;
    isTasksDrpdwnOpen
      ? allTaskDrpdwn.classList.add('active')
      : allTaskDrpdwn.classList.remove('active');
  }, [isTasksDrpdwnOpen]);

  // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

  return (
    <>
      <div ref={allTasksBtnRef} className='allTasks-container'>
        <button
          style={{
            transition: 'background-color 20ms ease-in 0s',
            cursor: 'pointer',
            background:
              isDrpdwnBtnHovered &&
              `${
                filter === ALLTASKS
                  ? 'rgba(55, 53, 47, 0.08)'
                  : 'rgb(218, 234, 241)'
              }`,
            borderRadius: '3px',
          }}
          className='allTasks-button'
          onClick={() =>
            setIsTasksDrpdwnOpen(isTasksDrpdwnOpen => !isTasksDrpdwnOpen)
          }
          onMouseEnter={() => setIsDrpdwnBtnHovered(true)}
          onMouseLeave={() => setIsDrpdwnBtnHovered(false)}
        >
          <span className='tasks-icon'>{handleIcon()}</span>
          <p style={{ color: filter !== ALLTASKS && 'rgb(60, 124, 228)' }}>
            {handleText()}
          </p>
        </button>

        <div className='allTasks-drpdwn-menu'>
          <button
            onClick={() => {
              setFilter(INCOMPLETETASKS);
              setIsTasksDrpdwnOpen(false);
            }}
          >
            <span>{uncheckedBox}</span>
            <p>Incomplete Tasks</p>
          </button>

          <button
            onClick={() => {
              setFilter(COMPLETEDTASKS);
              setIsTasksDrpdwnOpen(false);
            }}
          >
            <span>{checkedBox}</span>
            <p>Completed Tasks</p>
          </button>

          <button
            onClick={() => {
              setFilter(ALLTASKS);
              setIsTasksDrpdwnOpen(false);
            }}
          >
            <span>{clipboard}</span>
            <p>All Tasks</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default AllTasksButton;

const checkedBox = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20px'
    height='20px'
    viewBox='0 0 512 512'
  >
    <path d='M405.333 64H106.667C83.198 64 64 83.198 64 106.667v298.666C64 428.802 83.198 448 106.667 448h298.666C428.802 448 448 428.802 448 405.333V106.667C448 83.198 428.802 64 405.333 64zm-192 298.667L106.667 256l29.864-29.864 76.802 76.802 162.136-162.136 29.864 29.865-192 192z' />
  </svg>
);

const uncheckedBox = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20px'
    height='20px'
    viewBox='0 0 512 512'
    style={{
      fill: 'rgb(217,217,217)',
    }}
  >
    <path d='M405.333 64H106.667C83.198 64 64 83.198 64 106.667v298.666C64 428.802 83.198 448 106.667 448h298.666C428.802 448 448 428.802 448 405.333V106.667C448 83.198 428.802 64 405.333 64z' />
  </svg>
);

const filterIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='15px'
    height='15px'
    fill='rgba(55, 53, 47, 0.65)'
    viewBox='0 0 22 20'
  >
    <path
      fill='none'
      fillRule='evenodd'
      stroke='rgba(55, 53, 47, 0.65)'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M20 0H0l8 9.46V16l4 2V9.46z'
      transform='translate(1 1)'
    />
  </svg>
);

const clipboard = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    enableBackground='new 0 0 66 66'
    viewBox='0 0 66 66'
    width='20px'
    height='20px'
    fill='rgba(55, 53, 47, 0.65)'
  >
    <path
      d='M15.4053,65h35.1895c2.2461,0,4.0742-1.8276,4.0742-4.0742V14.102c0-2.2466-1.8281-4.0747-4.0742-4.0747h-5.8722
		c-0.0731-1.6188-1.402-2.9165-3.0389-2.9165h-2.6962C39.0568,3.7029,36.2997,1,33,1c-3.3051,0-6.0567,2.7086-5.9874,6.1108h-2.6962
		c-1.6369,0-2.9659,1.2977-3.0389,2.9165h-5.8722c-2.2461,0-4.0742,1.8281-4.0742,4.0747v46.8237
		C11.3311,63.1724,13.1592,65,15.4053,65z M33,3c2.2169,0,4.0501,1.8231,3.9922,4.1108h-7.9844C28.9499,4.8231,30.7832,3,33,3z
		 M23.2637,10.1636c0-0.5806,0.4727-1.0527,1.0527-1.0527c3.8587,0,13.1493,0,17.3672,0c0.5801,0,1.0527,0.4722,1.0527,1.0527
		v1.7217c0,0.5806-0.4727,1.0527-1.0527,1.0527H24.3164c-0.5801,0-1.0527-0.4722-1.0527-1.0527V10.1636z M13.3311,14.102
		c0-1.144,0.9307-2.0747,2.0742-2.0747h5.8727c0.076,1.616,1.4034,2.9106,3.0384,2.9106h17.3672
		c1.6349,0,2.9624-1.2946,3.0384-2.9106h5.8727c1.1436,0,2.0742,0.9307,2.0742,2.0747v46.8237c0,1.1436-0.9307,2.0742-2.0742,2.0742
		H15.4053c-1.1436,0-2.0742-0.9307-2.0742-2.0742V14.102z'
    />
    <path d='M18.0068 29.5478h9.4307c.2764 0 .5-.2236.5-.5v-9.4312c0-.2764-.2236-.5-.5-.5h-9.4307c-.2764 0-.5.2236-.5.5v9.4312C17.5068 29.3242 17.7305 29.5478 18.0068 29.5478zM18.5068 20.1167h8.4307v8.4312h-8.4307V20.1167zM32.7607 22.6777h15.2324c.2764 0 .5-.2236.5-.5s-.2236-.5-.5-.5H32.7607c-.2764 0-.5.2236-.5.5S32.4844 22.6777 32.7607 22.6777zM32.7607 26.9868h7.665c.2764 0 .5-.2236.5-.5s-.2236-.5-.5-.5h-7.665c-.2764 0-.5.2236-.5.5S32.4844 26.9868 32.7607 26.9868zM18.0068 44.1846h9.4307c.2764 0 .5-.2236.5-.5v-9.4312c0-.2764-.2236-.5-.5-.5h-9.4307c-.2764 0-.5.2236-.5.5v9.4312C17.5068 43.9609 17.7305 44.1846 18.0068 44.1846zM18.5068 34.7534h8.4307v8.4312h-8.4307V34.7534zM32.7607 37.3144h15.2324c.2764 0 .5-.2236.5-.5s-.2236-.5-.5-.5H32.7607c-.2764 0-.5.2236-.5.5S32.4844 37.3144 32.7607 37.3144zM32.7607 41.6235h7.665c.2764 0 .5-.2236.5-.5s-.2236-.5-.5-.5h-7.665c-.2764 0-.5.2236-.5.5S32.4844 41.6235 32.7607 41.6235zM18.0068 58.8242h9.4307c.2764 0 .5-.2236.5-.5v-9.4312c0-.2764-.2236-.5-.5-.5h-9.4307c-.2764 0-.5.2236-.5.5v9.4312C17.5068 58.6006 17.7305 58.8242 18.0068 58.8242zM18.5068 49.3931h8.4307v8.4312h-8.4307V49.3931zM32.7607 51.9546h15.2324c.2764 0 .5-.2236.5-.5s-.2236-.5-.5-.5H32.7607c-.2764 0-.5.2236-.5.5S32.4844 51.9546 32.7607 51.9546zM32.7607 56.2632h7.665c.2764 0 .5-.2236.5-.5s-.2236-.5-.5-.5h-7.665c-.2764 0-.5.2236-.5.5S32.4844 56.2632 32.7607 56.2632z' />
    <path d='M24.4941 51.8232l-2.5098 2.5103-1.0342-1.0337c-.1953-.1953-.5117-.1953-.707 0s-.1953.5117 0 .707l1.3877 1.3872c.0977.0977.2256.1465.3535.1465s.2559-.0488.3535-.1465l2.8633-2.8638c.1953-.1953.1953-.5117 0-.707S24.6895 51.6279 24.4941 51.8232zM24.4941 37.1836l-2.5098 2.5103-1.0342-1.0342c-.1953-.1953-.5117-.1953-.707 0s-.1953.5117 0 .707l1.3877 1.3877c.0938.0938.2207.1465.3535.1465s.2598-.0527.3535-.1465l2.8633-2.8638c.1953-.1953.1953-.5117 0-.707S24.6895 36.9883 24.4941 37.1836zM24.667 22.3872c-.1953-.1953-.5117-.1953-.707 0l-1.2378 1.2378-1.2378-1.2378c-.1953-.1953-.5117-.1953-.707 0s-.1953.5117 0 .707l1.2378 1.2378-1.2378 1.2378c-.1953.1953-.1953.5117 0 .707.0977.0977.2256.1465.3535.1465s.2559-.0488.3535-.1465l1.2378-1.2378 1.2378 1.2378c.0977.0977.2256.1465.3535.1465s.2559-.0488.3535-.1465c.1953-.1953.1953-.5117 0-.707l-1.2378-1.2378 1.2378-1.2378C24.8623 22.8989 24.8623 22.5825 24.667 22.3872z' />
  </svg>
);
