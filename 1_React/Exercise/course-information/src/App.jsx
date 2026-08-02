import { useState } from "react";

const Display = (props) => <h1>{props.value}</h1>

const Button = (props) => {
  return (
    <button onClick={props.onClick} >
      {props.text}
    </button>
  )
}

const StatisticsLine = (props) => {
  const text = props.text
  const value = props.value
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  if(good === 0 && neutral === 0 && bad === 0){
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={good + neutral + bad} />
          <StatisticsLine text="average" value={(good - bad) / (good + neutral + bad)} />
          <StatisticsLine text="positive" value={`${(good)/(good + neutral + bad) * 100} %`} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <Display value="give feedback"/>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App