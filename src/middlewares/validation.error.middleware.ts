import { ExpressJoiError } from 'express-joi-validation';
import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';

export default function ValidationError(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any | ExpressJoiError,
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    // Check if error is Joi validation error
    if (error && error.error && error.error.isJoi) {
        const joyError: ExpressJoiError = error;
        res.status(BAD_REQUEST).json({
            error: `One or more bad ${joyError.type} paramater(s)`,
            errorList: joyError.error && joyError.error.details,
        });
        return;
    }
    next(error);
}
