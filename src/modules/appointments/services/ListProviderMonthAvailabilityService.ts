import { getDate, getDaysInMonth } from "date-fns";
import { inject, injectable } from "tsyringe";

import type IAppointmentRepository from "../repositories/IAppointmentsRepository";

interface IRequest {
	user_id: string;
	month: number;
	year: number;
}

type IResponse = Array<{
	day: number;
	available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
	constructor(
		@inject("AppointmentRepository")
		private appointmentRepository: IAppointmentRepository,
	) {}

	public async execute({ user_id, year, month }: IRequest): Promise<IResponse> {
		const providerAppointmentsInTheMonth =
			await this.appointmentRepository.findAllMonthAvailability(
				user_id,
				year,
				month,
			);

		const numberOfDaysInMonth = getDaysInMonth(new Date(year, month + 1));

		const eachDayArray = Array.from(
			{ length: numberOfDaysInMonth },
			(_, index) => index + 1,
		);

		const availability = eachDayArray.map((day) => {
			const appointmentsInDay = providerAppointmentsInTheMonth.filter(
				(appointment) => {
					return appointment.day === day;
				},
			);

			return {
				day,
				available: appointmentsInDay.length > 10,
			};
		});

		return availability;
	}
}

export default ListProviderMonthAvailabilityService;
