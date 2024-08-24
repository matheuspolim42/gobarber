import type ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";
import type IListProviderMonthAvailabilityDTO from "../dtos/IListProviderMonthAvailabilityDTO";
import type Appointment from "../infra/typeorm/entities/Appointment";

export default interface IAppointmentRepository {
	create(data: ICreateAppointmentDTO): Promise<Appointment>;
	findAllMonthAvailability(
		user_id: string,
		year: number,
		month: number,
	): Promise<Array<IListProviderMonthAvailabilityDTO>>;
	findByDate(date: Date): Promise<Appointment | undefined>;
}
