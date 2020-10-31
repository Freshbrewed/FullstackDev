import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  
  
  const Header: React.FC<{ headername: string }> = ({ headername }) => (
    <h1>{headername}</h1>
  );


  interface ContentProps {
    courseParts: {
      name: string;
      exerciseCount: number;
    }[]
  }
  const Content: React.FC<ContentProps> = ({ courseParts }) => (
    <div>
      {courseParts.map(part =>
        <div key={part.name}>
          <p>
            {part.name} {part.exerciseCount}
          </p>
        </div>
        )}
    </div>    
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