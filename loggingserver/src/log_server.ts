import express from 'express';
import bodyParser from 'body-parser';
import { LogManager } from "./log_manager";

const app = express();
const manager = new LogManager();
const PORT = 8000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/postlog', (req, res) => {
    const logBody = req.body;
    const level = logBody.level;
    const message = logBody.message;
    const logToConsole = logBody.logToConsole;
    manager.log(message, level, logToConsole)
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    })
});

app.get('/searchlog', (req, res) => {
    manager.searchAll()
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});