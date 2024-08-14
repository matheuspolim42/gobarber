import { Repository } from "typeorm";
import Appointment from "../entities/Appointment";
import dataSource from "../../../../../shared/infra/typeorm";
import IAppointmentRepository from "../../../repositories/IAppointmentsRepository";
import ICreateAppointmentDTO from "../../../dtos/ICreateAppointmentDTO";

class AppointmentRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.ormRepository.findOne({ where: { date } });

    return findAppointment || null;
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentRepository;
