import React from 'react';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { store } from './state/store'
import { Provider } from 'react-redux'
import { createRoot } from "react-dom/client"

// React strictmode renders components twice in dev mode. 
const container = document.getElementById('root') as Element;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
