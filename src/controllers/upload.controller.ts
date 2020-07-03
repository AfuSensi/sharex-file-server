import { Request, Response } from 'express';
import { Controller, Post, ClassMiddleware, Middleware } from '@overnightjs/core';
import ApiKeyMiddleware from '../middlewares/apikey.middleware';
import FileUploadMiddleware from '../middlewares/fileupload.middleware';
import { Uploads } from '../managers/uploads.manager';

@Controller('upload')
@ClassMiddleware(ApiKeyMiddleware)
export class UploadController {
    @Post('')
    @Middleware(FileUploadMiddleware)
    private async uploadFile(req: Request, res: Response) {
        const id = await Uploads.uploadNewFile(req.file);
        res.status(200).json({ id });
    }
}
