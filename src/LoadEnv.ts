import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';
import * as Joi from '@hapi/joi';
import logger from './shared/Logger';
import * as fs from 'fs-extra';

// Setup command line options
const options = commandLineArgs([
    {
        name: 'env',
        alias: 'e',
        defaultValue: 'development',
        type: String,
    },
]);

// Ensure that production, development and test env are present, copy example.env if not
const envTypes = ['development', 'production'];
envTypes.forEach((type) => {
    if (!fs.existsSync(`./env/${type}.env`)) {
        const envString = fs.readFileSync(`./env/example.env`).toString();
        fs.writeFileSync(`./env/${type}.env`, envString.replace('YOUR_ENV_HERE', type));
    }
});

// Set the env file
const result2 = dotenv.config({
    path: `./env/${options.env}.env`,
});

if (result2.error) {
    throw result2.error;
}

// dotenv validation
function envValidation() {
    const schema = Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production').required(),
        PORT: Joi.number().default(3000),
        HOST: Joi.string().default('localhost'),
        FILE_TTL: Joi.number().default(0),
        FILES_DELETE_EXPIRED: Joi.boolean().default(true),
        API_KEY: Joi.string().required(),
    }).options({ stripUnknown: true });

    const validationResult: Joi.ValidationResult = schema.validate(Object.assign({}, process.env));

    if (validationResult.error) {
        logger.error(`/env/${options.env}.env validation error`);
        throw validationResult.error;
    }
}
envValidation();
