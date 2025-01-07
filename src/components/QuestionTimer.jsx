import { useEffect, useState } from "react";

export default function QuestionTimer ({timeOut, onTimeOut}) {

    const [remainingTime, setRemainingTime] = useState(timeOut);

    useEffect(() => {
        console.log('SETTING TIMEOUT');
        setTimeout(onTimeOut, timeOut);
    },[onTimeOut, timeOut]);
    

    useEffect (() => {
        console.log('SETTING INTERVAL');
        setInterval(() => {
          setRemainingTime((previousRemainingTime) => previousRemainingTime - 100);
        }, 100);
    },[]);
    
    return (
        <progress id="question-time" max={timeOut} value={remainingTime} />
    );
}