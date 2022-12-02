import { useState, useEffect } from "react";
import Question from "./Question";
import QuestionPlaceholder from './QuizPlaceholder'
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => getQuiz(), []);

  function getQuiz() {
    setChecked(false);
    fetch(
      "https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((data) =>
        setQuiz(
          data.results.map((trivia) => {
            const incorrect_answers = (trivia.incorrect_answers).map(incorrect_answer => htmlDecode(incorrect_answer))
            return {
              id: nanoid(),
              question: htmlDecode(trivia.question),
              correct_answer: htmlDecode(trivia.correct_answer),
              incorrect_answers: incorrect_answers
            };
          })
        )
      );
  }

  function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  function chooseAnswer(id, answer) {
    setQuiz((prevQuiz) =>
      prevQuiz.map((prevQuizElement) => {
        return prevQuizElement.id === id
          ? {
              ...prevQuizElement,
              chosen: answer,
            }
          : prevQuizElement;
      })
    );
  }

  function checkAnswers() {
    setChecked(true);
      setQuiz((prevQuiz) =>
        prevQuiz.map((prevQuizElement) => {
          return {
            ...prevQuizElement,
            correct: prevQuizElement.chosen === prevQuizElement.correct_answer,
          };
        })
      );
    }

  const quizElements = quiz.map((quizElement) => {
    return (
      <Question
        key={quizElement.id}
        question={quizElement.question}
        correct_answer={quizElement.correct_answer}
        incorrect_answers={quizElement.incorrect_answers}
        id={quizElement.id}
        chosen={quizElement.chosen}
        chooseAnswer={checked ? () => {return false} : chooseAnswer}
        correct={quizElement.correct}
      />
    );
  });

  const score = quiz.filter((quizElement) => quizElement.correct).length;

  return (
    <div className="quiz">
      {quiz.length > 0 
      ? quizElements 
      : [
        <QuestionPlaceholder />, 
        <QuestionPlaceholder />, 
        <QuestionPlaceholder />, 
        <QuestionPlaceholder />, 
        <QuestionPlaceholder />
      ]
        }
      <button
        className="main-button"
        onClick={checked ? getQuiz : checkAnswers}
      >
        {checked ? "Play again" : "Check answers"}
      </button>
      {checked && <p className="score">You scored {score}/5 correct answers</p>}
      {checked 
      && score === 5
      && <Confetti
      colors={['#e91e63','#9c27b0','#673ab7','#00bcd4','#009688','#FFEB3B']}
      />}
    </div>
  );
}

export default Quiz;
