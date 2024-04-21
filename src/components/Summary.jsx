import quizComplete from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

const Summary = ({ userAnswers }) => {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, idx) => answer === QUESTIONS[idx].answers[0]
  );

  const skipAnsShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  );
  const corrAnsShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100
  );

  const wrongAnsShare = 100 - skipAnsShare - corrAnsShare;

  return (
    <div id="summary">
      <img src={quizComplete} alt="Quiz Complete" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skipAnsShare}%</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{corrAnsShare}%</span>
          <span className="text">Answered Correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnsShare}%</span>
          <span className="text">Answered Incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, idx) => {
          let cssClass = "user-answer";
          if (answer === null) cssClass += " skipped";
          else if (answer === QUESTIONS[idx].answers[0]) cssClass += " correct";
          else cssClass += " wrong";

          return (
            <li key={idx}>
              <h3>{idx + 1}</h3>
              <p className="question">{QUESTIONS[idx].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Summary;
