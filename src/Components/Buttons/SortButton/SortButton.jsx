import { useContext, useEffect, useRef, useState } from 'react';
import './SortButton.styles.css';

import { TodosContext } from '../../../Context/TodosContext';

const ASCENDING = 'ASCENDING';
const DESCENDING = 'DESCENDING';
const REMOVESORT = 'REMOVESORT';

const SortButton = () => {
  const { sortValue, setSortValue } = useContext(TodosContext);
  const [isSortDrpdwnOpen, setIsSortDrpdwnOpen] = useState(false);
  const [isDrpdwnBtnHovered, setIsDrpdwnBtnHovered] = useState(false);
  const sortBtnRef = useRef();

  // check to see if mouse is clicked outside of sort button
  useEffect(() => {
    const sortBtnHandler = event => {
      if (!sortBtnRef.current.contains(event.target)) {
        setIsSortDrpdwnOpen(false);
      }
    };
    document.addEventListener('mousedown', sortBtnHandler);
    return () => {
      document.removeEventListener('mousedown', sortBtnHandler);
    };
  });

  // open or close dropdown
  useEffect(() => {
    const sortDrpdwn = sortBtnRef.current;

    isSortDrpdwnOpen
      ? sortDrpdwn.classList.add('active')
      : sortDrpdwn.classList.remove('active');
  }, [isSortDrpdwnOpen]);

  const handleSortIcon = () => {
    if (sortValue === REMOVESORT) return sort;
    if (sortValue === ASCENDING) return checkedArrowUP;
    if (sortValue === DESCENDING) return checkedArrowDown;
  };

  const handleSortText = () => {
    if (sortValue === REMOVESORT) return 'Sort';
    if (sortValue === ASCENDING) return 'Ascending';
    if (sortValue === DESCENDING) return 'Descending';
  };

  // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

  return (
    <>
      <div ref={sortBtnRef} className='sort-container'>
        <button
          style={{
            transition: 'background-color 20ms ease-in 0s',
            cursor: 'pointer',
            background:
              isDrpdwnBtnHovered &&
              `${
                sortValue === REMOVESORT
                  ? 'rgba(55, 53, 47, 0.08)'
                  : 'rgb(218, 234, 241)'
              }`,
            borderRadius: '3px',
          }}
          className='sort-button'
          onClick={() =>
            setIsSortDrpdwnOpen(isSortDrpdwnOpen => !isSortDrpdwnOpen)
          }
          onMouseEnter={() => setIsDrpdwnBtnHovered(true)}
          onMouseLeave={() => setIsDrpdwnBtnHovered(false)}
        >
          <span>{handleSortIcon()}</span>
          <p style={{ color: sortValue !== REMOVESORT && 'rgb(60, 124, 228)' }}>
            {handleSortText()}
          </p>
        </button>

        <div className='dropdown-menu'>
          <button
            onClick={() => {
              setSortValue(ASCENDING);
              setIsSortDrpdwnOpen(false);
            }}
          >
            <span>{arrowUp}</span>
            <p>Ascending</p>
          </button>

          <button
            onClick={() => {
              setSortValue(DESCENDING);
              setIsSortDrpdwnOpen(false);
            }}
          >
            <span>{arrowDown}</span>
            <p>Descending</p>
          </button>

          <hr
            style={{
              height: '2px',
              backgroundColor: 'rgb(244,244,244)',
              border: 'none',
              width: '100%',
              margin: '7.5px 0',
            }}
          />

          <button
            onClick={() => {
              setSortValue(REMOVESORT);
              setIsSortDrpdwnOpen(false);
            }}
          >
            <span>{trashcan}</span>
            <p>Remove Sort</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default SortButton;

const sort = (
  <svg
    id='Layer_1'
    enableBackground='new 0 0 20 20'
    viewBox='0 0 20 20'
    width='15px'
    height='15px'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g fill='rgba(55, 53, 47, 0.65)'>
      <path d='m17.6 14.6-1.6 1.6v-16.2h-2v16.2l-1.5-1.6-1.4 1.5 3.9 3.9 4-3.9z' />
      <path d='m8.8 12.6c.3-.3.3-.7.1-1.1-.1-.3-.5-.5-.9-.5h-7v2h4.8l-4.6 5.3c-.3.3-.3.7-.1 1.1s.5.6.9.6h7v-2h-4.8z' />
      <path d='m5.9.6c-.1-.4-.5-.6-.9-.6s-.7.2-.9.6l-3 7c-.2.5 0 1.1.5 1.3s1.1 0 1.3-.5l.6-1.4h3l.6 1.4c.4.8 1.2.6 1.3.5.5-.2.7-.8.5-1.3zm-1.5 4.4.6-1.5.6 1.5z' />
    </g>
  </svg>
);

const arrowDown = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 256 256'
    width='15px'
    height='15px'
  >
    <rect width='256' height='256' fill='none' />
    <line
      x1='128'
      x2='128'
      y1='40'
      y2='216'
      fill='none'
      stroke='rgba(55, 53, 47, 0.65)'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='24'
    />
    <polyline
      fill='none'
      stroke='rgba(55, 53, 47, 0.65)'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='24'
      points='56 144 128 216 200 144'
    />
  </svg>
);

const arrowUp = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 256 256'
    width='15px'
    height='15px'
  >
    <rect width='256' height='256' fill='none' />
    <line
      x1='128'
      x2='128'
      y1='216'
      y2='40'
      fill='none'
      stroke='rgba(55, 53, 47, 0.65)'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='24'
    />
    <polyline
      fill='none'
      stroke='rgba(55, 53, 47, 0.65)'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='24'
      points='56 112 128 40 200 112'
    />
  </svg>
);

