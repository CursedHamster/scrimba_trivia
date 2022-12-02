import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'

function Question(props) {
    const [quizAnswers] = useState([props.correct_answer, ...props.incorrect_answers].sort(() => 0.5 - Math.random()))

    const correctAnswerStyle = {
        backgroundColor: "var(--correct-background-color)",
        borderColor: "var(--correct-background-color)"
    }
    const wrongAnswerStyle = {
        backgroundColor: "var(--wrong-background-color)",
        color: "var(--wrong-text-color)",
        borderColor: "var(--wrong-background-color)"
    }

    const answers = quizAnswers.map(answer => {
        return (
            <button 
            key={nanoid()}
            className={`answer-button ${answer === props.chosen ? "chosen" : ""}`}
            style={props.correct !== undefined 
                ? (answer === props.correct_answer
                    ? correctAnswerStyle
                    : (answer === props.chosen ? wrongAnswerStyle : {}))
                : {}}
            onClick={() => props.chooseAnswer(props.id, answer)}
            >
                {answer}
            </button>
        )
    })

    return (
        <div className="question">
            <p className="question-text">{props.question}</p>
            <div className="answers">
                {answers}
            </div>
            <p className="divider">ooo</p> 
        </div>
    )
}

export default Question