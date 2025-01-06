import { useState } from "react"

export default function Quiz () {
    
    const [selectedAnswers, setSelectedAnswer] = useState([]);

    const activeQuestionIndex =  selectedAnswers.length;
    return <p>currenlty active Questions</p>
}