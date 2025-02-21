import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Home } from './components/home/home';

function App() {
  return (
    <div className='flex flex-col items-center min-h-screen justify-center'>
      <Home/>
    </div>
  );
}

export default App;
