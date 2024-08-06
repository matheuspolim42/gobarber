import Appointment from "../../infra/typeorm/entities/Appointment";
import ICreateAppointmentDTO from "../../dtos/ICreateAppointmentDTO";
import IAppointmentRepository from "../IAppointmentsRepository";
import { uuid } from 'uuidv4';

class FakeAppointmentsRepository implements IAppointmentRepository {
  private appointmentRepository: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = this.appointmentRepository.find(
      appointment => appointment.date === date
    );

    return findAppointment;
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id })

    this.appointmentRepository.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
