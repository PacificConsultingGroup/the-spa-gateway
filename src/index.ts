
import express from "express";
import helmet from "helmet";

const app = express();

app.use(helmet());

// TODO: Deserialise user here

app.listen(process.env.PORT ?? 8000, () => {
    console.log('App backend listening on port 8000');
});