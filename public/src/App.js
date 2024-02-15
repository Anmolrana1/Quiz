import './App.css';
import Dashboard from './components/dashboard';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Home from './components/home';
import Login from './components/login';
import QuizQuestion from './components/QuizQuestion';
import QuizCreator from './components/QuizCreator';
import Signup from './components/signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizCarousel from './components/QuizCarousel';
import MyQuizzes from './components/MyQuizzes';
import TakeQuiz from './components/TakeQuiz';
import { useEffect, useState } from 'react';

function App() {
  const [QuestionSetData, setQuestionSetData] = useState([{ name: '', code: '', domain: '', userID: '' }]);


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/creator' element={<QuizCreator QuestionSetData={QuestionSetData} setQuestionSetData={setQuestionSetData} />} />
          <Route path='/create' element={<QuizQuestion QuestionSetData={QuestionSetData} />} />
          <Route path='/carousel' element={<QuizCarousel />} />
          <Route path='/myquizzes' element={<MyQuizzes />} />
          <Route path='/takequiz' element={<TakeQuiz />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
