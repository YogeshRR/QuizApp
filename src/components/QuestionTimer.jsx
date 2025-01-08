import { useEffect, useState } from "react";

export default function QuestionTimer ({timeOut, onTimeOut}) {

    const [remainingTime, setRemainingTime] = useState(timeOut);

    useEffect(() => {
        console.log('SETTING TIMEOUT');
        const questionTimeout = setTimeout(onTimeOut, timeOut);
       
        return () => clearTimeout(questionTimeout);
    },[onTimeOut, timeOut]);

    useEffect(() => {
        setRemainingTime(timeOut);
    }, [timeOut]);

    useEffect(() => {
        console.log('SETTING INTERVAL');
        const interval = setInterval(() => {
            setRemainingTime((previousRemainingTime) => {
                if (previousRemainingTime <= 100) {
                    clearInterval(interval);
                    onTimeOut();
                    return 0;
                }
                return previousRemainingTime - 100;
            });
        }, 100);
        return () => clearInterval(interval);
    }, [onTimeOut, timeOut]);
    
    return (
        <progress id="question-time" max={timeOut} value={remainingTime} />
    );
}