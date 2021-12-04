import {createData} from "./DataTable";

const baseUrl = "/logs/search/"

const baseSearch = async (query) => {
  return await fetch(baseUrl + query)
    .then(res => res.json())
    .then(res => {
      let rows = [];
      res.map(x => {
        rows.unshift(createData(x.id, x.message, x.logLevel, x.timestamp, x.requestId,x.machineId));
      });
      console.log(rows)
      return rows
    })
    .catch(err => {
      console.log(err);
      return [];
    });
}

export {baseSearch};

