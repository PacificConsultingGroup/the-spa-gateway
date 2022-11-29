
import express from "express";

const usersRouter = express.Router();

usersRouter.get('/', getAllUsersHandler);