import React from 'react';
import Routes from './store/routes';
import './App.css';

const App = () => (
  <main className="App">
    <h1>{process.env.REACT_APP_NAME}</h1>
    <h1>{process.env.REACT_APP_BASE_URL}</h1>
    <Routes />
  </main>
);

export default App;
