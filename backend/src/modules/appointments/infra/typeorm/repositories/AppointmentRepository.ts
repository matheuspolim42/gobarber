import dataSource from '../../../../../shared/infra/typeorm';
import IAppointmentRepository from '../../../repositories/IAppointmentsRepository';
import Appointment from "../entities/Appointment";

const appointmentRepository = dataSource.getRepository(Appointment).extend<IAppointmentRepository>({
  async findByDate(parsedDate: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date: parsedDate }
    })

    return findAppointment;
  }
});

export default appointmentRepository;
