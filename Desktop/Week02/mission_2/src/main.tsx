import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { TodoProvider } from './context/TodoContext.tsx';
import './index.css';
import { ThemeProvider } from './context/ThemeProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TodoProvider>
      <ThemeProvider>
      <App />
      </ThemeProvider>
    </TodoProvider>
  </React.StrictMode>
);