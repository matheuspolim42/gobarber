import IAppointmentRepository from '../repositories/IAppointmentsRepository';
import { startOfHour } from 'date-fns';

interface ICreateAppointmentDTO {
  provider_id: string,
  date: Date,
};

class CreateAppointmentService {
  constructor(private appointmentRepository: IAppointmentRepository) {};

  public async execute({ provider_id, date }: ICreateAppointmentDTO): Promise<Object> {
    const parsedDate = startOfHour(date);

    const dateExistsBoolean = await this.appointmentRepository.findByDate(parsedDate);

    if (dateExistsBoolean) {
      throw new Error("This date is already booked.");
    };

    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: parsedDate
    });

    return appointment;
  };
};

export default CreateAppointmentService;
