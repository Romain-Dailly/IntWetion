import React from 'react';
import './App.css';
import FormGet from './Components/Form/FormGet';
import NavBar from './Components/NavBar/NavBar';

function App() {
  return (
    <div>
      <NavBar title='yaourt' />
      <FormGet />
    </div>
  );
}

export default App;
