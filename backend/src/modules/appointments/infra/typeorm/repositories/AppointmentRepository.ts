import { DataSource, Repository } from "typeorm";
import Appointment from "../entities/Appointment";

class AppointmentRepository {
  private ormDataSource: Repository<Appointment>;

  constructor(dataSource: DataSource) {
    this.ormDataSource = dataSource.getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.ormDataSource.findOne({ where: { date } });

    return findAppointment || null;
  }
}
