import React from "react";
import ReactDOM from "react-dom";


const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Making your own course part",
      exerciseCount: 5,
      description: "Horrible CSS",
      ranking: "Brilliant"
    }
  ];


  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }
  
  interface CoursePartOne extends CoursePartBase, CoursePartDescription {
    name: "Fundamentals";
  }
  
  interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }
  
  interface CoursePartThree extends CoursePartBase, CoursePartDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
  }

  interface CoursePartFour extends CoursePartBase, CoursePartDescription {
    name: "Making your own course part";
    ranking: string;

  }
  
  type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;
  
/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Content: React.FC<{ courseParts: CoursePart[]}> = ({ courseParts }) => {
  return (
    <div>
    {courseParts.map(part =>
      <div key={part.name}>
        <Part part={part}/>
      </div>
      )}
  </div>   
  )
};

  const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    switch (part.name) {
      case "Fundamentals":
        return (
        <div>
          {part.name} {part.exerciseCount} {"Description: " + part.description}
        </div>
        )
      case "Using props to pass data":
        return (
        <div>
          {part.name} {part.exerciseCount} {"Group project count: " + part.groupProjectCount}
        </div>
        )
      case "Deeper type usage":
        return (
        <div>
          {part.name} {part.exerciseCount} {"Description: " + part.description} {"Link: " + part.exerciseSubmissionLink}
          </div>
          )
      case "Making your own course part":
        return (
          <div>
            {part.name} {part.exerciseCount} {"Description: " + part.description} <b>Ranking:{part.ranking}</b>
          </div>
        )
      default:
        return assertNever(part);
    }
  };
  
  

  const Header: React.FC<{ headername: string }> = ({ headername }) => (
    <h1>{headername}</h1>
  );


  const Total: React.FC<{ total: number }> = ({ total }) => (
    <p>
      Number of exercises{" "}
      {total}
    </p>
  );
  
  return (
    <div>
      <Header headername={courseName} />
      <Content courseParts={courseParts}/>
      <Total total={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}/>
     
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));