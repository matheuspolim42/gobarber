import { Router } from "express";
import evanueAuthentication from "../../../shared/infra/http/middlewares/evanueAuthentication";
import ProvidersController from "../infra/http/controllers/ProvidersController";

const providerRouter = Router();
const providerController = new ProvidersController();

providerRouter.use(evanueAuthentication);

providerRouter.get("/", providerController.index);

export default providerRouter;
