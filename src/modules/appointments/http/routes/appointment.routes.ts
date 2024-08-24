import { Router } from "express";
import evanueAuthentication from "../../../../shared/infra/http/middlewares/evanueAuthentication";
import AppointmentsController from "../controllers/AppointmentsController";
import AppointmentHoursController from "../controllers/AppointmentsHoursController";
import ProviderMonthController from "../controllers/ProviderMonthController";

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();
const providerMonthController = new ProviderMonthController();
const appointmentHoursController = new AppointmentHoursController();

appointmentRouter.use(evanueAuthentication);

appointmentRouter.get(
	"/availability",
	appointmentHoursController.indexAvailabilityHours,
);

appointmentRouter.get("/", providerMonthController.showAvailability);

appointmentRouter.post("/", appointmentsController.create);

export default appointmentRouter;
