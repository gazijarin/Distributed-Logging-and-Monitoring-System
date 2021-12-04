import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export function createData(id, message, loglevel, timestamp, requestId, machineId) {
  return { id, message, loglevel, timestamp, requestId, machineId};
}

export function DataTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Message</TableCell>
            <TableCell align="right">Log-Level</TableCell>
            <TableCell align="right">Time-Stamp</TableCell>
            <TableCell align="right">Request ID</TableCell>
            <TableCell align="right">Machine ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map(row => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.message}</TableCell>
              <TableCell align="right">{row.loglevel}</TableCell>
              <TableCell align="right">{row.timestamp}</TableCell>
              <TableCell align="right">{row.requestId}</TableCell>
              <TableCell align="right">{row.machineId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
