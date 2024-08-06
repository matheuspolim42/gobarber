import IAppointmentRepository from '../repositories/IAppointmentsRepository';
import { container, inject, injectable } from 'tsyringe';
import { startOfHour } from 'date-fns';

interface IRequest {
  provider_id: string,
  date: Date,
};

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository
  ) {};

  public async execute({ provider_id, date }: IRequest): Promise<Object> {
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
