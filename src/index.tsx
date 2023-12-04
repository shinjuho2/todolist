import React from 'react';
import ReactDOM from 'react-dom/client';
import Todolist from './Todolist';
import GlobalStyles from './GlobalStyles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyles/>
    <Todolist/>
  </React.StrictMode>
);
