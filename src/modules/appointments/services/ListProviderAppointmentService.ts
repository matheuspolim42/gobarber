import { inject, injectable } from "tsyringe";
import type Appointment from "../infra/typeorm/entities/Appointment";
import type IAppointmentRepository from "../repositories/IAppointmentsRepository";

@injectable()
class ListProviderAppointmentService {
	constructor(
		@inject("AppointmentRepository")
		private appointmentRepository: IAppointmentRepository,
	) {}

	public async execute(
		provider_id: string,
		year: number,
		month: number,
		day: number,
	): Promise<Appointment[]> {
		const appointments = await this.appointmentRepository.findAllInDay(
			provider_id,
			day,
			year,
			month,
		);

		return appointments;
	}
}

export default ListProviderAppointmentService;
