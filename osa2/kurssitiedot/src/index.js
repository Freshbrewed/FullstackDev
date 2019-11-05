import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
    return (
        <div>
          <h1>{props.courseName}</h1>
        </div>
    )

}

const Content = ({parts}) => {
    return (
     parts.map(part => <Part part={part.name} exercises={part.exercises} key={part.id} />)
    )
}

const Total = ({parts}) => {

  let total = parts.reduce((sum, part) => sum + part.exercises, 0)
  
    return (
        <p>Number of exercises {total}</p>
    )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Course = (props) => {
  return (
  <div>
    <Header courseName={props.course.name} />
    <Content parts={props.course.parts} />
    <Total parts={props.course.parts} />
  </div>

  )
}

const App = () => {
  
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))