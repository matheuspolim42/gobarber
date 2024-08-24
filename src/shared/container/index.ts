import { container } from "tsyringe";
import AppointmentRepository from "../../modules/appointments/infra/typeorm/repositories/AppointmentRepository";
import type IAppointmentRepository from "../../modules/appointments/repositories/IAppointmentsRepository";
import UsersRepository from "../../modules/users/infra/typeorm/repositories/UsersRepository";
import type IUserRepository from "../../modules/users/repositories/IUsersRepository";

import "../../modules/users/container/providers/index";
import "../providers/index";

container.registerSingleton<IAppointmentRepository>(
	"AppointmentRepository",
	AppointmentRepository,
);

container.registerSingleton<IUserRepository>("UsersRepository", UsersRepository);
