import BaseManager from './base';
import fs from 'fs-extra';
import uniqid from 'uniqid';
import { Files } from './files.manager';
import { getFileExtension } from '../shared/functions';

class UploadsManager extends BaseManager {
    public async uploadNewFile(file: Express.Multer.File) {
        const fileId = this.generateID();
        const extension = getFileExtension(file.filename);
        await fs.move(file.path, `${Files.filesDir}/${fileId}${extension}`);
        return fileId;
    }

    private generateID(): string {
        return uniqid(
            new Date()
                .getTime()
                .toString()
                .slice(13 - 3),
        );
    }
}
export const Uploads = new UploadsManager();
