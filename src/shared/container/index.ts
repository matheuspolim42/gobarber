import AppointmentRepository from '../../modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import IAppointmentRepository from '../../modules/appointments/repositories/IAppointmentsRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';
import IUserRepository from '../../modules/users/repositories/IUsersRepository';
import { container } from 'tsyringe';

import "../../modules/users/container/providers";

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
   AppointmentRepository
);

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository
)
