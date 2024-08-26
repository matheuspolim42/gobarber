import { Router } from "express";
import evanueAuthentication from "../../../../shared/infra/http/middlewares/evanueAuthentication";
import AppointmentsController from "../controllers/AppointmentsController";
import AppointmentHoursController from "../controllers/AppointmentsHoursController";
import ProviderAppointmentController from "../controllers/ProviderAppointmentController";
import ProviderMonthController from "../controllers/ProviderMonthController";

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();
const providerMonthController = new ProviderMonthController();
const appointmentHoursController = new AppointmentHoursController();
const providerAppointmentController = new ProviderAppointmentController();

appointmentRouter.use(evanueAuthentication);

appointmentRouter.get(
	"/:provider-id/hours-availability",
	appointmentHoursController.showAvailabilityHours,
);

appointmentRouter.get(
	"/:provider-id/month-availability",
	providerMonthController.showAvailability,
);

appointmentRouter.get(
	"/me",
	providerAppointmentController.showProviderAppointments,
);

appointmentRouter.post("/", appointmentsController.create);

export default appointmentRouter;
