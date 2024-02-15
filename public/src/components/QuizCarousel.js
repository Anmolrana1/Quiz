import React, { useEffect, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const QuizCarousel = () => {
  const [questionSet, setQuestionSet] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedAnswer,setSelectedAnswer]=useState([{}]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestionSet = async () => {
      try {
        const response = await fetch('http://localhost:5000/quizset');
        
        if (!response.ok) {
          throw new Error('Failed to fetch quiz sets');
        }
        
        const data = await response.json();
        console.log('Fetched data:', data); // Log fetched data
        
        const Code = localStorage.getItem('Code'); // Get user's phone from local storage
        const filteredQuestions = [];
        for (const q in data) {
            if (data[q].code === Code) {
              filteredQuestions.push(data[q].questions);
            }
        }
        console.log("Filtered Questions : " , filteredQuestions);

        // Set questionSet to the array of filtered questions
        setQuestionSet(filteredQuestions);
        
      
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz sets:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchQuestionSet();
    
  }, []);

  console.log("fil : ", questionSet);
  var finalScore = 0;

  const handleOptionSelect = (questionIndex, correctAnswer, value) => {
    let updatedSelectedAnswer = { ...selectedAnswer };
    let score = 0;
  
    // Check if the questionIndex is already present in selectedAnswer
    if (updatedSelectedAnswer.hasOwnProperty(questionIndex)) {
      // If questionIndex exists, update its score based on the correctness of the answer
      if (correctAnswer === value) {
        score = 1;
      }
      updatedSelectedAnswer[questionIndex] = score;
    } else {
      // If questionIndex doesn't exist, create it and assign the score based on the correctness of the answer
      if (correctAnswer === value) {
        updatedSelectedAnswer = { ...updatedSelectedAnswer, [questionIndex]: 1 };
      } else {
        updatedSelectedAnswer = { ...updatedSelectedAnswer, [questionIndex]: 0 };
      }
    }
  
    setSelectedAnswer(updatedSelectedAnswer);
   
  };
  
  const getResult=()=>{
    for(var key in selectedAnswer){
      console.log(selectedAnswer[key]);
        finalScore += selectedAnswer[key];
    }

    setScore(finalScore);
  }


  return (
    
    <div>
{questionSet && (
  <div>
    <h1 style={{display: "flex", justifyContent: "center"}}>Quest<span style={{color: "darkorange", marginLeft: "7px"}}>Masters</span></h1><br></br>
    <h2 style={{margin: "20px", color: "purple"}}>Your Quiz:</h2>
    {Object.keys(questionSet).map((key) => (
      <div key={key}>
        {/* Check if questionSet[key] is an array before mapping over it */}
        {Array.isArray(questionSet[key]) && questionSet[key].map((question, questionIndex) => (

          <div className='quizcard'>
              <Card>
              <div key={questionIndex}>
              <h3>Question: {question.questionName}</h3>
            
              <ul>
                {question.options && question.options.map((option, optionIndex) => (
                  <li style={{marginTop: "10px"}} key={optionIndex}>
                    <Checkbox
                      inputId={`option_${questionIndex}_${optionIndex}`}
                      onChange={(e) => handleOptionSelect(questionIndex,question.answer, option)}
                      checked={selectedOptions[questionIndex] === optionIndex}
                      
                    />
                    <label style={{marginLeft: "10px"}} htmlFor={`option_${questionIndex}_${optionIndex}`}>{option}</label>
                  </li>
                ))}
              </ul>

              </div>
              </Card>
          </div>          

        ))}
      </div>
    ))}
  </div>
)}


      <div>
        <b style={{color: "purple", margin: "20px"}}>Score: {score}</b>
      </div>
    <Button style={{margin: "20px", borderRadius: "5px"}} onClick={getResult} label='SUBMIT'/>
    </div>
  );
};

export default QuizCarousel;

