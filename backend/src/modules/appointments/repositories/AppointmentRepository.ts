import { isEqual } from 'date-fns';
import { Repository } from 'typeorm'
import dataSource from '../../../shared/database';
import Appointment from "../entities/Appointment";

const appointmentRepository = dataSource.getRepository(Appointment).extend({
  async findByDate(parsedDate: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date: parsedDate }
    })

    return findAppointment || null;
  }
});

export default appointmentRepository;
