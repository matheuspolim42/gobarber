import type { Request, Response } from "express";
import { container } from "tsyringe";
import ListProviderMonthAvailabilityService from "../../services/ListProviderMonthAvailabilityService";

class ProviderMonthController {
	public async showAvailability(req: Request, res: Response) {
		const user_id = req.user.id;
		const { month, year } = req.body;

		const listProviderMonthAvailabilityService = container.resolve(
			ListProviderMonthAvailabilityService,
		);

		const availabilityDays = await listProviderMonthAvailabilityService.execute({
			user_id,
			month,
			year,
		});

		return res.json(availabilityDays);
	}
}

export default ProviderMonthController;
