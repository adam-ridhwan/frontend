import { createContext, useState } from 'react';

export const TodosContext = createContext();
const ALLTASKS = 'All tasks';

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(ALLTASKS);
  const [searchField, setSearchField] = useState('');
  const [sortValue, setSortValue] = useState('REMOVESORT');

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        filter,
        setFilter,
        searchField,
        setSearchField,
        sortValue,
        setSortValue,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
