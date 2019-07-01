import React, { useState } from 'react';
// import Modal from './Components/Modal/Modal';
// import NavBar from './Components/NavBar/NavBar';
import './App.css';
import AdminQuestion from './Components/adminpanel/AdminQuestion/AdminQuestion';
// import Home from './Components/Home/Home';



function App() {
  // const [isVisible, setVisibility] = useState(false);
  // const runQuiz = () => {
  //   setVisibility(true);
  // };

  // const quitQuiz = () => {
  //   console.log('quit');

  //   setVisibility(false);
  // };

  return (
    <div>
      <AdminQuestion/>
      {/* <NavBar title="Forces" />
      <Home cards={data} runQuiz={runQuiz} />
      <div className={(isVisible ? '' : 'd-none')}>
        <Modal questions={questions} quitQuiz={quitQuiz} />
      </div> */}
    </div>

  );
}

export default App;
