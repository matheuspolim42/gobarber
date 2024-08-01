import appointmentRepository from '../repositories/AppointmentRepository';
import { startOfHour } from 'date-fns';

interface CreateAppointmentDTO {
  provider_id: string,
  date: Date,
};

class CreateAppointmentService {
  public async execute({ provider_id, date }: CreateAppointmentDTO): Promise<Object> {
    const parsedDate = startOfHour(date);

    const dateExistsBoolean = await appointmentRepository.findByDate(parsedDate);

    if (dateExistsBoolean) {
      throw new Error("This date is already booked.");
    }

    const appointment = appointmentRepository.create({
      provider_id,
      date: parsedDate
    })

    await appointmentRepository.save(appointment);

    return appointment;
  }
};

export default CreateAppointmentService;
