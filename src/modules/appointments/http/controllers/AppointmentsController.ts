import { parseISO } from "date-fns";
import type { Request, Response } from "express";
import { container } from "tsyringe";
import CreateAppointmentService from "../../services/CreateAppointmentService";

class AppointmentsController {
	public async create(req: Request, res: Response): Promise<Response> {
		const user_id = req.user.id;
		const { provider_id, date } = req.body;

		const parsedDate = parseISO(date);

		const createAppointmentService = container.resolve(CreateAppointmentService);

		const appointment = await createAppointmentService.execute({
			provider_id,
			user_id,
			date: parsedDate,
		});

		return res.json(appointment);
	}
}

export default AppointmentsController;
