import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from './utils/ThemeContext';
import Background from './components/Background';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
ReactDOM.render(
  <Background>
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <Toaster />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Background>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
