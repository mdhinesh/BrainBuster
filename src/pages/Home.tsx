import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Home = () => {
  
    const handleclick = () => {
        localStorage.removeItem('email');
        window.location.reload();
    }

    const [value, setvalue] = useState<any | null>(null);

    useEffect(() => {
        const email:String | null = localStorage.getItem('email');
        setvalue(email ? email.replace(/@gmail\.com|"/g, "") : null);
    })
    
    return ( 
        <div>
            <div className="Header">
                <h1 className="Header_logo">BrainBuster</h1>
                <button onClick={handleclick}>Logout</button>
                <div className="Header_menu_icon"></div>
            </div>
            <div className='body'>

            <div className='EnterCode_div'>
                <button><Link className='Link_to_createquiz' to={'takequiz'}>Enter Quiz</Link></button>
            </div> 

            <div className="GreetUser_div">
                <h2>Hello {value}!</h2>
                <span className='GreetUser_activity_span'>
                <h3>Edit profile</h3> 
                <span>.</span>
                <h3>View activity</h3>
                </span>
            </div>

            <div className="CreateQuiz_div">
                <button><Link className='Link_to_createquiz' to={'createquiz'}>Create a quiz</Link></button>
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

        {/* 
        2. Create a form for users to create a new quiz. The form should include fields for 
        the quiz name, description, points/grading system, and time limit.✔️

        3. Create a database to store quiz data. You can use any database technology you 
        like, but we recommend using Firebase for ease of use.

        4. Implement a feature for adding and deleting questions to the quiz. Each 
        question should include a prompt and several multiple choice answer options.

        5. Implement a feature for taking the quiz. Users should be able to see each 
        question one at a time and select their answer. The application should keep track 
        of the user's score and display it at the end of the quiz.
        6. Test your application thoroughly to make sure it is working as expected.
        7. Once you have completed the assignment, host your React App on a free 
        platform and submit the app link and GitHub repo link to dip.patel@goreeva.com. 
        Include instructions for the app installation in a README file  */}
            </div>
        </div>
     );
}
 
export default Home;