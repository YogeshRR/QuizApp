import { useState, useCallback } from "react";

import questions from "../questions.js";
import quizCompleteImage from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer.jsx";
export default function Quiz () {
    
    const [selectedAnswers, setSelectedAnswer] = useState([]);

   const handleSelectedAnswer = useCallback (() => function handleSelectedAnswer (selectedAnswer) {
    setSelectedAnswer((previousSelctedAnswer) => {
        return [...previousSelctedAnswer, selectedAnswer];
    }, []);
    }
  ); 
    const activeQuestionIndex =  selectedAnswers.length;
    const quizIsComplete = activeQuestionIndex === questions.length;

    if (quizIsComplete) {
        return (
        <div id="summary">
            <img src={quizCompleteImage} alt="Tropy Icon"/>
            <h2>Quiz Complete</h2>
            
        </div>
        ); 
    }

    const shuffledAnswer = questions[activeQuestionIndex].answers;
    shuffledAnswer.sort(() => Math.random());

   const handleSkipAnswer = useCallback(() => {() => handleSelectedAnswer(null)},[handleSelectedAnswer]);



    return <div id="quiz">
        <div id="question">
        <QuestionTimer timeOut={10000} onTimeOut={handleSkipAnswer} />
        <h2>{questions[activeQuestionIndex].text}</h2>
        <ul id="answers">
            {shuffledAnswer.map((answer) => (
                <li key={answer} className="answer">
                    <button onClick={ () => handleSelectedAnswer (answer)}>{answer}</button>
                </li>
            ))}
        </ul>
    </div> 
    </div>
}