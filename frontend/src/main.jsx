import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './context/AuthContext';
import { WorkoutsContextProvider } from './context/WorkoutsContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <WorkoutsContextProvider>
      <App />
    </WorkoutsContextProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);
