import { Router } from "express";
import evanueAuthentication from "../../../../shared/infra/http/middlewares/evanueAuthentication";
import AppointmentsController from "../controllers/AppointmentsController";
import ProviderMonthController from "../controllers/ProviderMonthController";

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();
const providerMonthController = new ProviderMonthController();

appointmentRouter.use(evanueAuthentication);

appointmentRouter.get("/", providerMonthController.showAvailability);

appointmentRouter.post("/", appointmentsController.create);

export default appointmentRouter;
