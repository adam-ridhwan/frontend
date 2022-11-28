import isEqual from 'lodash/isEqual';
import { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TodosContext } from '../../Context/TodosContext';
import Adjustments from '../Adjustments/Adjustments';

import './Content.styles.css';

const Content = () => {
  const credentials = JSON.parse(localStorage.getItem('userData'));

  const EMAIL = credentials.email;
  const PASSWORD = credentials.password;

  const { todos, setTodos } = useContext(TodosContext);
  const [todoText, setTodoText] = useState('');

  const divTaskRef = useRef([...Array(todos.length)].map(() => []));
  const textareaRef = useRef([...Array(todos.length)].map(() => []));
  const addTaskInputRef = useRef();

  const [hoveredOnDivTask, setHoveredOnDivTask] = useState(null);
  const [focusedTextarea, setFocusedTextarea] = useState(null);
  const [updateTodoObject, setupdateTodoObject] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const addTodos = newTodos => {
    fetch(`http://localhost:4000/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${EMAIL}:${PASSWORD}`,
      },
      body: JSON.stringify(newTodos),
    }).then(() => {});
  };

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

  const updateTodo = updateTodoObject => {
    fetch(`http://localhost:4000/todos/event`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${EMAIL}:${PASSWORD}`,
      },
      body: JSON.stringify(updateTodoObject),
    }).then(() => {});
  };

  const addTask = e => {
    e.preventDefault();
    if (!todoText) return;
    const newTodo = {
      id: uuidv4(),
      event: todoText,
      finished: false,
    };
    const newTodos = [...todos, newTodo];
    e.target.reset();
    setTodos(newTodos);
    addTodos(newTodos);
  };

  const toggleTodo = todoIndex => {
    setHoveredOnDivTask(null);
    setIsInitialRender(false);
    const newTodoArray = [...todos];
    newTodoArray[todoIndex]['finished'] = !newTodoArray[todoIndex]['finished'];
    setTodos(newTodoArray);
    addTodos(newTodoArray);
  };

  const onChangeTextarea = (e, todoIndex) => {
    let newUserTodos = [...todos];
    todos[todoIndex]['event'] = e.target.value;
    setTodos(newUserTodos);
  };

  useEffect(() => {
    const updateTextArea = event => {
      if (focusedTextarea === null) return;
      if (!focusedTextarea.contains(event.target)) {
        focusedTextarea.setSelectionRange(0, 0);
        focusedTextarea.focus();
        focusedTextarea.blur();
        setupdateTodoObject(null);
        setFocusedTextarea(null);
      }
    };
    document.addEventListener('click', updateTextArea);
    return () => {
      document.removeEventListener('click', updateTextArea);
    };
  });

  useEffect(() => {
    const pressedEnterSave = event => {
      if (focusedTextarea === null) return;
      if (event.keyCode === 13 || event.which === 13) {
        event.preventDefault();
        focusedTextarea.setSelectionRange(0, 0);
        focusedTextarea.focus();
        focusedTextarea.blur();
        setupdateTodoObject(null);
        setFocusedTextarea(null);
        return false;
      }
    };
    document.addEventListener('keypress', pressedEnterSave);
    return () => {
      document.removeEventListener('keypress', pressedEnterSave);
    };
  });

  const getTodos = () => {
    return todos;
  };

  useEffect(() => {
    setTimeout(() => {
      setIsInitialRender(false);
    }, 1500);
  });

  // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

  return (
    <>
      <div
        style={{ opacity: isInitialRender === true ? '0' : '1' }}
        className='initialRenderOpacity'
      >
        <div className='global-content-container'>
          <Adjustments />
          <hr
            style={{
              height: '1px',
              backgroundColor: 'rgb(234, 234, 234)',
              border: 'none',
            }}
          />

          {getTodos().map((todo, todoIndex) => {
            return (
              <div
                key={todoIndex}
                style={{
                  background:
                    isEqual(divTaskRef.current[todoIndex], hoveredOnDivTask) &&
                    'rgb(244,244,244)',
                  outline: isEqual(
                    divTaskRef.current[todoIndex],
                    hoveredOnDivTask
                  )
                    ? '1px solid darkgray'
                    : '1px solid transparent',

                  position: 'relative',
                }}
              >
                <div
                  className={todo['finished'] === true ? 'greenBackground' : ''}
                ></div>

                <div
                  ref={ref => (divTaskRef.current[todoIndex] = ref)}
                  className='tasks-container'
                  style={{
                    borderBottom: isEqual(
                      divTaskRef.current[todoIndex],
                      hoveredOnDivTask
                    )
                      ? '1px solid transparent'
                      : '1px solid rgb(234, 234, 234)',
                  }}
                  onMouseEnter={() => {
                    setHoveredOnDivTask(divTaskRef.current[todoIndex]);
                  }}
                  onMouseLeave={() => {
                    setHoveredOnDivTask(null);
                  }}
                >
                  <span
                    className='checkbox-icon'
                    onClick={() => toggleTodo(todoIndex)}
                  >
                    {todo['finished'] ? checkedBox : uncheckedBox}
                  </span>

                  <div
                    style={{
                      display: 'inline-block',
                      position: 'relative',
                    }}
                  >
                    <label>
                      <div className='div-tasks'>{todo['event']}</div>

                      <textarea
                        ref={ref => (textareaRef.current[todoIndex] = ref)}
                        defaultValue={todo['event']}
                        rows='1'
                        tabIndex='-1'
                        className={
                          isEqual(
                            divTaskRef.current[todoIndex],
                            hoveredOnDivTask
                          )
                            ? 'my-text-area-hovered'
                            : 'my-text-area'
                        }
                        style={{
                          color:
                            todo['finished'] === true ? '#bbbbbb' : '#535559',
                        }}
                        onChange={$event => onChangeTextarea($event, todoIndex)}
                        onBlur={() => {
                          if (updateTodoObject === null) return;
                          updateTodo(updateTodoObject);
                        }}
                        onFocus={() => {
                          setFocusedTextarea(textareaRef.current[todoIndex]);
                          setupdateTodoObject(todo);
                          setHoveredOnDivTask(null);
                        }}
                      ></textarea>
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
          <div className='add-task-input-container'>
            <span className=''>{addIcon}</span>
            <form onSubmit={addTask}>
              <input
                ref={addTaskInputRef}
                type='text'
                autoComplete='off'
                id='add-task-input'
                onChange={e => setTodoText(e.target.value)}
                placeholder='Click to add a task...'
                onFocus={e => (e.target.placeholder = '')}
                onBlur={e => (e.target.placeholder = 'Click to add a task...')}
              />
            </form>
          </div>
        </div>
      </div>
      <footer style={{ height: '50px' }}></footer>
    </>
  );
};

export default Content;

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

const checkedBox = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 512 512'
    width='20px'
    height='20px'
    style={{
      fill: 'rgb(80,140,108)',
    }}
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

const addIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20px'
    height='20px'
    viewBox='0 0 24 24'
    style={{
      fill: 'rgb(117,117,117)',
    }}
  >
    <path fill='none' d='M0 0h24v24H0V0z' />
    <path d='M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z' />
  </svg>
);
