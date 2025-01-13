import QuestionTimer from "./QuestionTimer";
import QUESTION from "../questions.js";
import  {Answer}  from "./Answer.jsx";
import { useState } from "react";
export default function Question({questionText, 
                    questionIndex,
                    onSelectAnswer, 
                    onSkipAnswer
                }) {
   const [answer, setAnswer] =     useState({
            selectedAnswer : '',
            isCorrect : null
        });
    function handleSelectAnswer (answer) {
        setAnswer ({
            selectedAnswer : answer,
            isCorrect : null,
        });

        setTimeout(() => {
            setAnswer ({
                selectedAnswer : answer,
                isCorrect : QUESTION[questionIndex].answers[0] === answer,
            });
        setTimeout(() => {
            onSelectAnswer(answer);
        }, 2000);
        }, 1000);
    }

    let answerState = '';

    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    }

    return (
        <div id="question">
            <QuestionTimer
                
                timeout={10000}
                onTimeout={onSkipAnswer}
            />
            <h2>{QUESTION[questionIndex].text}</h2>
            <Answer
               
                answer={QUESTION[questionIndex].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
        </div>
    );
}