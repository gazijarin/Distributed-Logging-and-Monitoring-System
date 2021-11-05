import LogManager from './logmanager';
import { v4 as uuidv4 } from 'uuid';

enum Level {
    LOG = 1,
    WARN,
    ERROR,
}

class Message {

    machineID: string;
    timestamp: number;
    level: Level;
    message: string;

    constructor(machineID: string, timestamp: number, level: Level, message: string) {
        this.machineID = machineID;
        this.timestamp = timestamp;
        this.level = level;
        this.message = message;
    }

    print(){
       console.log({
           message: this.message,
           timestamp: this.timestamp,
           level: this.level,
           machineID: this.machineID
       }) 
    }
}

class Logger {
    /**
     * A class for the logger. 
     */

    manager: LogManager;
    machineID: string;
    
    constructor() {
        this.machineID = uuidv4();
        this.manager = new LogManager();
    }

    log (message: string, level: Level): Message {
        const msg: Message = new Message(
            this.machineID,
            Date.now(),
            level,
            message
        );

        this.manager.sendLog("URL HERE", msg);
    }
}
