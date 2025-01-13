import QUESTION from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
export default function Summary({userAnswers}) {
    const skippedAnswers = userAnswers.filter((answer) => answer === null).length;
    const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTION[index].answers[0]).length;
    const incorrectAnswers = userAnswers.filter((answer, index) => answer !== null && answer !== QUESTION[index].answers[0]).length;
    
    const correctAnswerShare = Math.round((correctAnswers / QUESTION.length) * 100);
    const incorrectAnswerShare = Math.round((incorrectAnswers / QUESTION.length) * 100);
    const skippedAnswerShare = Math.round((skippedAnswers / QUESTION.length) * 100);

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      <h2>Quiz Completed!</h2>
      <div id = "summary-stats">
        <p>
            <span className='number'>{skippedAnswerShare}%</span>
            <span className='text'>skipped</span>
        </p>
        <p>
            <span className='number'>{correctAnswerShare}%</span>
            <span className='text'>answered correctly</span>
        </p>    
        <p>
            <span className='number'>{incorrectAnswerShare}%</span>
            <span className='text'>answered incorrectly</span>
        </p>
      </div>
      <ol>
        
        {userAnswers.map((answer, index) => {
            let cssClass = 'user-answer';
            if (answer === QUESTION[index].answers[0]) {
                cssClass += ' correct';
            }else if (answer !== null) {
                cssClass += ' wrong';
            }else {
                cssClass += ' skipped';
            }
            return (
                <li key={answer}>
                    <h3>{index + 1}</h3>
                    <p className='question'>{QUESTION[index].text}</p>
                    <p className={cssClass}>{answer ?? 'skipped'}</p>
                </li>
            );
        }
        )}
      </ol>
    </div>
  );
}