import FakeUsersRepository from "../fakes/FakeUsersRepository";
import SendForgotPasswordByEmailService from "./SendForgotPasswordByEmailService";
import FakeMailProvider from "../../../shared/providers/MailProvider/fakes/FakeMailProvider";
import AppError from "../../../shared/errors/AppError";
import FakeUserTokenRepository from "../fakes/FakeUserTokenRepository";

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordByEmail: SendForgotPasswordByEmailService;

describe("SendForgotPasswordByEmail", () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeMailProvider = new FakeMailProvider();
		fakeUserTokenRepository = new FakeUserTokenRepository();
		sendForgotPasswordByEmail = new SendForgotPasswordByEmailService(
			fakeMailProvider,
			fakeUsersRepository,
			fakeUserTokenRepository,
		);
	});

	it("should be able to receive the email recover password", async () => {
		const sendMail = jest.spyOn(fakeMailProvider, "sendMail");

		await fakeUsersRepository.create({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "123456example",
		});

		await sendForgotPasswordByEmail.execute({
			email: "johndoe@example.com",
		});

		expect(sendMail).toHaveBeenCalled();
	});

	it("should not recover an non-existing user password", async () => {
		await expect(
			sendForgotPasswordByEmail.execute({
				email: "johndoe@example.com",
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it("should be able to generate a recover password token", async () => {
		const generate = jest.spyOn(fakeUserTokenRepository, "generate");

		await fakeUsersRepository.create({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "123456example",
		});

		await sendForgotPasswordByEmail.execute({
			email: "johndoe@example.com",
		});

		expect(generate).toHaveBeenCalled();
	});

	it(`should not be able to generate a recover password token
  if does not exist the user`, async () => {
		await expect(
			sendForgotPasswordByEmail.execute({
				email: "johndoe@example.com",
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
