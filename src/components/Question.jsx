import QuestionTimer from "./QuestionTimer";

import  {Answer}  from "./Answer.jsx";
export default function Question({questionText, 
                    answers, 
                    onselectedAnswer, 
                    selectedAnswer, 
                    answerState,
                    onSkipAnswer
                }) {
    return (
        <div id="question">
            <QuestionTimer
                
                timeout={10000}
                onTimeout={onSkipAnswer}
            />
            <h2>{questionText}</h2>
            <Answer
               
                answer={answers}
                selectedAnswer={selectedAnswer}
                answerState={answerState}
                onSelect={onselectedAnswer}
            />
        </div>
    );
}