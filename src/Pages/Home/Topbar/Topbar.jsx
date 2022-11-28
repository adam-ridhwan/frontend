import { useContext, useEffect, useState } from 'react';
import { TodosContext } from '../../Context/TodosContext';
import './Topbar.styles.css';

import FlipNumbers from 'react-flip-numbers';

const Topbar = () => {
  const credentials = JSON.parse(localStorage.getItem('userData'));

  const FIRSTNAME = credentials.firstName;

  const { todos } = useContext(TodosContext);
  const [numOfCompletedTasks, setNumOfCompletedTask] = useState('');

  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };
  const getDate = new Date().toLocaleDateString('en-us', options);

  const today = new Date();
  const currentHour = today.getHours();

  const getGreetingText = () => {
    if (currentHour < 12) return 'Good morning, ';
    if (currentHour < 18) return 'Good afternoon, ';
    return 'Good evening, ';
  };

  useEffect(() => {
    const newTodosArray = [...todos];

    const completedCount = Object.values(newTodosArray).filter(
      todo => todo.finished === true
    ).length;

    setTimeout(() => {
      setNumOfCompletedTask(completedCount.toString());
    }, 1000);
  }, [todos, numOfCompletedTasks, setNumOfCompletedTask]);

  // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

  return (
    <>
      <div className='topbar'>
        <p>{getDate}</p>
        <p>
          {getGreetingText()} {FIRSTNAME}
        </p>
        <div>
          <span>{checkedBox}</span>
          <span>
            <FlipNumbers
              height={17}
              width={17}
              color='#6d6e6f'
              play
              perspective={100}
              numbers={numOfCompletedTasks}
            />
          </span>
          <p>tasks completed</p>
        </div>
      </div>
    </>
  );
};

export default Topbar;

const checkedBox = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20px'
    height='20px'
    viewBox='0 0 512 512'
    style={{
      fill: '#6d6e6f',
    }}
  >
    <path d='M405.333 64H106.667C83.198 64 64 83.198 64 106.667v298.666C64 428.802 83.198 448 106.667 448h298.666C428.802 448 448 428.802 448 405.333V106.667C448 83.198 428.802 64 405.333 64zm-192 298.667L106.667 256l29.864-29.864 76.802 76.802 162.136-162.136 29.864 29.865-192 192z' />
  </svg>
);
