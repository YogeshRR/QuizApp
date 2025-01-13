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
     let timer = 10000;

     if (answer.selected) {
        timer = 1000;
     }

     if (answer.isCorrect !== null) {
        timer = 2000;
     }
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
    }else if (answer.selectedAnswer) {
        answerState = 'answered';
    }

    return (
        <div id="question">
            <QuestionTimer
                key={timer}
                timeout={timer}
                onTimeout={answer.selectedAnswer ? onSkipAnswer : null}
                mode={answerState}
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