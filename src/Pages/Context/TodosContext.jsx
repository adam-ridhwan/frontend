import { createContext, useState } from 'react';

export const TodosContext = createContext();
const ALLTASKS = 'All tasks';
const COMPLETEDTASKS = 'Completed tasks';
const INCOMPLETETASKS = 'Incomplete tasks';

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(ALLTASKS);
  const [sortedTodos, setSortedTodos] = useState([]);
  const [sortValue, setSortValue] = useState('REMOVESORT');

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        filter,
        setFilter,
        sortedTodos,
        setSortedTodos,
        sortValue,
        setSortValue,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
