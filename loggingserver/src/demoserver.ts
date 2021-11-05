import express from 'express';
import dotenv from 'dotenv';
import Logger from './logger';
dotenv.config();

/**
 * Just a demo server used for testing purposes. This 
 * file is to run a simple application that generates a log
 * every few seconds. For now, can just generate one log,
 * we just need to get it to the db.
 */

const app = express();
const port = process.env.SERVER_PORT;
const logger = new Logger();


app.post('/', (req, res) => {
    logger.addLog(req.body); // the addlog command is what adds stuff to the db. 
    res.send('Added log!');
});

app.get('/search', (req, res) => {
    res.send('Searched logs... here are the results!');
})

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
})