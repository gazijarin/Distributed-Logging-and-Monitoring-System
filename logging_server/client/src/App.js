import React from "react";
import DataChart from "./DataChart";
import "./App.css";
import { DataTable, createData } from "./DataTable";
import { StyledEngineProvider } from "@mui/material/styles";

function App() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch("/logs/search")
      .then(res => res.json())
      .then(res1 => {
        var rows = new Array();
        res1.map(x => {
          rows.push(createData(x.id, x.message, x.logLevel, x.timestamp));
        });
        setData(rows);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>{"Distributed Logging and Monitoring System"}</h2>
        <StyledEngineProvider injectFirst>
          <DataTable rows={data} />
        </StyledEngineProvider>
        <DataChart chartType="Histogram"></DataChart>
      </header>
    </div>
  );
}

export default App;
