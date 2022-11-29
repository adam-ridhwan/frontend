import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

import { TodosProvider } from './Context/TodosContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TodosProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TodosProvider>
  </React.StrictMode>
);
