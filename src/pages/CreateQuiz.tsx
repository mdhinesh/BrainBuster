import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import '../styles/CreateQuiz.css';
import { useNavigate } from 'react-router-dom';


const CreateQuiz = () => {

    const navigate = useNavigate();

    const email: any = localStorage.getItem('email');

    // Code to get the quiz name and description
    const [quizName, setQuizName] = useState('');
    const [quizDescription, setQuizDescription] = useState('');

    const handleQuizNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuizName(event.target.value);
    };
    
    const handleQuizDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuizDescription(event.target.value);
    };

    // Code to get the time(for each qn), points, question and options
    const [time, setTime] = useState(60);
    const [points, setPoints] = useState(1);
    const [question, setQuestion] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [correctOption, setCorrectOption] = useState('');
    // Later on, we can use a checkbox to select the correct option as multiple correct options are allowed

    const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTime(parseInt(event.target.value));
    };

    const handlePointsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPoints(parseInt(event.target.value));
    };

    const handleQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestion(event.target.value);
    };

    const handleOption1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOption1(event.target.value);
    };

    const handleOption2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOption2(event.target.value);
    };

    const handleOption3Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOption3(event.target.value);
    };

    const handleOption4Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOption4(event.target.value);
    };

    // Code to get the correct option
    // For now, we are using a radio button to select the correct option
    const handleCorrectOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCorrectOption(event.target.value);
    };
    
    // Code to add the question to the quiz
    const [questions, setQuestions] = useState<any[]>([]);
    const [numQuestions, setNumQuestions] = useState(0);

    // call this function when the user clicks on the add question button
    const addQuestion = (event: any) => {
        event.preventDefault();
        const newQuestion = {
            question: question,
            timelimit: time,
            points: points,
            options: [
                {option: option1, correct: correctOption === "option1"},
                {option: option2, correct: correctOption === "option2"},
                {option: option3, correct: correctOption === "option3"},
                {option: option4, correct: correctOption === "option4"}
            ]
        };

        setQuestions([...questions, newQuestion]);
        setNumQuestions(numQuestions + 1);

        // Reset the form fields
        setQuestion('');
        setTime(60);
        setPoints(1);
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setCorrectOption('');      
    };

    // If the quiz has atleast 2 questions, then the quiz will be stored in the database
    const checkNumQuestions = () => {
        if (numQuestions < 1) {
            return false;
        }
        return true;
    };

    // Code to store the quiz data in the database
    const storeQuizData = async (event: any) => {
        console.log("Quiz Submitted");
        event.preventDefault();
        console.log(questions);
        if (!checkNumQuestions()) {
            alert("Quiz must have at least 2 questions");
            return;
        }
        const newQuestion = {
            question: question,
            timelimit: time,
            points: points,
            options: [
                { option: option1, correct: correctOption === "option1" },
                { option: option2, correct: correctOption === "option2" },
                { option: option3, correct: correctOption === "option3" },
                { option: option4, correct: correctOption === "option4" }
            ]
        };
    
        setQuestions([...questions, newQuestion]);
        setNumQuestions(numQuestions + 1);
    
        // Reset the form fields
        setQuestion('');
        setTime(60);
        setPoints(1);
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setCorrectOption('');
        
        const quiz = {
            email: email.replace(/"/g, ''),
            quizes: [
                {
                    quizname: quizName,
                    quizdescription: quizDescription,
                    numquestions: numQuestions + 1, // increment the number of questions to include the new question
                    questions: [...questions, newQuestion] // add the new question to the array of questions
                },
            ],
        }
        console.log(quiz);
        // -------------------------------------------------------
        // Code to store the quiz data in the firebase database
        const res = await fetch("https://brainbuster-fba66-default-rtdb.asia-southeast1.firebasedatabase.app/quiz.json",
        {
            method: "POST",
            body: JSON.stringify(quiz),
            headers: {
                "Content-Type": "application/json",
            },
        });
        // --------------------------------------------------------
        // Navigate the user to the home page without reloading the whole page
        navigate('/');
    };    

    // const storeQuizData = async (event: any) => {
    //     console.log("Quiz Submitted");
    //     event.preventDefault();
    //     console.log(questions);
    //     if (!checkNumQuestions()) {
    //         alert("Quiz must have atleast 2 questions");
    //         return;
    //     }
    //     addQuestion(event);
    //     const quiz = {
    //         email: email.replace(/"/g, ''),
    //         quizes: [
    //             {
    //                 quizname: quizName,
    //                 quizdescription: quizDescription,
    //                 numquestions: numQuestions,
    //                 questions: questions
    //             },
    //         ],
    //     }
    //     console.log(quiz);
    //     // -------------------------------------------------------
    //     // Code to store the quiz data in the firebase database
    //     const res = await fetch("https://brainbuster-fba66-default-rtdb.asia-southeast1.firebasedatabase.app/quiz.json",
    //     {
    //         method: "POST",
    //         body: JSON.stringify(quiz),
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     });
    //     // --------------------------------------------------------
    //     // Navigate the user to the home page without reloading the whole page
    //     navigate('/');
    // };
    
    // Code to handle the mcq if it is a single correct answer or multiple correct answers
    const [isMultiCorrect, setIsMultiCorrect] = useState(false);
    const answerType = isMultiCorrect ? "checkbox" : "radio";
    const handleCheckboxChange = () => {
        setIsMultiCorrect(!isMultiCorrect);
    };

    // Code to handle the modal
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const handleModalSubmit = () => {
        console.log("Modal Closed");
        setModalIsOpen(false);
    };

    // Code to hide the main content when modal is opened
    useEffect(() => {
        Modal.setAppElement('#root');
      }, []);
    
    return ( 
        <div className='createquiz_body'>
        <form onSubmit={storeQuizData}>
            <div className="create_quiz_Header">
                <p>{numQuestions} qn added</p>
                <select name="question_timer_dropdown" id=""
                    value={time} 
                    onChange={handleTimeChange}
                >
                    <option value="60">60 sec</option>
                    <option value="30">30 sec</option>
                    <option value="10">10 sec</option>
                    <option value="5">5 sec</option>
                </select> 
                <select name="question_points" id="" 
                    value={points}
                    onChange={handlePointsChange}
                >
                    <option value="1">1 point</option>
                    <option value="2">2 points</option>
                    <option value="3">3 points</option>
                    <option value="4">4 points</option>
                    <option value="5">5 points</option>
                    <option value="6">6 points</option>
                    <option value="7">7 points</option>
                    <option value="8">8 points</option>
                    <option value="9">9 points</option>
                    <option value="10">10 points</option>
                </select>
            </div>
            <div className="question_input_field_div">
                <textarea className="question_input_field" placeholder="Question" 
                    value={question}
                    onChange={handleQuestionChange}
                    required
                />
            </div>
            <div className="checkbox_to_multiple_answers_div">
                <input type="checkbox" name="" id="checkbox_to_multiple_answers" 
                    onChange={handleCheckboxChange}
                />
                <p>More than one correct answer</p>
            </div>
            <div className="answers_input_field_div">
                <div className="answer_input_field_subdiv">
                    <input type={answerType} name="mcq_options" className="answer_input_field_checkbox_radio"
                        checked={correctOption === 'option1'}
                        onChange={handleCorrectOptionChange}
                        value="option1"
                        required
                    />
                    <input type="text" className="answer_input_field" placeholder="Choice 1"
                        value={option1}
                        onChange={handleOption1Change}
                        required
                    />
                </div>
                <div className="answer_input_field_subdiv">
                    <input type={answerType} name="mcq_options" className="answer_input_field_checkbox_radio"
                        checked={correctOption === 'option2'}
                        onChange={handleCorrectOptionChange}
                        value="option2"
                        required
                    />
                    <input type="text" className="answer_input_field" placeholder="Choice 2"
                        value={option2}
                        onChange={handleOption2Change}
                        required
                    />
                </div>
                <div className="answer_input_field_subdiv">
                    <input type={answerType} name="mcq_options" className="answer_input_field_checkbox_radio"
                        checked={correctOption === 'option3'}
                        onChange={handleCorrectOptionChange}
                        value="option3"
                        required
                    />
                    <input type="text" className="answer_input_field" placeholder="Choice 3"
                        value={option3}
                        onChange={handleOption3Change}
                        required
                    />
                </div>
                <div className="answer_input_field_subdiv">
                    <input type={answerType} name="mcq_options" className="answer_input_field_checkbox_radio"
                        checked={correctOption === 'option4'}
                        onChange={handleCorrectOptionChange}
                        value="option4"
                        required
                    />
                    <input type="text" className="answer_input_field" placeholder="Choice 4"
                        value={option4}
                        onChange={handleOption4Change}
                        required
                    />
                </div>
            </div>
            <div id="done_button_div">
                <button type='submit'>Done</button>
                <button onClick={addQuestion} >Add question</button>
            </div>
        </form>    
        <Modal isOpen={modalIsOpen} >
            <h2>Modal Title</h2>
            <span>
                <p>Quiz Name</p>
                <input type="text" id='quizname' placeholder='Enter quiz name'
                    onChange={handleQuizNameChange}
                    required
                />
            </span>
            <span>
                <p>Quiz Description</p>
                <input type="textarea" name="description" placeholder='Enter the description' id=""
                    onChange={handleQuizDescriptionChange}
                    required
                />
            </span>
            <button onClick={handleModalSubmit}>Add quiz</button>
        </Modal>
    </div>
     );
}
 
export default CreateQuiz;

// Future work: Make the quiz to accept multiple answers for a single question

// Data Structure of the Quiz
// const quiz = {
//     email: email.replace(/"/g, ''),
//     quizes: [
//         {
//             quizname: quizName,
//             quizdescription: quizDescription,
//             numquestions: numQuestions,
//             questions: [
//               {
//                 question: question,
//                 timelimit: time,
//                 points: points,
//                 options: [
//                   {option: option1, correct: false},
//                   {option: option2, correct: false},
//                   {option: option3, correct: true},
//                   {option: option4, correct: false}
//                 ]
//               },
//             ]        
//         },
//     ],
//   }
