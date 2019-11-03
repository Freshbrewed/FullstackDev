import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'


const Title = (props) => {
  return (
    <div>
      <h1>{props.title.title}</h1>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Average = (props) => {
  return (
  <td>{(props.good + props.bad*(-1)) / (props.good + props.bad + props.neutral)}</td>
  )
}

const Sum = (props) => <td>{props.good + props.bad + props.neutral}</td>

const Statistic = (props) => {
    return (
    <tr>
        <td>{props.text}</td><td>{props.value}{props.ending}</td>
    </tr>
    )
}

const Statistics = (props) => {
  return (
      <tbody>
        <tr><th>{props.title.title}</th></tr>
        <Statistic value={props.values[0]} text="Good " />
        <Statistic value={props.values[1]} text="Neutral " />
        <Statistic value={props.values[2]} text="Bad " />
        <Statistic value={props.statValues[1].props.children} text="All "  />
        <Statistic value={props.statValues[0].props.children}  text="Average  " />
        <Statistic value={props.statValues[2].props.children} text="Positive " ending="%" />
      </tbody>

  )
}

const PositivePercentage = (props) => {
  return (
    <td>{(props.good / props.sum.props.children) * 100}</td>
  )
}

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        No feedback given.
      </div>
    )
  }

  return (
      <table>
            <Statistics values={props.values} statValues={props.statValues} title={props.title}/>
      </table>
  )
}



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])
  const titles = [
    {
      title: "Give Feedback"
    },
    {
      title: "Statistics"
    }
  ]
  // Alustetaan tarvittavat muuttujat
  const average = Average({good,neutral,bad})
  const sum = Sum({good,neutral,bad})
  const positive = PositivePercentage({good,sum})
  

  const handleGoodClick = () => {
    setAll(allClicks.concat('G'))
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(allClicks.concat('N'))
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(allClicks.concat('B'))
    setBad(bad + 1)
  }

  return (
    <div>
      <Title title={titles[0]} />
      <Button onClick={handleGoodClick} text="Good" />
      <Button onClick={handleNeutralClick} text="Neutral" />
      <Button onClick={handleBadClick} text="Bad" />
      <History allClicks={allClicks} values={[good,neutral,bad]} statValues={[average,sum,positive]} title={titles[1]}/> 
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)