import { useState } from "react"

const Button = ({ label, onClick}) => {
  return <button onClick={onClick}>{label}</button>
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, all, avg, pos, feedback}) => {
  if (!feedback) {
    return <p>No feedback given</p>
  }
    return (
      <>
        <h2>statistics</h2>
        <table>
          <tbody>
            <StatisticLine text="good" value={good}/> 
            <StatisticLine text="neutral" value={neutral} /> 
            <StatisticLine text="bad" value={bad} /> 
            <StatisticLine text="all" value={all}/> 
            <StatisticLine text="average" value={avg}/> 
            <StatisticLine text="positive" value={`${pos}%`} /> 
          </tbody>
        </table>
      </>
      
    )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  const [points, setPoints] = useState({good: 0, neutral: 0, bad: 0})
  const [isClicked, setIsClicked] = useState(false)

  const handleGood = () => {
    const updatedGood = good + 1
    const updatedAll = updatedGood + neutral + bad
    const updatedPts = {...points, good: updatedGood}
    setGood(updatedGood)
    setAll(updatedAll)
    setPoints(updatedPts)
    setPositive((updatedGood / updatedAll) * 100)
    setAverage((updatedPts.good + updatedPts.neutral + updatedPts.bad) / updatedAll)
    setIsClicked(true)
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    const updatedAll = good + updatedNeutral + bad
    const updatedPts = {...points}
    setNeutral(updatedNeutral)
    setAll(updatedAll)
    setPoints(updatedPts)
    setPositive((good/updatedAll) * 100)
    setAverage((updatedPts.good + updatedPts.neutral + updatedPts.bad) / updatedAll)
    setIsClicked(true)
  }

  const handleBad = () => {
    const updatedBad = bad + 1
    const updatedAll = good + neutral + updatedBad
    const updatedPts = {...points, bad: -updatedBad}
    setBad(updatedBad)
    setAll(updatedAll)
    setPoints(updatedPts)
    setPositive((good/updatedAll) * 100)
    setAverage((updatedPts.good + updatedPts.neutral + updatedPts.bad) / updatedAll)
    setIsClicked(true)
  }

  return (
    <div>
      <h2>give feedback</h2>

      <Button label="good" onClick={handleGood} />
      <Button label="neutral" onClick={handleNeutral} />
      <Button label="bad" onClick={handleBad} />

      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        avg={average}
        pos={positive} 
        feedback={isClicked}
      />
    </div>
  )
}
export default App