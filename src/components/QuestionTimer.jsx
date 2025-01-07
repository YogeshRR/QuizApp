import { useEffect, useState } from "react";

export default function QuestionTimer ({timeOut, onTimeOut}) {

    const [remainingTime, setRemainingTime] = useState(timeOut);

    useEffect(() => {
        setTimeout(onTimeOut, timeOut);
    },[onTimeOut, timeOut]);
    

    useEffect (() => {
        setInterval(() => {
          setRemainingTime((previousRemainingTime) => previousRemainingTime - 100);
        }, 100);
    },[]);
    
    return (
        <progress id="question-time" max={timeOut} value={remainingTime} />
    );
}