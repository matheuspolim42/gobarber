import { getDate, getMonth, getYear, isEqual } from "date-fns";
import { v4 } from "uuid";
import type ICreateAppointmentDTO from "../../dtos/ICreateAppointmentDTO";
import type IListProviderMonthAvailabilityDTO from "../../dtos/IListProviderMonthAvailabilityDTO";
import Appointment from "../../infra/typeorm/entities/Appointment";
import type IAppointmentRepository from "../IAppointmentsRepository";

class FakeAppointmentsRepository implements IAppointmentRepository {
	private appointmentRepository: Appointment[] = [];

	public async findByDate(date: Date): Promise<Appointment | null> {
		const findAppointment = this.appointmentRepository.find((appointment) =>
			isEqual(appointment.date, date),
		);

		return findAppointment;
	}

	public async findAllMonthAvailability(
		user_id: string,
		year: number,
		month: number,
	): Promise<Array<IListProviderMonthAvailabilityDTO>> {
		const datesInTheMonth = this.appointmentRepository.filter((appointment) => {
			return (
				getMonth(appointment.date) + 1 === month &&
				getYear(appointment.date) === year &&
				appointment.provider_id === user_id
			);
		});

		const daysAvailability = datesInTheMonth.map((appointmentInTheMonth) => {
			return {
				day: getDate(appointmentInTheMonth.date),
				available: false,
			};
		});

		return daysAvailability;
	}

	public async create({
		provider_id,
		date,
	}: ICreateAppointmentDTO): Promise<Appointment> {
		const appointment = new Appointment();

		Object.assign(appointment, { id: v4(), date, provider_id });

		this.appointmentRepository.push(appointment);

		return appointment;
	}
}

export default FakeAppointmentsRepository;
