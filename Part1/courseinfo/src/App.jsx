/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Content = ({ parts }) => {
  console.log(parts);
  const output = parts.map((part) => (
    <p>
      {part.name} {part.exercises}
    </p>
  ));
  return output;
};

const Summary = ({ parts }) => {
  const arr = parts.map((part) => part.exercises);
  return (
    <p>
      Total of <b>{arr.reduce((acc, e) => acc + e)}</b> exercises
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Summary parts={course.parts} />
    </>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return courses.map((course) => <Course course={course} />);
};

export default App;
