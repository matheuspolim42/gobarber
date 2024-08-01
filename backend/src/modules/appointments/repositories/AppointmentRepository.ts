import dataSource from '../../../shared/infra/typeorm';
import Appointment from "../infra/typeorm/entities/Appointment";

const appointmentRepository = dataSource.getRepository(Appointment).extend({
  async findByDate(parsedDate: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date: parsedDate }
    })

    return findAppointment || null;
  }
});

export default appointmentRepository;
