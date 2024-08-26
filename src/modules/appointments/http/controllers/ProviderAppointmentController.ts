import type { Request, Response } from "express";
import { container } from "tsyringe";
import type Appointment from "../../infra/typeorm/entities/Appointment";
import ListProviderAppointmentService from "../../services/ListProviderAppointmentService";

class ProviderAppointmentController {
	public async showProviderAppointments(req: Request, res: Response) {
		const provider_id = req.user.id;
		const { year, month, day } = req.body;

		const listProviderAppointmentService = container.resolve(
			ListProviderAppointmentService,
		);

		const appointments = await listProviderAppointmentService.execute(
			provider_id,
			year,
			month,
			day,
		);

		return res.json(appointments);
	}
}

export default ProviderAppointmentController;
