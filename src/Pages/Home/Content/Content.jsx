import {
  createRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TodosContext } from '../../Context/TodosContext';
import Adjustments from '../Adjustments/Adjustments';

import './Content.styles.css';

const ALLTASKS = 'All tasks';
const COMPLETEDTASKS = 'Completed tasks';
const INCOMPLETETASKS = 'Incomplete tasks';

const ASCENDING = 'ASCENDING';
const DESCENDING = 'DESCENDING';
const REMOVESORT = 'REMOVESORT';

const CLASSNAME = 'greenBackground';

const Content = () => {
  const credentials = JSON.parse(localStorage.getItem('userData'));
  const EMAIL = credentials.email;
  const PASSWORD = credentials.password;

  const { todos, setTodos, filter, sortedTodos, sortValue } =
    useContext(TodosContext);
  const [todoText, setTodoText] = useState('');

  const [hoveredOnDivTask, setHoveredOnDivTask] = useState(null);
  const [hoveredOnTextarea, setHoveredOnTextarea] = useState(null);
  const [focusedTextarea, setFocusedTextarea] = useState(null);
  const [textAreaValue, setTextAreaValue] = useState(null);
  const [updateTodoObject, setUpdateTodoObject] = useState(null);
  const [render, setRender] = useState(true);

  const divTasksRefsById = useMemo(() => {
    const refs = {};
    todos.forEach(todo => {
      refs[todo.id] = createRef(null);
    });
    return refs;
  }, [todos]);

  const textareaRefsById = useMemo(() => {
    const refs = {};
    todos.forEach(todo => {
      refs[todo.id] = createRef(null);
    });
    return refs;
  }, [todos]);

  const greenBackgroundRefsById = useMemo(() => {
    const refs = {};
    todos.forEach(todo => {
      refs[todo.id] = createRef(null);
    });
    return refs;
  }, [todos]);

  const addTaskInputRef = useRef();

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

  const updateTodo = updateTodoObject => {
    fetch(`http://localhost:4000/todos`, {
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

  const toggleCheckedTodo = (ref, todo) => {
    const newTodoArray = [...todos];
    const selectedTodo = Object.values(todos).find(obj => obj.id === todo.id);
    const todoIndex = todos.indexOf(selectedTodo);
    newTodoArray[todoIndex].finished = !newTodoArray[todoIndex].finished;

    if (todo.finished) ref.current.classList.add(CLASSNAME);
    if (!todo.finished) ref.current.classList.remove(CLASSNAME);

    setTodos(newTodoArray);
    addTodos(newTodoArray);
  };

  const memoized = useCallback(() => {
    for (const [, value] of Object.entries(greenBackgroundRefsById)) {
      if (value.current !== null) {
        value.current.classList.remove(CLASSNAME);
      }
    }
  }, [greenBackgroundRefsById]);

  useEffect(() => {
    memoized();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortValue, filter]);

  const onChangeTextarea = (e, selectedTodoToChange) => {
    setTextAreaValue(e.target.value);
    let newUserTodos = [...todos];
    const selectedTodo = Object.values(newUserTodos).find(
      todo => todo.id === selectedTodoToChange.id
    );
    const todoIndex = newUserTodos.indexOf(selectedTodo);
    newUserTodos[todoIndex].event = e.target.value;
    // setTodos(newUserTodos);
  };

  useEffect(() => {
    const editTextrea = event => {
      if (focusedTextarea === null) return;
      const textarea = focusedTextarea.current;
      if (textarea !== event.target) {
        textarea.setSelectionRange(0, 0);
        textarea.focus();
        textarea.blur();
        setFocusedTextarea(null);
      }
    };
    document.addEventListener('click', editTextrea);
    return () => {
      document.removeEventListener('click', editTextrea);
    };
  });

  const getTodos = () => {
    if (filter === ALLTASKS && sortValue === REMOVESORT) return todos;

    let adjustedTodo = [...todos];

    if (sortValue !== REMOVESORT) {
      if (sortValue === ASCENDING) {
        adjustedTodo = adjustedTodo.sort((obj1, obj2) =>
          obj1.event < obj2.event ? -1 : obj1.event > obj2.event ? 1 : 0
        );
      }
      if (sortValue === DESCENDING) {
        adjustedTodo = adjustedTodo.sort((obj1, obj2) =>
          obj1.event < obj2.event ? 1 : obj1.event > obj2.event ? -1 : 0
        );
      }
    }

    if (filter !== ALLTASKS) {
      if (filter === COMPLETEDTASKS) {
        adjustedTodo = adjustedTodo.filter(todo => todo.finished === true);
      }

      if (filter === INCOMPLETETASKS) {
        adjustedTodo = adjustedTodo.filter(todo => todo.finished === false);
      }
    }

    return adjustedTodo;
  };

  useEffect(() => {
    setTimeout(() => {
      setRender(false);
    }, 1000);
  }, [sortValue, filter]);

  // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

  return (
    <>
      <div
        style={{ opacity: render === true ? '0' : '1' }}
        className={render !== true ? 'render' : 're-render'}
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

          {getTodos().map(todo => {
            return (
              <div
                ref={divTasksRefsById[todo.id]}
                key={todo.id}
                className='outer-div-container'
                style={{
                  background:
                    hoveredOnDivTask === divTasksRefsById[todo.id] &&
                    'rgb(244, 244, 244)',
                  outline:
                    hoveredOnDivTask === divTasksRefsById[todo.id] &&
                    '1px solid rgb(171,171,171)',
                  position: 'relative',
                }}
                onMouseEnter={() =>
                  setHoveredOnDivTask(divTasksRefsById[todo.id])
                }
                onMouseLeave={() => setHoveredOnDivTask(null)}
              >
                <div ref={greenBackgroundRefsById[todo.id]}></div>
                <div className='tasks-container'>
                  <span
                    className='checkbox-icon'
                    onClick={() => {
                      toggleCheckedTodo(
                        greenBackgroundRefsById[todo.id],
                        todo,
                        greenBackgroundRefsById
                      );
                    }}
                  >
                    {todo.finished ? checkedBox : uncheckedBox}
                  </span>

                  <div
                    style={{
                      display: 'inline-block',
                      position: 'relative',
                    }}
                  >
                    <label>
                      <div className='div-tasks'>{todo.event}</div>
                      <textarea
                        ref={textareaRefsById[todo.id]}
                        defaultValue={todo.event}
                        rows='1'
                        tabIndex='-1'
                        spellCheck='false'
                        className='my-text-area'
                        style={{
                          color:
                            todo['finished'] === true ? '#bbbbbb' : '#535559',
                          border: 'none',
                          borderRadius: '1pt',
                          boxShadow:
                            hoveredOnDivTask === divTasksRefsById[todo.id] &&
                            `0 0 0 1pt ${
                              hoveredOnTextarea === textareaRefsById[todo.id]
                                ? 'rgb(110,110,110)'
                                : 'darkgray'
                            } `,
                        }}
                        onMouseEnter={() =>
                          setHoveredOnTextarea(textareaRefsById[todo.id])
                        }
                        onMouseLeave={() => setHoveredOnTextarea(null)}
                        onChange={$event => onChangeTextarea($event, todo)}
                        onFocus={e => {
                          setHoveredOnDivTask(null);
                          setFocusedTextarea(textareaRefsById[todo.id]);
                          setUpdateTodoObject(todo);
                        }}
                        onBlur={() => {
                          if (updateTodoObject === null) return;

                          updateTodo(updateTodoObject);
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
