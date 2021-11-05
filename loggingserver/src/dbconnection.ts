import dotenv from 'dotenv';
import express from 'express';
import pg from 'pg';
import CreatePool from './db';
import { PrismaClient } from '@prisma/client';

class LoggingServer {
    /**
     * A class that moves logs from the logging class to the database connection.
     * This is the class that deals with the ORM (check how it has a db field on line 12.)
     */
    config: any;
    db: pg.Pool;

    const prisma = new PrismaClient();

    constructor() {
        dotenv.config();
        this.config = process.env;
        this.db = CreatePool(this.config);
    }

    addLog(log: any) {
        console.log("Added log");
        // here add the adding time to the log 
        // then add to SQL DB

        await prisma.logs.create({
            data: {
              name: log.name, // or however you get the log title 
              msg: log.message, // or however you get the message from the log object  
              level: log.level, 
              timestamp: new Date().getTime()
            },
          }); 
        
    }

    searchLogs(query: string) {
        /**
         * The `specifications` is a SQL string that 
         * specifies which logs to fetch from DB.
         * Might look for fields - UUID, message, severity, timeadded, timecreated
         * To be completed.
         */
        // Use PrismaClient to execute raw SQL query 
         const result = await prisma.$queryRaw`${query}`; 
         // NOT SURE WHAT WE DO HERE - CONVERT THE SDQL QUERY? 
    }

}

const app = express();
const logging = new LoggingServer();
const port = logging.config.SERVER_PORT;


app.post('/addlog', (req, res) => {
    logging.addLog(req.body);
    res.send('Added log!');
});

app.get('/search', (req, res) => {
    res.send('Searched logs... here are the results!');
})

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
})