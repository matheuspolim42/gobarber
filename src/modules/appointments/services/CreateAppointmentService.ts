import "reflect-metadata";
import { isBefore, startOfHour } from "date-fns";
import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import type Appointment from "../infra/typeorm/entities/Appointment";
import type IAppointmentRepository from "../repositories/IAppointmentsRepository";

interface IRequest {
	provider_id: string;
	user_id: string;
	date: Date;
}

@injectable()
class CreateAppointmentService {
	constructor(
		@inject("AppointmentRepository")
		private appointmentRepository: IAppointmentRepository,
	) {}

	public async execute({
		provider_id,
		user_id,
		date,
	}: IRequest): Promise<Appointment> {
		const parsedDate = startOfHour(date);

		if (isBefore(parsedDate, Date.now())) {
			throw new AppError(
				401,
				"you can't create an appointment on the past date.",
			);
		}

		if (user_id === provider_id) {
			throw new AppError(
				401,
				"you can't create an appointment with only yourself.",
			);
		}

		const dateExistsBoolean =
			await this.appointmentRepository.findByDate(parsedDate);

		if (dateExistsBoolean) {
			throw new AppError(400, "This date is already booked.");
		}

		const appointment = await this.appointmentRepository.create({
			provider_id,
			user_id,
			date: parsedDate,
		});

		return appointment;
	}
}

export default CreateAppointmentService;
