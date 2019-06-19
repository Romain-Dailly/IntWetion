import React from 'react';
import './App.css';
import FormGet from './Components/Form/FormGet';
// import ModalTest from './Components/Test/ModalTest/ModalTest';
import NavBar from './Components/NavBar/NavBar';


function App() {

  return (
    <div>
      <NavBar title='yaourt'/>
      <FormGet /> 
      {/* <ModalTest /> */}
    </div>
  );
}

export default App;
