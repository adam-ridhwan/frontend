import { createRef, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'; // prettier-ignore
import { v4 as uuidv4 } from 'uuid';
import FetchTodos from '../../API/FetchTodos';
import PostTodos from '../../API/PostTodos';
import UpdateTodos from '../../API/UpdateTodos';
import { ALLTASKS, ASCENDING, COMPLETEDTASKS, DESCENDING, INCOMPLETETASKS, REMOVESORT } from '../../Constants/Constants'; // prettier-ignore
import { TodosContext } from '../../Context/TodosContext';

import Adjustments from '../Adjustments/Adjustments';
import './Content.styles.css';

const CLASSNAME = 'greenBackground';

const Content = () => {
  FetchTodos(); // get todos os user on initial render

  const { todos, setTodos, filter, sortValue, searchField } =
    useContext(TodosContext);

  const [todoText, setTodoText] = useState('');
  const [hoveredOnDiv, setHoveredOnDiv] = useState(null);
  const [hvrdTextarea, setHvrdTextarea] = useState(null);
  const [focusedTextarea, setFocusedTextarea] = useState(null);
  const [render, setRender] = useState(true);

  const divRefs = useMemo(() => {
    const refs = {};
    todos.forEach(todo => (refs[todo.id] = createRef(null)));
    return refs;
  }, [todos]);

  const textareaRefs = useMemo(() => {
    const refs = {};
    todos.forEach(todo => (refs[todo.id] = createRef(null)));
    return refs;
  }, [todos]);

  const greenbckgrdRefs = useMemo(() => {
    const refs = {};
    todos.forEach(todo => (refs[todo.id] = createRef(null)));
    return refs;
  }, [todos]);

  const addTaskInputRef = useRef();

  // add new todo
  const AddNewTodo = (e, todoText) => {
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
    PostTodos(newTodos);
  };

  // toggle checkmark
  const toggleCheckedTodo = (ref, todo) => {
    const newTodos = [...todos];
    const selectedTodo = Object.values(todos).find(obj => obj.id === todo.id);
    const todoIndex = todos.indexOf(selectedTodo);
    newTodos[todoIndex].finished = !newTodos[todoIndex].finished;

    if (todo.finished) ref.current.classList.add(CLASSNAME);
    if (!todo.finished) ref.current.classList.remove(CLASSNAME);

    setTodos(newTodos);
    PostTodos(newTodos);
  };

  // delete className greenBackground
  const deleteClassNameMemoized = useCallback(() => {
    for (const [, value] of Object.entries(greenbckgrdRefs))
      if (value.current !== null) value.current.classList.remove(CLASSNAME);
  }, [greenbckgrdRefs]);

  useEffect(() => {
    deleteClassNameMemoized();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortValue, filter]);

  // update todo text
  const onChangeTextarea = (e, selectedTodoToChange) => {
    let newTodos = [...todos];
    const selectedTodo = Object.values(newTodos).find(
      todo => todo.id === selectedTodoToChange.id
    );
    const todoIndex = newTodos.indexOf(selectedTodo);
    newTodos[todoIndex].event = e.target.value;
    setTodos(newTodos); // IMPORTANT
  };

  const handleDeleteIfEmpty = todo => {
    if (todo.event !== '') return;

    const newtodos = todos.filter(oldTodo => {
      return oldTodo.id !== todo.id;
    });
    setTodos(newtodos);
    PostTodos(newtodos);
  };

  useEffect(() => {
    const editTextrea = e => {
      if (focusedTextarea === null) return;
      if (focusedTextarea !== e.target) {
        focusedTextarea.setSelectionRange(0, 0);
        focusedTextarea.focus();
        focusedTextarea.blur();
        setFocusedTextarea(null);
      }
    };
    document.addEventListener('click', editTextrea);
    return () => {
      document.removeEventListener('click', editTextrea);
    };
  });

  useEffect(() => {
    setTimeout(() => setRender(false), 1000);
  }, [sortValue, filter]);

  const getTodos = () => {
    // helper: filter by text function
    const filterTodos = todos => {
      return todos.filter(todo =>
        todo.event.toLowerCase().includes(searchField)
      );
    };

    if (filter === ALLTASKS && sortValue === REMOVESORT)
      return filterTodos(todos);

    let adjustedTodo = [...todos];

    if (sortValue !== REMOVESORT) {
      if (sortValue === ASCENDING)
        adjustedTodo = adjustedTodo.sort((obj1, obj2) =>
          obj1.event < obj2.event ? -1 : obj1.event > obj2.event ? 1 : 0
        );

      if (sortValue === DESCENDING)
        adjustedTodo = adjustedTodo.sort((obj1, obj2) =>
          obj1.event < obj2.event ? 1 : obj1.event > obj2.event ? -1 : 0
        );
    }

    if (filter !== ALLTASKS) {
      if (filter === COMPLETEDTASKS)
        adjustedTodo = adjustedTodo.filter(todo => todo.finished === true);

      if (filter === INCOMPLETETASKS)
        adjustedTodo = adjustedTodo.filter(todo => todo.finished === false);
    }

    return filterTodos(adjustedTodo);
  };

  // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

  return (
    <>
      <div style={{ opacity: render === true ? '0' : '1' }} className='render'>
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
                ref={divRefs[todo.id]}
                key={todo.id}
                className='outer-div-container'
                style={{
                  background:
                    hoveredOnDiv === divRefs[todo.id] && 'rgb(244, 244, 244)',
                  outline:
                    hoveredOnDiv === divRefs[todo.id] &&
                    '1px solid rgb(171,171,171)',
                  position: 'relative',
                }}
                onMouseEnter={() => setHoveredOnDiv(divRefs[todo.id])}
                onMouseLeave={() => setHoveredOnDiv(null)}
              >
                <div ref={greenbckgrdRefs[todo.id]}></div>
                <div className='tasks-container'>
                  <span
                    className='checkbox-icon'
                    onClick={() =>
                      toggleCheckedTodo(greenbckgrdRefs[todo.id], todo)
                    }
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
                        ref={textareaRefs[todo.id]}
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
                            hoveredOnDiv === divRefs[todo.id] &&
                            `0 0 0 1pt ${
                              hvrdTextarea === textareaRefs[todo.id]
                                ? 'rgb(110,110,110)'
                                : 'darkgray'
                            } `,
                        }}
                        onMouseEnter={() =>
                          setHvrdTextarea(textareaRefs[todo.id])
                        }
                        onMouseLeave={() => setHvrdTextarea(null)}
                        onChange={$e => onChangeTextarea($e, todo)}
                        onFocus={() => {
                          setHoveredOnDiv(null);
                          setFocusedTextarea(textareaRefs[todo.id].current);
                        }}
                        onBlur={() => {
                          UpdateTodos(todo);
                          handleDeleteIfEmpty(todo);
                        }}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            UpdateTodos(todo);
                          }
                          if (e.key === 'Backspace') handleDeleteIfEmpty(todo);
                        }}
                      ></textarea>
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
          <div className='add-task-input-container'>
            <span>{addIcon}</span>
            <form onSubmit={e => AddNewTodo(e, todoText)}>
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
