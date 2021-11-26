import { v4 as uuidv4 } from 'uuid';
import { DatabaseManager } from './db';

export enum Level {
    LOG = 1,
    WARN,
    ERROR
}

export class LogManager {

    machineID: string; // the ID of the machine
    dbManager: DatabaseManager; // The db manager 
    isClosed: boolean;

    constructor() {
        this.machineID = uuidv4();
        this.dbManager = new DatabaseManager();
        this.isClosed = false;
    }

    async log(message: string, level: Level, logToConsole: boolean = false) {
        if (this.isClosed) {
            throw new Error("Invalid process. Please create new LogManager...");
        } 
        if (level > Level.ERROR || level < Level.LOG) {
            throw new Error("Invalid level. Please consult level enum...");
        }
        const logMsg = {
            message: message,
            timeAdded: null,
            timeCreated: new Date(),
            level: level,
            machineID: this.machineID
        };
        return await new Promise<any>((resolve, reject) => {
            this.dbManager.addLog(logMsg)
            .then((result) => {
                if (logToConsole) {
                    console.log(result);
                }
                resolve(result);
            })
            .catch((error) => {
                console.log("ERROR HERE");
                reject(`Log message not added to the database: ${error}`);
            });  
        });
    }

    async searchAll(printAll: boolean = false): Promise<any>{
        return await new Promise<any>((resolve, reject) => {
            this.dbManager.searchLogs()
            .then((result) => {
                if (printAll) {
                    for (let entry of result){
                        console.log(entry);
                    }
                }
                resolve(result);
            })
            .catch((error) => {
                reject(`Tried searching. No logs found: ${error}`);
            });
        });
    }

    async close() {
        this.isClosed = true;
        this.dbManager.disconnect();
    }
}