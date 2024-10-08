import CreateAppointmentService from "./CreateAppointmentService";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import AppError from "../../../shared/errors/AppError";

describe("CreateAppointment", () => {
	it("should be able to create an appointment", async () => {
		const fakeAppointmentsRepository = new FakeAppointmentsRepository();
		const createAppointment = new CreateAppointmentService(
			fakeAppointmentsRepository,
		);

		const appointment = await createAppointment.execute({
			date: new Date(),
			provider_id: "123123",
		});

		expect(appointment).toHaveProperty("id");
		expect(appointment.provider_id).toBe("123123");
	});

	it("should not be able to create two appointments on the same time", async () => {
		const fakeAppointmentsRepository = new FakeAppointmentsRepository();
		const createAppointment = new CreateAppointmentService(
			fakeAppointmentsRepository,
		);

		const appointmentDate = new Date();

		await createAppointment.execute({
			date: appointmentDate,
			provider_id: "123123",
		});

		expect(
			createAppointment.execute({
				date: appointmentDate,
				provider_id: "123123",
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
