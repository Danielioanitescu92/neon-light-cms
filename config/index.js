import dotenv from 'dotenv';

dotenv.config();

export default {
    MONGO_URI: process.env.MONGO_URI,
    jwtSecret: process.env.jwtSecret,
    EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
    PORT: process.env.PORT
};