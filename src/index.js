


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';


// Make sure the DOM is fully loaded before rendering
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("root")

  // Check if the container exists
  if (container) {
    const root = createRoot(container)
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  } else {
    console.error('Root element not found. Make sure there is a div with id "root" in your HTML.')
  }
})

reportWebVitals();