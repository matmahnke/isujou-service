import React from 'react';
import Routes from './store/routes';
import './App.css';

import { ToastProvider } from 'react-toast-notifications'

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/scss/argon-design-system-react.scss";

const App = () => (
  <ToastProvider>
    <main className="App">
      <Routes />
    </main>
  </ToastProvider>
);

export default App;
