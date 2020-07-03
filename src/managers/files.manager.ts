import BaseManager from './base';
import * as fs from 'fs-extra';
import logger from '../shared/Logger';
import { stripFileExtension } from '../shared/functions';

class FilesManager extends BaseManager {
    private checkExpiredInterval = 30 * 60 * 1000;
    private deleteExpired = true;
    private fileTTL = 0;
    readonly filesDir = `${process.cwd()}/files/`;

    public async init(): Promise<void> {
        await fs.ensureDir(`${this.filesDir}`);
        await fs.ensureDir(`${this.filesDir}/expired/`);

        this.fileTTL = parseInt(process.env.FILE_TTL as string, 10);
        this.deleteExpired = process.env.FILES_DELETE_EXPIRED === 'true' ? true : false;
        this.handleExpired();
        if (this.fileTTL > 0) {
            // Set interval to check
            setInterval(this.handleExpired.bind(this), this.checkExpiredInterval);
        }
    }

    public async getExistingPath(id: string): Promise<string | false> {
        const files = await fs.readdir(this.filesDir);
        for (const fileName of files) {
            if (fileName === 'expired') continue;
            if (stripFileExtension(fileName) === id) {
                console.log(fileName);
                return `${this.filesDir}${fileName}`;
            }
        }
        return false;
    }

    // public async remove(path: string) {
    //     const exist = fs.existsSync(path);
    //     if (exist) {
    //         fs.remove(path);
    //     }
    // }

    private async handleExpired(): Promise<void> {
        logger.info('Checking for expired files');
        if (this.fileTTL === 0) return;

        const files = await fs.readdir(this.filesDir);
        for (const fileName of files) {
            if (fileName === 'expired') continue;
            const filePath = `${this.filesDir}${fileName}`;
            const fileStats = await fs.stat(filePath);
            if (new Date().getTime() - fileStats.birthtime.getTime() > this.fileTTL * 1000) {
                if (this.deleteExpired) {
                    fs.remove(filePath);
                    logger.info(`${fileName} expired and removed.`);
                } else {
                    fs.move(filePath, `${this.filesDir}/expired/${fileName}`);
                    logger.info(`${fileName} expired and moved to /expired/.`);
                }
            }
        }
    }
}
export const Files = new FilesManager();
