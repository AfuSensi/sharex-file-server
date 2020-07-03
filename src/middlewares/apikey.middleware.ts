import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED } from 'http-status-codes';

export default async function ApiKeyMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.headers.apikey && req.headers.apikey === (process.env.API_KEY as string)) {
        next();
        return;
    }

    res.status(UNAUTHORIZED).end();
    return;
}
