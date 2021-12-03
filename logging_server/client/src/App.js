import React from "react";
import "./App.css";
import {createData, DataTable} from "./DataTable";
import {StyledEngineProvider} from "@mui/material/styles";

function App() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch("/logs/search")
      .then(res => res.json())
      .then(res => {
        const rows = [];
        res.map(x => {
          rows.unshift(createData(x.id, x.message, x.logLevel, x.timestamp));
        });
        rows.sort((a, b) => {
          return a.timestamp - b.timestamp;
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
          <DataTable rows={data}/>
        </StyledEngineProvider>
      </header>
    </div>
  );
}

export default App;
