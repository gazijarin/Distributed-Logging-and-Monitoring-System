import dotenv from 'dotenv';
import express from 'express';
import pg from 'pg';
import CreatePool from './db';

class LoggingServer {
    /**
     * A class that moves logs from the logging class to the database connection.
     */
    config: any;
    db: pg.Pool;

    constructor() {
        dotenv.config();
        this.config = process.env;
        this.db = CreatePool(this.config);
    }

    addLog(log: any) {
        /**
         * Adds a log to the database.
         * Has fields - UUID, message, severity, timestamp
         * To be completed.
         */
    }

    searchLogs(query: string) {
        /**
         * The `specifications` is a SQL string that 
         * specifies which logs to fetch from DB.
         * Might look for fields - UUID, message, severity, timestamp
         * To be completed.
         */
    }

}

const app = express();
const logging = new LoggingServer();
const port = logging.config.SERVER_PORT;


app.post('/add-log', (req, res) => {
    res.send('Added log!');
});

app.get('/search', (req, res) => {
    res.send('Searched logs... here are the results!');
})

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
})