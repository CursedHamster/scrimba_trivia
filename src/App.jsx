import { useState } from 'react'
import Header from './Header'
import StartScreen from './StartScreen'
import Quiz from './Quiz'

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false)

  function startQuiz() {
    setIsQuizStarted(oldIsQuizStarted => !oldIsQuizStarted)
  }

  return (
    <div className="app">
      <Header />
      {isQuizStarted 
      ? <Quiz /> 
      : <StartScreen startQuiz={startQuiz} />}
    </div>
  )
}

export default App
