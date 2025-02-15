import express from "express";
import { CONFIG } from "./config/app";
import apiRouter from "./routes/api";
import logger from "./app/http/middleware/requestLogger";

const app = express();

app.use(logger)
app.use(apiRouter)

app.listen(CONFIG.APP_PORT, () => {
    console.log(`🚀 Server is running on http://${CONFIG.APP_URL}:${CONFIG.APP_PORT}`);
});