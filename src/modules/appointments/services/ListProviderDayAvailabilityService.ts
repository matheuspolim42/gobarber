import { getDate, getDaysInMonth, isAfter } from "date-fns";
import { inject, injectable } from "tsyringe";

import type IAppointmentRepository from "../repositories/IAppointmentsRepository";

interface IRequest {
	user_id: string;
	month: number;
	year: number;
	day: number;
}

type IResponse = Array<{
	hour: number;
	available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
	constructor(
		@inject("AppointmentRepository")
		private appointmentRepository: IAppointmentRepository,
	) {}

	public async execute(
		provider_id: string,
		year: number,
		month: number,
		day: number,
	): Promise<IResponse> {
		const hoursNotAvailable = await this.appointmentRepository.findAllInDay(
			provider_id,
			day,
			month,
			year,
		);

		const hourStart = 8;

		const eachHourArray = Array.from(
			{ length: 10 },
			(_, index) => index + hourStart,
		);

		const availability = eachHourArray.map((hour) => {
			const hasAppointmentInHour = hoursNotAvailable.some((hourBooked) => {
				return hourBooked.hour === hour;
			});

			const currentDate = new Date(Date.now());
			const compareDate = new Date(year, month - 1, day, hour);

			return {
				hour,
				available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
			};
		});

		return availability;
	}
}

export default ListProviderDayAvailabilityService;
