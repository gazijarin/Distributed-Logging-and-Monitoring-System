"use strict";
var Level;
(function (Level) {
    Level[Level["NOISY"] = 0] = "NOISY";
    Level[Level["LOG"] = 1] = "LOG";
    Level[Level["WARN"] = 2] = "WARN";
    Level[Level["ERROR"] = 3] = "ERROR";
    Level[Level["SILENT"] = 4] = "SILENT";
})(Level || (Level = {}));
var Logger = /** @class */ (function () {
    function Logger(logLevel) {
        this.logLevel = -1;
        this.setLevel(logLevel);
    }
    Logger.prototype.log = function (message) {
        if (this.logLevel < Level.WARN) {
            console.log(message);
        }
    };
    Logger.prototype.warn = function (message) {
        if (this.logLevel < Level.ERROR) {
            console.warn(message);
        }
    };
    Logger.prototype.error = function (message) {
        if (this.logLevel < Level.SILENT) {
            console.error(message);
        }
    };
    Logger.prototype.setLevel = function (level) {
        if (level > Level.SILENT || level < Level.NOISY) {
            console.error("Invalid log level... Please enter a valid value from the Levels enum.");
        }
        else {
            this.logLevel = level;
        }
    };
    Logger.prototype.getLevel = function () {
        return this.logLevel;
    };
    return Logger;
}());
