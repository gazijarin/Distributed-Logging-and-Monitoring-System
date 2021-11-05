class LogManager {
    /**
     * Class that takes a Log object and either, sends it to a database, 
     * or prints it to console.
     */
    requestBody: any;

    constructor() {
        this.requestBody = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        }
    }

    async sendLog(url: string, log: any) {
        this.requestBody.body = JSON.stringify(log);
        const response = await fetch(url, this.requestBody);
        return response.json();
    }
}

module.exports = {LogManager};