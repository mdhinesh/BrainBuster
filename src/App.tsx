import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <div className="App">

      <div className="Header">
        <h1 className="Header_logo">BrainBuster</h1>
        <div className="Header_menu_icon"></div>
      </div>

      <div className='body'>

        <div className='EnterCode_div'>
          <input type="text" placeholder='enter a code to join'/>
          <button>Enter Quiz</button>
        </div>

        <div className="GreetUser_div">
          <h2>Hello Username!</h2>
          <span className='GreetUser_activity_span'>
            <h3>Edit profile</h3> 
            <span>.</span>
            <h3>View activity</h3>
          </span>
        </div>

        <div className="QuizesAvailable_div">
          <h2>Quizes available</h2>
          <span>
            <p>see more</p>
          </span>
        </div>

        <div className="Quiz_List_div">

          <div className="Quiz_List_item">
            <img src="" alt="" />
            <h3>Quiz name<p>MCQ - 10 Questions</p></h3>
          </div>

          <div className="Quiz_List_item">
            <img src="" alt="" />
            <h3>Quiz name <p>No choice - 10 Questions</p></h3>
          </div>

          <div className="Quiz_List_item">
            <img src="" alt="" />
            <h3>Quiz name <p>No choice - 10 Questions</p></h3>
          </div>

        </div>
{/* 
1. Users should be able to create a quiz by providing the quiz name, description, 
points/grading system, and time limit.
2. Users should be able to edit the quiz by adding or deleting questions and 
adding or deleting multiple choice answer options.
3. Users should be able to take the quiz and receive immediate feedback on their 
score         
*/}
        <div className="CreateQuiz_div">
          <h2>Create a quiz</h2>
        </div>
        
      </div>
    </div>
  )
}

export default App
