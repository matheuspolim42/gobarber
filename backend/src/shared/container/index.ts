import AppointmentRepository from '../../modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import IAppointmentRepository from '../../modules/appointments/repositories/IAppointmentsRepository';
import { container } from 'tsyringe';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
   AppointmentRepository
);
