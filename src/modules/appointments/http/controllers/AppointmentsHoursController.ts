import type { Request, Response } from "express";
import { container } from "tsyringe";
import ListProviderDayAvailabilityService from "../../services/ListProviderDayAvailabilityService";

class AppointmentHoursController {
	public async showAvailabilityHours(req: Request, res: Response) {
		const provider_id = req.user.id;
		const { year, month, day } = req.body;

		const listProviderDayAvailabilityService = container.resolve(
			ListProviderDayAvailabilityService,
		);

		const hoursAvailability = await listProviderDayAvailabilityService.execute(
			provider_id,
			year,
			month,
			day,
		);

		return res.json(hoursAvailability);
	}
}

export default AppointmentHoursController;
