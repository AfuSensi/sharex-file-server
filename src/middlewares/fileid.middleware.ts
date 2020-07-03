import { Request, Response, NextFunction } from 'express';
import { NOT_FOUND } from 'http-status-codes';
import { Files } from '../managers';

export default async function FileIdMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.params.Id) {
        const path = await Files.getExistingPath(req.params.Id);
        if (path) {
            res.locals.filePath = path;
            next();
            return;
        }
    }

    res.status(NOT_FOUND).end();
    return;
}
