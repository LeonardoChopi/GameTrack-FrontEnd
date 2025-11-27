import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Crear el elemento root si no existe
if (!document.getElementById('root')) {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);