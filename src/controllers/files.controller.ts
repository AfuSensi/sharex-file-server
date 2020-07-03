import { Request, Response } from 'express';
import { Controller, Middleware, Get, Delete } from '@overnightjs/core';
import FileIdMiddleware from '../middlewares/fileid.middleware';
import ApiKeyMiddleware from '../middlewares/fileupload.middleware';
import { Files } from '../managers';

@Controller('')
export class FilesController {
    @Get(':Id')
    @Middleware(FileIdMiddleware)
    private async getFile(req: Request, res: Response) {
        const path = res.locals.filePath as string;
        res.sendFile(path);
    }

    // @Delete(':Id')
    // @Middleware([FileIdMiddleware, ApiKeyMiddleware])
    // private async deleteFile(req: Request, res: Response) {
    //     const path = res.locals.filePath as string;
    //     await Files.remove(path);
    // }
}
