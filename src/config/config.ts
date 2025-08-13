import dotenv from "dotenv";

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    mongoUser: string;
    mongoPassword: string;
    mongoHost: string;
    mongoPort: string;
    mongoAuthSource: string;
    mongoDBUrl?: string;
    dbName: string;
}

const config: Config = {
    port: Number(process.env.PORT),
    nodeEnv: process.env.NODE_ENV || "development",
    mongoUser: process.env.MONGO_USER || "",
    mongoPassword: process.env.MONGO_PASSWORD || "",
    mongoHost: process.env.MONGO_HOST || "localhost",
    mongoPort: process.env.MONGO_PORT || "27017",
    mongoAuthSource: process.env.MONGO_AUTHSOURCE || "admin",
    // Build URL dynamically if not provided directly
    dbName: process.env.MONGO_DBNAME || "",
};

export default config;
