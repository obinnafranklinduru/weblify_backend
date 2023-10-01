const path = require('path');
const dotenv = require('dotenv');
const { object, string } = require('zod');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = object({
    NODE_ENV: string().refine((val) => ['production', 'development', 'test'].includes(val), {
        message: 'NODE_ENV must be one of "production", "development", or "test"',
    }),
    PORT: string().refine((val) => Number(val)),
    MONGODB_URL: string().url().nonempty(),
    BASE_URL: string().url().nonempty(),
    JWT_SECRET: string().nonempty(),
});

const envVars = process.env;

const config = {
    NODE_ENV: envVarsSchema.parse(envVars).NODE_ENV,
    PORT: envVarsSchema.parse(envVars).PORT,
    MONGODB_URL: envVarsSchema.parse(envVars).MONGODB_URL,
    BASE_URL: envVarsSchema.parse(envVars).BASE_URL,
    JWT_SECRET: envVarsSchema.parse(envVars).JWT_SECRET
}

module.exports = config;