const checkedArrowDown = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 256 256'
    width='15px'
    height='15px'
  >
    <rect width='256' height='256' fill='none' />
    <line
      x1='128'
      x2='128'
      y1='40'
      y2='216'
      fill='none'
      stroke='rgb(60, 124, 228)'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='24'
    />
    <polyline
      fill='none'
      stroke='rgb(60, 124, 228)'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='24'
      points='56 144 128 216 200 144'
    />
  </svg>
);

const checkedArrowUP = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 256 256'
    width='15px'
    height='15px'
  >
    <rect width='256' height='256' fill='none' />
    <line
      x1='128'
      x2='128'
      y1='216'
      y2='40'
      fill='none'
      stroke='rgb(60, 124, 228)'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='24'
    />
    <polyline
      fill='none'
      stroke='rgb(60, 124, 228)'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='24'
      points='56 112 128 40 200 112'
    />
  </svg>
);

const trashcan = (
  <svg viewBox='0 0 16 16' width='15px' height='15px' fill='rgb(204,96,81)'>
    <path d='M4.8623 15.4287H11.1445C12.1904 15.4287 12.8672 14.793 12.915 13.7402L13.3799 3.88965H14.1318C14.4736 3.88965 14.7402 3.62988 14.7402 3.28809C14.7402 2.95312 14.4736 2.69336 14.1318 2.69336H11.0898V1.66797C11.0898 0.62207 10.4268 0 9.29199 0H6.69434C5.56641 0 4.89648 0.62207 4.89648 1.66797V2.69336H1.86133C1.5332 2.69336 1.25977 2.95312 1.25977 3.28809C1.25977 3.62988 1.5332 3.88965 1.86133 3.88965H2.62012L3.08496 13.7471C3.13281 14.7998 3.80273 15.4287 4.8623 15.4287ZM6.1543 1.72949C6.1543 1.37402 6.40039 1.14844 6.7832 1.14844H9.20312C9.58594 1.14844 9.83203 1.37402 9.83203 1.72949V2.69336H6.1543V1.72949ZM4.99219 14.2188C4.61621 14.2188 4.34277 13.9453 4.32227 13.542L3.86426 3.88965H12.1152L11.6709 13.542C11.6572 13.9453 11.3838 14.2188 10.9941 14.2188H4.99219ZM5.9834 13.1182C6.27051 13.1182 6.45508 12.9336 6.44824 12.667L6.24316 5.50293C6.23633 5.22949 6.04492 5.05176 5.77148 5.05176C5.48438 5.05176 5.2998 5.23633 5.30664 5.50293L5.51172 12.667C5.51855 12.9404 5.70996 13.1182 5.9834 13.1182ZM8 13.1182C8.28711 13.1182 8.47852 12.9336 8.47852 12.667V5.50293C8.47852 5.23633 8.28711 5.05176 8 5.05176C7.71289 5.05176 7.52148 5.23633 7.52148 5.50293V12.667C7.52148 12.9336 7.71289 13.1182 8 13.1182ZM10.0166 13.1182C10.29 13.1182 10.4746 12.9404 10.4814 12.667L10.6934 5.50293C10.7002 5.23633 10.5088 5.05176 10.2285 5.05176C9.95508 5.05176 9.76367 5.22949 9.75684 5.50293L9.54492 12.667C9.53809 12.9336 9.72949 13.1182 10.0166 13.1182Z'></path>
  </svg>
);
