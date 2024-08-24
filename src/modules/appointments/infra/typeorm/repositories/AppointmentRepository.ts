import { getDate, getHours, getMonth, getYear } from "date-fns";
import type { Repository } from "typeorm";
import dataSource from "../../../../../shared/infra/typeorm";
import type ICreateAppointmentDTO from "../../../dtos/ICreateAppointmentDTO";
import type IListProviderDayAvailabilityDTO from "../../../dtos/IListProviderDayAvailabilityDTO";
import type IListProviderMonthAvailabilityDTO from "../../../dtos/IListProviderMonthAvailabilityDTO";
import type IAppointmentRepository from "../../../repositories/IAppointmentsRepository";
import Appointment from "../entities/Appointment";

class AppointmentRepository implements IAppointmentRepository {
	private ormRepository: Repository<Appointment>;

	constructor() {
		this.ormRepository = dataSource.getRepository(Appointment);
	}

	public async findByDate(date: Date): Promise<Appointment | null> {
		const findAppointment = await this.ormRepository.findOne({
			where: { date },
		});

		return findAppointment || null;
	}

	public async findAllMonthAvailability(
		user_id: string,
		year: number,
		month: number,
	): Promise<IListProviderMonthAvailabilityDTO[]> {
		const appointments = await this.ormRepository.find();
		const datesInTheMonth = appointments.filter((appointment) => {
			return (
				// biome-ignore lint/suspicious/noDoubleEquals: <explanation>
				getMonth(appointment.date) + 1 == month &&
				// biome-ignore lint/suspicious/noDoubleEquals: <explanation>
				getYear(appointment.date) == year &&
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

	public async findAllInDay(
		provider_id: string,
		day: number,
		month: number,
		year: number,
	): Promise<IListProviderDayAvailabilityDTO[]> {
		const appointments = await this.ormRepository.find();
		const parsedAppointments = appointments.filter((appointment) => {
			return (
				getDate(appointment.date) === day &&
				getMonth(appointment.date) + 1 === month &&
				getYear(appointment.date) === year &&
				appointment.provider_id === provider_id
			);
		});

		const startHour = 8;

		const hoursAvailability = parsedAppointments
			.filter((appointmentsDay) => getHours(appointmentsDay.date) < 17)
			.map((appointmentsDay) => {
				return {
					hour: getHours(appointmentsDay.date) + startHour,
					available: false,
				};
			});

		const filteredHoursAvailability = hoursAvailability.filter((hoursArray) => {
			return hoursArray.hour <= 17;
		});

		return filteredHoursAvailability;
	}

	public async create({
		provider_id,
		user_id,
		date,
	}: ICreateAppointmentDTO): Promise<Appointment> {
		const appointment = this.ormRepository.create({
			provider_id,
			user_id,
			date,
		});

		await this.ormRepository.save(appointment);

		return appointment;
	}
}

export default AppointmentRepository;
