import { Router } from 'express';
import CreateAppointmentService from '../../../../modules/appointments/services/CreateAppointmentService';
import { parseISO } from 'date-fns';
import evanueAuthentication from '../middlewares/evanueAuthentication';
import AppointmentRepository from '../../../../modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import dataSource from '../../typeorm';
import IAppointmentRepository from '../../../../modules/appointments/repositories/IAppointmentsRepository';

const appointmentRouter = Router();

appointmentRouter.use(evanueAuthentication);

// appointmentRouter.get('/', async (req, res) => {
//   const appointmentRepository = new AppointmentRepository(dataSource);
//   const content = await appointmentRepository.();

//   res.json(content).status(200);
// })

appointmentRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date);

  const appointmentRepository = new AppointmentRepository(dataSource);
  const createAppointmentService = new CreateAppointmentService(appointmentRepository);

  const appointment = await createAppointmentService.execute({ provider_id, date: parsedDate });

  return res.json(appointment);
})

export default appointmentRouter;
