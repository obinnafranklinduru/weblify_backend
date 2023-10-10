const dotenv = require('dotenv');
const { object, string } = require('zod');

dotenv.config();

const envVarsSchema = object({
    NODE_ENV: string().refine((val) => ['production', 'development', 'test'].includes(val), {
        message: 'NODE_ENV must be one of "production", "development", or "test"',
    }),
    PORT: string().refine((val) => Number(val)),
    MONGODB_URL: string(),
    BASE_URL: string(),
    JWT_SECRET: string(),
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