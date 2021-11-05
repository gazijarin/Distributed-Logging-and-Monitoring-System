class LogManager {
    /**
     * Class that takes a Log object and either, sends it to a database.
     * Sends this to the server that will actually add to the db. 
     */
    async sendLog(url: string, log: any) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(log)
        });
        return response.json();
    }
}

module.exports = {LogManager};