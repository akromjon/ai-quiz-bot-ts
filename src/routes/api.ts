import express from "express";

import { index } from "../app/http/controller/homeController";

const apiRouter = express.Router();

apiRouter.get("/", index);

export default apiRouter;
