import Appointment from "../../infra/typeorm/entities/Appointment";
import ICreateAppointmentDTO from "../../dtos/ICreateAppointmentDTO";
import IAppointmentRepository from "../IAppointmentsRepository";
import { v4 } from 'uuid';
import { isEqual } from "date-fns";

class FakeAppointmentsRepository implements IAppointmentRepository {
  private appointmentRepository: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = this.appointmentRepository.find(
      appointment => isEqual(appointment.date, date)
    );

    return findAppointment;
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: v4(), date, provider_id })

    this.appointmentRepository.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
