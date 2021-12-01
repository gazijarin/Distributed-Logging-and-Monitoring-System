import React from "react";
import DataChart from "./DataChart";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then(res => res.json())
      .then(data => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>{"Distributed Logging and Monitoring System"}</h2>
        <p>{!data ? "Loading..." : data}</p>
        <DataChart chartType="Histogram"></DataChart>
      </header>
    </div>
  );
}

export default App;
