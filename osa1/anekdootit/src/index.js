import React, {useState} from 'react';
import ReactDOM from 'react-dom';



const Button = (props) => {
    return (
        <button onClick={props.onClick}>
        {props.text}
        </button>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const min = 0
    const max = 5

    const HandleClick = () => {  

        setSelected(RandomInterval([min, max]))
    }

    // Palauttaa satunnaisen numeron [0]=min ja [1]=max väliltä.
    const RandomInterval = (props) => Math.floor(Math.random() * (props[1] - props[0] + 1) + props[0])



    
    return (
      <div>
        {console.log(selected)}
        {props.anecdotes[selected]}
        <div></div>
        <Button onClick={HandleClick} text={"Next anecdote"} />
      </div>
    )
  }
  
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
  )


