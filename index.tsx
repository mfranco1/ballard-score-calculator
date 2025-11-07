
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initGA, trackPageView } from './utils/analytics';

// Initialize Google Analytics
initGA();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Track initial page view
trackPageView(window.location.pathname);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
