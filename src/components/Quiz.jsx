import { useState, useCallback } from "react";
import questions from "../questions.js";
import quizCompleteImage from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz () {
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    const handleSelectedAnswer = useCallback((selectedAnswer) => {
        setSelectedAnswers((previousSelectedAnswers) => {
            return [...previousSelectedAnswers, selectedAnswer];
        });
    }, []);

    const activeQuestionIndex = selectedAnswers.length;
    const quizIsComplete = activeQuestionIndex === questions.length;

    const shuffledAnswer = activeQuestionIndex < questions.length 
    ? [...questions[activeQuestionIndex].answers].sort(() => Math.random() - 0.5)
    : [];

    const handleSkipAnswer = useCallback(() => handleSelectedAnswer(null), [handleSelectedAnswer]);

    if (quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizCompleteImage} alt="Tropy Icon"/>
                <h2>Quiz Complete</h2>
            </div>
        ); 
    }else {
        
        console.log(quizIsComplete);
    }

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer key={activeQuestionIndex} timeOut={10000} onTimeOut={handleSkipAnswer} />
                <h2>{questions[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswer.map((answer) => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectedAnswer(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}