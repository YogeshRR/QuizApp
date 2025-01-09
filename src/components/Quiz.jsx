import { useState, useCallback } from "react";
import questions from "../questions.js";
import quizCompleteImage from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz () {

    const [checkSelectedAnswers, setCheckSelectedAnswers] = useState('unanswered');
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    

    const activeQuestionIndex = checkSelectedAnswers === 'unanswered' ? selectedAnswers.length : (questions.length - 1);
    console.log('activeQuestionIndex at defination', activeQuestionIndex);
    const quizIsComplete = activeQuestionIndex === questions.length;
   
    const handleSelectedAnswer = useCallback((selectedAnswer) => {
        setCheckSelectedAnswers('answered');
        setSelectedAnswers((previousSelectedAnswers) => {
            return [...previousSelectedAnswers, selectedAnswer];
        });
        setTimeout(() => {
            if(selectedAnswer === questions[activeQuestionIndex].answers[0]) {
                setCheckSelectedAnswers('correct');
            }else {
                setCheckSelectedAnswers('incorrect');
            }
            setTimeout(() => {
                setCheckSelectedAnswers('');
            }, 2000);
        }, 1000);
    }, [activeQuestionIndex]);

   
   
    

    const handleSkipAnswer = useCallback(() => handleSelectedAnswer(null), [handleSelectedAnswer]);

    if (quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizCompleteImage} alt="Tropy Icon"/>
                <h2>Quiz Complete</h2>
            </div>
        ); 
    }
    console.log('activeQuestionIndex', activeQuestionIndex);
    const shuffledAnswers = [...questions[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);
    // const shuffledAnswer = activeQuestionIndex < questions.length 
    // ? [...questions[activeQuestionIndex].answers].sort(() => Math.random() - 0.5)
    // : [];
    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer key={activeQuestionIndex} timeOut={10000} onTimeOut={handleSkipAnswer} />
                <h2>{questions[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) => {
                        const isSelected = selectedAnswers[selectedAnswers.lenght -1] === answer;
                        let cssClass = '';
                        if (checkSelectedAnswers === 'answered' && isSelected) {
                            cssClass = 'selected';
                        }
                        if ((checkSelectedAnswers === 'correct' || checkSelectedAnswers === 'incorrect') && isSelected) {
                            cssClass = checkSelectedAnswers;
                        }
                        return  <li key={answer} className="answer">
                        <button className= {cssClass} onClick={() => handleSelectedAnswer(answer)}>{answer}</button>
                    </li>;
                    }
    
                    )}
                </ul>
            </div>
        </div>
    );
}