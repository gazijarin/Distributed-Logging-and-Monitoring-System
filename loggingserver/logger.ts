enum Level {
    NOISY = 0,
    LOG,
    WARN,
    ERROR,
    SILENT
}

class Logger {
    /**
     * A class for the logger. Initialized with a level. 
     * For valid log levels, consult the Level enum above.
     * 
     * TODO: Add connection mechanism for remote or local db
     */

    logLevel: number;

    constructor(logLevel: number) {
        this.setLevel(logLevel);
    }

    log (message: string) {
        if (this.logLevel < Level.WARN) {
            console.log(message);
        }
    }

    warn (message: string) {
        if (this.logLevel < Level.ERROR) {
            console.warn(message);
        }
    }

    error (message: string) {
        if (this.logLevel < Level.SILENT) {
            console.error(message);
        }
    }

    setLevel (level: number) {
        if (level > Level.SILENT || level < Level.NOISY) {
            console.error("Invalid log level... Please enter a valid value from the Levels enum.");
        } else {
            this.logLevel = level;
        }
    }

    getLevel () {
        return this.logLevel;
    }
}