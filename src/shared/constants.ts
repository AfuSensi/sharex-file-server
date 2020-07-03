import { createValidator, ExpressJoiInstance } from 'express-joi-validation';

export const validator: ExpressJoiInstance = createValidator({ passError: true });
