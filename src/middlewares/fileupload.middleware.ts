/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import multer from 'multer';
import fs from 'fs-extra';

fs.ensureDirSync(`${process.cwd()}/tempfiles`);
const allowedMimes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${process.cwd()}/tempfiles`);
    },

    filename: function (req: Request, file: Express.Multer.File, cb: any) {
        cb(null, file.originalname);
    },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Disallowed file type'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const FileUploadMiddleware = upload.single('file');
export default FileUploadMiddleware;
