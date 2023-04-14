import { Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import Home from './pages/Home';
import CreateQuiz from './pages/CreateQuiz';
import TakeQuiz from './pages/TakeQuiz';

import {auth, provider} from './auth/config';
import {signInWithPopup} from 'firebase/auth';
import React, { useEffect, useState } from 'react';

function App() {

  const [value, setvalue] = useState<any | null>(null);

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setvalue(data.user.email);
      // console.log(data.user.email);
      localStorage.setItem('email', JSON.stringify(data.user.email));
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    const email:String | null = localStorage.getItem('email');
    setvalue(email);
  })


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          value ? <Home /> : 
          <div>
            <button onClick={handleClick}>Signin with Google</button>
          </div>
        } />
        <Route path='/createquiz' element={<CreateQuiz />} />
        <Route path='/takequiz' element={<TakeQuiz />} />
      </Routes>
      {/* <Home /> */}
      {/* <form action="">
        <input type="text" className="form_quiz_name" />
        <input type="text" className="form_quiz_description" />
        <input type="text" className="form_quiz_points" />
        <input type="text" className="form_quiz_time_limit" />
      </form> */}
    </div>
  )
}

export default App
