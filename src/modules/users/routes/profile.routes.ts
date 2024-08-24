import { Router } from "express";
import evanueAuthentication from "../../../shared/infra/http/middlewares/evanueAuthentication";
import ProfileController from "../infra/http/controllers/ProfileController";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(evanueAuthentication);

profileRouter.get("/", profileController.show);
profileRouter.put("/", profileController.update);

export default profileRouter;
