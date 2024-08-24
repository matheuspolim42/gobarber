import { getDate, getDaysInMonth } from "date-fns";
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
class ListProviderMonthAvailabilityService {
	constructor(
		@inject("AppointmentRepository")
		private appointmentRepository: IAppointmentRepository,
	) {}

	public async execute({
		user_id,
		year,
		month,
		day,
	}: IRequest): Promise<IResponse> {
		return [{ hour: 8, available: false }];
	}
}

export default ListProviderMonthAvailabilityService;
