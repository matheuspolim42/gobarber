import { Router } from 'express';
import appointmentRepository from '../../../../modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import CreateAppointmentService from '../../../../modules/appointments/services/CreateAppointmentService';
import { parseISO } from 'date-fns';
import evanueAuthentication from '../middlewares/evanueAuthentication';

const appointmentRouter = Router();

appointmentRouter.use(evanueAuthentication);

appointmentRouter.get('/', async (req, res) => {
  const content = await appointmentRepository.find();

  res.json(content).status(200);
})

appointmentRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date);
  const createAppointmentService = new CreateAppointmentService();

  const appointment = await createAppointmentService.execute({ provider_id, date: parsedDate });

  return res.json(appointment);
})

export default appointmentRouter;
