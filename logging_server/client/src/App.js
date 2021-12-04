import React from "react";
import "./App.css";
import {DataTable} from "./DataTable";
import {StyledEngineProvider} from "@mui/material/styles";
import {baseSearch} from "./buttonActions";
import {Box, Button, TextField} from "@mui/material";

function CustomTextField(props) {
  return (<TextField
    style={{
      marginBottom: "10px"
    }}
    id="outlined-name"
    label={props.label}
    variant={'outlined'}
    value={props.value}
    onChange={(newValue) => {
      props.onChangeFunc(newValue.target.value)
    }}
  />);
}


function App() {

  const [data, setData] = React.useState([]);
  const [messageSearch, setMessageSearch] = React.useState("");
  const [logLevelSearch, setLogLevelSearch] = React.useState("");
  const [requestIdSearch, setRequestIdSearch] = React.useState("");
  const [totalSearch, setTotalSearch] = React.useState("");
  const [machineIdSearch, setMachineIdSearch] = React.useState("");

  const construct_search_query = () => {
    let query = "?"
    if (messageSearch !== "") {
      query += "message=" + messageSearch
    }
    if (logLevelSearch !== "") {
      if (query !== "") {
        query += "&"
      }
      query += "level=" + logLevelSearch
    }
    if (requestIdSearch !== "") {
      if (query !== "") {
        query += "&"
      }
      query += "request_id=" + requestIdSearch
    }
    if(machineIdSearch !== ""){
      if (query !== "") {
        query += "&"
      }
      query += "machine_id=" + machineIdSearch
    }
    setTotalSearch(query)
  }


  React.useEffect(async () => {
    setData(await baseSearch(""))
  }, []);

  return (<div className="App">
    <header className="App-header">
      <h2>{"Distributed Logging and Monitoring System"}</h2>
      <Box
        component="form"
        sx={{
          '& > :not(style)': {m: 1, width: '25ch'},
        }}
        noValidate
        autoComplete="off"
      >
        <CustomTextField
          label="Message Search"
          value={messageSearch}
          onChangeFunc={setMessageSearch}
        />
        <CustomTextField
          label="Log Level Search"
          value={logLevelSearch}
          onChangeFunc={setLogLevelSearch}
        />
        <CustomTextField
          label="Request ID Search"
          value={requestIdSearch}
          onChangeFunc={setRequestIdSearch}
        />
        <CustomTextField
          label="Machine ID Search"
          value={machineIdSearch}
          onChangeFunc={setMachineIdSearch}
        />
      </Box>
      <Button
        style={{
          marginBottom: "10px"
        }}
        color={'primary'}
        variant={'contained'}
        id={'Search'}
        onClick={async () => {
          console.log(totalSearch)
          construct_search_query()
          setData(await baseSearch(totalSearch));
        }}>
        Search
      </Button>
      <Button
        style={{
          marginBottom: "10px"
        }}
        color={'primary'}
        variant={'contained'}
        id={'Refresh'}
        onClick={async () => {
          console.log(totalSearch)
          construct_search_query()
          setData(await baseSearch(totalSearch));
        }}>
        Refresh
      </Button>
      <StyledEngineProvider injectFirst>
        <DataTable
          rows={data}
        />
      </StyledEngineProvider>
    </header>
  </div>);
}

export default App;
