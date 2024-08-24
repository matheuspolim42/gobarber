import { Router } from "express";
import UserSessionController from "../infra/http/controllers/UserSessionController";

const sessionRouter = Router();
const userSessionController = new UserSessionController();

sessionRouter.post("/", userSessionController.create);

export default sessionRouter;
