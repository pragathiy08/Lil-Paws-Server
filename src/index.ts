import express from 'express';
import { config } from "dotenv";
import { connect } from "mongoose";
import { accessTokenParser } from './helpers/AuthToken';
import Accounts from "./routes/Accounts";
import Pets from "./routes/Pets";

const App = express();
const envConfig = config();

envConfig.error && console.error(envConfig.error);

const PORT_TO_LISTEN = parseInt(envConfig.parsed.PORT, 10) || 8000;
const MONGO_DB = envConfig.parsed.DB_URL || "mongodb://localhost:27017/paws";

App.use(accessTokenParser);
App.use("/accounts", Accounts);
App.use("/pets", Pets);

App.listen(PORT_TO_LISTEN, async () => {
    
    console.log(`Started listening on Port ${PORT_TO_LISTEN}`);

    const mongoconnection = await connect(MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log(`MongoDB v.${mongoconnection.version} online`);
});