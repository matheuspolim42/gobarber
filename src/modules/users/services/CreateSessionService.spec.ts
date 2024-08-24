import AppError from "../../../shared/errors/AppError";
import FakeUsersRepository from "../fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";
import HashProvider from "../container/providers/HashProvider/implementations/HashProvider";
import CreateSessionService from "./CreateSessionService";

let fakeUsersRepository: FakeUsersRepository;
let hashProvider: HashProvider;
let createUser: CreateUserService;
let createSessionService: CreateSessionService;

describe("CreateSession", () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		hashProvider = new HashProvider();
		createUser = new CreateUserService(fakeUsersRepository, hashProvider);
		createSessionService = new CreateSessionService(
			fakeUsersRepository,
			hashProvider,
		);
	});

	it("should be able to authenticate", async () => {
		const user = await createUser.execute({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "123456",
		});

		const response = await createSessionService.execute({
			email: "johndoe@example.com",
			password: "123456",
		});

		expect(response).toHaveProperty("token");
		expect(response.user).toEqual(user);
	});

	it("should not be able to authenticate with non existing user", async () => {
		expect(
			createSessionService.execute({
				email: "johndoe@example.com",
				password: "anyonepassword123",
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to authenticate with a wrong password", async () => {
		await createUser.execute({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "123456",
		});

		expect(
			createSessionService.execute({
				email: "johndoe@example.com",
				password: "wrong-password",
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
