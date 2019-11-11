import React from 'react'


const Header = (props) => {
    return (
        <div>
          <h2>{props.courseName}</h2>
        </div>
    )

}

const Content = ({parts}) => {
  console.log(parts, "Content component")
    return (
      parts.map(part => <Part part={part.name} exercises={part.exercises} key={part.id} />)
    )
}

const Total = ({parts}) => {

  let total = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <b>Total of {total} exercises</b>
    )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Course = (props) => {
  console.log(props, "Course component")
  
  return (
  <div>
    <Header courseName={props.course} />
    <Content parts={props.parts} />
    <Total parts={props.parts} />
  </div>

  )
}

const Courses = ({courses}) => {
  console.log(courses, "courses component")
  return (
    courses.map((course,index) => <Course course={course.name} parts={course.parts} key={index} />)
  )
}

export default Courses