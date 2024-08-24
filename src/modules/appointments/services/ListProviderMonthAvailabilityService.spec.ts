import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import ListProviderMonthAvailabilityService from "./ListProviderMonthAvailabilityService";

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe("CreateAppointment", () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		listProviderMonthAvailabilityService =
			new ListProviderMonthAvailabilityService(fakeAppointmentsRepository);
	});

	it("should be able to list the month availability from provider", async () => {
		await fakeAppointmentsRepository.create({
			provider_id: "user",
			date: new Date(2024, 8, 16, 8, 0, 0),
		});

		await fakeAppointmentsRepository.create({
			provider_id: "user",
			date: new Date(2024, 8, 17, 8, 0, 0),
		});

		await fakeAppointmentsRepository.create({
			provider_id: "user",
			date: new Date(2024, 8, 18, 8, 0, 0),
		});

		const availability = await listProviderMonthAvailabilityService.execute({
			user_id: "user",
			year: 2024,
			month: 9,
		});
	});
});
