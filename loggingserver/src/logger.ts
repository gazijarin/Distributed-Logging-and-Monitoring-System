import LogManager from './logmanager';
import { v4 as uuidv4 } from 'uuid';

enum Level {
    LOG = 1,
    WARN,
    ERROR,
}

class Message {

    machineID: string; // process UUID for generating messages
    timeCreated: number; // time of generation
    timeAdded: number | null; // time when added to the database
    level: Level; // severity of the message
    message: string; // body of the message itself

    constructor(machineID: string, timestamp: number, level: Level, message: string) {
        this.machineID = machineID;
        this.timeCreated = timestamp;
        this.timeAdded = null;
        this.level = level;
        this.message = message;
    }

    print(){
       console.log({
           message: this.message,
           timeAdded: this.timeAdded,
           timeCreated: this.timeCreated,
           level: this.level,
           machineID: this.machineID
       }) 
    }
}

class Logger {
    /**
     * A class for the logger. Use this class to do the logging. 
     * Underneath is the SQL for creating the table for the logs. 
     * Each column corresponds to the form of the Message class. Check out the comments
     * there to figure out what each of them mean. 
     * CREATE TABLE log_db (machine_id CHAR(36) NOT NULL,timecreated BIGINT UNIQUE NOT NULL, timeadded BIGINT UNIQUE NOT NULL,level SMALLINT NOT NULL,message VARCHAR (500) NOT NULL);
     */

    manager: LogManager;
    machineID: string;
    
    constructor() {
        this.machineID = uuidv4(); // creates a UUID for the process generating logs.
        this.manager = new LogManager();
    }

    log (message: string, level: Level): void {
        const msg: Message = new Message(
            this.machineID,
            Date.now(),
            level,
            message
        );

        this.manager.sendLog("localhost:8080/addlog", msg); // sends off this Message object to the logging server.
    }
}

// module.exports = {Logger, Message, Level};