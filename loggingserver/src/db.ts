import { PrismaClient } from '@prisma/client'

export class DatabaseManager {

    prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async addLog(log: any){
        const newLog = await this.prisma.logs.create({
            data: {
                machine_id: log.machineID,
                message: log.message,
                time_created: log.timeCreated,
                level: log.level,
            }
        })
        return new Promise<any>((resolve, reject) => {
            if (newLog !== null) {
                resolve(newLog);
            } else {
                reject(null);
            }
        })
    }

    async disconnect() {
        await this.prisma.$disconnect();
    }

    async searchLogs(){
        const logs = await this.prisma.logs.findMany()
        return new Promise<any>((resolve, reject) => {
            if (logs.length > 0) {
                resolve(logs);
            } else {
                reject(null);
            }
        })
    }
}
