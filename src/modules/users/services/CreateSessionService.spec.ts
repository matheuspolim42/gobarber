import AppError from "../../../shared/errors/AppError";
import FakeUsersRepository from "../fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";
import HashProvider from "../providers/HashProvider/implementations/HashProvider";
import CreateSessionService from "./CreateSessionService";
import { create } from "domain";

describe("CreateSession", () => {
  it("should be able to authenticate", async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const hashProvider = new HashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, hashProvider);
    const createSessionService = new CreateSessionService(fakeUsersRepository, hashProvider);

    const user = await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });

    const response = await createSessionService.execute({
      email: "johndoe@example.com",
      password: "123456"
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it("should not be able to authenticate with non existing user", async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const hashProvider = new HashProvider();
    const createSessionService = new CreateSessionService(fakeUsersRepository, hashProvider);

    expect(createSessionService.execute({
      email: "johndoe@example.com",
      password: "anyonepassword123"
    })).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with a wrong password", async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const hashProvider = new HashProvider();
    const createSessionService = new CreateSessionService(fakeUsersRepository, hashProvider);
    const createUser = new CreateUserService(fakeUsersRepository, hashProvider);

    await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });

    expect(createSessionService.execute(
      {
        email: "johndoe@example.com",
        password: "wrong-password",
      }
    )).rejects.toBeInstanceOf(AppError);
  });
})
