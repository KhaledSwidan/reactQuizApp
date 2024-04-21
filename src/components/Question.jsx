import React, { useState } from "react";
import QUESTIONS from "../questions";

import QuestionTimer from "./QuestionTimer";
import Answer from "./Answer";

const Question = ({ idx, onSelectAnswer, onSkipAnswer }) => {
  const [answer, setAnswer] = useState({ selectedAnswer: "", isCorrect: null });

  let timer = 10000;
  if (answer.selectedAnswer) timer = 1000;
  if (answer.isCorrect !== null) timer = 2000;

  const handleSelectAnswer = (answer) => {
    setAnswer({ selectedAnswer: answer, isCorrect: null });
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[idx].answers[0] === answer,
      });

      setTimeout(() => onSelectAnswer(answer), 2000);
    }, 1000);
  };

  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null)
    answerState = answer.isCorrect ? "correct" : "wrong";
  else if (answer.selectedAnswer) answerState = "answered";

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
        timeout={timer}
        mode={answerState}
      />
      <h2>{QUESTIONS[idx].text}</h2>
      <Answer
        answers={QUESTIONS[idx].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
};

export default Question;
