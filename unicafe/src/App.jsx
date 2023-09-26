/* eslint-disable react/prop-types */
// import { useState } from 'react'

import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onclick}>{props.text}</button>;
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td> {value}</td>
    </tr>
  );
};

const Statistics = ({ goodCount, badCount, neutralCount }) => {
  const averageScore = () => (goodCount + badCount * -1) / total();

  const total = () => goodCount + badCount + neutralCount;

  const positive = () => (goodCount / total()) * 100;

  if (total() > 0) {
    return (
      <table>
        <thead>
          <tr>
            <td>
              <h3>Statistics</h3>
            </td>
          </tr>
        </thead>
        <tbody>
          <StatisticsLine text={"Good"} value={goodCount} />
          <StatisticsLine text={"Neutral"} value={neutralCount} />
          <StatisticsLine text={"Bad"} value={badCount} />

          <StatisticsLine text={"All"} value={total()} />
          <StatisticsLine text={"average"} value={averageScore()} />
          <StatisticsLine text={"positive"} value={positive()} />
        </tbody>
      </table>
    );
  }
  return <p>No Feedback Given</p>;
};

const App = () => {
  const [goodCount, setGoodCount] = useState(0);
  const [badCount, setBadCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text={"Good"} onclick={() => setGoodCount(goodCount + 1)} />
      <Button
        text={"Neutral"}
        onclick={() => setNeutralCount(neutralCount + 1)}
      />
      <Button text={"Bad"} onclick={() => setBadCount(badCount + 1)} />

      <Statistics
        goodCount={goodCount}
        badCount={badCount}
        neutralCount={neutralCount}
      />
    </div>
  );
};

export default App;
