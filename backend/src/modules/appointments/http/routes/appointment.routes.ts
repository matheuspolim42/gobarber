import { Router } from 'express';
import evanueAuthentication from '../../../../shared/infra/http/middlewares/evanueAuthentication';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentRouter.use(evanueAuthentication);

// appointmentRouter.get('/', async (req, res) => {
//   const appointmentRepository = new AppointmentRepository(dataSource);
//   const content = await appointmentRepository.();

//   res.json(content).status(200);
// })

appointmentRouter.post('/', appointmentsController.create);

export default appointmentRouter;
