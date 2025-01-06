import { useState } from "react";

import questions from "../questions.js";

export default function Quiz () {
    
    const [selectedAnswers, setSelectedAnswer] = useState([]);

    function handleSelectedAnswer (selectedAnswer) {
        setSelectedAnswer((previousSelctedAnswer) => {
            return [...previousSelctedAnswer, selectedAnswer];
        });
    }

    const activeQuestionIndex =  selectedAnswers.length;
    return <div id="quiz">
        <div id="question">
        <h2>{questions[activeQuestionIndex].text}</h2>
        <ul id="answers">
            {questions[activeQuestionIndex].answers.map((answer) => (
                <li key={answer} className="answer">
                    <button onClick={ () => handleSelectedAnswer (answer)}>{answer}</button>
                </li>
            ))}
        </ul>
    </div> 
    </div>
}