import { config } from "dotenv";

const envConfig = config();

envConfig.error && console.log(envConfig.error.message);

envConfig.parsed && console.log(`Hello ${envConfig.parsed['HOST']}!`);