import { useEffect, useState } from 'react';
import rightarrow from '../assets/right-arrow-svgrepo-com.svg';
import { database } from '../auth/config';
import { ref, onValue } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import '../styles/TakeQuiz.css';

const TakeQuiz = () => {
  const [quizData, setQuizData] = useState<any>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [totalScore, setTotalScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const navigate = useNavigate();

  // code to fetch data from firebase
  // ------------------------------------------------
  useEffect(() => {
    const quizRef = ref(database, 'quiz/');
    onValue(quizRef, (snapshot) => {
      const data = snapshot.val();
      const quizList: any = [];
      for (let id in data) {
        quizList.push({ id, ...data[id] });
      }
      console.log(quizList);
      setQuizData(quizList);
      setUserAnswers(new Array(quizList[0]?.quizes[0]?.questions.length).fill(false));
      setIsLoading(false);
    });
  }, []);
  // -------------------------------------------------

  const handleAnswerSelect = (index: number) => {
    const newAnswers = [...userAnswers];
    const question = quizData[0]?.quizes[0]?.questions[currentQuestion];
    const isAnswerCorrect = question.options[index]?.correct;
    newAnswers[currentQuestion] = isAnswerCorrect;
    setUserAnswers(newAnswers);
  }

  // New code to handle the score calculation

  const handleScoreCalculation = () => {
    const questions = quizData[0]?.quizes[0]?.questions;
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      const isAnswerCorrect = userAnswers[i];
      if (isAnswerCorrect) {
        score += questions[i]?.points || 0;
      }
    }
    setTotalScore(score);
  }

  const handleNextQuestion = (e: any) => {
    if (e){
      e.preventDefault();
    }
    // e.preventDefault();
    if (currentQuestion < quizData[0]?.quizes[0]?.questions.length - 1) {
      const radioButtons = document.getElementsByName("options");
      radioButtons.forEach((button: any) => {
        button.checked = false;
      });
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleScoreCalculation();
      const numCorrectAnswers = userAnswers.filter(answer => answer).length;
      const score = numCorrectAnswers / quizData[0]?.quizes[0]?.questions.length * 100;
      alert(`You scored ${score.toFixed(2)}% (${numCorrectAnswers} out of ${quizData[0]?.quizes[0]?.questions.length})`);
      setCurrentQuestion(0);
      setUserAnswers(new Array(quizData[0]?.quizes[0]?.questions.length).fill(false));
      navigate('/');
      // navigate(`/results?score=${totalScore}`);
    }
  }

  const question = quizData[0]?.quizes[0]?.questions[currentQuestion]?.question || "";
  const options = quizData[0]?.quizes[0]?.questions[currentQuestion]?.options || [];

  // code display the timer of each question

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    if(timeLeft === 0) {
      handleNextQuestion(null);
    }
  
    return () => clearTimeout(timer);
  }, [timeLeft]);
  
  useEffect(() => {
    // setTimeLeft when the page is intially loaded
    setTimeLeft(quizData[0]?.quizes[0]?.questions[currentQuestion]?.timelimit); // Reset the timer when the current question changes
    console.log(quizData[0]?.quizes[0]?.questions[currentQuestion]?.timelimit);
    console.log(currentQuestion);
  }, [currentQuestion]);
  

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div className='takequiz_body'>
        <form action="">
          <div className="takequiz_Header">
            <div className="no_of_questions">
            <div className="timer">
              {timeLeft}
            </div>            
            {`${currentQuestion + 1}`} / {`${quizData[0]?.quizes[0]?.numquestions}`}
            </div>
          </div>
          <div className="takequiz_card">
            <div className="question_div">
              <p className="question" placeholder="Question" >
                {question}
              </p>
            </div>
            <div className="choose_answer_div">
              {options.map((option: any, index: number) => (
                <div key={index} className="choose_answer_mcq_subdiv">
                  <input type={'radio'} name="options" className='mcq_answer_checkbox_radio'
                    onClick={() => handleAnswerSelect(index)}
                  />
                  <p className='mcq_answer'>{option.option}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="done_button_div">
            <p>Select all<br />that apply</p>
            <button onClick={handleNextQuestion}><img src={rightarrow} alt="" /></button>
          </div>
        </form>
      </div>
    )}
    </>
  );
}

export default TakeQuiz;

// The code above is the code for the TakeQuiz.tsx file. 
// The code is pretty straightforward. 
// We fetch the quiz data from the database and store it in the quizData state. 
// We also create a userAnswers state which is an array of booleans. 
// The length of this array is equal to the number of questions in the quiz. 
// We use this array to keep track of whether the user has answered a question 
// correctly or not. 
// We also create a currentQuestion state which keeps track of the 
// current question number. 
// We use this state to display the correct question and options to the user.