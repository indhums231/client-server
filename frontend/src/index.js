import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './components/StoreContext';
import { ThemeProvider } from './components/ThemeContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
     <StoreContextProvider>
     <ThemeProvider>
          <App />
      </ThemeProvider>
      </StoreContextProvider>
    </BrowserRouter>
);


